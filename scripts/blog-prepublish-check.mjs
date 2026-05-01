import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const publishDir = path.join(root, "content", "posts")
const draftDir = path.join(root, "content", "drafts")

const hardPatterns = [
  [/Generated with Claude/i, "Claude generation footer"],
  [/Co-authored-by:\s*Claude/i, "Claude co-author footer"],
  [/\/Users\/[^\s)`]+/g, "local absolute path"],
  [/~\/Desktop\/[^\s)`]+/g, "local desktop path"],
  [/Desktop\/10_work\/dev-hub/g, "dev-hub internal path"],
  [/pilab\/missions\//g, "PI Lab mission path"],
]

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const filePath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(filePath)
    if (entry.name === "README.md") return []
    return entry.isFile() && entry.name.endsWith(".md") ? [filePath] : []
  })
}

function rel(filePath) {
  return path.relative(root, filePath)
}

function frontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/)
  return match ? match[1] : ""
}

const errors = []
const warnings = []

for (const filePath of [...walk(publishDir), ...walk(draftDir)]) {
  const text = fs.readFileSync(filePath, "utf8")
  const file = rel(filePath)

  for (const [pattern, label] of hardPatterns) {
    if (pattern.test(text)) {
      errors.push(`${file}: contains ${label}`)
    }
  }
}

for (const filePath of walk(publishDir)) {
  const text = fs.readFileSync(filePath, "utf8")
  const fm = frontmatter(text)
  const file = rel(filePath)

  if (!fm) errors.push(`${file}: missing frontmatter`)
  if (!/^title:\s*.+/m.test(fm)) errors.push(`${file}: missing title`)
  if (!/^date:\s*.+/m.test(fm)) errors.push(`${file}: missing date`)
  const dateMatch = fm.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/m)
  if (/^date:\s*TBD\s*$/m.test(fm)) errors.push(`${file}: date is TBD`)
  if (!/^\d{4}-\d{2}-\d{2}-.+\.md$/.test(path.basename(filePath))) {
    errors.push(`${file}: filename must be YYYY-MM-DD-slug.md`)
  }
  if (dateMatch && !path.basename(filePath).startsWith(`${dateMatch[1]}-`)) {
    errors.push(`${file}: filename date does not match frontmatter date`)
  }
  if (!/^description:\s*.+/m.test(fm)) warnings.push(`${file}: missing description`)
  if (/^status:\s*(draft|blog-ready)\s*$/m.test(fm)) {
    warnings.push(`${file}: status looks like workflow metadata`)
  }
}

for (const filePath of walk(draftDir)) {
  const text = fs.readFileSync(filePath, "utf8")
  const fm = frontmatter(text)
  if (/^date:\s*TBD\s*$/m.test(fm)) {
    warnings.push(`${rel(filePath)}: draft date is still TBD`)
  }
}

for (const warning of warnings) {
  console.warn(`WARN ${warning}`)
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`ERROR ${error}`)
  }
  process.exit(1)
}

console.log("prepublish check passed")

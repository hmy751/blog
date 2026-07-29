# References

이 디렉토리는 현재 수렴 작업의 직접 산출물이 아니라, 나중에 누락과 구현 가능성을 비교할 때 다시 여는 참고 자료를 보존한다.

두 하위 디렉토리는 역할이 다르다.

- [atomic-element-expansion](./atomic-element-expansion/): 이번 품질 실패와 논의를 84개 하네스 요소 계약으로 원자화했던 첫 확장 기록
- [harness-form-catalog](./harness-form-catalog/): Codex·Claude 공식 문서와 기존 일반 하네스 조사에서 추출한 위치·발동·권한·격리·검증 형식 카탈로그

첫째는 이번 사례에서 나온 내용 확장이고, 둘째는 내용을 담는 형식의 탐색이다. 서로 합치거나 현재 문제 후보의 출발점으로 삼지 않는다.

현재 작업은 먼저 `../src/`에서 source 기반 문제 후보를 수거한다. 그 뒤 첫 확장은 coverage 점검에, 형식 카탈로그는 작동 후보와 owner 비교에만 사용한다.

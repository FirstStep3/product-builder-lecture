# 24H Endurance Hub Project Blueprint

## 프로젝트 개요
세계에서 가장 가혹한 자동차 경주인 '24시간 내구 레이스(24-Hour Endurance Racing)' 정보를 제공하는 모던 웹 애플리케이션입니다. 르망 24시, 데이토나 24시 등 주요 경기 정보와 복잡한 규칙, 용어를 한눈에 파악할 수 있도록 설계되었습니다.

## 주요 기능
- **Hero 섹션**: 내구 레이스의 웅장함을 담은 모던한 첫 화면.
- **동적 콘텐츠 시스템**: 
    - **내구 레이스 개요**: 24시간 경기의 본질과 매력 설명.
    - **레이스 규칙**: 멀티 클래스, 드라이버 교체, 야간 주행 등 핵심 규칙.
    - **필수 용어**: 스틴트(Stint), 슬로우 존(Slow Zone) 등 전문 용어.
- **제휴 문의 (Formspree)**: 기업 및 파트너십을 위한 모던한 문의 폼.
- **다크/화이트 모드**: 밤과 낮이 공존하는 레이스의 특성을 반영한 테마 전환.
- **반응형 디자인**: 유리 효과(Glassmorphism)와 세련된 애니메이션이 적용된 레이아웃.

## 기술 스택
- **HTML5 / CSS3**: 모던 Baseline 기능 및 변수 활용.
- **JavaScript**: 데이터 기반의 동적 UI 렌더링.
- **Web Components**: 레이스 카 정보를 표시하는 커스텀 엘리먼트.
- **Formspree**: 서버리스 폼 핸들링 서비스.
- **Google AdSense**: 웹사이트 수익화를 위한 광고 게재 솔루션.

## 콘텐츠 구성 (판단 기준)
1. **The Spirit**: 왜 24시간인가? (인간과 기계의 한계 도전)
2. **The Rules**: 멀티 클래스(Hypercar, GT3), 드라이버 교체 시스템, 안전 규정.
3. **The Terms**: 스틴트, 풀 코스 옐로우(FCY), 피트 윈도우 등.
4. **The Partnership**: 제휴 제안, 광고 문의, 기타 협업을 위한 소통 창구.

## 현재 진행 계획
### [Step 1] 제휴 문의 폼 구현
- `index.html`: 내비게이션에 'Partner' 항목 추가.
- `style.css`: 폼 요소(Input, Textarea, Select) 및 버튼 스타일링.
- `main.js`: `renderPartnership` 함수 구현 및 이벤트 리스너 연결.
- **Formspree 연동**: `https://formspree.io/f/YOUR_FORM_ID` 구조의 액션 설정.

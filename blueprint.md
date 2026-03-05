# F1 Hub Project Blueprint

## 프로젝트 개요
F1(Formula 1)의 정보를 제공하는 반응형 웹 애플리케이션입니다. 2026년 예상 팀 및 드라이버 정보, F1 필수 용어, 그리고 최신 뉴스를 동적으로 제공합니다.

## 주요 기능
- **동적 콘텐츠 탭**: 메뉴 클릭 시 페이지 새로고침 없이 메인 콘텐츠 업데이트 (2026 정보, F1 용어, 뉴스).
- **다크/화이트 모드**: 사용자 선호도에 따른 테마 전환 기능 및 설정 저장(localStorage)을 통한 상태 유지.
- **Web Components 활용**: 드라이버 카드를 커스텀 엘리먼트로 구현하여 재사용성 및 스타일 캡슐화 확보.
- **현대적인 CSS 디자인**: CSS 변수(Custom Properties), Flexbox, Grid를 활용한 반응형 레이아웃 및 부드러운 전환 효과.

## 기술 스택
- **HTML5**: 시맨틱 태그 및 Web Components (`customElements`) 활용.
- **CSS3 (Baseline)**: 
    - 테마별 CSS 변수 관리 (`:root`, `[data-theme="dark"]`).
    - 부드러운 테마 전환을 위한 `transition` 효과.
    - 현대적인 타이포그래피 (Google Fonts: Orbitron, Roboto).
- **JavaScript (ES6+)**: 
    - DOM 조작 및 이벤트 처리.
    - `localStorage`를 이용한 사용자 설정 저장.
    - Shadow DOM을 통한 컴포넌트 스타일링.

## 구현 상세
- **Theme System**: 전역 색상을 CSS 변수로 정의하고, 테마 변경 시 `data-theme` 속성을 토글하여 즉각적인 UI 반영.
- **Data-Driven UI**: 팀, 드라이버, 용어, 뉴스 데이터를 구조화된 객체 배열로 관리하여 유지보수 용이성 확보.
- **Shadow DOM**: `driver-card` 컴포넌트 내부에서 부모의 CSS 변수를 상속받아 테마에 따라 자동으로 색상이 변경되도록 설계.

## 향후 계획
- 실제 F1 API를 연동하여 실시간 경기 결과 및 뉴스 업데이트.
- 전 세계 그랑프리 서킷 정보를 담은 인터랙티브 지도 추가.
- 사용자 인터랙션(좋아요, 즐겨찾기 등) 기능 강화.


document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navButtons = document.querySelectorAll('.nav-button');
    const homeLink = document.getElementById('home-link');

    // --- 데이터 정의 ---

    // Web Component for Driver Card (이미 다른 파일에 있을 수 있으나, 독립 실행을 위해 포함)
    if (!customElements.get('driver-card')) {
        class DriverCard extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            connectedCallback() {
                this.shadowRoot.innerHTML = `
                    <style>
                        :host { display: block; background-color: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); overflow: hidden; transition: all 0.3s ease; }
                        :host(:hover) { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
                        .driver-card-inner { padding: 1.5rem; text-align: center; }
                        .driver-image { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 4px solid var(--primary-color, #e10600); margin-bottom: 1rem; }
                        h3 { margin: 0.5rem 0; font-size: 1.4rem; font-weight: 700; }
                        p { margin: 0.25rem 0; color: #555; }
                        .number { font-weight: bold; font-size: 1.2rem; color: var(--primary-color, #e10600); }
                    </style>
                    <div class="driver-card-inner">
                        <img class="driver-image" src="${this.getAttribute('image')}" alt="${this.getAttribute('name')}">
                        <h3>${this.getAttribute('name')}</h3>
                        <p class="team">${this.getAttribute('team')}</p>
                        <p class="number">#${this.getAttribute('number')}</p>
                    </div>
                `;
            }
        }
        customElements.define('driver-card', DriverCard);
    }

    // 2026 Speculative Data
    const teams2026 = [
        { name: "Mercedes-AMG Petronas F1 Team", logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/mercedes-logo.png.transform/2col/image.png" },
        { name: "Oracle Red Bull Racing", logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/red-bull-racing-logo.png.transform/2col/image.png" },
        { name: "Scuderia Ferrari HP", logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/ferrari-logo.png.transform/2col/image.png" },
        { name: "McLaren Formula 1 Team", logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/mclaren-logo.png.transform/2col/image.png" },
        { name: "Aston Martin Aramco F1 Team", logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/aston-martin-logo.png.transform/2col/image.png" },
        { name: "BWT Alpine F1 Team", logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/alpine-logo.png.transform/2col/image.png" },
        { name: "Williams Racing", logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/williams-logo.png.transform/2col/image.png" },
        { name: "Visa Cash App RB F1 Team", logo: "https://www.formula1.com/content/dam/fom-website/teams/2024/visa-cash-app-rb-logo.png.transform/2col/image.png" },
        { name: "Audi F1 Team", logo: "https://www.audi.com/content/dam/gbp2/company/brand/logos/audi-logo.png" },
        { name: "MoneyGram Haas F1 Team", logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/haas-f1-team-logo.png.transform/2col/image.png" },
    ];
    const drivers2026 = [
        { name: "Max Verstappen", team: "Oracle Red Bull Racing", number: "1", image: "https://www.formula1.com/content/dam/fom-website/drivers/2024/max-verstappen.png.transform/1by1/image.png" },
        { name: "Charles Leclerc", team: "Scuderia Ferrari HP", number: "16", image: "https://www.formula1.com/content/dam/fom-website/drivers/2024/charles-leclerc.png.transform/1by1/image.png" },
        { name: "Lewis Hamilton", team: "Scuderia Ferrari HP", number: "44", image: "https://www.formula1.com/content/dam/fom-website/drivers/2024/lewis-hamilton.png.transform/1by1/image.png" },
        { name: "Lando Norris", team: "McLaren Formula 1 Team", number: "4", image: "https://www.formula1.com/content/dam/fom-website/drivers/2024/lando-norris.png.transform/1by1/image.png" },
        { name: "George Russell", team: "Mercedes-AMG Petronas F1 Team", number: "63", image: "https://www.formula1.com/content/dam/fom-website/drivers/2024/george-russell.png.transform/1by1/image.png" },
        { name: "Nico Hülkenberg", team: "Audi F1 Team", number: "27", image: "https://www.formula1.com/content/dam/fom-website/drivers/2024/nico-hulkenberg.png.transform/1by1/image.png" },
    ];

    // F1 Terminology Data
    const terminology = [
        { term: "DRS (Drag Reduction System)", definition: "운전자가 지정된 구역에서 리어 윙의 플랩을 열어 공기저항을 줄이고 추월을 돕는 시스템입니다." },
        { term: "피트 스톱 (Pit Stop)", definition: "레이스 중 타이어를 교체하거나 차량을 수리하기 위해 피트 레인으로 들어오는 것입니다. 1-2초 만에 완료될 수 있습니다." },
        { term: "폴 포지션 (Pole Position)", definition: "퀄리파잉(예선)에서 가장 빠른 랩 타임을 기록한 드라이버가 레이스를 맨 앞에서 시작하는 위치입니다." },
        { term: "슬립스트림 (Slipstream)", definition: "앞 차의 바로 뒤에서 주행하여 공기 저항을 줄이고 속도를 높이는 기술입니다. '토우(Tow)'라고도 합니다." },
        { term: "언더컷 (Undercut)", definition: "경쟁자보다 먼저 피트 스톱을 하여 새 타이어의 이점으로 더 빠른 랩 타임을 기록하고 순위를 높이는 전략입니다." },
        { term: "오버스티어 (Oversteer)", definition: "차량의 뒷부분이 코너에서 접지력을 잃고 미끄러지는 현상입니다. 드라이버는 카운터-스티어링으로 제어해야 합니다." }
    ];

    // Real F1 News Data
    const news = [
        { title: "안드레티, 2028년 F1 그리드 합류 목표로 FIA와 협상 지속", summary: "마이클 안드레티의 F1 팀 창설 노력은 계속되고 있습니다. F1의 상업권 보유자인 리버티 미디어의 반대에도 불구하고, 안드레티는 FIA와 2028년 시즌부터 그리드에 합류하는 것을 목표로 긍정적인 대화를 나누고 있다고 밝혔습니다.", date: "2024-07-26" },
        { title: "2026년 새로운 규정, 액티브 에어로 도입으로 레이스에 혁신 예고", summary: "FIA는 2026년부터 적용될 새로운 기술 규정의 세부 사항을 발표했습니다. 더 작고 가벼워진 차체와 함께, 직선 주로에서는 공기 저항을 최소화하고 코너에서는 다운포스를 극대화하는 '액티브 에어로다이내믹스'가 도입되어 추월 기회를 늘릴 것으로 기대됩니다.", date: "2024-07-22" },
        { title: "레드불, 포드와 함께 2026년 파워 유닛 개발 순항 중", summary: "레드불 파워트레인(RBPT)은 포드와의 협력을 통해 2026년 새로운 파워 유닛 규정에 대비한 개발이 순조롭게 진행 중이라고 발표했습니다. 크리스티안 호너 팀 감독은 초기 테스트 결과에 만족하며, 페라리와 메르세데스와의 경쟁에서 뒤처지지 않을 것이라고 자신했습니다.", date: "2024-07-20" },
        { title: "알핀 F1 팀, 대규모 조직 개편... 플라비오 브리아토레 고문으로 복귀", summary: "최근 부진을 겪고 있는 알핀 F1 팀이 대대적인 조직 개편을 단행했습니다. 특히, 과거 르노 팀의 전성기를 이끌었던 플라비오 브리아토레가 고문으로 복귀하면서 팀의 방향성에 큰 변화가 있을 것으로 예상됩니다.", date: "2024-07-18" }
    ];

    // --- 콘텐츠 렌더링 함수 ---

    const renderHome = () => {
        mainContent.innerHTML = `
            <section id="intro">
                <h2>포뮬러 1의 세계에 오신 것을 환영합니다!</h2>
                <p>포뮬러 1(F1)은 세계 최고의 오픈휠 단일 좌석 자동차 경주 대회입니다. 국제 자동차 연맹(FIA)이 주관하며, 매년 전 세계의 상징적인 서킷에서 '그랑프리(Grand Prix)' 경주가 열립니다. 이 사이트에서 F1의 최신 정보, 기본 용어, 그리고 흥미로운 소식들을 확인해 보세요.</p>
                <div class="home-image-container">
                    <img src="https://www.formula1.com/content/dam/fom-website/2024/Miscellaneous/Formula1_logo.png.transform/9col/image.png" alt="F1 Logo">
                </div>
            </section>
        `;
    };

    const render2026Info = () => {
        mainContent.innerHTML = `
            <section id="teams">
                <h2>2026 F1 팀 (예상)</h2>
                <div class="teams-grid">${teams2026.map(team => `
                    <div class="team-card">
                        <img src="${team.logo}" alt="${team.name} Logo">
                        <h3>${team.name}</h3>
                    </div>`).join('')}
                </div>
            </section>
            <section id="drivers">
                <h2>주요 드라이버 (2026 예상)</h2>
                <div class="drivers-container"></div>
            </section>
        `;
        const driversContainer = mainContent.querySelector('.drivers-container');
        drivers2026.forEach(driver => {
            const driverCard = document.createElement('driver-card');
            driverCard.setAttribute('name', driver.name);
            driverCard.setAttribute('team', driver.team);
            driverCard.setAttribute('number', driver.number);
            driverCard.setAttribute('image', driver.image);
            driversContainer.appendChild(driverCard);
        });
    };

    const renderTerminology = () => {
        mainContent.innerHTML = `
            <section id="terminology-list">
                <h2>F1 필수 용어</h2>
                <div class="terms-container">${terminology.map(item => `
                    <div class="term-item">
                        <h3>${item.term}</h3>
                        <p>${item.definition}</p>
                    </div>`).join('')}
                </div>
            </section>
        `;
    };

    const renderNews = () => {
        mainContent.innerHTML = `
            <section id="news-list">
                <h2>최신 F1 소식</h2>
                <div class="news-container">${news.map(item => `
                    <article class="news-item">
                        <h3>${item.title}</h3>
                        <p class="news-summary">${item.summary}</p>
                        <p class="news-date">${item.date}</p>
                    </article>`).join('')}
                </div>
            </section>
        `;
    };

    // --- 이벤트 핸들러 ---

    const handleNavClick = (e) => {
        const contentType = e.target.dataset.content;
        if (!contentType) return;

        // 모든 버튼의 활성 상태 제거
        navButtons.forEach(button => button.classList.remove('active'));
        // 클릭된 버튼에 활성 상태 추가
        e.target.classList.add('active');

        switch (contentType) {
            case 'info-2026':
                render2026Info();
                break;
            case 'terminology':
                renderTerminology();
                break;
            case 'news':
                renderNews();
                break;
            default:
                renderHome();
        }
    };

    // --- 초기화 ---

    navButtons.forEach(button => {
        button.addEventListener('click', handleNavClick);
    });

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        navButtons.forEach(button => button.classList.remove('active'));
        renderHome();
    });

    // 초기 페이지 로드
    renderHome();
});


document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navButtons = document.querySelectorAll('.nav-button');
    const homeLink = document.getElementById('home-link');
    const themeToggle = document.getElementById('theme-toggle');
    const modeText = themeToggle.querySelector('.mode-text');

    // --- 테마 설정 ---
    const currentTheme = localStorage.getItem('theme') || 'dark'; // 기본 다크모드 권장
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeUI(currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeUI(theme);
    });

    function updateThemeUI(theme) {
        modeText.textContent = theme === 'dark' ? 'Day Mode' : 'Night Mode';
    }

    // --- 데이터 정의 ---

    const enduranceInfo = {
        overview: {
            title: "The Ultimate Challenge",
            subtitle: "24시간 동안 멈추지 않는 한계의 도전",
            description: "24시간 내구 레이스는 단순히 속도만을 겨루는 경기가 아닙니다. 인간의 체력, 자동차의 신뢰성, 그리고 팀의 전략이 완벽한 조화를 이루어야 하는 모터스포츠의 정점입니다. 낮과 밤, 그리고 변화무쌍한 날씨 속에서 수천 킬로미터를 질주하는 이 경기는 전 세계 자동차 제조사들과 드라이버들이 기술력과 인내심의 한계를 증명하는 가장 위대한 무대입니다."
        },
        rules: [
            { tag: "Structure", title: "멀티 클래스 레이싱", desc: "서로 다른 성능의 차량들이(Hypercar, GT3 등) 동시에 트랙에서 경주합니다. 빠른 차량은 하위 클래스 차량을 안전하게 추월해야 하며, 이는 내구 레이스만의 독특한 긴장감을 선사합니다." },
            { tag: "Drivers", title: "드라이버 교체 시스템", desc: "한 차량당 보통 3명의 드라이버가 교대로 운전합니다. 한 드라이버가 연속해서 운전할 수 있는 최대 시간과 총 주행 시간이 엄격히 규정되어 있어 팀워크가 매우 중요합니다." },
            { tag: "Strategy", title: "피트 스톱 및 정비", desc: "타이어 교체와 연료 보급뿐만 아니라, 필요시 엔진 부품 교체나 차체 수리까지 피트에서 이루어집니다. 24시간 동안 차를 굴리기 위한 미캐닉들의 사투가 핵심입니다." },
            { tag: "Safety", title: "슬로우 존 & FCY", desc: "트랙 사고 발생 시 전체 구간 또는 특정 구간의 속도를 제한하는 'Full Course Yellow'나 'Slow Zone'이 발동됩니다. 이때의 전략이 승패를 가르기도 합니다." }
        ],
        terms: [
            { tag: "Terminology", title: "스틴트 (Stint)", desc: "한 드라이버가 피트 스톱 사이의 기간 동안 주행하는 연속적인 주행 단위를 말합니다." },
            { tag: "Terminology", title: "피트 윈도우 (Pit Window)", desc: "연료 소모량과 타이어 마모도를 고려했을 때 피트 스톱을 해야만 하는 최적의 시간대를 의미합니다." },
            { tag: "Terminology", title: "익스플로전 (Explosion)", desc: "야간 주행 중 브레이크 디스크가 고온으로 인해 밝게 빛나는 현상을 지칭하기도 하며, 내구 레이스의 시각적 정수입니다." },
            { tag: "Terminology", title: "슬립스트림 (Slipstream)", desc: "앞 차의 공기 저항 감소 구역을 활용해 직선 구간에서 속도를 높여 추월하거나 연료를 아끼는 기술입니다." }
        ]
    };

    // --- 콘텐츠 렌더링 함수 ---

    const renderHome = () => {
        mainContent.innerHTML = `
            <div class="hero animate-fade">
                <h2>${enduranceInfo.overview.title}</h2>
                <p>${enduranceInfo.overview.description}</p>
                <button class="hero-cta" data-content="rules">Explore Rules</button>
            </div>
            <section class="features animate-fade">
                <div class="section-header">
                    <h2>Key Content</h2>
                </div>
                <div class="info-grid">
                    <div class="info-card">
                        <span class="tag">01</span>
                        <h3>Race Rules</h3>
                        <p>멀티 클래스 시스템부터 드라이버 교체 규정까지, 내구 레이스의 핵심 규칙을 확인하세요.</p>
                    </div>
                    <div class="info-card">
                        <span class="tag">02</span>
                        <h3>Essential Terms</h3>
                        <p>스틴트, 슬로우 존 등 경기를 더 깊이 있게 이해하기 위한 필수 용어 정리.</p>
                    </div>
                    <div class="info-card">
                        <span class="tag">03</span>
                        <h3>Legendary Tracks</h3>
                        <p>르망, 데이토나, 스파-프랑코샹 등 전설적인 24시간 서킷 정보.</p>
                    </div>
                </div>
            </section>
        `;
        // Hero CTA 이벤트 연결
        mainContent.querySelector('.hero-cta').addEventListener('click', () => {
            document.querySelector('[data-content="rules"]').click();
        });
    };

    const renderRules = () => {
        mainContent.innerHTML = `
            <section class="animate-fade">
                <div class="section-header">
                    <h2>Race Rules</h2>
                </div>
                <div class="info-grid">
                    ${enduranceInfo.rules.map(rule => `
                        <div class="info-card">
                            <span class="tag">${rule.tag}</span>
                            <h3>${rule.title}</h3>
                            <p>${rule.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    };

    const renderTerminology = () => {
        mainContent.innerHTML = `
            <section class="animate-fade">
                <div class="section-header">
                    <h2>Terminology</h2>
                </div>
                <div class="info-grid">
                    ${enduranceInfo.terms.map(term => `
                        <div class="info-card">
                            <span class="tag">${term.tag}</span>
                            <h3>${term.title}</h3>
                            <p>${term.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    };

    // --- 이벤트 핸들러 ---

    const handleNavClick = (e) => {
        const contentType = e.target.dataset.content;
        if (!contentType) return;

        navButtons.forEach(button => button.classList.remove('active'));
        e.target.classList.add('active');

        switch (contentType) {
            case 'rules':
                renderRules();
                break;
            case 'terminology':
                renderTerminology();
                break;
            default:
                renderHome();
        }
        window.scrollTo(0, 0);
    };

    navButtons.forEach(button => {
        button.addEventListener('click', handleNavClick);
    });

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        navButtons.forEach(button => button.classList.remove('active'));
        renderHome();
    });

    // 초기 로드
    renderHome();
});

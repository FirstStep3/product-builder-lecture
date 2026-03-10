
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navButtons = document.querySelectorAll('.nav-button');
    const homeLink = document.getElementById('home-link');
    const themeToggle = document.getElementById('theme-toggle');
    const modeText = themeToggle.querySelector('.mode-text');
    const disqusContainer = document.getElementById('disqus_container');

    // --- 테마 설정 ---
    const currentTheme = localStorage.getItem('theme') || 'dark';
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

    // --- Disqus 관련 함수 ---
    const resetDisqus = (id, title) => {
        if (id === 'partnership' || id === 'privacy' || id === 'about') {
            disqusContainer.style.display = 'none';
            return;
        } else {
            disqusContainer.style.display = 'block';
        }
        const pageUrl = window.location.origin + '/' + id;
        if (typeof DISQUS !== 'undefined') {
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = id;
                    this.page.url = pageUrl;
                    this.page.title = title;
                }
            });
        } else {
            window.disqus_config = function () {
                this.page.url = pageUrl;
                this.page.identifier = id;
                this.page.title = title;
            };
            (function() {
                var d = document, s = d.createElement('script');
                s.src = 'https://first-step-5.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            })();
        }
    };

    // --- 데이터 정의 (초고밀도 사실 기반 콘텐츠) ---
    const enduranceInfo = {
        overview: {
            title: "24H Endurance Hub: The Engineering of Persistence",
            subtitle: "인간과 기계의 한계에 도전하는 1,440분의 대서사시",
            description: "24시간 내구 레이스는 전 세계 모터스포츠 중 가장 가혹한 환경에서 진행되는 경기입니다. 본 허브는 FIA(국제자동차연맹)와 ACO(서부자동차클럽)의 공식 규정을 기반으로, 차량의 에어로다이내믹스, 파워트레인의 신뢰성, 그리고 팀 전략의 정수를 다룹니다. 우리는 하이퍼카의 에너지 회수 시스템(ERS) 운용부터 드라이버의 생체 리듬 관리까지 모든 요소를 심도 있게 분석합니다."
        },
        rules: [
            { tag: "Class Tech", title: "하이퍼카 규정 (LMH vs LMDh)", desc: "현대 내구 레이스의 정점인 하이퍼카 클래스는 두 규정으로 나뉩니다. LMH(Le Mans Hypercar)는 섀시와 하이브리드 시스템 전체를 독자 설계하며(예: 페라리 499P, 토요타 GR010), LMDh(Le Mans Daytona h)는 지정된 섀시 공급업체의 부품과 공통 하이브리드 시스템을 사용하여 비용 효율성을 꾀합니다(예: 포르쉐 963, BMW M Hybrid V8). 두 규정은 최고 출력 500kW(680hp)로 제한되며 BoP를 통해 성능 균형이 유지됩니다." },
            { tag: "BoP System", title: "성능 균형 (Balance of Performance)", desc: "BoP는 서로 다른 파워트레인 구조를 가진 차량들이 공정하게 경쟁할 수 있도록 하는 핵심 시스템입니다. 매 경기 전후 수집된 텔레메트리 데이터를 분석하여 차량의 최소 중량(kg), 최대 연료 유량(MJ/h), 그리고 스틴트당 가용 에너지(Virtual Energy Tank)를 조정합니다. 이는 특정 제조사의 독주를 막고 24시간 내내 접전을 유도하는 장치입니다." },
            { tag: "Driver Regs", title: "드라이버 주행 및 안전 규정", desc: "안전을 위해 드라이버는 24시간 중 최대 14시간을 초과하여 주행할 수 없으며, 연속 주행은 4시간으로 제한됩니다. 또한 드라이버 등급(Platinum, Gold, Silver, Bronze)에 따른 의무 주행 시간이 존재합니다. 야간 주행 시에는 시각적 피로를 방지하기 위해 대시보드 조명과 헬멧 내 통신 시스템의 무결성이 엄격히 관리됩니다." },
            { tag: "Energy Management", title: "에너지 관리 및 리프트 앤 코스트", desc: "현대 레이스에서는 스틴트당 사용 가능한 총 에너지양(MJ)이 BoP에 의해 결정됩니다. 드라이버는 코너 진입 전 가속 페달에서 발을 일찍 떼는 '리프트 앤 코스트' 기술을 통해 연료를 절약하고 하이브리드 배터리를 충전합니다. 이 효율성 관리가 피트 스톱 횟수를 줄여 결과적으로 수십 초의 이득을 가져옵니다." },
            { tag: "Safety Systems", title: "Full Course Yellow & Slow Zone", desc: "사고 발생 시 경기 흐름을 유지하기 위해 도입된 시스템입니다. FCY 상황에서는 트랙 전체의 전 차량이 80km/h로 서행하며, 슬로우 존은 특정 구간만 속도를 제한합니다. 세이프티 카 투입은 대열을 정비하게 만들어 전략적 도박을 유도하며, 이는 내구 레이스만의 독특한 변수가 됩니다." }
        ],
        terms: [
            { tag: "Basic", title: "스틴트 (Stint)", desc: "한 드라이버가 피트 스톱 사이에서 주행하는 단위를 의미합니다. 연료 탱크 용량과 타이어 마모 곡선에 의해 길이가 결정됩니다." },
            { tag: "Advanced", title: "더블 스틴트 (Double Stinting)", desc: "피트 인 시 타이어를 교체하지 않고 연료만 보급하여 다시 주행에 나서는 전략입니다. 약 30초의 시간을 절약할 수 있으나, 마모된 타이어로 인한 랩타임 손실을 감수해야 합니다." },
            { tag: "Tech", title: "MGU-K (Motor Generator Unit-Kinetic)", desc: "제동 시 발생하는 운동 에너지를 전기에너지로 변환하여 배터리에 저장하고, 가속 시 추가 출력을 제공하는 장치입니다. 하이퍼카 규정에서는 이 부스트의 작동 시점이 BoP에 의해 조절됩니다." },
            { tag: "Driving", title: "트래픽 관리 (Traffic Management)", desc: "성능 차이가 큰 상위 클래스 차량이 하위 클래스 차량을 추월할 때 시간 손실을 최소화하는 기술입니다. 이는 드라이버의 실력을 가늠하는 가장 중요한 척도 중 하나입니다." },
            { tag: "Physics", title: "슬립스트림 (Slipstream)", desc: "앞차 바로 뒤의 낮은 기압 구역을 활용해 공기 저항을 줄여 가속하는 기술입니다. 르망의 긴 직선 구간에서 추월과 연료 절약을 위해 필수적으로 사용됩니다." }
        ],
        races: [
            { title: "Le Mans 24 Hours", location: "프랑스, 사르트 서킷 (13.626km)", desc: "1923년 창설된 세계에서 가장 오래된 내구 레이스입니다. 일반 도로와 전용 서킷이 혼합되어 있으며, 6km의 뮬산 스트레이트에서의 최고 속도는 시속 340km를 상회합니다. 모터스포츠의 성지로 불리며 자동차 기술 발전의 산실입니다." },
            { title: "Daytona 24 Hours", location: "미국, 데이토나 인터내셔널 스피드웨이", desc: "매년 1월 플로리다에서 열리는 IMSA 개막전입니다. 가파른 31도 뱅크각의 오벌 트랙을 달리는 고속 경기로, 타이어의 측면 하중 관리가 매우 중요합니다. 1월의 긴 야간 시간은 드라이버에게 극심한 피로를 요구합니다." },
            { title: "Nürburgring 24 Hours", location: "독일, 뉘르부르크링 노르트슐라이페", desc: "25km가 넘는 코스와 170개 이상의 코너를 가진 '녹색 지옥'에서 펼쳐집니다. 150대 이상의 차량이 동시에 달리는 장관을 연출하며, 변화무쌍한 에펠 산맥의 기상 조건이 경기를 지배합니다." },
            { title: "Spa 24 Hours", location: "벨기에, 스파-프랑코샹 서킷", desc: "GT3 클래스 단일 차종 위주의 세계 최대 규모 레이스입니다. '오 루주' 코너에서의 중력 가속도와 벨기에 특유의 폭우 상황에서의 판단력이 승패를 가르는 핵심 요소입니다." }
        ],
        history: [
            { year: "1923", event: "최초의 르망 24시", content: "자동차 제조사들이 자사 차량의 신뢰성을 입증하기 위해 프랑스 르망에서 첫 경기를 개최했습니다. 당시 우승 차량은 24시간 동안 약 2,209km를 주행하며 자동차 역사의 새로운 장을 열었습니다." },
            { year: "1966", event: "포드 vs 페라리의 대결", content: "헨리 포드 2세가 페라리의 독주를 막기 위해 개발한 포드 GT40이 르망 1-2-3위를 석권하며 미국 자동차 산업의 위상을 전 세계에 알린 역사적인 사건입니다." },
            { year: "1991", event: "마쓰다 로터리 엔진의 승리", content: "마쓰다 787B 모델이 로터리 엔진 특유의 성능과 신뢰성을 앞세워 일본 제조사 최초로 르망 우승을 달성했습니다. 로터리 엔진의 유일한 우승 기록으로 남았습니다." },
            { year: "2023", event: "르망 100주년 페라리의 귀환", content: "50년 만에 최상위 클래스에 복귀한 페라리가 499P 하이퍼카로 우승을 차지하며 내구 레이스의 제2의 황금기를 화려하게 선언했습니다." }
        ]
    };

    // --- 렌더링 함수 ---
    const renderHome = () => {
        mainContent.innerHTML = `
            <article class="hero animate-fade">
                <div class="hero-inner">
                    <h2>${enduranceInfo.overview.title}</h2>
                    <p>${enduranceInfo.overview.description}</p>
                    <div class="hero-btns">
                        <button class="hero-cta" data-content="rules">Explore Technical Rules</button>
                        <button class="hero-cta secondary" data-content="races">Major Events</button>
                    </div>
                </div>
            </article>
            <section class="features animate-fade">
                <div class="section-header">
                    <h2>Engineering & Strategy Pillars</h2>
                    <p>현대 내구 레이스를 분석하는 세 가지 핵심 전문 시각</p>
                </div>
                <div class="info-grid">
                    <div class="info-card">
                        <span class="tag">01</span>
                        <h3>Technical Reliability</h3>
                        <p>24시간 동안 시속 300km 이상으로 발생하는 엔진의 열 부하와 구동계의 물리적 피로도를 극복하는 엔지니어링의 정수를 분석합니다.</p>
                    </div>
                    <div class="info-card">
                        <span class="tag">02</span>
                        <h3>Strategic Efficiency</h3>
                        <p>실시간 데이터 분석을 통한 가용 에너지 MJ(메가줄) 관리와 타이어 마모에 따른 피트 스톱 타이밍 결정의 수학적 모델을 탐구합니다.</p>
                    </div>
                    <div class="info-card">
                        <span class="tag">03</span>
                        <h3>Human Resilience</h3>
                        <p>극심한 G-포스와 수면 부족 상황에서 드라이버의 생체 리듬을 최적화하고 집중력을 유지하는 인간 한계의 영역을 다룹니다.</p>
                    </div>
                </div>
            </section>
        `;
        attachCtaEvents();
        resetDisqus('home', 'Endurance Hub - Home');
    };

    const renderRules = () => {
        mainContent.innerHTML = `
            <section class="animate-fade">
                <div class="section-header">
                    <h2>Technical & Sporting Regulations</h2>
                    <p style="margin-top: 1rem; color: var(--text-secondary-color);">FIA WEC 및 IMSA 공식 규정집에 근거한 상세 레이스 규정 분석입니다.</p>
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
        resetDisqus('rules', 'Endurance Hub - Technical Rules');
    };

    const renderTerminology = () => {
        mainContent.innerHTML = `
            <section class="animate-fade">
                <div class="section-header">
                    <h2>Expert Glossary</h2>
                    <p style="margin-top: 1rem; color: var(--text-secondary-color);">내구 레이스 전문가들이 사용하는 기술 및 전략 전문 용어 사전입니다.</p>
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
        resetDisqus('terms', 'Endurance Hub - Glossary');
    };

    const renderRaces = () => {
        mainContent.innerHTML = `
            <section class="animate-fade">
                <div class="section-header">
                    <h2>Major Global Events</h2>
                    <p style="margin-top: 1rem; color: var(--text-secondary-color);">전 세계 모터스포츠의 역사를 써 내려가는 4대 주요 내구 레이스 정보입니다.</p>
                </div>
                <div class="info-grid">
                    ${enduranceInfo.races.map(race => `
                        <div class="info-card race-card">
                            <h3>${race.title}</h3>
                            <p class="race-location">📍 ${race.location}</p>
                            <p>${race.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
        resetDisqus('races', 'Endurance Hub - Events');
    };

    const renderHistory = () => {
        mainContent.innerHTML = `
            <section class="animate-fade" style="max-width: 900px; margin: 0 auto;">
                <div class="section-header">
                    <h2>Historical Milestones</h2>
                    <p style="margin-top: 1rem; color: var(--text-secondary-color);">100년이 넘는 시간 동안 자동차 기술의 한계를 넓혀온 결정적 순간들</p>
                </div>
                <div class="timeline">
                    ${enduranceInfo.history.map(item => `
                        <div class="timeline-item">
                            <div class="timeline-year">${item.year}</div>
                            <div class="timeline-content">
                                <h3>${item.event}</h3>
                                <p>${item.content}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
        resetDisqus('history', 'Endurance Hub - History');
    };

    const renderAbout = () => {
        mainContent.innerHTML = `
            <section class="animate-fade" style="max-width: 800px; margin: 0 auto;">
                <div class="section-header">
                    <h2>About Our Mission</h2>
                </div>
                <div class="content-text" style="line-height: 2.0; color: var(--text-color);">
                    <p><strong>24H Endurance Hub</strong>는 모터스포츠의 정점이라 불리는 24시간 내구 레이스에 담긴 기술적 혁신과 데이터 중심의 전략을 분석하고 공유하는 전문 정보 플랫폼입니다. 우리는 1,440분이라는 극한의 시간 동안 자동차가 어떻게 그 신뢰성을 유지하며, 팀이 어떤 전략으로 승리에 도달하는지를 연구합니다.</p>
                    <p style="margin-top: 1.5rem;">우리의 모든 정보는 FIA, ACO, IMSA 등 글로벌 기구의 공식 데이터를 기반으로 하며, 실제 기술 규정집과 전문가 리포트를 사실에 근거해 재구성합니다. 하이퍼카의 하이브리드 부스트부터 타이어 컴파운드의 물리적 한계까지, 내구 레이스의 깊은 속살을 팬들에게 가장 정확하게 전달하는 것이 우리의 사명입니다.</p>
                </div>
            </section>
        `;
        resetDisqus('about', 'Endurance Hub - Mission');
    };

    const renderPrivacy = () => {
        mainContent.innerHTML = `
            <section class="animate-fade" style="max-width: 800px; margin: 0 auto;">
                <div class="section-header">
                    <h2>Privacy Policy & Legal Terms</h2>
                </div>
                <div class="content-text" style="font-size: 1rem; line-height: 1.8; color: var(--text-secondary-color);">
                    <h3 style="color: var(--primary-color);">1. 데이터 수집 공지</h3>
                    <p>본 사이트는 구글 애드센스(Google AdSense) 광고 서비스를 통해 광고를 게재하며, 구글은 사용자의 방문 기록을 바탕으로 맞춤 광고를 제공하기 위해 쿠키를 사용합니다. 이용자는 구글 광고 설정 페이지에서 이를 관리할 수 있습니다.</p>
                    <h3 style="margin-top: 1.5rem; color: var(--primary-color);">2. 정보의 성격</h3>
                    <p>본 사이트의 모든 콘텐츠는 정보 제공을 목적으로 하며, 실제 경기 규정은 주최 측의 공식 발표가 최종적인 효력을 가집니다. 우리는 사실 관계 확인을 위해 최선을 다하지만, 데이터의 시차나 기술적 오류에 대해서는 책임지지 않습니다.</p>
                </div>
            </section>
        `;
        resetDisqus('privacy', 'Endurance Hub - Privacy');
    };

    const renderPartnership = () => {
        mainContent.innerHTML = `
            <section class="animate-fade">
                <div class="section-header">
                    <h2>Partnership Inquiry</h2>
                    <p style="margin-top: 1rem; color: var(--text-secondary-color);">내구 레이스 콘텐츠 협업 및 기술적 제휴를 환영합니다.</p>
                </div>
                <div class="form-container">
                    <form action="https://formspree.io/f/mbdzreep" method="POST" class="contact-form">
                        <div class="form-group"><label>성함/기업명</label><input type="text" name="name" required></div>
                        <div class="form-group"><label>이메일</label><input type="email" name="_replyto" required></div>
                        <div class="form-group"><label>내용</label><textarea name="message" required></textarea></div>
                        <button type="submit" class="submit-button">Send Inquiry</button>
                    </form>
                </div>
            </section>
        `;
        resetDisqus('partnership', 'Endurance Hub - Partnership');
    };

    const attachCtaEvents = () => {
        mainContent.querySelectorAll('.hero-cta').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target.dataset.content;
                const navBtn = document.querySelector(`[data-content="${target}"]`);
                if(navBtn) navBtn.click();
            });
        });
    };

    const handleNavClick = (e) => {
        const contentType = e.target.dataset.content;
        if (!contentType) return;
        navButtons.forEach(button => button.classList.remove('active'));
        e.target.classList.add('active');
        switch (contentType) {
            case 'rules': renderRules(); break;
            case 'terminology': renderTerminology(); break;
            case 'races': renderRaces(); break;
            case 'history': renderHistory(); break;
            case 'partnership': renderPartnership(); break;
            case 'about': renderAbout(); break;
            case 'privacy': renderPrivacy(); break;
            default: renderHome();
        }
        window.scrollTo(0, 0);
    };

    navButtons.forEach(button => button.addEventListener('click', handleNavClick));
    homeLink.addEventListener('click', (e) => { e.preventDefault(); renderHome(); });

    renderHome();
});

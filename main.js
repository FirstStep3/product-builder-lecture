
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
        // 특정 페이지에서는 댓글창을 숨깁니다.
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

    // --- 데이터 정의 (보강됨) ---

    const enduranceInfo = {
        overview: {
            title: "The Ultimate Challenge: 24H Endurance",
            subtitle: "인간과 기계의 한계에 도전하는 24시간의 대서사시",
            description: "24시간 내구 레이스는 모터스포츠 중 가장 가혹하고 드라마틱한 경기입니다. 1,440분 동안 쉬지 않고 달리는 이 경주에서 팀은 속도, 내구성, 그리고 치밀한 전략의 완벽한 조화를 증명해야 합니다. 르망 24시, 데이토나 24시, 뉘르부르크링 24시 등 전설적인 서킷에서 펼쳐지는 승부는 자동차 기술의 발전과 인간 정신의 위대함을 상징합니다."
        },
        rules: [
            { tag: "Structure", title: "멀티 클래스 레이싱 (Multi-Class)", desc: "Hypercar(최상위), GT3, LMP2 등 성능이 다른 클래스가 동시에 트랙에서 경쟁합니다. 빠른 차가 느린 차를 추월하는 과정에서의 트래픽 관리가 승부의 핵심입니다." },
            { tag: "Drivers", title: "드라이버 교체 및 주행 시간", desc: "차량당 3명의 드라이버가 팀을 이룹니다. 한 드라이버가 연속으로 운전할 수 있는 최대 시간(보통 4시간 이내)과 총 주행 시간이 규정되어 있어 철저한 체력 안배가 필요합니다." },
            { tag: "Strategy", title: "피트 스톱과 야간 주행", desc: "타이어 교체, 연료 보급, 드라이버 교체가 30~40초 내에 이루어집니다. 특히 가시거리가 짧고 기온이 변하는 밤 시간대의 주행은 전체 레이스의 운명을 결정짓는 '크리티컬 타임'입니다." },
            { tag: "Technical", title: "차량 내구성과 밸런스 오브 퍼포먼스 (BoP)", desc: "24시간 동안 엔진과 변속기에 가해지는 부하는 상상을 초월합니다. 또한 클래스 간 균형을 맞추기 위한 BoP 규정이 적용되어 기술력뿐만 아니라 규정 적응력도 중요합니다." }
        ],
        terms: [
            { tag: "Term", title: "스틴트 (Stint)", desc: "한 드라이버가 피트에서 출발하여 다음 피트 인을 할 때까지의 한 번의 주행 단위를 의미합니다. 타이어 한 세트로 몇 스틴트를 버틸 수 있는지가 전략의 핵심입니다." },
            { tag: "Safety", title: "슬로우 존 (Slow Zone)", desc: "특정 구간에 사고가 발생했을 때 해당 구역만 시속 80km로 제한하는 규정입니다. 전체 구간을 통제하는 것보다 경기 흐름을 유지하는 데 유리합니다." },
            { tag: "Term", title: "트리플 스틴트 (Triple Stint)", desc: "타이어나 드라이버를 교체하지 않고 세 번의 피트 윈도우를 연속으로 소화하는 것을 말하며, 상위권 진출을 위한 고난도 전략입니다." },
            { tag: "Flag", title: "풀 코스 옐로우 (FCY)", desc: "트랙 전 구간에서 동시에 서행해야 하는 상황입니다. 이때 적절한 타이밍에 피트 인을 하느냐가 수십 초의 격차를 만듭니다." }
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
                    <h2>Key Insights</h2>
                </div>
                <div class="info-grid">
                    <div class="info-card">
                        <span class="tag">01</span>
                        <h3>Endurance Mastery</h3>
                        <p>단순한 속도 이상으로 차와 드라이버의 한계를 관리하는 법을 배웁니다.</p>
                    </div>
                    <div class="info-card">
                        <span class="tag">02</span>
                        <h3>Strategic Depth</h3>
                        <p>연료 소모량, 타이어 마모, 기상 변화를 예측하는 정밀한 전략의 세계.</p>
                    </div>
                    <div class="info-card">
                        <span class="tag">03</span>
                        <h3>Engineering Excellence</h3>
                        <p>24시간 동안 극한의 회전수를 견뎌내는 최첨단 하이퍼카 기술력.</p>
                    </div>
                </div>
            </section>
        `;
        mainContent.querySelector('.hero-cta').addEventListener('click', () => {
            document.querySelector('[data-content="rules"]').click();
        });
        resetDisqus('home', 'Endurance Hub - Home');
    };

    const renderRules = () => {
        mainContent.innerHTML = `
            <section class="animate-fade">
                <div class="section-header">
                    <h2>Race Rules</h2>
                    <p style="margin-top: 1rem; color: var(--text-secondary-color);">24시간 레이스의 공정함과 안전을 유지하는 핵심 규정들입니다.</p>
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
        resetDisqus('rules', 'Endurance Hub - Rules');
    };

    const renderTerminology = () => {
        mainContent.innerHTML = `
            <section class="animate-fade">
                <div class="section-header">
                    <h2>Terminology</h2>
                    <p style="margin-top: 1rem; color: var(--text-secondary-color);">내구 레이스 중계를 더 깊이 즐기기 위한 필수 전문 용어들입니다.</p>
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
        resetDisqus('terms', 'Endurance Hub - Terms');
    };

    const renderAbout = () => {
        mainContent.innerHTML = `
            <section class="animate-fade" style="max-width: 800px; margin: 0 auto;">
                <div class="section-header">
                    <h2>About Us</h2>
                </div>
                <div class="content-text" style="line-height: 1.8; color: var(--text-color);">
                    <p><strong>24H Endurance Hub</strong>는 모터스포츠의 가장 가혹한 영역인 내구 레이스의 가치를 알리고, 팬들에게 정확한 정보를 제공하기 위해 설립되었습니다.</p>
                    <p style="margin-top: 1rem;">우리는 24시간 동안 멈추지 않는 도전 속에서 피어나는 기술적 혁신과 드라이버들의 인내심에 매료되었습니다. 복잡한 규칙과 낯선 용어들을 쉽게 설명하여 누구나 내구 레이스의 매력을 느낄 수 있도록 돕는 것이 우리의 미션입니다.</p>
                    <p style="margin-top: 1rem;">우리의 콘텐츠는 공식 규정과 역사적 데이터를 기반으로 제작되며, 모터스포츠 커뮤니티의 건강한 발전을 지향합니다.</p>
                </div>
            </section>
        `;
        resetDisqus('about', 'Endurance Hub - About Us');
    };

    const renderPrivacy = () => {
        mainContent.innerHTML = `
            <section class="animate-fade" style="max-width: 800px; margin: 0 auto;">
                <div class="section-header">
                    <h2>Privacy Policy</h2>
                </div>
                <div class="content-text" style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary-color);">
                    <h3>1. 개인정보 처리 방침 안내</h3>
                    <p>24H Endurance Hub(이하 '당 사이트')는 이용자의 개인정보를 소중히 여기며, 개인정보 보호법을 준수합니다.</p>
                    <h3 style="margin-top: 1.5rem;">2. 수집하는 개인정보 항목</h3>
                    <p>당 사이트는 별도의 회원가입 없이 이용 가능하지만, 'Partnership Inquiry' 폼 이용 시 성함, 이메일 주소를 수집할 수 있습니다. 수집된 정보는 문의 답변 외의 목적으로 사용되지 않습니다.</p>
                    <h3 style="margin-top: 1.5rem;">3. 쿠키 및 광고 관련</h3>
                    <p>당 사이트는 서비스 개선 및 광고 게재를 위해 Google AdSense 및 Disqus를 활용하며, 이 과정에서 쿠키가 사용될 수 있습니다. 이용자는 브라우저 설정에서 쿠키 사용을 거부할 수 있습니다.</p>
                    <h3 style="margin-top: 1.5rem;">4. 정보의 보존</h3>
                    <p>수집된 문의 내역은 목적 달성 후 1년 이내에 파기됩니다.</p>
                </div>
            </section>
        `;
        resetDisqus('privacy', 'Endurance Hub - Privacy Policy');
    };

    const renderPartnership = () => {
        mainContent.innerHTML = `
            <section class="animate-fade">
                <div class="section-header">
                    <h2>Partnership Inquiry</h2>
                    <p style="margin-top: 1rem; color: var(--text-secondary-color);">24H Endurance Hub와 함께할 파트너를 기다립니다.</p>
                </div>
                <div class="form-container">
                    <form action="https://formspree.io/f/mbdzreep" method="POST" class="contact-form">
                        <div class="form-group">
                            <label for="name">성함 또는 기업명</label>
                            <input type="text" id="name" name="name" placeholder="홍길동 / (주)엔듀런스" required>
                        </div>
                        <div class="form-group">
                            <label for="email">이메일 주소</label>
                            <input type="email" id="email" name="_replyto" placeholder="example@domain.com" required>
                        </div>
                        <div class="form-group">
                            <label for="subject">문의 유형</label>
                            <select id="subject" name="subject" required>
                                <option value="" disabled selected>유형을 선택해주세요</option>
                                <option value="partnership">제휴 제안</option>
                                <option value="advertising">광고 문의</option>
                                <option value="content">콘텐츠 협업</option>
                                <option value="other">기타</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="message">문의 내용</label>
                            <textarea id="message" name="message" placeholder="자세한 내용을 입력해주세요." required></textarea>
                        </div>
                        <button type="submit" class="submit-button">문의 보내기</button>
                    </form>
                </div>
            </section>
        `;
        resetDisqus('partnership', 'Endurance Hub - Partnership');
    };

    // --- 이벤트 핸들러 ---

    const handleNavClick = (e) => {
        const contentType = e.target.dataset.content;
        if (!contentType) return;

        navButtons.forEach(button => button.classList.remove('active'));
        e.target.classList.add('active');

        switch (contentType) {
            case 'rules': renderRules(); break;
            case 'terminology': renderTerminology(); break;
            case 'partnership': renderPartnership(); break;
            case 'about': renderAbout(); break;
            case 'privacy': renderPrivacy(); break;
            default: renderHome();
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

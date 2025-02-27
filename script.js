document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenu = document.querySelector('.close-menu');
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    const bottomCloseButton = document.querySelector('.bottom-close-button');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const backToTop = document.getElementById('back-to-top');

    // 現在のページのナビゲーションリンクをアクティブにする
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') || 
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ハンバーガーメニューのクリックイベント
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // スクロール禁止
        });
    }

    // ナビゲーションメニューを閉じる
    function closeNavMenu() {
        if (navMenu) {
            navMenu.classList.remove('active');
            document.body.style.overflow = ''; // スクロール許可
        }
    }

    // 閉じるボタンのクリックイベント
    if (closeMenu) {
        closeMenu.addEventListener('click', closeNavMenu);
    }

    // 右下のCLOSEボタンのクリックイベント
    if (bottomCloseButton) {
        bottomCloseButton.addEventListener('click', closeNavMenu);
    }

    // メニュー外をクリックしたときにメニューを閉じる
    document.addEventListener('click', function(event) {
        if (navMenu && !navMenu.contains(event.target) && hamburgerMenu && !hamburgerMenu.contains(event.target)) {
            closeNavMenu();
        }
    });

    // トップに戻るボタンの処理
    if (backToTop) {
        // スクロール位置に応じてボタンの表示/非表示を切り替える
        window.addEventListener('scroll', function() {
            // スクロール位置が300px以上の場合に表示
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // クリック時の処理
        backToTop.addEventListener('click', function() {
            // トップへスムーズにスクロール
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // タッチデバイス対応
        backToTop.addEventListener('touchend', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        // backToTopが存在しない場合（他のページ）にボタンを作成して追加
        const newBackToTop = document.createElement('div');
        newBackToTop.id = 'back-to-top';
        newBackToTop.className = 'back-to-top';
        newBackToTop.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
        `;
        document.body.appendChild(newBackToTop);
        
        // スクロール位置に応じてボタンの表示/非表示を切り替える
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                newBackToTop.classList.add('visible');
            } else {
                newBackToTop.classList.remove('visible');
            }
        });
        
        // クリック時の処理
        newBackToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // タッチデバイス対応
        newBackToTop.addEventListener('touchend', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // スクロールインジケーターのクリックイベント追加（ホームページのみ）
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            // ホームセクションへスムーズにスクロール
            const homeSections = document.querySelector('.home-sections');
            if (homeSections) {
                homeSections.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // タッチデバイスのためのタッチイベント追加
        scrollIndicator.addEventListener('touchend', function(e) {
            e.preventDefault(); // デフォルトの動作を防止
            // ホームセクションへスムーズにスクロール
            const homeSections = document.querySelector('.home-sections');
            if (homeSections) {
                homeSections.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 画像の遅延読み込み
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('loading');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        lazyImages.forEach(img => {
            if (img) {
                imageObserver.observe(img);
            }
        });
    } else if (lazyImages.length > 0) {
        // Fallback for browsers without IntersectionObserver support
        lazyImages.forEach(img => {
            if (img && img.dataset && img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('loading');
            }
        });
    }

    // FAQアコーディオン機能 - 修正版
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // この質問のアクティブ状態をトグル
                this.classList.toggle('active');
                
                // 対応する回答要素を取得
                const answer = this.nextElementSibling;
                if (answer && answer.classList.contains('faq-answer')) {
                    answer.classList.toggle('active');
                }
                
                // 他の質問を閉じる（アコーディオン動作）
                faqQuestions.forEach(q => {
                    if (q !== this) {
                        q.classList.remove('active');
                        const qAnswer = q.nextElementSibling;
                        if (qAnswer && qAnswer.classList.contains('faq-answer')) {
                            qAnswer.classList.remove('active');
                        }
                    }
                });
            });
        });
    }

    // コンサートページのフィルター機能
    const filterButtons = document.querySelectorAll('.filter-button');
    const concertItems = document.querySelectorAll('.concert-item');
    
    // PCとモバイルでのスタイルを適用する関数
    function applyResponsiveStyles() {
        const isMobile = window.innerWidth <= 768;
        
        concertItems.forEach(item => {
            // いったんすべてのインラインスタイルをリセット
            item.style.display = '';
            
            if (isMobile) {
                // モバイル表示のデフォルトスタイル
                // 何も追加しないことでCSSのスタイルが適用される
            } else {
                // PC表示ではフレックスレイアウトを適用
                item.style.display = 'flex';
            }
        });
    }
    
    // 初期表示時にスタイルを適用
    applyResponsiveStyles();
    
    // ウィンドウサイズ変更時にもスタイルを再適用
    window.addEventListener('resize', applyResponsiveStyles);
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // アクティブクラスを付け替え
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const now = new Date();
                
                // フィルタリング処理
                concertItems.forEach(item => {
                    const dateString = item.querySelector('.concert-date').textContent;
                    const concertDate = new Date(dateString);
                    
                    // いったん表示をリセット（CSSの初期表示に戻す）
                    item.style.display = '';
                    
                    // フィルタリング条件に基づいて表示/非表示を決定
                    if (filter === 'all') {
                        // すべて表示：何もしない（CSSのデフォルト表示）
                    } else if (filter === 'upcoming' && concertDate >= now) {
                        // 今後の公演
                    } else if (filter === 'past' && concertDate < now) {
                        // 過去の公演
                    } else {
                        // フィルタリング条件に合わない場合は非表示に
                        item.style.display = 'none';
                    }
                });
                
                // フィルタリング後にレスポンシブスタイルを再適用
                applyResponsiveStyles();
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const backToTop = document.getElementById('back-to-top');

    // メニュー外のオーバーレイ要素を作成
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // 現在のページのナビゲーションリンクをアクティブにする
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') || 
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ハンバーガーメニュークリック時の挙動
    hamburgerMenu.addEventListener('click', function() {
        navMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // スクロール禁止
    });
    
    // 閉じるボタンのクリックイベント（既存コードの修正）
    document.body.addEventListener('click', function(event) {
        // 閉じるボタンのクリックイベント
        if (event.target.closest('.close-menu') || event.target.closest('.bottom-close-button')) {
            closeNavMenu();
            event.preventDefault();
        }
        
        // メニュー外クリックで閉じる
        if (event.target === overlay) {
            closeNavMenu();
        }
    });

    // ナビゲーションメニューを閉じる関数
    function closeNavMenu() {
        if (navMenu) {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // スクロール許可
        }
    }

    // トップに戻るボタンの処理
    if (backToTop) {
        // スクロール位置に応じてボタンの表示/非表示を切り替える
        window.addEventListener('scroll', function() {
            // 200pxスクロールしたら表示（以前より早く表示）
            if (window.scrollY > 200) {
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
        // backToTopが存在しない場合にボタンを作成
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
            if (window.scrollY > 200) {
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
            e.preventDefault();
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

    // FAQアコーディオン機能
    const faqItems = document.querySelectorAll('details.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            item.addEventListener('toggle', function() {
                if (this.open) {
                    // 他のFAQを閉じる（アコーディオン動作）
                    faqItems.forEach(otherItem => {
                        if (otherItem !== this && otherItem.open) {
                            otherItem.open = false;
                        }
                    });
                }
            });
        });
    }

    // コンサートページのフィルターボタン
    const filterButtons = document.querySelectorAll('.filter-button');
    if (filterButtons.length > 0) {
        // コンサートアイテムを取得
        const concertItems = document.querySelectorAll('.concert-item');
        
        // フィルターボタンのクリックイベント
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // アクティブクラスをトグル
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const now = new Date();
                
                // コンサートアイテムをフィルタリング
                concertItems.forEach(item => {
                    item.style.removeProperty('display');
                    
                    if (filter !== 'all') {
                        const dateString = item.querySelector('.concert-date').textContent;
                        const concertDate = new Date(dateString);
                        
                        if ((filter === 'upcoming' && concertDate < now) || 
                            (filter === 'past' && concertDate >= now)) {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // パララックス効果（ヒーローセクション）
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            // スクロール時に背景位置を少しずつ変更
            hero.style.backgroundPositionY = `calc(60% + ${scrollPosition * 0.2}px)`;
        });
    }
});
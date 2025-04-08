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
        if (navMenu.classList.contains('active')) {
            closeNavMenu();
        } else {
            navMenu.classList.add('active');
            overlay.classList.add('active');
            hamburgerMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // ナビゲーションメニューを閉じる関数
    function closeNavMenu() {
        if (navMenu) {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            hamburgerMenu.classList.remove('active'); // 三本線に戻すために必要
            document.body.style.overflow = ''; // スクロール許可
        }
    }
        
    // 閉じるボタンのクリックイベント
    document.body.addEventListener('click', function(event) {
        // 閉じるボタンとして機能するハンバーガーメニューのクリックはすでに別で処理
        // bottom-close-button だけ残す
        if (event.target.closest('.bottom-close-button')) {
            closeNavMenu();
            event.preventDefault();
        }
        
        // メニュー外クリックで閉じる
        if (event.target === overlay) {
            closeNavMenu();
        }
    });

    // トップに戻るボタンの処理 - 修正版
    if (backToTop) {
        // スクロール位置に応じてボタンの表示/非表示を切り替える関数
        function checkScrollPosition() {
            if (window.pageYOffset > 200) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        // スクロールイベントリスナー
        window.addEventListener('scroll', checkScrollPosition);
        
        // クリック時の処理
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
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
        
        // ページ読み込み時に初回チェック
        checkScrollPosition();
        
        // 少し遅らせて再チェック（DOMContentLoadedだけでは不十分な場合のため）
        setTimeout(checkScrollPosition, 1000);
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
        function checkScrollPosition() {
            if (window.pageYOffset > 200) {
                newBackToTop.classList.add('visible');
            } else {
                newBackToTop.classList.remove('visible');
            }
        }
        
        window.addEventListener('scroll', checkScrollPosition);
        
        // クリック時の処理
        newBackToTop.addEventListener('click', function(e) {
            e.preventDefault();
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
        
        // ページ読み込み時に初回チェック
        checkScrollPosition();
        // 少し遅らせて再チェック
        setTimeout(checkScrollPosition, 1000);
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
        
        // ページ読み込み時に「今後の公演」をデフォルトで選択/表示する
        const upcomingButton = document.querySelector('.filter-button[data-filter="upcoming"]');
        if (upcomingButton) {
            // すべてのボタンからactiveクラスを削除
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 「今後の公演」ボタンにactiveクラスを追加
            upcomingButton.classList.add('active');
            
            // 今後の公演のフィルタリングを実行
            const now = new Date();
            concertItems.forEach(item => {
                const dateString = item.querySelector('.concert-date').textContent;
                const concertDate = new Date(dateString);
                
                if (concertDate < now) {
                    item.style.display = 'none';
                } else {
                    item.style.removeProperty('display');
                }
            });
        }

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
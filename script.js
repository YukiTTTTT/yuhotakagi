document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenu = document.querySelector('.close-menu');
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    const bottomCloseButton = document.querySelector('.bottom-close-button');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const backToTop = document.getElementById('back-to-top');

    // 現在のページをハイライト
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') || 
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ハンバーガーメニューの処理
    hamburgerMenu.addEventListener('click', function() {
        navMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });

    // 右下のCLOSEボタンにイベントリスナーを追加
    bottomCloseButton.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });

    // メニュー外をクリックしたときにもメニューを閉じる
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    // スクロールインジケーターのクリックイベント追加
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

    // トップに戻るボタンの処理 - すべてのページで有効に
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
});
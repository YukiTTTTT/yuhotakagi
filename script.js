document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenu = document.querySelector('.close-menu');
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    const bottomCloseButton = document.querySelector('.bottom-close-button');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const backToTop = document.getElementById('back-to-top');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') || 
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

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

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') || 
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
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
    }

    // Google フォームの遅延読み込み処理
    function loadGoogleForm() {
        // すでに読み込み済みなら何もしない
        if (document.getElementById('contactForm')) return;
        
        const formContainer = document.querySelector('.google-form');
        if (!formContainer) return;
        
        // 実際のGoogle Forms URL (これを実際のURLに変更してください)
        const formUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true';
        
        // iframeを遅延して読み込む
        setTimeout(() => {
            const iframe = document.createElement('iframe');
            iframe.id = 'contactForm';
            iframe.src = formUrl;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.marginHeight = '0';
            iframe.marginWidth = '0';
            
            // iframeが読み込まれたら読み込み中表示を消す
            iframe.onload = () => {
                const loadingDiv = document.getElementById('formLoading');
                if (loadingDiv && loadingDiv.parentNode) {
                    loadingDiv.parentNode.removeChild(loadingDiv);
                }
            };
            
            formContainer.appendChild(iframe);
        }, 300); // 300ms遅延させる
    }

    // DOMContentLoadedイベントを既存のコードに追加
    document.addEventListener('DOMContentLoaded', function() {
        // 既存のコード...
        
        // Google フォームの読み込み
        loadGoogleForm();
    });
});
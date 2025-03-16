// スクロールベースのアニメーション機能
document.addEventListener('DOMContentLoaded', function() {
    // スクロール時のアニメーション用クラスを持つ要素を選択
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    // フェードイン用セクションを追加
    const sections = document.querySelectorAll('section, .concert-item, .home-section, .lesson-section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });
    
    // IntersectionObserverのサポートチェック
    if ('IntersectionObserver' in window) {
        // フェードインセクション用オブザーバー
        const fadeInObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // 一度表示されたら監視を解除
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.15 // 15%以上表示されたら発火
        });
        
        // スクロールリビール用オブザーバー
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // 一度表示されたら監視を解除
                }
            });
        }, {
            rootMargin: '-30px',
            threshold: 0.1 // 10%以上表示されたら発火
        });
        
        // 対象要素を監視開始
        document.querySelectorAll('.fade-in-section').forEach(section => {
            fadeInObserver.observe(section);
        });
        
        scrollRevealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // IntersectionObserverがサポートされていない場合のフォールバック
        document.querySelectorAll('.fade-in-section').forEach(section => {
            section.classList.add('is-visible');
        });
        
        scrollRevealElements.forEach(el => {
            el.classList.add('revealed');
        });
    }
    
    // パララックス効果
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollTop * speed}px)`;
        });
    });
    
    // スクロールトリガーアニメーション
    function animateOnScroll() {
        const animElements = document.querySelectorAll('.anim-on-scroll');
        
        animElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                const animClass = element.getAttribute('data-anim') || 'fade-in';
                element.classList.add(animClass);
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初期表示時にも実行
    
    // ページ遷移アニメーション準備
    const pageLinks = document.querySelectorAll('a[href]');
    
    pageLinks.forEach(link => {
        // 同一サイト内のリンクのみ対象
        if (link.hostname === window.location.hostname && !link.hasAttribute('target') && 
            !link.getAttribute('href').startsWith('#') && !link.classList.contains('no-transition')) {
            
            link.addEventListener('click', function(e) {
                const transitionTarget = this.getAttribute('href');
                
                // すでに同じページにいる場合は通常の挙動
                if (transitionTarget === window.location.pathname) return;
                
                e.preventDefault();
                
                // 遷移アニメーション要素がなければ作成
                let transitionElement = document.querySelector('.page-transition');
                if (!transitionElement) {
                    transitionElement = document.createElement('div');
                    transitionElement.className = 'page-transition';
                    document.body.appendChild(transitionElement);
                }
                
                // アニメーション開始
                transitionElement.classList.add('active');
                
                // アニメーション完了後に実際のページ遷移
                setTimeout(() => {
                    window.location.href = transitionTarget;
                }, 600);
            });
        }
    });
    
    // 前のページからの遷移アニメーション
    window.addEventListener('pageshow', function(event) {
        // ページがキャッシュから読み込まれた場合でも確実に処理
        if (event.persisted) {
            const transitionElement = document.querySelector('.page-transition');
            if (transitionElement) {
                transitionElement.classList.remove('active');
            }
        }
    });
    
    // ページ読み込み完了時にトランジション要素を非表示
    window.addEventListener('load', function() {
        const transitionElement = document.querySelector('.page-transition');
        if (transitionElement) {
            transitionElement.classList.remove('active');
            
            // 不要になったらDOM削除
            setTimeout(() => {
                if (transitionElement && transitionElement.parentNode) {
                    transitionElement.parentNode.removeChild(transitionElement);
                }
            }, 600);
        }
    });
});
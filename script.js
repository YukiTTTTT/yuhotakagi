document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    
    function updateFooterVisibility() {
        const scrollPosition = window.innerHeight + window.pageYOffset;
        const bodyHeight = document.body.offsetHeight;
        const distanceFromBottom = bodyHeight - scrollPosition;
        
        if (distanceFromBottom <= 200) {
            const opacity = 1 - (distanceFromBottom / 200);
            footer.style.opacity = opacity;
        } else {
            footer.style.opacity = 0;
        }
    }

    window.addEventListener('scroll', updateFooterVisibility);
    window.addEventListener('resize', updateFooterVisibility);
    
    // 初期表示時にも実行
    updateFooterVisibility();
});

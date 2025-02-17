document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenu = document.querySelector('.close-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });

    // メニュー外をクリックしたときにもメニューを閉じる
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
});

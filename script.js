window.addEventListener('scroll', () => {
    const footer = document.querySelector('footer');
    const scrollPosition = window.innerHeight + window.scrollY;
    const bodyHeight = document.body.offsetHeight;
    const distanceFromBottom = bodyHeight - scrollPosition;
    
    if (distanceFromBottom <= 200) {
      const opacity = 1 - (distanceFromBottom / 200);
      footer.style.opacity = opacity;
    } else {
      footer.style.opacity = 0;
    }
  });
  
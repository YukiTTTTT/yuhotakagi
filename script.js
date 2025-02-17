window.addEventListener('scroll', () => {
  const footer = document.querySelector('footer');
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    footer.style.display = 'block';
  } else {
    footer.style.display = 'none';
  }
});
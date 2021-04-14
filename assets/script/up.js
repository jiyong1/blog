(() => {
  const upBtn = document.querySelector('.up-arrow');

  const upOpacity = () => {
    if (pageYOffset != 0) {
      upBtn.style.opacity = 1;
    }
    else{
      upBtn.style.opacity = 0;
    }
    // console.log(pageYOffset);
  };

  window.addEventListener('scroll', upOpacity);
  upBtn.addEventListener('click', () => {
    window.scrollTo(0, 0);
  })
  upOpacity();
})();
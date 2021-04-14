(function(){
  const topNavElem = document.querySelector('.top-nav');
  const navNameElem = document.querySelector('.b-name');
  const navlistElem = document.querySelector('.nav-list');
  const toggleBtnElem = document.querySelector('.toggle-btn');
  const logoConElem = document.querySelector('.logo-con');
  const modeBtnElem = document.querySelector('#mode-btn');
  let toggle = false;

  function navOpen(){
    navNameElem.style.display = 'block';
    topNavElem.style.height = '6rem';
    if (window.innerWidth < 576) {
      toggleBtnElem.style.display = 'flex';
      navlistElem.style.display = 'none';
      modeBtnElem.style.display = 'block';
    }
    else{
      toggleBtnElem.style.display = 'none';
      navlistElem.style.display = 'flex';
    }
  }

  function logoAuto(){
    logoConElem.style.height = '100%';
  }
  function listDrop(){
    topNavElem.style.height = '15rem';
    setTimeout(function(){
      navlistElem.style.display = 'flex';
    }, 200);
  }

  function navClose(){
    navNameElem.style.display = 'none';
    navlistElem.style.display = 'none';
    toggleBtnElem.style.display = 'none';
    topNavElem.style.height = '4rem';
    if (window.innerWidth < 576) {
      modeBtnElem.style.display = 'none';
    }
  }

  function resizeHandler(){
    navOpen();
  }

  function toggleBtnClick(){
    // 토글 스위치 off
    if (toggle){
      setTimeout(logoAuto, 200);
      topNavElem.style.height = '6rem';
      navlistElem.style.display = 'none';
      toggle = false;
    }
    // 토글 스위치 on
    else{
      logoConElem.style.height = '6rem';
      setTimeout(listDrop, 200);
      toggle = true;
    }
  }

  window.addEventListener('scroll', function(){
    if(pageYOffset <= 0){
      navOpen();
    }
    else{
      if (toggle){
        toggle = false;
        setTimeout(logoAuto, 100);
        navClose();
      }
      else{
        navClose();
      }
    }
  });

  window.addEventListener('resize', resizeHandler);
  topNavElem.addEventListener('mouseenter', navOpen);
  logoConElem.addEventListener('click', navOpen);
  topNavElem.addEventListener('mouseleave', function(){
    if (pageYOffset != 0){
      navClose();
    }
  });

  toggleBtnElem.addEventListener('click', toggleBtnClick);
  resizeHandler();
})();
(function(){
  const modeBtnElem = document.querySelector('#mode-btn');
  const circleElem = document.querySelector('.btn-circle');
  let scheme = localStorage.getItem("scheme");

  function setScheme(){
    scheme = localStorage.getItem("scheme");
    document.body.dataset.mode = scheme;
    modeBtnElem.dataset.mode = scheme;
    circleElem.dataset.mode = scheme;
  }

  modeBtnElem.addEventListener('click', function(){
    if (scheme === "dark"){
      localStorage.setItem("scheme", "light");
    }
    else{
      localStorage.setItem("scheme", "dark");
    }

    setScheme();
  });

  setScheme();
})();
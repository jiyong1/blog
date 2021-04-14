(function(){
  let scheme = localStorage.getItem("scheme");

  function setScheme(){
    scheme = localStorage.getItem("scheme");
    document.body.dataset.mode = scheme;
  }

  function init(){
    if (scheme === null){
      localStorage.setItem("scheme", "dark")
    }
    setScheme();
  }

  init();

})();
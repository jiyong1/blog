(() => {
  const carouselTrackElem = document.querySelector('.carousel-track');
  const carouselLeftButton = document.querySelector('.carousel-button.l');
  const carouselRightButton = document.querySelector('.carousel-button.r');
  const carouselDescription = [  
    document.querySelector('.carousel-description.a'),
    document.querySelector('.carousel-description.b'),
    document.querySelector('.carousel-description.c'),
  ]
  const carouselCircles = [  
    document.querySelector('.carousel-circle.a'),
    document.querySelector('.carousel-circle.b'),
    document.querySelector('.carousel-circle.c')
  ]

  let slideNum = 2;
  let carouselWidth;
  let currentSlide = 0;
  let carouselInterval;

  function init() {
    carouselWidth = document.querySelector('.carousel-track').clientWidth / (slideNum + 1)
    for (let i = 0; i<carouselDescription.length; i++){
      carouselDescription[i].style.width = `${carouselWidth}px`;
      carouselDescription[i].style.left = `${carouselWidth*i}px`;
    }
  }

  const nextSlide = () => {
    currentSlide ++;
    slide();
  };

  function slide() {
    if (currentSlide > slideNum){
      carouselTrackElem.style.transform = `translateX(0)`;
      currentSlide = 0;
    }
    else if (currentSlide < 0){
      carouselTrackElem.style.transform = `translateX(-${slideNum*carouselWidth}px)`
      currentSlide = slideNum;
    }
    else{
      carouselTrackElem.style.transform = `translateX(-${carouselWidth*currentSlide}px)`;
    }
    circleCheck();
  }

  function circleCheck(){
    let prevCircle = document.querySelector('.carousel-circle.circle-check');
    if (prevCircle != null){
      prevCircle.classList.remove('circle-check');
    }
    carouselCircles[currentSlide].classList.add('circle-check');
  }

  function makeAllTransparent() {
    for(let i = 0; i < carouselDescription.length; i++){
      carouselDescription[i].style.opacity = "0";
    }
  }
  function makeTransparent(){
    carouselDescription[currentSlide].style.opacity = "0";
  }
  function showDescription(){
    carouselDescription[currentSlide].style.opacity = "1";
  }
 
  window.addEventListener('resize', init);
  
  carouselInterval = setInterval(nextSlide, 3000);

  carouselLeftButton.addEventListener('click', () => {
    clearInterval(carouselInterval);
    currentSlide --;
    slide();
    carouselInterval = setInterval(nextSlide, 3000);
  });

  carouselRightButton.addEventListener('click', () => {
    clearInterval(carouselInterval);
    currentSlide ++;
    slide();
    carouselInterval = setInterval(nextSlide, 3000);
  });

  carouselTrackElem.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
    showDescription();
  });

  carouselTrackElem.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 3000);
    makeTransparent();
  });

  for(let i=0; i<=slideNum; i++){
    carouselCircles[i].addEventListener('click', () => {
      clearInterval(carouselInterval)
      currentSlide = i;
      slide();
      carouselInterval = setInterval(nextSlide, 3000);
    })
  }
  setTimeout(init, 500);
  makeAllTransparent();
})();
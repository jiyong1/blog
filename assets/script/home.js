(() => {
  const carouselTrackElem = document.querySelector('.carousel-track');
  const carouselLeftButton = document.querySelector('.carousel-button.l');
  const carouselRightButton = document.querySelector('.carousel-button.r');
  const carouselDescription = document.querySelectorAll('.carousel-description');
  const carouselCircles = [  
    document.querySelector('.carousel-circle.a'),
    document.querySelector('.carousel-circle.b'),
    document.querySelector('.carousel-circle.c')
  ]
  const newArticles = document.querySelectorAll('.pinterest-con');

  let slideNum = 2;
  let currentSlide = 0;
  let carouselInterval;

  const init = () => {
    let gridNum;
    if (window.innerWidth < 768){
      gridNum = 1;
    }
    else if (window.innerWidth < 992){
      gridNum = 2;
    }
    else if (window.innerWidth < 1400){
      gridNum = 3;
    }
    else {
      gridNum = 4;
    }
    let articleStack = Array.from({length: gridNum}, () => 0);
    let colWidth = newArticles[0].clientWidth;
    
    for (let i = 0; i < newArticles.length; i++){
      let minIndex = articleStack.indexOf(Math.min.apply(0, articleStack));
      let x = colWidth * minIndex;
      let y = articleStack[minIndex];
      let currentHeight = newArticles[i].clientHeight;

      newArticles[i].style.left = `${x}px`;
      newArticles[i].style.top = `${y}px`;
      articleStack[minIndex] += currentHeight;
    }
  };

  const nextSlide = () => {
    currentSlide ++;
    slide();
  };

  function slide() {
    if (currentSlide > slideNum){
      carouselTrackElem.style.marginLeft = `0`;
      currentSlide = 0;
    }
    else if (currentSlide < 0){
      carouselTrackElem.style.marginLeft = `-${slideNum*100}%`;
      currentSlide = slideNum;
    }
    else{
      carouselTrackElem.style.marginLeft = `-${currentSlide*100}%`;
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

  function makeTransparent(){
    carouselDescription[currentSlide].style.opacity = "0";
  }
  function showDescription(){
    carouselDescription[currentSlide].style.opacity = "1";
  }
 
  window.addEventListener('load', () => {
    carouselInterval = setInterval(nextSlide, 3000);
    init();
  });
  
  window.addEventListener('resize', init);

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
})();
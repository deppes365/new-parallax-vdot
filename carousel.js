'use strict'

const carouselBtnPrev = document.querySelector('.control-btn.prev-btn')
const carouselBtnNext = document.querySelector('.control-btn.next-btn')
const carousel = document.querySelector('.carousel')
const carouselCards = document.querySelectorAll('.carousel-card')
const counter = document.querySelector('.carousel-counter .counter')

let currentCard = 0

let screenCenter = window.innerWidth / 2





window.addEventListener('resize', () => {
  screenCenter = window.innerWidth / 2

  if (window.innerWidth <= 889) {
    const width = carousel.getBoundingClientRect().width / carouselCards.length
    carousel.style.left = `${screenCenter - (width * (currentCard + 1)) / 2}px`

    //  window.location.reload()
  }
  if (window.innerWidth >= 889) {
    carousel.style.left = '0'
  }

  translateCarousel()

 
})

updateCounter()

if (window.innerWidth <= 889) {
  const width = carousel.getBoundingClientRect().width / carouselCards.length
  carousel.style.left = `${screenCenter - (width * (currentCard + 1)) / 2}px`
}

carouselBtnPrev.addEventListener('click', () => {
  carouselCards[currentCard].classList.remove('currentCard')

  currentCard -= 1

  if (currentCard < 0) {
    currentCard = carouselCards.length - 1
    carouselCards.forEach((card) => card.classList.add('scale-card'))
  }

  carouselCards[currentCard].classList.remove('scale-card')
  carouselCards[currentCard].classList.add('currentCard')

  translateCarousel()

  updateCounter()

})

carouselBtnNext.addEventListener('click', () => {
  carouselCards[currentCard].classList.remove('currentCard')
  currentCard += 1

  if (currentCard > carouselCards.length - 1) {
    currentCard = 0

    for (let i = carouselCards.length; i > 0; i--) {
      carouselCards[i - 1].classList.remove('scale-card')
      carouselCards[i - 1].classList.remove('currentCard')
    }

    carousel.style.transform = 'translateX(0)'

    setTimeout(() => {
      carouselCards[currentCard].classList.add('currentCard')
    }, 300)

    updateCounter()
    return
  }

  carouselCards[currentCard].classList.add('currentCard')

  carouselCards[currentCard - 1].classList.add('scale-card')

  translateCarousel()

  updateCounter()
})

function updateCounter() {
  const current = (currentCard + 1).toString().padStart(2, '0')
  const totalCards = carouselCards.length.toString().padStart(2, '0')

  return (counter.innerHTML = `${current} of ${totalCards}`)
}

function scaleCard(direction) {
  const current = currentCard

  if (direction === 'next') {
    carouselCards[current].classList.add('scale-card')
  }

  if (direction === 'prev') {
    carouselCards[current].classList.remove('scale-card')
  }
}

const cardWidth = carouselCards[0].getBoundingClientRect().width

function translateCarousel() {
  if (window.innerWidth >= 889) {
    const translatePercent =
      (carousel.getBoundingClientRect().width /
        carouselCards.length /
        carousel.getBoundingClientRect().width) *
      100

    carousel.style.transform = `translateX(-${translatePercent * currentCard}%)`

    return
  }

  if (window.innerWidth < 889) {

    carousel.style.transform = `translateX(0)`

    
    console.log(`card width: ${cardWidth}`);

    const widthOfCards =
      carouselCards[carouselCards.length - 1].getBoundingClientRect().right -
      carouselCards[0].getBoundingClientRect().left

      console.log(`width of Cards: ${widthOfCards}`);

    const remainingSpace = widthOfCards - cardWidth * carouselCards.length

    const divider = carouselCards.length - 1

    const cardGap = remainingSpace / divider

    const cardNumbersArray = Array.prototype.slice
      .call(carouselCards)
      .map((card, i) => i + 1)

    const middleIndex = cardNumbersArray.reduce(
      (acc, cur) => acc + cur / carouselCards.length,
      0
    )

    const translateMultipliers = cardNumbersArray.map(
      (num, i) => middleIndex - num
    )

    carousel.style.left = `${
      cardWidth * translateMultipliers[currentCard] +
      cardGap * translateMultipliers[currentCard]
    }px`

   
  }
}

carousel.style.left = '0'
carousel.style.transform = 'translateX(0)'

//////// NEW FUNCTION ////////

// function translateCarousel() {
//     // Get width
//     const cardWidth = carouselCards[0].getBoundingClientRect().width;

// 	const widthOfCards =
// 		carouselCards[carouselCards.length - 1].getBoundingClientRect().right -
// 		carouselCards[0].getBoundingClientRect().left;

// 	const remainingSpace = widthOfCards - cardWidth * carouselCards.length;

// 	const divider = carouselCards.length - 1;

// 	const cardGap = remainingSpace / divider;

// 	const cardNumbersArray = Array.prototype.slice
// 		.call(carouselCards)
// 		.map((card, i) => i + 1);

// 	const middleIndex = cardNumbersArray.reduce(
// 		(acc, cur) => acc + cur / carouselCards.length,
// 		0
// 	);

// 	const translateMultipliers = cardNumbersArray.map(
// 		(num, i) => middleIndex - num
// 	);

// 	carousel.style.left = `${
// 		cardWidth * translateMultipliers[currentCard] +
// 		cardGap * translateMultipliers[currentCard]
// 	}px`;
// }

// translateCarousel();

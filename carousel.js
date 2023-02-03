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

  if (window.innerWidth <= 768) {
    const width = carousel.getBoundingClientRect().width / carouselCards.length
    carousel.style.left = `${
      screenCenter - (width * (currentCard + 1))
       / 2}px`

      //  window.location.reload()
  }
  if(window.innerWidth >= 768) {
    carousel.style.left = '0'
  }

  translateCarousel()

  console.log(document.querySelector('.carousel-wrapper-container').clientWidth);
})

updateCounter()

if (window.innerWidth <= 768) {
  const width = carousel.getBoundingClientRect().width / carouselCards.length
  carousel.style.left = `${
    screenCenter - (width * (currentCard + 1))
     / 2}px`
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

  console.log(carousel.getBoundingClientRect().width);
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

function translateCarousel() {
  const translatePercent =
    (carousel.getBoundingClientRect().width / carouselCards.length / carousel.getBoundingClientRect().width) * 100

  carousel.style.transform = `translateX(-${translatePercent * currentCard}%)`
}


const carouselWrapperContainer = document.querySelector('.carousel-wrapper-container')

console.log(carouselWrapperContainer.clientWidth / 2);
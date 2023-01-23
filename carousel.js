'use strict'

let screenCenter = window.innerWidth / 2

window.addEventListener('resize', () => {
  screenCenter = window.innerWidth / 2
  
})

const carouselBtnPrev = document.querySelector('.control-btn.prev-btn')
const carouselBtnNext = document.querySelector('.control-btn.next-btn')
const carousel = document.querySelector('.carousel')
const carouselCards = document.querySelectorAll('.carousel-card')
const counter = document.querySelector('.carousel-counter .counter')


let currentCard = 0

updateCounter()

carouselBtnPrev.addEventListener('click', () => {
  
  currentCard -= 1
  if (currentCard < 0) {
    currentCard = carouselCards.length - 1
    carouselCards.forEach(card => card.classList.add('scale-card'))
  }
  carouselCards[currentCard].classList.remove('scale-card')

  const translatePercent = (carousel.clientWidth / carouselCards.length) / carousel.clientWidth * 100;

  carousel.style.transform = `translateX(-${translatePercent * currentCard}%)`
 

  updateCounter()
})

carouselBtnNext.addEventListener('click', () => {
  
  currentCard += 1

  if (currentCard > carouselCards.length - 1) {
    currentCard = 0
    
    for(let i = carouselCards.length; i > 0; i--) {
        carouselCards[i - 1].classList.remove('scale-card')
    }
   

    carousel.style.transform = 'translateX(0)'
    updateCounter()
    return
  }
  const translatePercent = (carousel.clientWidth / carouselCards.length) / carousel.clientWidth * 100;
  carouselCards[currentCard - 1].classList.add('scale-card')
  carousel.style.transform = `translateX(-${translatePercent * currentCard}%)`

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

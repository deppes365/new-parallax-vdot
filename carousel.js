const carousel = document.querySelector('.carousel')
const carouselCards = document.querySelectorAll('.carousel-card')
const nextBtn = document.querySelector('.next-btn')
const prevBtn = document.querySelector('.prev-btn')
const counter = document.querySelector('.counter')

let currentCard = 0

carouselCards[currentCard].classList.add('scaleCard')

carouselCards.forEach((card, i) => {
  card.setAttribute('data-index', i)
})

carouselCards.forEach((card) => {
  card.addEventListener('click', (e) => {

    const prevCurrentCard = currentCard
    currentCard = Number(card.dataset.index)

    if(prevCurrentCard === currentCard) return

    carouselCards[prevCurrentCard].classList.add('hideCard')
    carouselCards[currentCard].classList.add('scaleCard')

    
    translateCarousel()
  })
})

// carouselCards

let cardWidth = carouselCards[0].getBoundingClientRect().width

let widthOfCards =
  carouselCards[carouselCards.length - 1].getBoundingClientRect().right -
  carouselCards[0].getBoundingClientRect().left

let remainingSpace = widthOfCards - cardWidth * carouselCards.length

const divider = carouselCards.length - 1

const cardGap = remainingSpace / divider

const cardNumbersArray = Array.prototype.slice
  .call(carouselCards)
  .map((card, i) => i + 1)

const middleIndex = cardNumbersArray.reduce(
  (acc, cur) => acc + cur / carouselCards.length,
  0
)
const translateMultipliers = cardNumbersArray.map((num, i) => middleIndex - num)

function updateCounter() {
  const current = (currentCard + 1).toString().padStart(2, '0')
  const totalCards = carouselCards.length.toString().padStart(2, '0')

  return (counter.innerHTML = `${current} of ${totalCards}`)
}

function translateCarousel() {
  carousel.style.left = `${
    cardWidth * translateMultipliers[currentCard] +
    cardGap * translateMultipliers[currentCard]
  }px`

  updateCounter()
}

translateCarousel()

nextBtn.addEventListener('click', (e) => {
  e.preventDefault()

  currentCard += 1

  if (currentCard >= carouselCards.length) {
    carouselCards.forEach((card) => {
      card.classList.remove('hideCard')
      card.classList.remove('scaleCard')
    })

    currentCard = 0

    translateCarousel()

    carouselCards[currentCard].classList.add('scaleCard')

    return
  }

  translateCarousel()

  if (carouselCards[currentCard - 1] === undefined) return

  carouselCards[currentCard - 1].classList.add('hideCard')
  carouselCards[currentCard - 1].classList.remove('scaleCard')
  carouselCards[currentCard].classList.add('scaleCard')
})

prevBtn.addEventListener('click', (e) => {
  e.preventDefault()

  carouselCards[currentCard].classList.remove('scaleCard')

  currentCard -= 1
  if (currentCard < 0) {
    currentCard = carouselCards.length - 1

    carouselCards.forEach((card) => {
      card.classList.add('hideCard')
    })

    carouselCards[currentCard].classList.remove('hideCard')
    carouselCards[currentCard].classList.add('scaleCard')
  }

  carouselCards[currentCard].classList.remove('hideCard')
  carouselCards[currentCard].classList.add('scaleCard')

  translateCarousel()
})

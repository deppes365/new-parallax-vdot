'use strict';

///// Variables ////

const banner = document.querySelector('.banner');
const navBar = document.querySelector('.nav-bar');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-links');
const aside = document.querySelector('aside');
const heroContent = document.querySelector('.home-hero-content');
const searchBtn = document.querySelector('.search-btn')
const searchBar = document.querySelector('.search-container')
const searchCloseBtn = document.querySelector('.search-container .close-btn')

let bannerHeight = banner.clientHeight;
let asideHeight = aside.clientHeight;
let heroContentHeight = heroContent.clientHeight;


///// Event Listeners /////

window.addEventListener('resize', () => {
	bannerHeight = banner.clientHeight;
	heroContentHeight = heroContent.clientHeight;
	asideHeight = aside.clientHeight;

	// If user resizes window from small size to large while menu open, this needs to reset the html scroll style to auto
	if (hamburger.classList.contains('active')) {
		handleMobileMenu();
	}
});

searchBtn.addEventListener('click', (e) => {
	e.preventDefault()
	searchBar.classList.toggle('show')
})

searchCloseBtn.addEventListener('click', () => {
	searchBar.classList.remove('show')
})

// Function to make hero content fade out on scroll up
window.addEventListener('scroll', () => {
	const heroContentCenter =
		heroContent.getBoundingClientRect().top +
		(heroContent.getBoundingClientRect().bottom -
			heroContent.getBoundingClientRect().top) /
			2;

	const opacityPercent = Math.floor((window.scrollY / heroContentCenter) * 100);

	if (window.scrollY <= heroContentCenter) {
		// Change hero content's opacity on scroll
		heroContent.style.opacity = `${100 - opacityPercent}%`;

		// Change nav bar to transparent
		navBar.classList.contains('solid') && navBar.classList.remove('solid');
	} else {
		// Change nav bar to solid color
		!navBar.classList.contains('solid') && navBar.classList.add('solid');
	}
});

// Handles mobile menu opening/closing
hamburger.addEventListener('click', handleMobileMenu);

menu.addEventListener('click', handleMobileMenu);

///// Intersection Observers /////
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
let navLinkClicked = false;

navLinks.forEach(navLink => {
	navLink.addEventListener('click', () => {
		navLinkClicked = true;

		navLinks.forEach(navLink => {
			navLink.classList.remove('active-link');
		});

		navLink.classList.add('active-link');
	});
});

const options = {
	threshold: 0.5,
};

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		const intersecting = entry.isIntersecting;

		if (intersecting) {
			if (!navLinkClicked) {
				navLinks.forEach(navLink => {
					navLink.classList.remove('active-link');
					if (navLink.dataset.link === entry.target.id) {
						navLink.classList.add('active-link');
					}
				});
			}
			navLinkClicked = false;
		}
	});
}, options);

sections.forEach(section => observer.observe(section));

///// Functions /////
function handleMobileMenu() {
	hamburger.classList.toggle('active');
	menu.classList.toggle('inactive');

	if(window.innerWidth <= 768) {
		if (hamburger.classList.contains('active')) {
			document.querySelector('html').style.overflow = 'hidden';
		} else {
			document.querySelector('html').style.overflow = 'auto';
		}
	}
	
}

'use strict';

///// Variables ////

const banner = document.querySelector('.banner');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-links');
const aside = document.querySelector('aside');
const heroContent = document.querySelector('.home-hero-content');

let bannerHeight = banner.clientHeight;
let asideHeight = aside.clientHeight;
let heroContentHeight = heroContent.clientHeight;

///// Event Listeners /////

window.addEventListener('resize', () => {
	bannerHeight = banner.clientHeight;
	heroContentHeight = heroContent.clientHeight;
	asideHeight = aside.clientHeight;
});

// Function to make hero content fade out on scroll up
window.addEventListener('scroll', () => {
	const heroContentCenter =
		heroContent.getBoundingClientRect().top +
		(heroContent.getBoundingClientRect().bottom -
			heroContent.getBoundingClientRect().top) /
			2;

	const opacityPercent = Math.floor((window.scrollY / heroContentCenter) * 100);

	if (window.scrollY <= heroContentCenter) {
		heroContent.style.opacity = `${100 - opacityPercent}%`;
		console.log('changing');
	}
});

// Handles mobile menu opening/closing
hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	menu.classList.toggle('inactive');

	if(hamburger.classList.contains('active')) {
		document.querySelector('html').style.overflow = 'hidden';
	} else {
		document.querySelector('html').style.overflow = 'auto';
	}
});

menu.addEventListener('click', () => {
	if (hamburger.classList.contains('active')) {
		menu.classList.add('inactive');
		hamburger.classList.remove('active');
	}
});

///// Intersection Observers /////

const observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach(entry => {});
	},
	{
		threshold: 0.1,
	}
);

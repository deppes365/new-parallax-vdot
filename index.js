'use strict';

///// Constants ////
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-links');

///// Event Listeners /////

// Handles mobile menu opening/closing
hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	menu.classList.toggle('inactive');
});

menu.addEventListener('click', () => {
    if(hamburger.classList.contains('active')) {
        menu.classList.add('inactive')
        hamburger.classList.remove('active')
    }
});


///// Intersection Observers /////

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        
    })
}, {
    threshold: 0.1
})

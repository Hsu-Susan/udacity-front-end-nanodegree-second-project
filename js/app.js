/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar__menu');
let scrolling = false;
let cursor;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Get the top and bottom Y coordinates of a given page section, returns an object
function findRange(section) {
    const range = {
        top: section.offsetTop - 100,
        end: section.offsetTop + section.offsetHeight - 100
    };
    return range;
}

// Check if current position is within the range of a section, returns boolean
function inRange(curr, section) {
    const range = findRange(section);
    if(curr >= range.top && curr <= range.end) {
        return true;
    }
    return false;
}

// Check if current element has the active class, returns boolean
function isActive(section) {
    if(section.classList.length > 0) {
        return true;
    }
    return false;
}

// Check which nav link is highlighted, and update if needed
function navActive(target) {
    const navLink = document.querySelector(`a[href="#${target}"]`);
    if(document.querySelector('.current') === null) {
        navLink.classList.add('current');
        return;
    }
    else if(navLink.classList.length > 1) {
        return;
    }
    document.querySelector('.current').classList.remove('current');
    navLink.classList.add('current');
}

// Throttle scroll events to fire every 200ms
setInterval(function () {
    if(scrolling) {
        addClass(cursor);
        scrolling = false;
    }
}, 200);

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const fragment = document.createDocumentFragment();

for(section of sections) {
    const listElement = document.createElement('li');
    listElement.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
    
    fragment.appendChild(listElement);
}


// Add class 'active' to section when near top of viewport and highlight nav link
function addClass(cursor) {
    for(section of sections) {
        if(inRange(cursor, section)) {
            navActive(section.id);
            const rect = section.getBoundingClientRect();
            let y = rect.y;
            if (y > window.innerHeight && isActive(section)) {
                return;
            } 
            else {
                document.querySelector('.now-active').classList.remove('now-active');
                section.classList.add('now-active');
            }
        }
    }
}

// Scroll to anchor ID using scrollTO event and highlight clicked button
function smoothScroll(event) {
    event.preventDefault();
    const element = document.querySelector(`section${event.target.hash}`);
    scrollTo({
        top: element.offsetTop,
        left: 0,
        behavior: 'smooth'
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.querySelector('#navbar__list').appendChild(fragment);

// Scroll to section on link click
navbar.addEventListener('click', smoothScroll);

// Set sections as active
document.addEventListener('scroll', function(event) {
    const path = event.composedPath ? event.composedPath() : event.path;
    cursor = path[1].scrollY;
    scrolling = true;
});
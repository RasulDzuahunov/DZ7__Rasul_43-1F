// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

let currentTab = 0

const hideTabContent = () => {
    tabContentBlocks.forEach(block => {
        block.style.display = 'none'
    })
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = 'block'
    tabs[id].classList.add('tab_content_item_active')
}

const switchTab = () => {
    hideTabContent()
    currentTab = (currentTab + 1) % tabs.length
    showTabContent(currentTab)
}

hideTabContent ()
showTabContent ()
setInterval(switchTab, 3000)



tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                hideTabContent()
                currentTab = tabIndex
                showTabContent(tabIndex)
            }
        }) 
    }
}

//converter

const rates = {
    somToUsd: 0.011, 
    usdToSom: 90.91, 
    usdToEur: 0.9,   
    eurToUsd: 1.11,  
};

const somInput = document.getElementById("som");
const usdInput = document.getElementById("usd");
const eurInput = document.getElementById("eur");


function convertFromSom(value) {
    usdInput.value = (value * rates.somToUsd).toFixed(2);
    eurInput.value = (value * rates.somToUsd * rates.usdToEur).toFixed(2);
}

function convertFromUsd(value) {
    somInput.value = (value * rates.usdToSom).toFixed(2);
    eurInput.value = (value * rates.usdToEur).toFixed(2);
}

function convertFromEur(value) {
    usdInput.value = (value * rates.eurToUsd).toFixed(2);
    somInput.value = (value * rates.eurToUsd * rates.usdToSom).toFixed(2);
}


somInput.addEventListener("input", () => {
    if (somInput.value) convertFromSom(parseFloat(somInput.value));
});

usdInput.addEventListener("input", () => {
    if (usdInput.value) convertFromUsd(parseFloat(usdInput.value));
});

eurInput.addEventListener("input", () => {
    if (eurInput.value) convertFromEur(parseFloat(eurInput.value));
});


const API_URL = './data.json'; // Локальный JSON-файл с данными
const card = document.getElementById('card');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

let posts = [];
let currentIndex = 0;

// DRY Function to fetch data
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to update card content
function updateCard(index) {
    const post = posts[index];
    if (post) {
        card.innerHTML = `
            <p>Post ID: <span>${post.id}</span></p>
            <p>${post.title}</p>
        `;
    } else {
        card.innerHTML = `<p style="color: white;">No data available</p>`;
    }
}

// Event listener for next button
btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % posts.length; // Circular increment
    updateCard(currentIndex);
});

// Event listener for prev button
btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + posts.length) % posts.length; // Circular decrement
    updateCard(currentIndex);
});

// Initial setup
async function initialize() {
    posts = await fetchData(API_URL);
    console.log(posts); // Log all fetched posts to console
    if (posts.length > 0) {
        updateCard(currentIndex);
    } else {
        card.innerHTML = `<p style="color: white;">Failed to load posts</p>`;
    }
}

initialize();

//CARD SWITCHER

const nextButton = document.querySelector('#btn-next');
const prevButton = document.querySelector('#btn-prev');
const cardBlock = document.querySelector('.card');

let cardIndex = 1; 
const maxCardIndex = 200; 

async function loadCard(index) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${index}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch card with ID ${index}`);
        }
        const data = await response.json();
        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p>${data.completed}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        console.error('Error loading card:', error);
        cardBlock.innerHTML = `<p>Error loading card</p>`;
    }
}

async function logPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        console.log(posts);
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

nextButton.onclick = () => {
    cardIndex = cardIndex === maxCardIndex ? 1 : cardIndex + 1; 
    loadCard(cardIndex);
};

prevButton.onclick = () => {
    cardIndex = cardIndex === 1 ? maxCardIndex : cardIndex - 1;
    loadCard(cardIndex);
};

loadCard(cardIndex);
logPosts();

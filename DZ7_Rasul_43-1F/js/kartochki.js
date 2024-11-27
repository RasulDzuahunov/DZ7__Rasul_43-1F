const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const cardContainer = document.querySelector('.card-container');

// DRY: Функция для выполнения GET запроса
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

// Функция для рендера карточек
function renderCards(posts) {
    cardContainer.innerHTML = ''; // Очистить контейнер перед добавлением новых карточек

    posts.forEach((post) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="https://static.wikia.nocookie.net/greatmultiverse/images/5/50/UmbrellaCorporation3.png/revision/latest?cb=20120417012215" alt="Card Image">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;
        cardContainer.appendChild(card);
    });
}

// Инициализация страницы
async function initialize() {
    const posts = await fetchData(API_URL);
    renderCards(posts);
}

initialize();

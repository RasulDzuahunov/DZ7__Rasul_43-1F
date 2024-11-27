// gmail
const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
    } else {
        gmailResult.innerHTML = 'NOT OK'
        gmailResult.style.color = 'red'
    }
}
// block
const parentBlock = document.querySelector('.parent_block')
const childBlock = document.querySelector('.child_block')

let positionX = 0, positionY = 0
let directionX = 1, directionY = 1

const offsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth
const offsetHeight = parentBlock.offsetHeight - childBlock.offsetHeight

console.log(parentBlock)

const moveBlock = () => {
    if (positionX < offsetWidth && positionY === 0) {
        positionX++;
        childBlock.style.left = `${positionX}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionX >= offsetWidth && positionY < offsetHeight) {
        positionY++;
        childBlock.style.top = `${positionY}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionY >= offsetHeight && positionX > 0) {
        positionX--;
        childBlock.style.left = `${positionX}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionX === 0 && positionY > 0) {
        positionY--;
        childBlock.style.top = `${positionY}px`;
        requestAnimationFrame(moveBlock);
    }
};


moveBlock()

//ТАЙМЕР

const secondblock = document.querySelector('#seconds')
const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')
const resetButton = document.querySelector('#reset')

let seconds = 0
let interval = null

startButton.onclick = () => {
    if (!interval) {
    interval = setInterval (() => {
        seconds++
        secondblock.innerHTML = seconds
    }, 1000)
}
}

stopButton.onclick = () => {
    clearInterval(interval)
    interval = null
}
resetButton.onclick = () => {
    seconds = 0
    secondblock.innerHTML = seconds
    clearInterval(interval)
    interval = 0
}


const charactersList = document.querySelector(".characters-list");

function createCharacterCard(character) {
    const card = document.createElement("div");
    card.className = "character-card";

    card.innerHTML = `
        <img src="${character.person_photo}" alt="${character.name}" class="character-photo">
        <h3 class="character-name">${character.name}</h3>
        <p class="character-age">Age: ${character.age}</p>
        <p class="character-occupation">Occupation: ${character.occupation}</p>
    `;

    charactersList.appendChild(card);
}

fetch("../characters.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error loading persons.json");
        }
        return response.json();
    })
    .then(data => {
        data.forEach(createCharacterCard);
    })
    .catch(error => {
        console.error("Failed to fetch characters:", error);
        charactersList.innerHTML = "<p>Error loading characters. Please try again later.</p>";
    });


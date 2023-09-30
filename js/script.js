const messageElement = document.getElementById('message');
const errorMessageElement = document.getElementById('errorMessage');
const gameInput = document.getElementById('gameInput');
const minInput = document.getElementById('minInput');
const maxInput = document.getElementById('maxInput');
const gameForm = document.getElementById('gameForm');
const attemptsElement = document.getElementById('attempts');
const resetButton = document.getElementById('resetButton');
const minNumberElement = document.getElementById('minNum');
const maxNumberElement = document.getElementById('maxNum');
const gameElement = document.querySelector('.game');
const newGameElement = document.querySelector('.newGame');
const newGameForm = document.getElementById('newGameForm');

let attempts = 0;
let theNumber = null;
let winStatus = false;

function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function validateInput(input) {
    const minNumber = parseInt(minNumberElement.textContent);
    const maxNumber = parseInt(maxNumberElement.textContent);
    const value = input.value;

    if(!value.trim()){
        return 'Поле пустое! Введите число.'
    }

    const number = parseInt(value);

    if(isNaN(number)) {
        return `Только числа от ${minNumber} до ${maxNumber}, никаких букв и прочих символов.`;
    }
    
    if(minNumber <= number && number <= maxNumber){
        attempts++;
        attemptsElement.innerHTML = `${attempts}`;

        if(number === theNumber){
            winStatus = true;
            return `Ты угадал!`;
        } else {
            let hint = (number > theNumber)?`Загаданное число меньше ${number}`:`Загаданное число больше ${number}`
            if(attempts % 3 === 0){
                return hint += (theNumber % 2 === 0)?`<br>Подсказака: это чётное число.`:`<br>Подсказака: это нечётное число.`;
            }
            return hint;
        }
    } else {
        return `Только числа от ${minNumber} до ${maxNumber}, твоё число за пределами диапазона.`;

    }
}

function initGame(){
    const minNumber = parseInt(minNumberElement.textContent);
    const maxNumber = parseInt(maxNumberElement.textContent);
    attempts = 0;
    winStatus = false;
    attemptsElement.innerHTML = `${attempts}`;
    theNumber = generateNumber(minNumber, maxNumber);
}

initGame();

gameForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    messageElement.innerHTML = validateInput(gameInput);
    if(winStatus){
        gameForm.style.display = 'none'
    }
});

newGameForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    initGame();
    if(maxInput.value > minInput.value){
        minNumberElement.textContent = minInput.value;
        maxNumberElement.textContent = maxInput.value;
        initGame();
        gameElement.style.display = 'block';
        newGameElement.style.display = 'none'; 
        errorMessageElement.innerHTML = '';
    } else {
        errorMessageElement.innerHTML = 'Минимальное число должно быть меньше максимального.'
    }
})

resetButton.addEventListener('click', (e)=>{
    e.preventDefault();
    gameForm.style.display = 'block';
    gameElement.style.display = 'none';
    newGameElement.style.display = 'block';
    messageElement.innerHTML = '';
    gameInput.value = '';
})
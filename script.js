// Поля боя
const buttonsArea = document.querySelectorAll('.buttons');

// Кнопка для случайного распределения флота
const buttonRandom = document.getElementById('random');

// Кнопка перераспределения
const resButton = document.getElementById('restart');

// Кнопка начала игры
const startGame = document.getElementById('start');

// Модальное окно

const modalBlock = document.querySelector('.modal');

// Кнопка принять

const confirmModal = document.getElementById('confirmRules');

// Поле ввода имени

const playerName = document.getElementById('playerName');

// Кнопка закрытия модального окна

const modalClose = document.querySelector('.modal-close');

// Кнопка открытия модального окна

const modalOpen = document.getElementById('rules-btn');

// Приветствие

const helloing = document.querySelector('.hello');

// Ввод имени

const allowRules = document.querySelector('.confirmRules');

// Чей ход

let movingName = document.getElementById('who-is-moving');


let enemyFriend = '';

// Создание 200 btns

let z = 0;

for(let j = 0; j < 2; j++){
    for(let i = 0; i < 10; i++){
        let buttonsRow = document.createElement('div');
        buttonsRow.classList.add('buttons-row');
        for(let g = 0; g < 10; g++){
            z++;
            let button = document.createElement('button');
            button.id = z;
            buttonsRow.appendChild(button);
            buttonsArea[j].appendChild(buttonsRow);
        }   
    }
}

// Кнопки на поле игрока
let firstButtons = buttonsArea[0].querySelectorAll('button');

// Кнопки на поле компьютера
let secondButtons = buttonsArea[1].querySelectorAll('button');

// Счётчик занимаемых ячеек
let spaceUsed = 20;

// Отключение кнопок после расстановки кораблей
function disableButtons(){
    for(let j = 0; j < firstButtons.length; j++){
        firstButtons[j].disabled = true;
    }
}

// Ограничители

// Ограничитель следующей ячейки

function limiterFront(i, h, deckNum, btnScore){
    if(firstButtons[i].id != h + 10){
        firstButtons[i + 1].disabled = true;
    }
    if((firstButtons[i].id - deckNum) % 10 != 0){
        firstButtons[i - deckNum].disabled = true;
    }   
}

// Ограничитель ячеек по кругу для кораблей слева направо

function limiterArround(i, h, deckNum){
    if(firstButtons[i].id != h + 1){
        firstButtons[i - 1].disabled = true;
    }
    if((firstButtons[i].id + deckNum) % 10 != 1 && firstButtons[i].id < 101 - deckNum){
        firstButtons[i + deckNum].disabled = true;
    }   
    if(firstButtons[i].id == 1){
        for(let l = 0; l <= deckNum; l++){
            firstButtons[i + 10 + l].disabled = true;
        }
    }
    if(firstButtons[i].id > 1 && firstButtons[i].id <= 10){
        for(let l = -1; l <= deckNum; l++){
            firstButtons[i + 10 + l].disabled = true;
        }
    }
    if(firstButtons[i].id > 10 && firstButtons[i].id < 90){
        if(firstButtons[i].id != h + 1 && firstButtons[i].id != 91 - deckNum){
            for(let l = -1; l <= deckNum; l++){
                firstButtons[i - 10 + l].disabled = true;
                firstButtons[i + 10 + l].disabled = true;
            }
        }
        if(firstButtons[i].id == 91 - deckNum){
            for(let l = -1; l < deckNum; l++){
                firstButtons[i - 10 + l].disabled = true;
                firstButtons[i + 10 + l].disabled = true;
            }
        }
        if(firstButtons[i].id == h + 1){
            for(let l = 0; l <= deckNum; l++){
                firstButtons[i - 10 + l].disabled = true;
                firstButtons[i + 10 + l].disabled = true;
            }
        }
    }
    if(firstButtons[i].id == h + 11 - deckNum && firstButtons[i].id != 101 - deckNum &&
    firstButtons[i].id != 91 - deckNum){
        firstButtons[i + deckNum].disabled = false;
        firstButtons[i - 10 + deckNum].disabled = false;
        firstButtons[i + 10 + deckNum].disabled = false;
    }
    if(firstButtons[i].id == 101 - deckNum){
        firstButtons[i - 10 + deckNum].disabled = false;
        for(let l = -1; l <= deckNum - 1; l++){
            firstButtons[i - 10 + l].disabled = true;
        }
    }
    if(firstButtons[i].id == 91){
        for(let l = 0; l <= deckNum; l++){
            firstButtons[i - 10 + l].disabled = true;
        }
    }
    if(firstButtons[i].id >= 92 && firstButtons[i].id != 101 - deckNum){
        for(let l = -1; l <= deckNum; l++){
            firstButtons[i - 10 + l].disabled = true;
        }
    }
    if(firstButtons[i].id % 10 == 0){
        for(let l = 0; l <= deckNum; l++){
            firstButtons[i - 10 - l].disabled = true;
            firstButtons[i + 10 - l].disabled = true;
        }
    }
}

// Ограничитель ячеек по кругу для кораблей справа налево

function limiterArroundBack(i, h, deckNum){
    if(firstButtons[i].id < 10){
        for(let l = -1; l <= deckNum; l++){
            firstButtons[i + 10 - l].disabled = true;
        }
    }
    if(firstButtons[i].id == 10){
        for(let l = 0; l <= deckNum; l++){
            firstButtons[i + 10 - l].disabled = true;
        }
    }
    if(firstButtons[i].id > 10 && firstButtons[i].id < h + 10){
        if(firstButtons[i].id != h + 1 && firstButtons[i].id < 100 - deckNum){
            for(let l = -1; l <= deckNum; l++){
                firstButtons[i - 10 - l].disabled = true;
                firstButtons[i + 10 - l].disabled = true;
            }
        }
        if(firstButtons[i].id == h + 1){
            for(let l = 0; l <= deckNum; l++){
                firstButtons[i - 10 - l].disabled = true;
                firstButtons[i + 10 - l].disabled = true;
            }
        }
    }
    if(firstButtons[i].id > 90 && firstButtons[i].id < 100){
        for(let l = -1; l <= deckNum; l++){
            firstButtons[i - 10 - l].disabled = true;
        }
    }
    if(firstButtons[i].id == 100){
        for(let l = 0; l <= deckNum; l++){
            firstButtons[i - 10 - l].disabled = true;
        }
    }
    if(firstButtons[i].id % 10 == 0 && firstButtons[i].id != 10 && firstButtons[i].id != 100){
        for(let l = 0; l <= deckNum; l++){
            firstButtons[i - 10 - l].disabled = true;
            firstButtons[i + 10 - l].disabled = true;
        }
    }
}

// Создание кораблей в горизонтальном положении

// Создание 4палубного корабля

function createFourDeck(i){
    let deckNum = 4;
    if(spaceUsed > 16){
        for(let k = 0; k < 10; k++){
            let h = 10 * k;
            let f = h + 7;
            firstButtons[i].classList.add(enemyFriend);
            if(firstButtons[i].id > h && firstButtons[i].id <= f){
                firstButtons[i + 1].classList.add(enemyFriend);
                firstButtons[i + 2].classList.add(enemyFriend);
                firstButtons[i + 3].classList.add(enemyFriend);
                limiterArround(i, h, deckNum);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= h + 10){
                firstButtons[i - 1].classList.add(enemyFriend);
                firstButtons[i - 2].classList.add(enemyFriend);
                firstButtons[i - 3].classList.add(enemyFriend);
                limiterFront(i, h, deckNum);
                limiterArroundBack(i, h, deckNum);
            }
        }
        setTimeout(() => {
            spaceUsed -= 4;
        }, 10);
    }
}

// Создание 3палубного корабля

function createThreeDeck(i){
    let deckNum = 3;
    if(spaceUsed <= 16 && spaceUsed > 10){
        for(let k = 0; k < 10; k++){
            let h = 10 * k;
            let f = h + 8;
            if(firstButtons[i].id == 101 - deckNum || (firstButtons[i].id > h && firstButtons[i].id <= f && 
            !firstButtons[i + deckNum - 1].classList.contains(enemyFriend) && 
            !firstButtons[i + deckNum].classList.contains(enemyFriend)) &&
            firstButtons[i + deckNum - 1].disabled != true){
                firstButtons[i].classList.add(enemyFriend);
                firstButtons[i + 1].classList.add(enemyFriend);
                firstButtons[i + 2].classList.add(enemyFriend);
                limiterArround(i, h, deckNum);
                setTimeout(() => {
                    spaceUsed -= 3;
                }, 10);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= h + 10 && 
            !firstButtons[i - deckNum].classList.contains(enemyFriend) &&
            firstButtons[i - deckNum + 1].disabled != true){
                firstButtons[i].classList.add(enemyFriend);
                firstButtons[i - 1].classList.add(enemyFriend);
                firstButtons[i - 2].classList.add(enemyFriend);
                limiterFront(i, h, deckNum);
                limiterArroundBack(i, h, deckNum);
                setTimeout(() => {
                    spaceUsed -= 3;
                }, 10);
            }
        }
    }
}

// Создание 2палубного корабля

function createTwoDeck(i){  
    let deckNum = 2;
    if(spaceUsed <= 10 && spaceUsed > 4){
        for(let k = 0; k < 10; k++){
            let h = 10 * k;
            let f = h + 9;
            if(firstButtons[i].id == 101 - deckNum || (firstButtons[i].id > h && firstButtons[i].id <= f && 
            !firstButtons[i + deckNum].classList.contains(enemyFriend)) && 
            firstButtons[i + deckNum - 1].disabled != true){
                firstButtons[i].classList.add(enemyFriend);
                firstButtons[i + 1].classList.add(enemyFriend);
                limiterArround(i, h, deckNum);
                setTimeout(() => {
                    spaceUsed -= 2;
                }, 10);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= h + 10 && 
            !firstButtons[i - deckNum].classList.contains(enemyFriend) &&
            firstButtons[i - deckNum + 1].disabled != true){
                firstButtons[i].classList.add(enemyFriend);
                firstButtons[i - 1].classList.add(enemyFriend);
                limiterFront(i, h, deckNum);
                limiterArroundBack(i, h, deckNum);
                setTimeout(() => {
                    spaceUsed -= 2;
                }, 10);
            }
        }
    }
}

// Создание 1палубного корабля

function createOneDeck(i){
    let deckNum = 1;
    if(spaceUsed <= 4){
        for(let k = 0; k < 10; k++){
            let h = 10 * k;
            let f = h + 9;
            firstButtons[i].classList.add(enemyFriend);
            if(firstButtons[i].id > h && firstButtons[i].id <= f){
                limiterFront(i, h, deckNum);
                limiterArround(i, h, deckNum);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= h + 10){
                limiterFront(i, h, deckNum);
                limiterArroundBack(i, h, deckNum);
            }
        }
        setTimeout(() => {
            spaceUsed -= 1;
        }, 10);
    }
}

// Создание ограничителей для кораблей в вертикальном положении

// Ограничитель для ячеек по кругу сверху вниз

function limiterArroundVertical(i, deckNum){
    if(firstButtons[i].id == 1){
        for(let l = 0; l <= deckNum; l++){
            firstButtons[i + 1 + l * 10].disabled = true;
            firstButtons[i + deckNum * 10].disabled = true;
        }
    }
    if(firstButtons[i].id > 1 && firstButtons[i].id < 10){
        for(let l = 0; l <= deckNum; l++){
            firstButtons[i + 1 + l * 10].disabled = true;
            firstButtons[i + deckNum * 10].disabled = true;
            firstButtons[i - 1 + l * 10].disabled = true;
        }
    }
    if(firstButtons[i].id == 10){
        for(let l = 0; l <= deckNum; l++){
            firstButtons[i - 1 + l * 10].disabled = true;
            firstButtons[i + deckNum * 10].disabled = true;
        }
    }
    if(firstButtons[i].id % 10 == 1 && firstButtons[i].id != 1 && firstButtons[i].id != 101 - deckNum * 10){
        for(let l = -1; l <= deckNum; l++){
            firstButtons[i - 10].disabled = true;
            firstButtons[i + 1 + l * 10].disabled = true;
            firstButtons[i + deckNum * 10].disabled = true;
        }
    }
    if(firstButtons[i].id > 11 && firstButtons[i].id <= 100 - deckNum * 10 &&
    firstButtons[i].id % 10 != 0 && firstButtons[i].id % 10 != 1){
        for(let l = -1; l <= deckNum; l++){
            firstButtons[i - 10].disabled = true;
            firstButtons[i + 1 + l * 10].disabled = true;
            firstButtons[i + deckNum * 10].disabled = true;
            firstButtons[i - 1 + l * 10].disabled = true;
        }
    }
    if(firstButtons[i].id % 10 == 0 && firstButtons[i].id != 10 && firstButtons[i].id != 100 - (deckNum - 1) * 10){
        for(let l = -1; l <= deckNum; l++){
            firstButtons[i - 10].disabled = true;
            firstButtons[i - 1 + l * 10].disabled = true;
            firstButtons[i + deckNum * 10].disabled = true;
        }
    }
    if(firstButtons[i].id > 100 - deckNum * 10 && firstButtons[i].id < 100 - (deckNum - 1) * 10 &&
    firstButtons[i].id % 10 != 0 && firstButtons[i].id % 10 != 1){
        for(let l = -1; l < deckNum; l++){
            firstButtons[i - 10].disabled = true;
            firstButtons[i + 1 + l * 10].disabled = true;
            firstButtons[i - 1 + l * 10].disabled = true;
        }
    }
    if(firstButtons[i].id == 101 - deckNum * 10){
        for(let l = -1; l < deckNum; l++){
            firstButtons[i - 10].disabled = true;
            firstButtons[i + 1 + l * 10].disabled = true;
        }
    }
    if(firstButtons[i].id == 100 - (deckNum - 1) * 10){
        for(let l = -1; l < deckNum; l++){
            firstButtons[i - 10].disabled = true;
            firstButtons[i - 1 + l * 10].disabled = true;
        }
    }
}

// Ограничитель для ячеек по кругу снизу вверх

function limiterArroundBackVertical(i, deckNum){
    if(firstButtons[i].id == 100){
        for(let l = 0; l <= deckNum; l++){
            firstButtons[i - deckNum * 10].disabled = true;
            firstButtons[i - 1 - l * 10].disabled = true;
        }
    }
    if(firstButtons[i].id > 91 && firstButtons[i].id < 100){
        for(let l = 0; l <= deckNum; l++){
            firstButtons[i - deckNum * 10].disabled = true;
            firstButtons[i + 1 - l * 10].disabled = true;
            firstButtons[i - 1 - l * 10].disabled = true;
        }
    }
    if(firstButtons[i].id == 91){
        for(let l = 0; l <= deckNum; l++){
            firstButtons[i - deckNum * 10].disabled = true;
            firstButtons[i + 1 - l * 10].disabled = true;
        }
    }
    if(firstButtons[i].id % 10 == 0 && firstButtons[i].id != 100){
        for(let l = -1; l <= deckNum; l++){
            firstButtons[i + 10].disabled = true;
            firstButtons[i - deckNum * 10].disabled = true;
            firstButtons[i - 1 - l * 10].disabled = true;
        }
    }
    if(firstButtons[i].id > 101 - deckNum * 10 && firstButtons[i].id < 91 && 
    firstButtons[i].id % 10 != 0 && firstButtons[i].id % 10 != 1){
        for(let l = -1; l <= deckNum; l++){
            firstButtons[i + 10].disabled = true;
            firstButtons[i - deckNum * 10].disabled = true;
            firstButtons[i - 1 - l * 10].disabled = true;
            firstButtons[i + 1 - l * 10].disabled = true;
        }
    }
    if(firstButtons[i].id % 10 == 1 && firstButtons[i].id != 91){
        for(let l = -1; l <= deckNum; l++){
            firstButtons[i + 10].disabled = true;
            firstButtons[i - deckNum * 10].disabled = true;
            firstButtons[i + 1 - l * 10].disabled = true;
        }
    }
}

// Создание кораблей в вертикальном положении

// Создание 4палубного корабля

function createFourDeckVertical(i){
    let deckNum = 4;
    if(spaceUsed > 16){
        for(let k = 0; k < 10; k++){
            let h = 10 * k;
            let f = 70;
            firstButtons[i].classList.add(enemyFriend);
            if(firstButtons[i].id > h && firstButtons[i].id <= f){
                firstButtons[i + 10].classList.add(enemyFriend);
                firstButtons[i + 20].classList.add(enemyFriend);
                firstButtons[i + 30].classList.add(enemyFriend);
                limiterArroundVertical(i, deckNum);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= h + 10){
                firstButtons[i - 10].classList.add(enemyFriend);
                firstButtons[i - 20].classList.add(enemyFriend);
                firstButtons[i - 30].classList.add(enemyFriend);
                limiterArroundBackVertical(i, deckNum);
            }
        }
        setTimeout(() => {
            spaceUsed -= 4;
        }, 10);
    }
}

// Создание 3палубного корабля

function createThreeDeckVertical(i){
    let deckNum = 3;
    if(spaceUsed <= 16 && spaceUsed > 10){
        for(let k = 0; k < 10; k += 10){
            let h = 10 * k;
            let f = 80;
            if((firstButtons[i].id > h && firstButtons[i].id <= f && 
            !firstButtons[i + (deckNum - 1) * 10].classList.contains(enemyFriend)) && 
            firstButtons[i + 10 * (deckNum - 1)].disabled != true){
                firstButtons[i].classList.add(enemyFriend);
                firstButtons[i + 10].classList.add(enemyFriend);
                firstButtons[i + 20].classList.add(enemyFriend);
                limiterArroundVertical(i, deckNum);
                setTimeout(() => {
                    spaceUsed -= 3;
                }, 10);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= 100 && 
            !firstButtons[i - deckNum * 10].classList.contains(enemyFriend) && 
            firstButtons[i - 10 * (deckNum - 1)].disabled != true){
                firstButtons[i].classList.add(enemyFriend);
                firstButtons[i - 10].classList.add(enemyFriend);
                firstButtons[i - 20].classList.add(enemyFriend);
                limiterArroundBackVertical(i, deckNum);
                setTimeout(() => {
                    spaceUsed -= 3;
                }, 10);
            }
        }
    }
}

// Создание 2палубного корабля

function createTwoDeckVertical(i){  
    let deckNum = 2;
    if(spaceUsed <= 10 && spaceUsed > 4){
        for(let k = 0; k < 10; k += 10){
            let h = 10 * k;
            let f = 90;
            if((firstButtons[i].id > h && firstButtons[i].id <= f && 
            !firstButtons[i + (deckNum - 1) * 10].classList.contains(enemyFriend)) && 
            firstButtons[i + 10 * (deckNum - 1)].disabled != true){
                firstButtons[i].classList.add(enemyFriend);
                firstButtons[i + 10].classList.add(enemyFriend);
                limiterArroundVertical(i, deckNum);
                setTimeout(() => {
                    spaceUsed -= 2;
                }, 10);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= 100 && 
            !firstButtons[i - deckNum * 10].classList.contains(enemyFriend) && 
            firstButtons[i - 10 * (deckNum - 1)].disabled != true){
                firstButtons[i].classList.add(enemyFriend);
                firstButtons[i - 10].classList.add(enemyFriend);
                limiterArroundBackVertical(i, deckNum);
                setTimeout(() => {
                    spaceUsed -= 2;
                }, 10);
            }
        }
    }
}

// Сброс расстановки флота

resButton.addEventListener('click', () => {
    for(let i = 0; i < firstButtons.length; i++){
        firstButtons[i].disabled = false;
        firstButtons[i].classList.remove(enemyFriend);
        spaceUsed = 20;
    }
    startGame.disabled = true;
    buttonRandom.disabled = false;
});

    // Расстановка кораблей по горизонтали ЛКМ

for(let i = 0; i < firstButtons.length; i++){
    enemyFriend = 'friend';
    firstButtons[i].addEventListener('click', () => {
        if(spaceUsed === 1){
            disableButtons();
            startGame.disabled = false;
            buttonRandom.disabled = true;
        }
        if(!firstButtons[i].classList.contains(enemyFriend)){
            createFourDeck(i);
            createThreeDeck(i);
            createTwoDeck(i);
            createOneDeck(i);
        }
    });

    // Расстановка кораблей по вертикали ПКМ

    firstButtons[i].addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if(spaceUsed === 1){
            disableButtons();
            startGame.disabled = false;
            buttonRandom.disabled = true;
        }
        if(!firstButtons[i].classList.contains(enemyFriend)){
            createFourDeckVertical(i);
            createThreeDeckVertical(i);
            createTwoDeckVertical(i);
            createOneDeck(i);
        }
    });
}

// Случайна расстановка флота Игрока
buttonRandom.addEventListener('click', () => {
    randomCreate();
    startGame.disabled = false;
    buttonRandom.disabled = true;
    enemyFriend = 'friend';
    for(let i = 0; i < firstButtons.length; i++){
        firstButtons[i].disabled = true;
    }
    setTimeout(() => {
        firstButtons.forEach(item => {
            item.disabled = true;
        });
    }, 1000);
});

// Начало игры

// Функция для генерации рандомных чисел

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Функция для рандомного расположения флота

function randomCreate(){

    let randomArr = {
        coord: [],
        direction: []
    };

    while(randomArr.coord.length < 100){
        let randomCoord = getRandom(0, 100);
        if(randomArr.coord.indexOf(randomCoord) == -1){
            randomArr.coord.push(randomCoord);
        }
    }

    for(let j = 0; j < 10; j++){
        randomArr.direction.push(getRandom(0, 2));
    }

    function clearArr(){
        randomArr.coord.forEach(item => {
            if(firstButtons[item].classList.contains(enemyFriend) || firstButtons[item].disabled == true){
                randomArr.coord.splice(randomArr.coord.indexOf(item), 1);
                randomArr.coord.splice(randomArr.coord.indexOf(item + 1), 1);
                randomArr.coord.splice(randomArr.coord.indexOf(item - 1), 1);
            }
        });
        randomArr.direction.splice(0, 1);
    }

    spaceUsed = 20;

    let k = 0;

    function createFourDeckRandom(){
        clearArr();
        if(randomArr.direction[0] == 0){
            createFourDeck(randomArr.coord[0]);
        }else{
            createFourDeckVertical(randomArr.coord[0]);
        }
        clearArr();        
    }
    function createThreeDeckRandom(){
        clearArr();
        if(randomArr.direction[0] == 0){
            createThreeDeck(randomArr.coord[0]);
        }else{
            createThreeDeckVertical(randomArr.coord[0]);
        }
        clearArr();        
    }
    function createTwoDeckRandom(){
        clearArr();
        if(randomArr.direction[0] == 0){
            createTwoDeck(randomArr.coord[0]);
        }else{
            createTwoDeckVertical(randomArr.coord[0]);
        }
        clearArr();        
    }

    try{
        createFourDeckRandom();
        setTimeout(() => {
            createThreeDeckRandom();
        }, 15);
        setTimeout(() => {
            createThreeDeckRandom();
        }, 30);
        setTimeout(() => {
            createTwoDeckRandom();
        }, 45);
        setTimeout(() => {
            createTwoDeckRandom();
        }, 45);
        setTimeout(() => {
            createTwoDeckRandom();
        }, 45);
        setTimeout(() => {
            clearArr();
            createOneDeck(randomArr.coord[0]);
            clearArr();
        }, 60);
        setTimeout(() => {
            clearArr();
            createOneDeck(randomArr.coord[0]);
            clearArr();
        }, 75);
        setTimeout(() => {
            clearArr();
            createOneDeck(randomArr.coord[0]);
            clearArr();
        }, 90);
        setTimeout(() => {
            clearArr();
            createOneDeck(randomArr.coord[0]);
            clearArr();
        }, 105);
        setTimeout(() => {
            if(spaceUsed > 0){
                firstButtons.forEach(element => {
                    element.disabled = false;
                    element.classList.remove(enemyFriend);
                });
                randomCreate();
            }else{
                firstButtons.forEach(element => {
                    element.disabled = false;
                });
            }
        }, 120);
    }catch{
        createFourDeckRandom();
        setTimeout(() => {
            createThreeDeckRandom();
        }, 15);
        setTimeout(() => {
            createThreeDeckRandom();
        }, 30);
        setTimeout(() => {
            createTwoDeckRandom();
        }, 45);
        setTimeout(() => {
            createTwoDeckRandom();
        }, 45);
        setTimeout(() => {
            createTwoDeckRandom();
        }, 45);
        setTimeout(() => {
            createOneDeck(randomArr.coord[0]);
            clearArr();
        }, 60);
        setTimeout(() => {
            createOneDeck(randomArr.coord[0]);
            clearArr();
        }, 75);
        setTimeout(() => {
            createOneDeck(randomArr.coord[0]);
            clearArr();
        }, 90);
        setTimeout(() => {
            createOneDeck(randomArr.coord[0]);
            clearArr();
        }, 105);
        setTimeout(() => {
            if(spaceUsed > 0){
                firstButtons.forEach(element => {
                    element.disabled = false;
                    element.classList.remove(enemyFriend);
                });
                randomCreate();
            }else{
                firstButtons.forEach(element => {
                    element.disabled = false;
                });
            }
        }, 120);
    }
}

// Ходы игрока

let playerMove = true;
    
function playerMoving (){
    let playerScore = 0;
    for(let i = 0; i < firstButtons.length; i++){
        firstButtons[i].addEventListener('click', () => {
            if(playerMove){
                if(firstButtons[i].classList.contains('enemy')){
                    firstButtons[i].classList.add('shoted');
                    firstButtons[i].disabled = true;
                    playerMove = true;
                    playerScore++;
                }
                if(!firstButtons[i].classList.contains('enemy')){
                    firstButtons[i].classList.add('no-shoted');
                    firstButtons[i].disabled = true;
                    playerMove = false;
                    setTimeout(() => {
                        computerMoving();
                    }, 500);
                }
            }
            if(playerScore == 20){
                setTimeout(() => {
                    if(confirm('Игрок победил. Хотите начать заново?')){
                        location.reload();
                    }else{
                        setTimeout(() => {
                            close();
                        }, 5000);
                    }
                }, 100);
            }
            whoIsMoving();
        });
    }
}

// Создание ИИ

let computerScore = 0;
let computerRandomMooving = [];
while(computerRandomMooving.length < 100){
    let randomCoord = getRandom(0, 100);
    if(computerRandomMooving.indexOf(randomCoord) == -1){
        computerRandomMooving.push(randomCoord);
    }
}

function computerMoving(){
    if(playerMove == false){
            if(secondButtons[computerRandomMooving[0]].classList.contains('friend')){
                setTimeout(() => {
                    secondButtons[computerRandomMooving[0]].classList.add('shoted');
                    computerRandomMooving.splice(0 , 1);
                    playerMove = false;
                    computerScore++;
                    setTimeout(() => {
                        computerMoving();
                        whoIsMoving();
                    }, 500);
                }, 100);
            }
            if(!secondButtons[computerRandomMooving[0]].classList.contains('friend')){
                setTimeout(() => {
                    secondButtons[computerRandomMooving[0]].classList.add('no-shoted');
                    computerRandomMooving.splice(0 , 1);
                    playerMove = true;
                    whoIsMoving();
                }, 200);
            }
    }
    if(computerScore == 20){
        setTimeout(() => {
            alert('Победил компьютер');
            if(confirm('Компьютер победил. Хотите начать заново?')){
                location.reload();
            }else{
                setTimeout(() => {
                    close();
                }, 5000);
            }
        }, 100);
    }
}

// Чей ход

function whoIsMoving(){
    if(playerMove){
        movingName.textContent = 'Ходит ' + playerName.value;
    }else{
        movingName.textContent = 'Ходит Компьютер';
    }
}


// Начать игру

let swapBool = true;

startGame.addEventListener('click', () => {
    enemyFriend = 'enemy';

    // Переключение функций полей
    if(swapBool){
        let swap;
        swap = firstButtons;
        firstButtons = secondButtons;
        secondButtons = swap;
        for(let j = 0; j < firstButtons.length; j++){
            firstButtons[j].id = secondButtons[j].id;
            secondButtons[j].id = 201 - secondButtons[j].id;
        }
        swapBool = false;
    }

    // Отключение кнопки перераспределения

    resButton.disabled = true;

    // Расстановка кораблей компьютером

    randomCreate();

    // Отключение кнопки начала игры

    startGame.disabled = true;
    
    playerMoving();

});

confirmModal.addEventListener('click', (e) => {
    e.preventDefault();
    modalClose.classList.remove('none');
    modalBlock.classList.add('closingModal');
    setTimeout(() => {
        modalBlock.classList.add('none');
        helloing.classList.add('none');
        allowRules.classList.add('none');
        modalBlock.classList.remove('closingMoadl');
    }, 500);
});

modalClose.addEventListener('click', () => {
    modalBlock.classList.add('closingModal');
    setTimeout(() => {
        modalBlock.classList.add('none');
    }, 500);
    modalOpen.disabled = true;
    setTimeout(() => {
        modalOpen.disabled = false;
    }, 500);
});

modalOpen.addEventListener('click', () => {
    modalBlock.classList.remove('closingModal');
    modalBlock.classList.remove('none');
    modalClose.disabled = true;
    setTimeout(() => {
        modalClose.disabled = false;
    }, 500);
});
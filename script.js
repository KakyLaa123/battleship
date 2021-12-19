let buttonsArea = document.querySelectorAll('.buttons');

let resButton = document.getElementById('restart');

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

let firstButtons = buttonsArea[0].querySelectorAll('button');

// Отключение кнопок после расстановки кораблей

let spaceUsed = 20;

function disableButtons(){
    for(let j = 0; j < firstButtons.length; j++){
        firstButtons[j].disabled = true;
        console.log(firstButtons[j]);
    }
}

// Ограничители

// Ограничитель следующей ячейки

function limiterFront(i, h, deckNum){
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
    if(firstButtons[i].id > 10 && firstButtons[i].id <= 90){
        if(firstButtons[i].id != h + 1){
            for(let l = -1; l <= deckNum; l++){
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
    if(firstButtons[i].id == h + 11 - deckNum && firstButtons[i].id != 101 - deckNum){
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
            firstButtons[i].classList.add('background');
            if(firstButtons[i].id > h && firstButtons[i].id <= f){
                firstButtons[i + 1].classList.add('background');
                firstButtons[i + 2].classList.add('background');
                firstButtons[i + 3].classList.add('background');
                limiterArround(i, h, deckNum);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= h + 10){
                firstButtons[i - 1].classList.add('background');
                firstButtons[i - 2].classList.add('background');
                firstButtons[i - 3].classList.add('background');
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
            !firstButtons[i + deckNum].classList.contains('background')) &&
            firstButtons[i + deckNum - 1].disabled != true){
                firstButtons[i].classList.add('background');
                firstButtons[i + 1].classList.add('background');
                firstButtons[i + 2].classList.add('background');
                limiterArround(i, h, deckNum);
                setTimeout(() => {
                    spaceUsed -= 3;
                }, 10);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= h + 10 && 
            !firstButtons[i - deckNum].classList.contains('background') &&
            firstButtons[i - deckNum + 1].disabled != true){
                firstButtons[i].classList.add('background');
                firstButtons[i - 1].classList.add('background');
                firstButtons[i - 2].classList.add('background');
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
            !firstButtons[i + deckNum].classList.contains('background')) && 
            firstButtons[i + deckNum - 1].disabled != true){
                firstButtons[i].classList.add('background');
                firstButtons[i + 1].classList.add('background');
                limiterArround(i, h, deckNum);
                setTimeout(() => {
                    spaceUsed -= 2;
                }, 10);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= h + 10 && 
            !firstButtons[i - deckNum].classList.contains('background') &&
            firstButtons[i - deckNum + 1].disabled != true){
                firstButtons[i].classList.add('background');
                firstButtons[i - 1].classList.add('background');
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
            firstButtons[i].classList.add('background');
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
    if(firstButtons[i].id > 101 - deckNum * 10 && firstButtons[i].id < 100&& 
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
            firstButtons[i].classList.add('background');
            if(firstButtons[i].id > h && firstButtons[i].id <= f){
                firstButtons[i + 10].classList.add('background');
                firstButtons[i + 20].classList.add('background');
                firstButtons[i + 30].classList.add('background');
                limiterArroundVertical(i, deckNum);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= h + 10){
                firstButtons[i - 10].classList.add('background');
                firstButtons[i - 20].classList.add('background');
                firstButtons[i - 30].classList.add('background');
                limiterArroundBackVertical(i, deckNum);
            }
            console.log(firstButtons[i]);
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
            !firstButtons[i + (deckNum - 1) * 10].classList.contains('background')) && 
            firstButtons[i + 10 * (deckNum - 1)].disabled != true){
                firstButtons[i].classList.add('background');
                firstButtons[i + 10].classList.add('background');
                firstButtons[i + 20].classList.add('background');
                limiterArroundVertical(i, deckNum);
                setTimeout(() => {
                    spaceUsed -= 3;
                }, 10);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= 100 && 
            !firstButtons[i - deckNum * 10].classList.contains('background') && 
            firstButtons[i - 10 * (deckNum - 1)].disabled != true){
                firstButtons[i].classList.add('background');
                firstButtons[i - 10].classList.add('background');
                firstButtons[i - 20].classList.add('background');
                limiterArroundBackVertical(i, deckNum);
                setTimeout(() => {
                    spaceUsed -= 3;
                }, 10);
            }
            console.log(spaceUsed);
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
            !firstButtons[i + (deckNum - 1) * 10].classList.contains('background')) && 
            firstButtons[i + 10 * (deckNum - 1)].disabled != true){
                firstButtons[i].classList.add('background');
                firstButtons[i + 10].classList.add('background');
                limiterArroundVertical(i, deckNum);
                setTimeout(() => {
                    spaceUsed -= 2;
                }, 10);
            }
            if(firstButtons[i].id > f && firstButtons[i].id <= 100 && 
            !firstButtons[i - deckNum * 10].classList.contains('background') && 
            firstButtons[i - 10 * (deckNum - 1)].disabled != true){
                firstButtons[i].classList.add('background');
                firstButtons[i - 10].classList.add('background');
                limiterArroundBackVertical(i, deckNum);
                setTimeout(() => {
                    spaceUsed -= 2;
                }, 10);
            }
            console.log(spaceUsed);
        }
    }
}

// Сброс расстановки флота

resButton.addEventListener('click', () => {
    for(let i = 0; i < firstButtons.length; i++){
        firstButtons[i].disabled = false;
        firstButtons[i].classList.remove('background');
        spaceUsed = 20;
    }
});

    // Расстановка кораблей по горизонтали ЛКМ

for(let i = 0; i < firstButtons.length; i++){
    firstButtons[i].addEventListener('click', () => {
        if(spaceUsed === 1){
            disableButtons();
        }
        if(!firstButtons[i].classList.contains('background')){
            console.log(firstButtons[i].classList);
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
        }
        if(!firstButtons[i].classList.contains('background')){
            console.log(firstButtons[i].classList);
            createFourDeckVertical(i);
            createThreeDeckVertical(i);
            createTwoDeckVertical(i);
            createOneDeck(i);
        }
    });
}
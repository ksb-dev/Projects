const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
const form = document.querySelector(".form");
const head = document.querySelector(".head");
const container = document.querySelector('.container');
const chance = document.querySelector('.chance');
const main = document.querySelector('.main');
const body = document.querySelector('.body');
const refresh = document.querySelector('.refresh');
let randomNumber = 0;
let count = 3;

function random(){
    randomNumber = Math.floor((Math.random() * 10) + 1);
    console.log(randomNumber);
}

random();

btn.addEventListener('click', () => {

    if(input.value === ''){
        alert("Enter a number between 1 to 10");
        count = 3;
        return;
    }

    let value = Number(input.value);

    console.log(value);
    input.value = '';

    if(count > 1){
        if(value === randomNumber){
            body.classList.add('body-correct');
            head.innerText = "You've guessed a correct number!";
            main.classList.add('ghost');
            head.classList.add('h3-correct');
            container.classList.add('ghost');
            chance.classList.add('ghost');
            refresh.innerText = "Please refresh a page to play again";

            let sound = new Audio('correct.mp3');
            sound.play();
            
            /*setTimeout(() => {
                head.innerText = "Please refresh a page to play again";
            }, 5000);*/
        }
        else if(randomNumber < value){
            head.innerText = `please enter number smaller than ${value}`;
            chance.innerText = `Guess Left ${--count}`;
        }
        else if(randomNumber > value){
            head.innerText = `please enter number greater than ${value}`;
            chance.innerText = `Guess Left ${--count}`;
        }
    }
    else if(count === 1 && value === randomNumber){
            body.classList.add('body-correct');
            head.innerText = "You've guessed a correct number!";
            main.classList.add('ghost');
            head.classList.add('h3-correct');
            container.classList.add('ghost');
            chance.classList.add('ghost');
            refresh.innerText = "Please refresh a page to play again";

            let sound = new Audio('correct.mp3');
            sound.play();
            
            /*setTimeout(() => {
                head.innerText = "Please refresh a page to play again";
            }, 5000);*/
    }
    else{
        body.classList.add('body-game-over');
        head.innerText = "Game Over";
        main.classList.add('ghost');
        head.classList.add('h3-game-over');
        container.classList.add('ghost');
        chance.classList.add('ghost');
        refresh.innerText = "Please refresh a page to play again";

        let sound = new Audio('wrong.mp3');
        sound.play();

        /*setTimeout(() => {
                head.innerText = "Please refresh a page to play again";
        }, 5000);*/
    }
})
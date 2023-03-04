var buttonColors = ["red", "blue", "green", "yellow"];
var randomNumber;
var randomChosenColor;
var userChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

const levelTitle = document.getElementById('level-title');
const body = document.querySelector('.main');
const btn = document.querySelectorAll('.btn');

document.addEventListener('keydown', (e) => {

  if(e.code !== '' && started !== true){

    started = true;

    nextSequence();
           
  }

});        


function nextSequence() {

    levelTitle.innerHTML = `level ${level++}`;

    randomNumber = (Math.floor(Math.random() * 4));

    randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    animate(randomChosenColor);

}

function animate(e) {

        const color = e;

        const id = document.getElementById(color);

        id.classList.add('pressed');

        setTimeout(function(){ 
            id.classList.remove('pressed');
        }, 100);

        let sound = new Audio(color+'.mp3');
        sound.play();
}

btn.forEach(item => {
    item.addEventListener('click', (e) => {
        console.log(typeof e.target.id);

        userChosenColor = e.target.id;

        const id = document.getElementById(userChosenColor);

        id.classList.add('pressed');

        setTimeout(function(){ 
            id.classList.remove('pressed');
        }, 100);

        let sound = new Audio(userChosenColor+'.mp3');
        sound.play();

        checkAnswer(userChosenColor);
    })
})

function checkAnswer(userChosenColor){

    userClickedPattern.push(userChosenColor);

    for(let i = 0; i < userClickedPattern.length; i++){

        if(gamePattern[i] === userClickedPattern[i]){

            if(userClickedPattern.length === gamePattern.length){

                setTimeout(function() {

                    if(i == userClickedPattern.length-1){

                        userClickedPattern = [];
                        console.log("next");
                        nextSequence();
                    }

                }, 1000);
            }
            else{
                continue;
            }
        }

        else{

            levelTitle.innerHTML = 'Game Over';
            body.classList.add('game-over');
            let sound = new Audio('wrong.mp3');
            sound.play();

            setTimeout(function(){
                body.classList.remove('game-over');

                levelTitle.innerHTML = 'Press A Key to Start';    
            },3000)

            startOver();
        }
    }
}

function startOver(){

            gamePattern = [];
            userClickedPattern = [];

            started = false;
            level = 0;
}
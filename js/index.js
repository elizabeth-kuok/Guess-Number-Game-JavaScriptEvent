"use strict";
function mouseOver() {
    document.getElementById("demo").style.color = "red";
  }
  function mouseOut() {
    document.getElementById("demo").style.color = "white";
  }

let Game = {
    initialize: function () {
        this.maxNumber = 100;
        this.minNumber = 1;
        this.round = 1,
        this.running = false;

        this.userOffer = null,
        this.randomNumber = null;
        this.checkButton = null;
        this.resetButton = null;
        this.reset = null;
        this.message = null;
        
        this.randomNumber = this._getRandomNumber(this.minNumber, this.maxNumber);
        GuessNumber.listener();
    },

    check: function () {
        this.userOffer = document.getElementById('user-offer').value;
        this.lastGuess = document.getElementById('user-guesses');
        this.message = document.getElementById('user-low-hi-msg');

        if(this.running) {
            try {
                if(this.userOffer == "")  throw "Input is empty";
                if(isNaN(this.userOffer)) throw "Input is not a number";
            }
            catch(err) {
                alert(err);
            }
            finally {
               if(this.round < 10){ 
                if(this.userOffer > this.randomNumber) {
                    this.message.textContent = "It's TOO HIGH!"
                    this.lastGuess.textContent += this.userOffer + ' ';
                    this.round += 1;
                }
                else if(this.userOffer < this.randomNumber) {
                    this.message.textContent = "It's TOO LOW!"
                    this.lastGuess.textContent += this.userOffer + ' ';
                    this.round += 1;
                }
                else if(this.userOffer == this.randomNumber){
                    this._endGame("win");
                }
              }else{
                  this._endGame("lose");
              }
            }
        this.running = false;
        }
    },

    listener: function () {
        this.checkButton = document.getElementById('check-button').addEventListener("click", function() {
            if(!GuessNumber.running){
                GuessNumber.running = true;
                GuessNumber.check();
                document.getElementById('user-offer').value = '';
            }
        })

        this.resetButton = document.getElementById('reset-button').addEventListener("click", function() {
            GuessNumber.running = false;
            GuessNumber.round = 1;
            GuessNumber.randomNumber = GuessNumber._getRandomNumber(GuessNumber.minNumber, GuessNumber.maxNumber);
            GuessNumber._resetInputs();
            document.body.style.backgroundColor = '';
            document.getElementById("textToPurple").style.color = "white";
        })
    },

    _getRandomNumber: function (min, max) {
        return Math.floor(Math.random() * (+max - +min)) + +min;
    },

    _endGame: function (winOrLose) {
        if(winOrLose === "win"){
            alert("You win yeah!!!");
        }else{
            alert("You lose ;'(");
        }
        this.running = false;
        this.round = 1;
        this.randomNumber = this._getRandomNumber(this.minNumber, this.maxNumber);
        GuessNumber._resetInputs();
    },

    _resetInputs: function() {
        GuessNumber.reset = document.querySelectorAll('.params .dynamic')
        for(let i=0; i < GuessNumber.reset.length; i++){
            GuessNumber.reset[i].textContent = '';
        }
    }
}

function changedBlue(){
    document.body.style.backgroundColor = "lightblue";
}

function changedPink(){
    document.body.style.backgroundColor = "lightpink";
}

function textPurple() {
    document.getElementById("textToPurple").style.color = "purple";
}

function textBrown() {
    document.getElementById("textToPurple").style.color = "#72524A";
}

var GuessNumber = Object.assign({}, Game);
GuessNumber.initialize();
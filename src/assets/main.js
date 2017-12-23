const MAX_ATTEMPTS = 10;
let answer = $('#answer').val(),
    attempt = $('#attempt').val();
function getResults(input){
  let resultRow = $(`<div class="row"><span class="col-md-6">${input}</span></div>`),
      correctCharacters = 0;
  for(let digit = 0; digit < input.length; digit++){
    let glyphiconMode = "remove";
    if(input.charAt(digit) === answer.charAt(digit)){
      glyphiconMode = "ok";
      correctCharacters++;
    } else{
      for(let i = 0; i < answer.length; i++){
        if(input.charAt(digit) === answer.charAt(i)){
          glyphiconMode = "transfer";
        }
      }
    }
    resultRow.append($(`<span class="glyphicon glyphicon-${glyphiconMode}"></span>`));
  }
  $("#results").append(resultRow);
  return correctCharacters === 4;
}

//pre-game necessary values
function setHiddenFields(){
  let random = Math.floor(Math.random() * 1000).toString();
  let ranLen = random.length;
  if(ranLen < 4){
    random = "0".repeat(4 - ranLen) + random;
  }
  attempt = 0;
  answer = random;
}

function setMessage(message){
  $("#message").text(message);
}

function validateInput(i){
  let valid = i.length == 4;
  if(!valid){
    setMessage("Guesses must be exactly 4 characters long.");
  }
  return valid;
}

function showAnswers(i){
  let code = $("#code");
  code.text(answer);
  code.addClass(i === true ? "success" : "failure");
}

function showReplay(){
  $("#guessing-div").hide();
  $("#replay-div").show();
}

function guess() {
  let input = $('#user-guess').val();
  if(answer === ""){
    setHiddenFields();
  }
  if(!validateInput(input)){
    return false;
  }
  attempt++;
  let correct = getResults(input);
  setMessage( correct? "You Win! :)" : attempt < MAX_ATTEMPTS? "Incorrect, try again." : "You Lose! :(" );
  if(correct || attempt >= MAX_ATTEMPTS){
    showAnswers(correct);
    showReplay();
  }
  console.log(`${input} ${"0" * 4} ${answer} ${attempt}`);
}

let codeAgrupation = {
  reactions(){
    $("#guessing-div").find("button").on("click", guess);
  }
}
$(document).ready(function(){
  codeAgrupation.reactions();
})

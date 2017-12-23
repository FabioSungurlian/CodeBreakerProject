let el_with_id = document.getElementById.bind(document);
    answer = el_with_id("answer").value,
    attempt = el_with_id('attempt').value,
    message = el_with_id("message");
const MAX_ATTEMPTS = 10,
      ANSWER_LEN = 4;
function setHiddenFields() {
  answer = Math.floor(Math.random() * 10000).toString();
  answer = "0".repeat(ANSWER_LEN - answer.length) + answer;
  attempt = 0;
}

function setMessage(input){
  message.innerHTML = input;
}

function validateInput(input){
  let valid = input.length === ANSWER_LEN;
  if (!valid) {
    message.innerHTML = `Guesses must be exactly ${ANSWER_LEN} characters long.`;
  }
  return valid;
}

function getResults(i){
  let resultRow = `<div class="row"><span class="col-md-6">${i}</span>`,
      okChars = 0;
  for(let digit = 0; digit < i.length; digit++){
    let glyphMode = "remove";
    if(i.charAt(digit) === answer.charAt(digit)){
      glyphMode = "ok";
      okChars++;
    } else{
      for(let index = 0; index < answer.length; index++){
        if(i.charAt(digit) === answer.charAt(index)){ glyphMode = "transfer"; }
      }
    }
    resultRow += `<span class="glyphicon glyphicon-${glyphMode}"></span>`;
  }
  resultRow += `</div>`;
  el_with_id("results").innerHTML += resultRow;
  return okChars === ANSWER_LEN;
}
function showAnswer(victory){
  let code = el_with_id("code");
  code.innerHTML = answer;
  code.class += (victory === false? ` failure` : ` success`) ;
}
function showReplay(){
  el_with_id("guessing-div").style.display = "none";
  el_with_id("replay-div").style.display = "block";
}

function guess() {
    let input = el_with_id('user-guess').value;
    if (attempt === "") {setHiddenFields();}
    if (validateInput(input) === false) {return false;}
    else {attempt++}
    let correct = getResults(input);
    setMessage(!correct? (attempt < MAX_ATTEMPTS? "Incorrect, try again." : "You lose! :(") : "You win!:)");
    if(correct || attempt >= MAX_ATTEMPTS){
      showAnswer(correct);
      showReplay();
    }
    console.log(`${input} ${answer} ${attempt}`);
}

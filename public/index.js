show_option_1 = document.getElementById("show-option-1");
show_option_2 = document.getElementById("show-option-2");
loading = document.getElementById("loading");



function goToShowOption1() {
	show_option_1.style.visibility = "unset";
  	show_option_2.style.visibility = "hidden";
  	about.style.visibility = "hidden";
  	loading.style.visibility = "hidden";
      document.getElementById("hint-btn").style.visibility = "hidden";
}

function goToShowOption2() {
	show_option_1.style.visibility = "hidden";
  	show_option_2.style.visibility = "unset";
  	about.style.visibility = "hidden";
  	loading.style.visibility = "hidden";
  	start();
}

function goToAbout() {
	show_option_1.style.visibility = "hidden";
  	show_option_2.style.visibility = "hidden";
  	about.style.visibility = "unset";
  	loading.style.visibility = "hidden";
    document.getElementById("hint-btn").style.visibility = "hidden";
}

function goToLoading() {
	show_option_1.style.visibility = "hidden";
  	show_option_2.style.visibility = "hidden";
  	about.style.visibility = "hidden";
  	loading.style.visibility = "unset";
      document.getElementById("hint-btn").style.visibility = "hidden";
}




let testArr = [
    {
        sentence: "zaherca or Sachertorte is the best cake in the world",
        question: "What is Sachertorte?",
        keywords: "cake, world",
    associatedWords: "Sweets, chocolate, ranking"
    },
    {
        sentence: "answer",
        question: "question",
        keywords: "keywords",
    associatedWords: "asociacije"
    }
]

var hintStatus = 0;
var questionId = 0;

function start(){
    //document.getElementById("question-block").style.visibility = "unset";
    document.querySelector("div[id='question-block']").style.display = 'block';
    newQuestionGiver(testArr);
}

function newQuestionGiver(questionArr){
    hintStatus = 0;
    var arrLength = questionArr.length;
    currentQuestionId = Math.floor(Math.random() * arrLength);
    questionId = currentQuestionId;
    //alert("hintStatus = " + hintStatus + " arrLength = " + arrLength + " currentQuestionId = " + currentQuestionId);
    //document.getElementById("question").style.visibility = "unset";
    document.querySelector("div[id='question']").style.display = 'block';
    document.getElementById("question").innerHTML = questionArr[currentQuestionId].question;
    //document.getElementById("hint1").style.visibility = "hidden";
    document.querySelector("div[id='hint1']").style.display = 'none';
    //document.getElementById("hint2").style.visibility = "hidden";
    document.querySelector("div[id='hint2']").style.display = 'none';
    //document.getElementById("answer").style.visibility = "hidden";
    document.querySelector("div[id='answer']").style.display = 'none';
    //document.getElementById("next-question-btn").style.visibility = "unset";
    //document.querySelector("div[id='next-question-btn']").style.display = 'inline';
    //alert("hint button shall be visible");
    document.getElementById("hint-btn").style.visibility = "visible";
    //document.querySelector("div[id='hint-btn']").style.display = 'inline';


}

function trueNextButton(questionArr){
    newQuestionGiver(questionArr);
}

function nextButton(){
	trueNextButton(testArr);
}

function trueHintButton(questionArr, currentQuestionId){
    if(hintStatus == 0){
        showHint1(questionArr, currentQuestionId);
    } else if (hintStatus == 1){
        showHint2(questionArr, currentQuestionId);
    } else if(hintStatus == 2) {
        showAnswer(questionArr, currentQuestionId);
    } else {
        newQuestionGiver(questionArr);
    }
}

function hintButton(){
	trueHintButton(testArr, questionId);
}

function showHint1(questionArr, currentQuestionId){
    hintStatus = 1;
    //document.getElementById("hint1").style.visibility = "unset";
    document.querySelector("div[id='hint1']").style.display = 'block';
    document.getElementById("hint1").innerHTML = "Here are some associated words: " + questionArr[currentQuestionId].associatedWords;

}

function showHint2(questionArr, currentQuestionId){
    hintStatus = 2;
    //document.getElementById("hint2").style.visibility = "unset";
    document.querySelector("div[id='hint2']").style.display = 'block';
    document.getElementById("hint2").innerHTML = "Here are some keywords: " + questionArr[currentQuestionId].keywords;
}

function showAnswer(questionArr, currentQuestionId){
    hintStatus = 3;
    //document.getElementById("answer").style.visibility = "unset";
    document.querySelector("div[id='answer']").style.display = 'block';
    document.getElementById("answer").innerHTML = "A possible answer is: " + questionArr[currentQuestionId].sentence;
    document.getElementById("hint-btn").style.visibility = "hidden";
    //document.querySelector("div[id='hint-btn']").style.display = 'none';
    document.getElementById("next-question-btn").innerHTML = "Next Question";
}








const inputText = document.getElementById('inputText');
const sendText = document.getElementById('sendText');
const crazySlider = document.getElementById('craziness');

//const neki = document.getElementById('neki');

//SPREMENLJIVKA KJER SE SHRANI RESPONSE 
//let testArr;

/*  */
sendText.onclick = function(e){
    e.preventDefault();
    console.log(crazySlider.value);
    goToLoading();
    const data = { txt: inputText.value , crazy: crazySlider.value/100};
    fetch('/api/text', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(dataa => {
        console.log('Success:', dataa);
       // change(); SPREMENI KAJ VIDIŠ NA EKRANU
        testArr = dataa;
        goToShowOption2();

        // NEKI KRNEKI SE ZBRIŠE
        //neki.innerText = data;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}


/* EXPORT COPPY TO CLIPBOARD*/
document.getElementById('exportButton').addEventListener('click', exportData);
function exportData() {
    let copyText = document.getElementById('exportText');
    if(!testArr) return;
    let text = testArr.map(e => `${e.question}\t${e.sentence}`).join("\r\n");
    copyText.value = text;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert("It has been copied to your clippboard")
        }
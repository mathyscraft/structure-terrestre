function infoBlocAnim() {
    document.getElementById("infoBloc").style.opacity = "1";
    document.querySelector("#underline").style.animation = "apparition-barre 1s";
    setTimeout(() => {
        document.querySelector("#underline").style.animation = ""
    }, 1010);
}

function clearQuizz(oldElement, oldfill) {
    if(oldElement !== undefined) {
        if (oldfill){
        oldElement.style.fill = "";
        }else{
        oldElement.style.stroke = "";
        }
    }
    let oldAnswers = document.querySelectorAll('.correct-answer')
    for(i = 0; i < oldAnswers.length; i++) {
        oldAnswers[i].innerHTML = "";
    }
    for (i=0; i<inputQuizz.length;i++) {
        inputQuizz[i].style.background = "#f1f1f1"
    }
}

let questionNbr = 0;
let answers = [];
let divQuizz = document.getElementById('quizz');
let inputQuizz = document.querySelectorAll('#quizz input');

let oldElement= undefined;
let oldElementFill;
function startQuizz(element) {

    clearQuizz(oldElement, oldElementFill)
    oldElement = document.getElementById(element);
    infoBlocAnim()
    console.log(element)
    answers = []
    
    document.getElementById('infos-discontinuite').hidden = true;
    document.getElementById('infos-couche').hidden = true;
    divQuizz.hidden = false;
    questionNbr = 0;

    if (data[element].couche) {
        document.getElementById(element).style.fill = '#f1f1f1';
        oldElementFill=true
        document.getElementById('quizz-couche').hidden = false;
        document.getElementById('quizz-discontinuite').hidden = true;
    } else {
        document.getElementById(element).style.stroke = '#f1f1f1';
        oldElementFill=false
        document.getElementById('quizz-couche').hidden = true;
        document.getElementById('quizz-discontinuite').hidden = false;
    }

    for (i in data[element]) {
        if (i !== "densite" && i !==  "couche") {
        answers.push(data[element][i])
        }
    }

}
function checkResponse() {
    clearQuizz()
    for (i = 0; i < answers.length; i++) {
        if (inputQuizz[i].value === answers[i]) {
            inputQuizz[i].style.background ="#64e964";
            console.log("OK")
        } else {
            inputQuizz[i].style.background ="#d34b4b";
            console.log("ERREUR", answers[i])
            let correctAnswer = inputQuizz[i].nextElementSibling;
            correctAnswer.innerHTML = answers[i]
        }
    }
}

window.addEventListener('keypress', (e) => {
    if (quizzMode === true) {
        if(e.key === "Enter") {
            checkResponse()
        }
    }
})
function infoBlocAnim() {
    document.getElementById("infoBloc").style.opacity = "1";
    document.querySelector("#underline").style.animation = "apparition-barre 1s";
    setTimeout(() => {
        document.querySelector("#underline").style.animation = "";
    }, 1010);
}

let inputQuizz = document.querySelectorAll('#quizz input');

let oldElement= undefined; // Correspond à l'ancienne couche qui a été sélectionnée
function clearQuizz(oldElement) {
    if(oldElement !== undefined) {
        if (oldElement.style.fill === '#f1f1f1' || oldElement.style.fill === 'rgb(241, 241, 241)')  {
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
        inputQuizz[i].style.background = "#f1f1f1";
    }
}

let answers = [];
function startQuizz(element) { // element correspond à l'ID de la couche

    clearQuizz(oldElement);
    oldElement = document.getElementById(element); // Redéfinie l'ancien élément avec l'actuel
    infoBlocAnim();
    answers = [];
    
    if (data[element].couche) {
        document.getElementById(element).style.fill = '#f1f1f1'; 
        affichage('quizz-couche');
    } else {
        document.getElementById(element).style.stroke = '#f1f1f1';
        affichage('quizz-discontinuite');
    }

    for (i in data[element]) {
        if (i !== "densite" && i !==  "couche") {
        answers.push(data[element][i]);
        }
    }

}
function checkResponse() {
    clearQuizz()
    for (i = 0; i < answers.length; i++) {
        if (inputQuizz[i].value === answers[i]) {
            inputQuizz[i].style.background ="#64e964";
        } else {
            inputQuizz[i].style.background ="#d34b4b";
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
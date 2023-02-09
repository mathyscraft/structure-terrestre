function infoBlocAnim() {
    document.getElementById("infoBloc").style.opacity = "1";
    document.querySelector("#underline").style.animation = "apparition-barre 1s";
    setTimeout(() => {
        document.querySelector("#underline").style.animation = ""
    }, 1010);
}

function clearQuizz() {
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

function startQuizz(element) {
    clearQuizz()
    infoBlocAnim()
    console.log(element)
    answers = []

    document.getElementById('infos-discontinuite').hidden = true;
    document.getElementById('infos-couche').hidden = true;
    divQuizz.hidden = false;
    questionNbr = 0;

    if (data[element].couche) {
        document.getElementById('quizz-couche').hidden = false;
        document.getElementById('quizz-discontinuite').hidden = true;
    } else {answers
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

// function checkResponse() {
//     for (i = 0; i < inputQuizz.length; i++) {
//         if (inputQuizz[i].value === answers[questionNbr][i]) {
//             console.log("OK")
//         } else {
//             console.log("ERREUR", answers[questionNbr][i])
//         }
//     }
// }

// let answers = [];
//         let k = 0;
//         for (i in data) {
//          answers.push([])
//             for(j in data[i]) {
//               if (j !== "densite" && j !==  "couche") {
//                     answers[k].push(data[i][j]);
//               }
//             }
//           k++;
//         }
//         console.log(answers)
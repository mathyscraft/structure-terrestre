// const test = document.querySelector('#croute-continentale')
// test.addEventListener("mouseover", () => {
//     console.log("test")
// })
const css = document.documentElement.style

// Chargement des données
let data = {};
fetch("data.json")
    .then(response => response.json())
    .then(function(response) {
        data = response
        console.log(data)
    })
    .catch(error => console.log("Erreur: " + error))

function infoBlocAnim() {
    document.getElementById("infoBloc").style.opacity = "1";
    document.querySelector("#underline").style.animation = "apparition-barre 1s";
    setTimeout(() => {
        document.querySelector("#underline").style.animation = ""
    }, 1010);
}

const outputDiv = document.getElementById('infos');
// let questionNbr = 0;
// let divQuizz = document.getElementById('quizz');
// let inputQuizz = document.querySelectorAll('#quizz input');

// function startQuizz() {
//     infoBlocAnim()

//     document.getElementById('infos-discontinuite').hidden = true;
//     document.getElementById('infos-couche').hidden = true;
//     divQuizz.hidden = false;
//     questionNbr = 0;

// }

// function checkResponse() {
//     for (i = 0; i < inputQuizz.length; i++) {
//         if (inputQuizz[i].value === data[0]) {
//             console.log("OK", data[1])
//         } else {
//             console.log("ERREUR", data[0])
//         }
//     }
// }

let quizzMode = false;

function switchMode() {
    clearQuizz(oldElement, oldElementFill)
    quizzMode = !quizzMode;
    if (quizzMode) {
        css.setProperty('--switch-value', '30px');
        document.getElementById("infoBloc").style.opacity = "0";
    } else {
        css.setProperty('--switch-value', '0px');
        document.getElementById("infoBloc").style.opacity = "0";
    }
}


// Affichage des données spécifiques sur la page
function loadInformations(elementID) {

    // Si le mode quizz est activé, on termine l'execution de la fonction avant l'affichage
    if (quizzMode) {
        startQuizz(elementID)
        return
    }

// Animations
    infoBlocAnim()
    
    console.log(elementID);

// Affichage des infos

    if  (data[elementID].couche) { // vérifie qu'il ne s'agit pas d'une discontinuitée
        console.log(data[elementID].densite, ",", data[elementID].roches, ",", data[elementID].etat);

        document.getElementById('infos-discontinuite').hidden = true;
        document.getElementById('quizz').hidden = true;
        let output = document.getElementById('infos-couche');
        output.hidden = false;

        document.querySelector("#infos-couche #nom").innerHTML = data[elementID].nom;
        document.querySelector("#infos-couche #densite").innerHTML = data[elementID].densite;
        document.querySelector("#infos-couche #roches").innerHTML = data[elementID].roches;
        document.querySelector("#infos-couche #etat").innerHTML = data[elementID].etat;

    } else { // sinon c'est une discontinuité
        console.log(data[elementID].profondeur);
        document.getElementById('infos-couche').hidden = true;
        document.getElementById('quizz').hidden = true;
        let output = document.getElementById('infos-discontinuite');
        output.hidden = false;

        document.querySelector("#infos-discontinuite #nom").innerHTML = data[elementID].nom;
        document.querySelector("#infos-discontinuite #profondeur").innerHTML = data[elementID].profondeur;
    }
    
}
const css = document.documentElement.style

// Chargement des données
let data = {};
fetch("data.json")
    .then(response => response.json())
    .then(function(response) {
        data = response
    })
    .catch(error => console.log("Erreur: " + error))

function infoBlocAnim() {
    document.getElementById("infoBloc").style.opacity = "1";
    document.querySelector("#underline").style.animation = "apparition-barre 1s";
    setTimeout(() => {
        document.querySelector("#underline").style.animation = ""
    }, 1010);
}

let quizzMode = false;

function switchMode() {
    quizzMode = !quizzMode;
    if (quizzMode) {
        css.setProperty('--switch-value', '30px');
        document.getElementById("infoBloc").style.opacity = "0";
    } else {
        clearQuizz(oldElement)
        css.setProperty('--switch-value', '0px');
        document.getElementById("infoBloc").style.opacity = "0";
    }
}

const listOfDiv = [
    document.getElementById('infos-couche'),
    document.getElementById('infos-discontinuite'),
    document.getElementById('quizz-couche'),
    document.getElementById('quizz-discontinuite')
    ];
function affichage(outputID) {
    for (let i in listOfDiv) {
        listOfDiv[i].hidden = true;
    };
    document.getElementById(outputID).hidden = false;
}

// Affichage des données spécifiques sur la page
function loadInformations(elementID) {

    // Si le mode quizz est activé, on termine l'execution de la fonction avant l'affichage
    if (quizzMode) {
        startQuizz(elementID);
        return
    };

// Animations
    infoBlocAnim();
    
// Affichage des infos

    if  (data[elementID].couche) { // vérifie qu'il ne s'agit pas d'une discontinuité
        affichage('infos-couche');

        document.querySelector("#infos-couche #nom").innerHTML = data[elementID].nom;
        document.querySelector("#infos-couche #densite").innerHTML = data[elementID].densite;
        document.querySelector("#infos-couche #roches").innerHTML = data[elementID].roches;
        document.querySelector("#infos-couche #etat").innerHTML = data[elementID].etat;

    } else { // sinon c'est une discontinuité
        affichage('infos-discontinuite');

        document.querySelector("#infos-discontinuite #nom").innerHTML = data[elementID].nom;
        document.querySelector("#infos-discontinuite #profondeur").innerHTML = data[elementID].profondeur;
    };
    
}
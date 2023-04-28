(function () {
    //IIFE
    //----------On utilise un mode de programmation strict
    "use strict";

    //Variables de l'application
    var divNoQuestion,
        noQuestionEnCours,
        divQuestionTxt,
        divImage,
        divLesLettres,
        divLesChoix,
        lettresChoisies,
        questionActuelle,
        score,
        sectionIntro,
        sectionQuiz,
        sectionFinJeu,
        nomLocalStorage,
        meilleurScore,
        dossierImg,
        event;

    window.addEventListener(
        "load",
        function () {
            event = {};
            (function () {
                var siTactile = "ontouchstart" in window; //Renvoie true pour mobile/écran tactile ou false pour desktop/souris
                event.down = siTactile ? "touchstart" : "mousedown";
                event.up = siTactile ? "touchend" : "mouseup";
            })();

            //Quand la page est chargée, on affiche ou non les diffétentes section
            sectionIntro = document.querySelector(".introQuiz");
            sectionQuiz = document.querySelector(".quiz");
            sectionFinJeu = document.querySelector(".finQuiz");

            //Au départ les sections ayant la classe .quiz et .finQuiz" ne sont pas affichées
            sectionQuiz.style.display = "none";
            sectionFinJeu.style.display = "none";

            //Quand la page est chargée, on récupère les balises nécessaires au quiz
            divNoQuestion = document.querySelector("#noQuestion");
            divQuestionTxt = document.querySelector("#question");
            divImage = document.querySelector("#image");
            divLesLettres = document.querySelector("#lesLettres");
            divLesChoix = document.querySelectorAll(".choix");

            //Sauvegarde du meilleur score
            nomLocalStorage = "scoreJeuOmbre";
            //Vérification d'un score antérieur
            console.log(window.localStorage);
            meilleurScore = localStorage.getItem(nomLocalStorage) == null ? 0 : localStorage.getItem(nomLocalStorage);
            console.log("meilleur score :", meilleurScore);

            //On identifie le dossier pour les images
            //Sur les petits écrans on affiche les petites images et vice-versa (voir le dossier des images)
            dossierImg = "./images/_480/";

            if (window.matchMedia("(min-width: 1024px)").matches) {
                dossierImg = "./images/_1024/";
            } else if (window.matchMedia("(min-width: 768px)").matches) {
                dossierImg = "./images/_768/";
            }

            //console.log(dossierImg);

            //On part l'animation de l'intro
            //On compose le texte à afficher
            var leTexte = "Deviner les ombres!!!. Cliquer ici pour débuter le quiz.";

            //On affiche ce texte avec un effet d'animation et on met un écouteur sur la division
            var laDiv = document.querySelector(".introQuiz > #texte");
            var textAnim = new AnimTexte(leTexte, laDiv, 60);
            document.addEventListener(event.down, initialiserQuiz, false);
        },
        false
    ); //Fin load

    function initialiserQuiz(evt) {
        evt.preventDefault();
        document.removeEventListener(event.down, initialiserQuiz, false);
        //Gérer l'affichage des sections
        sectionQuiz.style.display = "flex";
        sectionQuiz.style.display = "-webkit-box";
        sectionQuiz.style.display = "-ms-flexbox";
        sectionQuiz.style.display = "-webkit-flex";

        sectionIntro.style.display = "none";
        sectionFinJeu.style.display = "none";

        //Initialiser les variables
        noQuestionEnCours = 0;
        score = 0;
        lettresChoisies = "";

        //On affiche la première question
        afficherProchaineQuestion();
    } //Fin initialiserQuiz

    function afficherProchaineQuestion() {
        //On incrémente le no de la question
        noQuestionEnCours++;

        //On enlève le texte de la question et le texte inséré dans les lettres choisies
        divQuestionTxt.innerHTML = "";
        lettresChoisies = "";

        //S'il reste une question on l'affiche, sinon c'est la fin du jeu...
        if (noQuestionEnCours <= QuestionsQuiz.nbQuestions) {
            //On enregistre la question actuelle...(pour éviter de toujours la ré-évaluer dans le code...)
            questionActuelle = QuestionsQuiz["question" + noQuestionEnCours];

            //On affiche le numéro de la question
            divNoQuestion.innerHTML = noQuestionEnCours;

            //On affiche l'image à identifier
            divImage.style.backgroundImage = "url('./" + dossierImg + questionActuelle.images[0] + "')";

            //S'ily a des lettres dans le conteneur on les enlève
            while (divLesLettres.firstChild) {
                divLesLettres.removeChild(divLesLettres.firstChild);
            }

            //On affiche le nombre de lettres correspondant au personnage à trouver
            var nbLettres = questionActuelle.bonneReponse.length;
            var uneLettre;
            for (var i = 0; i < nbLettres; i++) {
                //On créé un élément de type <div>
                uneLettre = document.createElement("div");
                uneLettre.classList.add("lettre");
                divLesLettres.appendChild(uneLettre);
            }

            //On affiche les choix de réponse
            var nbChoix = divLesChoix.length;
            for (var i = 0; i < nbChoix; i++) {
                //On affiche les choix de réponse possibles
                divLesChoix[i].innerHTML = questionActuelle.choix[i];

                //On met un écouteur pour choisir la réponse
                divLesChoix[i].addEventListener(event.down, choisirLettre, false);

                //S'il y a lieu, on réactive les lettres
                divLesChoix[i].style.backgroundColor = "white";
                divLesChoix[i].style.cursor = "pointer";
            }

            //On anime le titre de la question
            var textAnim = new AnimTexte(QuestionsQuiz.titreQuestion, divQuestionTxt, 60);
        } else {
            finJeu();
        }
    } //Fin afficherProchaineQuestion

    function choisirLettre(evt) {
        //On fait jouer le son
        QuestionsQuiz.sons.choix.play();
        //On identifie la lettre choisie
        var laLettreChoisie = evt.target;

        //On enregistre son contenu dans la variable des lettres choisies
        lettresChoisies += laLettreChoisie.innerHTML;
        //console.log("lettresChoisies", lettresChoisies);

        //On met le contenu en haut
        var indexLettreChoisie = lettresChoisies.length - 1;
        var lesLettres = document.querySelectorAll("#lesLettres >.lettre");
        lesLettres[indexLettreChoisie].innerHTML = lettresChoisies[indexLettreChoisie];

        //On désactive la lettre choisie
        laLettreChoisie.removeEventListener("mousedown", choisirLettre, false);
        //laLettreChoisie.removeEventListener("touchstart",choisirLettre, false );
        laLettreChoisie.style.backgroundColor = "black";
        laLettreChoisie.innerHTML = "";
        laLettreChoisie.style.cursor = "default";

        //On vérifie si le joueur a choisi toutes les lettres possibles
        if (lettresChoisies.length == questionActuelle.bonneReponse.length) {
            //Si oui, on désactive tous les choix de lettres
            var nbChoix = divLesChoix.length;
            for (var i = 0; i < nbChoix; i++) {
                //On enlève l'écouteur pour choisir la réponse
                divLesChoix[i].removeEventListener("mousedown", choisirLettre, false);
                //divLesChoix[i].removeEventListener("touchstart", choisirLettre, false );
            }

            //On identifie ensuite si le joueur a eu la bonne réponse
            if (lettresChoisies == questionActuelle.bonneReponse) {
                //On incrémente le score
                score++;
                QuestionsQuiz.sons.bonneReponse.play();
                //On affiche l'image finale
                afficherFenetre("Excellent!", "url('" + dossierImg + questionActuelle.images[1] + "')");
            } else {
                QuestionsQuiz.sons.mauvaiseReponse.play();
                //On ré-affiche l'image de l'ombre
                afficherFenetre("Mauvaise réponse!", "url('" + dossierImg + questionActuelle.images[0] + "')");
            }
        }
    } // Fin choisirLettre

    function afficherFenetre(message, urlImage) {
        var laPage = document.querySelector("body");
        var texte = message;

        //On ajuste le message et l'action passée en référence selon que le quiz est terminée ou non

        texte += "<br><br>Cliquer dans la fenêtre pour deviner l'ombre suivante...";

        //function FenetreReponse(elementHTMLReference, classeCSS, texte, action, conteneurParent){
        var uneFenetre = new FenetreReponse(divImage, "fenetre", texte, urlImage, afficherProchaineQuestion, laPage);
    } // Fin afficherFenetre

    function finJeu() {
        //On gère l'affichage des sections
        console.log("C'est la fin du jeu!");
        sectionQuiz.style.display = "none";
        sectionFinJeu.style.display = "flex";
        sectionFinJeu.style.display = "-webkit-box";
        sectionFinJeu.style.display = "-ms-flexbox";
        sectionFinJeu.style.display = "-webkit-flex";

        //Vérification et enregistrement du meilleur score
        meilleurScore = Math.max(score, meilleurScore);
        localStorage.setItem(nomLocalStorage, meilleurScore);

        //On compose le texte à afficher
        var leTexte =
            "Ton score actuel est de : " + score + " personnages(s) identifié(s). Ton meilleur résultat est de : " + meilleurScore;
        leTexte += ". Clique ici pour faire un nouvel essai.";

        //On affiche ce texte avec un effet d'animation et on met un écouteur sur la division
        var laDiv = document.querySelector(".finQuiz > #texte");
        laDiv.innerHTML = "";
        var textAnim = new AnimTexte(leTexte, laDiv, 60);
        laDiv.addEventListener(event.down, initialiserQuiz, false);
    } //Fin finJeu
})(); //Fin IIFE

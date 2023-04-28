(function() {//IIFE
	//----------On utilise un mode de programmation strict
	"use strict";

	//JavaScript, utilise des fonctions pour définir une "classe" ou un moule... pour créer des objets 
	function Bouton(largeur, hauteur, couleurFond, couleurTexte, bordure, texte, conteneurParent) {
		//Récupérer les valeurs passées en paramètres et les affecter à des propriétés directes de l'instance
		this.largeur = largeur;
		this.hauteur = hauteur;
		this.couleurFond = couleurFond;
        this.couleurTexte = couleurTexte;
		this.bordure =  bordure;
        this.texte = texte;
		this.conteneurParent = conteneurParent;
		
		console.log(this, this.largeur, this.hauteur, this.couleurFond, this.couleurTexte, this.bordure, this.texte, this.conteneurParent);
		
		//Appeler la méthode d'instance pour créer le bouton
		this.creerBouton();
	 }

	 //Créer la méthode creerCarre pour un objet de type Carre
	Bouton.prototype.creerBouton = function() {
		//console.log("Je créée un carré...");
		
		//Le bouton est un élément HTML  <button>
		this.elemenHTML = document.createElement("button");
		
		//Attribuer au carre les propriétés passées en paramètre du construceur
		this.elemenHTML.style.width= this.largeur;
		this.elemenHTML.style.height =  this.hauteur;
		this.elemenHTML.style.backgroundColor = this.couleurFond;
        this.elemenHTML.style.color = this.couleurTexte;
        this.elemenHTML.style.border = this.border;
        this.elemenHTML.innerHTML = this.texte;
        this.elemenHTML.style.cursor = "pointer";

	
		//Afficher l'élément  <div>, dans son conteneur parent
		this.conteneurParent.appendChild(this.elemenHTML);		
	};
	
	//Comme la fonction IIFE est anonyme,  ses variables, fonctions ou autres ne seront pas accessibles de l'extérieur
	//Nous devons donc passer la "classe" Carre à l'objet HTML window comme propriété globale de notre application Web...
	//(voir la fin de la note de cours S10_optimisationDuCode.pdf)
	console.log("window.Bouton :", window.Bouton);
	
	window.Bouton = Bouton;

})();//Fin IIFE
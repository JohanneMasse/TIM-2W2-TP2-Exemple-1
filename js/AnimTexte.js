/**
 * Classe AnimTexte
 * 582-345 Programmation Animation II
 * @author Johanne Massé
 * @version 2016-11-15
 */


(function() {//IIFE
	//Usage d'un mode strict
	"use strict";
	
	/**
	  * Classe permettant d'aimer du texte dans une balise donnée
	  * @param {String} texte -  chaîne identifiant le texte à animer
	  * @param {HTMLElement} conteneurParent  -  balise HTML pour afficher le texte
	  * @param {Number} intervalleTemps  - temps en millisecondes avant l'appartition de chaque lettre
	  */

    function AnimTexte (texte, conteneurParent, intervalleTemps){
		//Récupérer les valeurs passées en paramètre
		this.texte = texte;
		this.conteneurParent = conteneurParent;
		this.intervalleTemps = intervalleTemps;
		
		//Autres propriétés
		this.nbCaracteres = this.texte.length;
		this.compteurCaracteres = 0;
		
		//Partir la première requête d'animation
		this.requeteID = window.requestAnimationFrame(this.ajouterLettre.bind(this));
		this.tempsInitial = window.performance.now();	
	}

	//Méthode d'instance pour faire apparaître chaque lettre selon l'intervalle de temps spécifié
     AnimTexte.prototype.ajouterLettre = function (tempsActuel){
		//S'il reste des lettres...
		//On ajoute une lettre au conteneur parent à tous les intervalles de temps spécifiés

		if(this.compteurCaracteres < this.nbCaracteres) {
			if((tempsActuel - this.tempsInitial) < this.intervalleTemps) {
				//On part une nouvelle requête d'animation
				this.requeteID =  window.requestAnimationFrame(this.ajouterLettre.bind(this));				
			} else  { 
				//On ajoute une lettre						
				this.conteneurParent.innerHTML += this.texte.charAt(this.compteurCaracteres);

				//On incrémente le compteur des caractères
				this.compteurCaracteres++;

				//Et on repart un requête d'animation
				this.requeteID = window.requestAnimationFrame(this.ajouterLettre.bind(this));
				//On réajuste la valeur du temps initial
				this.tempsInitial = tempsActuel;
			}

		} else {
			//On arrete les requêtes d'animation
			window.cancelAnimationFrame(this.requeteID);
			//On enlève la référence au conteneur parent
			this.conteneurParent= null;
		}					
          
        }//Fin ajouterLettre


	//Mettre la classe publique
    window.AnimTexte=AnimTexte; //ou return AnimTexte;  

})();//Fin IIFE
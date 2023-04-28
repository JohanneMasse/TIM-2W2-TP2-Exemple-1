/**
 * Classe FenetreReponse
 * 582-345 Programmation Animation II
 * @author Johanne Massé
 * @version 2016-11-13
 */

(function() {//IIFE
	//Usage d'un mode strict
	"use strict";

		/**
		  * Classe permettant de créer d'afficher une fenêtre selon les coordonnées d'un élément HTML transmis
		  * d'afficher une image et d'appeler une fonction du conteneur parent
		  * @param {HTMLElement} elementHTMLReference - pour calculer la position et les dimensons de la fenêtre à afficher
		  * @param {String} classeCSS  - classe CSS pour la mise en forme de la fenêtre
		  * @param {String} texte  - texte à afficher dans la fenêtre
		  * @param {String} urlImage  - url de l'image à afficher dans la fenêtre
		  * @param {Function} action  - fonction à appeler sur un mousedown
		  * @param {HTMLElement} conteneurParent -  balise HTML pour afficher les mots animés
		  */
	
		function FenetreReponse(elementHTMLReference, classeCSS, texte, urlImage, action, conteneurParent){
			//Récupérer les valeurs passées en paramètre			
			this.elementHTMLReference = elementHTMLReference;
			this.classeCSS = classeCSS;
			this.texte = texte;
			this.urlImage = urlImage;
			
			this.action = action;
			this.conteneurParent = conteneurParent;

		    //Autres propriétés de la fenêtre
			this.requeteID = 0;
			this.pourcentageEchelle = 0;
			
			//Créer la fenêtre
			this.creerFenetre();
		}

		/**
		  * Méthode pour créer et afficher les instances de la classe Fenetre
		  */
		FenetreReponse.prototype.creerFenetre = function(){
			//Récupérer les styles de l'élément de référence
			var leStyle = window.getComputedStyle(this.elementHTMLReference,null);
			
			//Créer une balise <div>
			this.elHTML = document.createElement('div');
			
			//Appliquer les éléments de style
			this.elHTML.style.position = "absolute";			
			this.elHTML.style.width = leStyle.getPropertyValue("width");
			this.elHTML.style.height =  leStyle.getPropertyValue("height");
			this.elHTML.style.left = this.elementHTMLReference.offsetLeft + "px";
			this.elHTML.style.top = this.elementHTMLReference.offsetTop + "px";
			this.elHTML.classList.add(this.classeCSS);
			this.elHTML.style.backgroundImage = this.urlImage;
			this.elHTML.style.transformOrigin = "50% 50%";
			this.elHTML.style.webkitTransformOrigin = "50% 50%";

			//Mettre le texte et la fenêtre dans son conteneur parent
			this.elHTML.innerHTML = this.texte;
			this.conteneurParent.appendChild(this.elHTML);
			
						
			//Mettre un écouteur pour fermer la fenêtre et appeler la fonction passée en paramètre	
			this.elHTML.addEventListener("mousedown", this.fermerFenetre.bind(this), false );

			//Partir la première RequestAnimationFrame		
			this.requeteID = window.requestAnimationFrame(this.animerArriveeFenetre.bind(this));
		}

		
		/**
		  * Méthode pour animer la fenêtre au moment de son affichage
		  */
		FenetreReponse.prototype.animerArriveeFenetre = function(tempsActuel){	
           
			//Incrémenter le pourcentage d'animation pour l'échelle
			this.pourcentageEchelle += 0.03;
			
			//On agrandit la fenêtre tant que son échelle est < 1,
			//Sinon, on cancelle le RAF
			
			if(this.pourcentageEchelle < 1 ){
				//Animer l'échelle
				this.elHTML.style.transform = "scale(" + this.pourcentageEchelle + ")";
				this.elHTML.style.webkitTransform = "scale(" + this.pourcentageEchelle + ")";
				
				//Prochaine requête d'animation
				this.requeteID = window.requestAnimationFrame(this.animerArriveeFenetre.bind(this));
			} else {
				//Arrêter l'Animation RAF
				window.cancelAnimationFrame(this.requeteID);
			}

		}
		
		FenetreReponse.prototype.fermerFenetre = function(evt){
			console.log("fermerFenetre", this);
			//Enlever l'écouteur sur l'élément HTML
			this.elHTML.removeEventListener("mousedown", this.fermerFenetre, false );
			//Enlever la fenetre
			this.conteneurParent.removeChild(this.elHTML);
			
			//Appeler la fonction passée en paramètre
			this.action();
			
			//Arrêter la propagation de l'événement!!!
			evt.stopPropagation();
		}	
		

		//Mettre la classe publique
		window.FenetreReponse = FenetreReponse;

})();//Fin IIFE
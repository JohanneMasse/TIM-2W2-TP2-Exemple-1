(function() {//IIFE
	//----------On utilise un mode de programmation strict
	"use strict";

		//Objet littéral pour les questions du quiz
	var QuestionsQuiz = {
		"nbQuestions" : 5,

		"titreQuestion" : "Qui est ce personnage?",

		"question1":
			{
				"images": ["tintin_0.png", "tintin_1.png"],
				"choix": ["Z", "N", "A", "T", "T", "B", "I", "N", "C" , "I", "X", "T" ],
				"bonneReponse": "TINTIN"
			},

		"question2":
			{
				"images": ["omer_0.png", "omer_1.png"],
				"choix": ["R", "N", "A", "O", "T", "B", "I", "E", "C" , "I", "X", "M" ],
				"bonneReponse": "OMER"
			},

		"question3":
			{
				"images": ["pikachu_0.png", "pikachu_1.png"],
				"choix": ["I", "G", "A", "T", "C", "H", "I", "K", "C" , "O", "P", "U" ],
				"bonneReponse":"PIKATCHU"
			},

		"question4":
			{
				"images": ["mario_0.png", "mario_1.png"],
				"choix": ["I", "G", "A", "T", "C", "H", "I", "K", "C" , "O", "M", "R" ],
				"bonneReponse": "MARIO"
			},

		"question5":
			{
				"images": ["zelda_0.png", "zelda_1.png"],
				"choix": ["L", "G", "A", "T", "E", "H", "I", "K", "C" , "Z", "D", "N" ],
				"bonneReponse": "ZELDA"
			},
		

		
		"sons":
			{
				"bonneReponse": new Audio('sons/bon.mp3'),
				"mauvaiseReponse":new Audio('sons/mauvais.mp3'),
				"choix":new Audio('sons/choix.wav'),		
			}
	}


	//Mettre les questions publiques
	window.QuestionsQuiz = QuestionsQuiz; 

})();//Fin IIFE
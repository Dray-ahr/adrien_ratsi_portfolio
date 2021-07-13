sap.ui.define([], function() {
	"use strict";
	
	return {
		
		/* Permet d'afficher les bonnes realisations pour chaque vue */
		hideRealisation : function(page, techno, control){
			var display = false;
			var p = page.trim();
			
			//si le tableau contient le nom de la vue actuelle
			if(techno.indexOf(p) !== -1) {
				display = true;
			}
			
			return display;
		},
		
		ToPercentage : function(value){
			return parseFloat(value);
		},
		
		translateData : function(index){
			return "";
		}
	};
});
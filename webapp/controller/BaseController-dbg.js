/*global history */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox"
], function (Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("adrien_ratsimihah_portfolio.controller.BaseController", {

		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model in every controller of the application.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		getCustomResourceBundle: function (language) {
			if (language === "fr-FR") {
				return this.getOwnerComponent().getModel("i18n").getResourceBundle();
			} else {
				return this.getOwnerComponent().getModel("i18n_en").getResourceBundle();
			}

		},

		getLanguage: function () {
			return sap.ui.getCore().getConfiguration().getLanguage();
		},

		adaptLanguage: function (othis) {
			var bCompact = !!othis.getView().$().closest(".sapUiSizeCompact").length;
			var reloadPageMsg = othis.getOwnerComponent().getModel("general").getData().reload_page_message;
			var errorMsg = othis.getOwnerComponent().getModel("general").getData().error_message;

			//chemin absolue du root 
			var path = jQuery.sap.getModulePath("adrien_ratsimihah_portfolio");

			//langage
			var languageData = "";
			try {
				languageData = othis.getOwnerComponent().getModel("languageModel").getData();
				if(!languageData) {
					languageData.current_language = this.adaptLanguage();
				}
			} catch (err) {}

			if (languageData.current_language === "en-EN") {
				var generalModel = new sap.ui.model.json.JSONModel([path, "model/general_en.json"].join("/"));
				var temoignageModel = new sap.ui.model.json.JSONModel([path, "model/temoignage_en.json"].join("/"));
				var techModel = new sap.ui.model.json.JSONModel([path, "model/competence_tech.json"].join("/"));
				var humModel = new sap.ui.model.json.JSONModel([path, "model/competence_hum_en.json"].join("/"));
				var formationModel = new sap.ui.model.json.JSONModel([path, "model/formation_en.json"].join("/"));
				var experienceModel = new sap.ui.model.json.JSONModel([path, "model/experience_en.json"].join("/"));
				var realisationModel = new sap.ui.model.json.JSONModel([path, "model/realisation_en.json"].join("/"));

				//Chargement des donn??es 
				generalModel.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es du competence tec avec le bon fichier json
					generalModel.setData(oEvent.getSource().getData());

					//Aucune donn??e n'a pu ??tre r??cup??r??
					if (JSON.stringify(oEvent.getSource().getData()) === "{}"){
						MessageBox.error(
							reloadPageMsg, {
								title: errorMsg,
								styleClass: bCompact ? "sapUiSizeCompact" : "",
								onClose: function () {
									var myLocation = location;
									myLocation.reload();
								}
							}
						);
					}
				});
				othis.setModel(generalModel, "general");
				
				temoignageModel.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es du temoignage avec le bon fichier json
					temoignageModel.setData(oEvent.getSource().getData());
				});
				othis.setModel(temoignageModel, "temoignage");

				techModel.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es du competence tec avec le bon fichier json
					techModel.setData(oEvent.getSource().getData());
				});
				othis.setModel(techModel, "competence_tech");

				humModel.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es du competence hum avec le bon fichier json
					humModel.setData(oEvent.getSource().getData());
				});
				othis.setModel(humModel, "competence_hum"); //Chargement des donn??es 

				formationModel.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es de formation avec le bon fichier json
					formationModel.setData(oEvent.getSource().getData());
				});
				othis.setModel(formationModel, "formation");

				experienceModel.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es d'exp??riences avec le bon fichier json
					experienceModel.setData(oEvent.getSource().getData());
				});
				othis.setModel(experienceModel, "experience");

				realisationModel.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es de r??alisation avec le bon fichier json
					realisationModel.setData(oEvent.getSource().getData());
				});
				othis.setModel(realisationModel, "realisation");
			} else {
				//Affichage en fran??ais
				var generalModelFR = new sap.ui.model.json.JSONModel([path, "model/general.json"].join("/"));
				var temoignageModelFR = new sap.ui.model.json.JSONModel([path, "model/temoignage.json"].join("/"));
				var techModelFR = new sap.ui.model.json.JSONModel([path, "model/competence_tech.json"].join("/"));
				var humModelFR = new sap.ui.model.json.JSONModel([path, "model/competence_hum.json"].join("/"));
				var formationModelFR = new sap.ui.model.json.JSONModel([path, "model/formation.json"].join("/"));
				var experienceModelFR = new sap.ui.model.json.JSONModel([path, "model/experience.json"].join("/"));
				var realisationModelFR = new sap.ui.model.json.JSONModel([path, "model/realisation.json"].join("/"));

				//Chargement des donn??es 
				generalModelFR.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es du competence tec avec le bon fichier json
					generalModelFR.setData(oEvent.getSource().getData());

					//Aucune donn??e n'a pu ??tre r??cup??r??
					if (JSON.stringify(oEvent.getSource().getData()) === "{}"){
						MessageBox.error(
							reloadPageMsg, {
								title: errorMsg,
								styleClass: bCompact ? "sapUiSizeCompact" : "",
								onClose: function () {
									var myLocation = location;
									myLocation.reload();
								}
							}
						);
					}
				});
				othis.setModel(generalModelFR, "general");
				
				temoignageModelFR.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es du temoignage avec le bon fichier json
					temoignageModelFR.setData(oEvent.getSource().getData());
				});
				othis.setModel(temoignageModelFR, "temoignage");

				techModelFR.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es du competence tec avec le bon fichier json
					techModelFR.setData(oEvent.getSource().getData());
				});
				othis.setModel(techModelFR, "competence_tech");

				humModelFR.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es du competence hum avec le bon fichier json
					humModelFR.setData(oEvent.getSource().getData());
				});
				othis.setModel(humModelFR, "competence_hum"); //Chargement des donn??es 

				formationModelFR.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es de formation avec le bon fichier json
					formationModelFR.setData(oEvent.getSource().getData());
				});
				othis.setModel(formationModelFR, "formation");

				experienceModelFR.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es d'exp??riences avec le bon fichier json
					experienceModelFR.setData(oEvent.getSource().getData());
				});
				othis.setModel(experienceModelFR, "experience");

				realisationModelFR.attachRequestCompleted(function (oEvent) {
					//On modifie les donn??es de r??alisation avec le bon fichier json
					realisationModelFR.setData(oEvent.getSource().getData());
				});
				othis.setModel(realisationModelFR, "realisation");
			}
		},

		reloadModel: function (model, fn) {
			var path = jQuery.sap.getModulePath("adrien_ratsimihah_portfolio");
			var humModel = new sap.ui.model.json.JSONModel([path, "model/competence_hum.json"].join("/"));
			// if (language === "en-EN") {
			// 	var humModel = new sap.ui.model.json.JSONModel([path, "model/competence_hum_en.json"].join("/"));
			// }
			humModel.attachRequestCompleted(function (oEvent) {
				//On modifie les donn??es du competence hum avec le bon fichier json
				humModel.setData(oEvent.getSource().getData());
				return oEvent.getSource().getData();
			});
			// this.setModel(humModel, "competence_hum"); //Chargement des donn??es 
		},

		/* Supprime des virgules en trop */
		removeVirgule: function (data) {
			var partie = "";

			if (data !== undefined) {
				//Pour r??cup??rer le texte sans les virgules
				for (var i = 0; i <= data.length - 1; i++) {
					partie = partie + data[i];
				}
				return partie;
			}

		},

		/* Au clique sur une r??alisation */
		onRealisationClick: function (oEvent, othis, nomfragment) {

			var i = 0;
			var presentation = "";
			var that = othis;

			//R??cup??ration de l'index du projet s??lectionn??, mis dans une propri??t?? 
			var index = oEvent.getSource().getFailedText();

			//chemin de la r??alisation
			// var path = oEvent.getSource().getBindingInfo("backgroundImage").binding.getContext().getPath();
			var path = "/Realisations/" + index;

			//Binding de l'??l??ment avec le dialog
			that.realisation.bindElement(path);

			//R??cup??ration du model
			var oModel = that.getModel("realisation");
			//R??cup??re chemin dans le mod??le de la r??alisation choisi
			var data = oModel.getProperty(path);

			//Modifie le titre de la boite de dialogue avec nom de r??alisation
			that.realisation.setTitle(data.nom);

			//Pour avoir le bon chemin pour FLP
			var imagepath = that.getModel("imageModel").getData().path + "/";

			//Modifie l'image de la r??alisation
			sap.ui.core.Fragment.byId(nomfragment, "realisation_image").setProperty("src", imagepath + data.image);

			//Modifie bouton fermer 
			sap.ui.core.Fragment.byId(nomfragment, "close_button").setProperty("text", data.close_button);
			//Modifie comp??tences d??velopp??s 
			sap.ui.core.Fragment.byId(nomfragment, "developed_skills").setProperty("text", data.developed_skills);

			//Modifie les textes de la r??alisation
			//Pour r??cup??rer le texte sans les virgules
			for (i = 0; i <= data.presentation.length - 1; i++) {
				presentation = presentation + data.presentation[i];
			}

			//Modifie le texte de la r??alisation
			sap.ui.core.Fragment.byId(nomfragment, "realisation_presentation").setProperty("htmlText", presentation);

			//Modifie les comp??tences de la r??alisation
			sap.ui.core.Fragment.byId(nomfragment, "realisation_competencetech").setProperty("htmlText", data.competence_tech);
			sap.ui.core.Fragment.byId(nomfragment, "realisation_competencehum").setProperty("htmlText", data.competence_hum);

			//Ouverture du dialog
			that.realisation.open();

		},

		/* Fermeture de la dialog affichant la r??alisation */
		onCloseRealisation: function (oEvent) {
			var source = oEvent.getSource();
			source.getParent().close();
		}

		/**
		 * Event handler for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 
		onNavBack : function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

				if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("home", {}, true);
			}
		}*/

	});

});
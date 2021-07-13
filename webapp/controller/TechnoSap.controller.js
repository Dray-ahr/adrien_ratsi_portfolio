sap.ui.define([
	"adrien_ratsimihah_portfolio/controller/BaseController",
	"adrien_ratsimihah_portfolio/model/formatter"
], function(BaseController, formatter) {
	"use strict";

	return BaseController.extend("adrien_ratsimihah_portfolio.controller.TechnoSap", {

		formatter: formatter,

		onInit: function() {
			this._base = sap.ui.controller("adrien_ratsimihah_portfolio.controller.BaseController");
			this.getRouter().attachRouteMatched(this.handleRouteMatched, this);
			this._refresh = false;

			var language;
			try {
				language = this.getOwnerComponent().getModel("languageModel").getData();
			} catch (err) {
				this._refresh = true;
			}

			//ID de frgament pour cette view
			this.nomfragment = "technosap_fragment";
			this.realisation = sap.ui.xmlfragment(this.nomfragment, "adrien_ratsimihah_portfolio.view.fragment.realisation", this);
			this.getView().addDependent(this.realisation);
		},

		handleRouteMatched: function(evt) {
			this.getSkillData();
			this.getRealisationData();
		},

		/* Récupération des compétences */
		getSkillData: function() {
			var self = this;
			return new Promise(function(resolve, reject) {
				//chemin absolue du root 
				var path = jQuery.sap.getModulePath("adrien_ratsimihah_portfolio");

				var partie = "";
				var data = "";

				//langage
				var language;
				try {
					language = self.getOwnerComponent().getModel("languageModel").getData();
				} catch (err) {}

				var techModel;
				techModel = new sap.ui.model.json.JSONModel([path, "model/sap.json"].join("/"));
				if (self._refresh === false && language.current_language === "en-EN") {
					techModel = new sap.ui.model.json.JSONModel([path, "model/sap_en.json"].join("/"));
				}

				techModel.attachRequestCompleted(function(oEvent) {
					//On modifie les données du competence tec avec le bon fichier json
					techModel.setData(oEvent.getSource().getData());
					
					//Titre page
					data = techModel.getProperty("/Sap_new_technos_titre");
					self.getView().byId("pageTitle").setTitle(data);
					
					//Titre Techno utilisés
					data = techModel.getProperty("/sap_technos_use");
					self.getView().byId("technoLabel").setText(data);

					//Detail 
					data = techModel.getProperty("/Sap_new_technos_detail");
					partie = self._base.removeVirgule(data);
					self.getView().byId("new_technos_detail").setHtmlText(partie);

					self._refresh = false;
					resolve("");
				});
				self.setModel(techModel, "sap");

			});
		},

		/* Récupération des réalisations */
		getRealisationData: function() {
			var self = this;

			return new Promise(function(resolve, reject) {
				//chemin absolue du root 
				var path = jQuery.sap.getModulePath("adrien_ratsimihah_portfolio");

				//langage
				var language;
				try {
					language = self.getOwnerComponent().getModel("languageModel").getData();
				} catch (err) {}

				var realModel;
				realModel = new sap.ui.model.json.JSONModel([path, "model/realisation.json"].join("/"));
				if (self._refresh === false && language.current_language === "en-EN") {
					realModel = new sap.ui.model.json.JSONModel([path, "model/realisation_en.json"].join("/"));
				}
				realModel.attachRequestCompleted(function(oEvent) {
					self.getView().byId("realisationLabel").setText(realModel.getProperty("/morereal"));
					//On modifie les données du competence hum avec le bon fichier json
					realModel.setData(oEvent.getSource().getData());
					resolve("");
				});
				self.setModel(realModel, "realisation"); //Chargement des données 

			});
		},

		//Appel de la méthode du base controller
		onRealisationClick: function(oEvent) {
			this._base.onRealisationClick(oEvent, this, this.nomfragment);
		},

		onNavBack: function() {
			this.getRouter().navTo("home", {}, true);
		}

	});
});
sap.ui.define([
	"adrien_ratsimihah_portfolio/controller/BaseController",
	"adrien_ratsimihah_portfolio/model/formatter"
], function(BaseController, formatter) {
	"use strict";

	return BaseController.extend("adrien_ratsimihah_portfolio.controller.HtmlCssJavascript", {

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
			this.nomfragment = "htmlcssjs_fragment";
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
				techModel = new sap.ui.model.json.JSONModel([path, "model/competence_tech.json"].join("/"));
				if (self._refresh === false && language.current_language === "en-EN") {
					techModel = new sap.ui.model.json.JSONModel([path, "model/competence_tech_en.json"].join("/"));
				}

				techModel.attachRequestCompleted(function(oEvent) {

					//Titre page
					data = techModel.getProperty("/htmlcssjs_titre");
					self.getView().byId("pageTitle").setTitle(data);

					//On modifie les données du competence tec avec le bon fichier json
					techModel.setData(oEvent.getSource().getData());

					//Detail 
					data = techModel.getProperty("/htmlcssjs_detail");
					partie = self._base.removeVirgule(data);
					self.getView().byId("htmlcssjs_detail").setHtmlText(partie);

					self._refresh = false;
					resolve("");
				});
				self.setModel(techModel, "competence_tech");

			});
		},

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

				var realisationModel;
				realisationModel = new sap.ui.model.json.JSONModel([path, "model/realisation.json"].join("/"));
				if (self._refresh === false && language.current_language === "en-EN") {
					realisationModel = new sap.ui.model.json.JSONModel([path, "model/realisation_en.json"].join("/"));
				}

				realisationModel.attachRequestCompleted(function(oEvent) {
					self.getView().byId("realisationLabel").setText(realisationModel.getProperty("/morereal"));
					//On modifie les données du realisation avec le bon fichier json
					realisationModel.setData(oEvent.getSource().getData());

					var realisationModel2 = new sap.ui.model.json.JSONModel();
					self.setModel(realisationModel2, "realisation2");
					var i = 0;
					var tab = [];
					var obj = {
						"Realisations": ""
					};

					if (oEvent.getSource().getData().Realisations instanceof Array) {
						for (i = 0; i <= oEvent.getSource().getData().Realisations.length - 1; i++) {
							if (oEvent.getSource().getData().Realisations[i].techno.indexOf("HTMLCSSJS") !== -1) {
								tab.push(oEvent.getSource().getData().Realisations[i]);
							}
						}
					}
					obj.Realisations = tab;
					realisationModel2.setData(obj);
					resolve("");
				});
				self.setModel(realisationModel, "realisation");

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
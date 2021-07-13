sap.ui.define([
	"adrien_ratsimihah_portfolio/controller/BaseController",
	"adrien_ratsimihah_portfolio/model/formatter"
], function(BaseController, formatter) {
	"use strict";

	return BaseController.extend("adrien_ratsimihah_portfolio.controller.Sap", {

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
			this.nomfragment = "sap_fragment";
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
					data = techModel.getProperty("/Sap_titre");
					self.getView().byId("pageTitle").setTitle(data);
					
					//Titre Modules SAP
					data = techModel.getProperty("/sap_modules_title");
					self.getView().byId("moduleTitle").setText(data);
					
					//Titre Techno utilisés
					data = techModel.getProperty("/sap_technos_use");
					self.getView().byId("technoLabel").setText(data);

					//Detail sur modules sap
					data = techModel.getProperty("/Sap_detail/module_detail");
					partie = self._base.removeVirgule(data);
					self.getView().byId("module_detail").setHtmlText(partie);

					//Détail sur les technologies utilisé
					partie = "";
					data = " ";
					data = techModel.getProperty("/Sap_detail/techno_detail");
					partie = self._base.removeVirgule(data);
					self.getView().byId("techno_detail").setHtmlText(partie);

					self._refresh = false;
					resolve("");
				});
				self.setModel(techModel, "sap");

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
							if (oEvent.getSource().getData().Realisations[i].techno.indexOf("SAP") !== -1) {
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
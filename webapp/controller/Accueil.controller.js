sap.ui.define([
	"adrien_ratsimihah_portfolio/controller/BaseController",
	"adrien_ratsimihah_portfolio/model/formatter",
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Label",
	"sap/m/Text",
	'sap/m/MessageBox'
], function (BaseController, formatter, UIComponent, MessageToast, Dialog, Button, Label, Text, MessageBox) {
	"use strict";

	return BaseController.extend("adrien_ratsimihah_portfolio.controller.Accueil", {

		formatter: formatter,

		onInit: function () {
			// sap.ui.core.BusyIndicator.show(); 
			this.baseController = sap.ui.controller("adrien_ratsimihah_portfolio.controller.BaseController");

			//ID de frgament pour cette view
			this.nomfragment = "accueil_fragment";
			this.realisation = sap.ui.xmlfragment(this.nomfragment, "adrien_ratsimihah_portfolio.view.fragment.realisation", this);
			this.getView().addDependent(this.realisation);

			// this._CLIENT_ID = "45600598131-kjs0t4hl1gdhefiaa16bimj164n6moud.apps.googleusercontent.com";
			// this._API_KEY = "AIzaSyBkeKWbQsIRIXxTBRRLnn7K1Ao34poqmRU";
			// this._SCOPES = ['https://mail.google.com/', 'https://www.googleapis.com/auth/gmail.send',
			// 	'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/gmail.labels'
			// ];

			this.t = null;
			this.baseController.adaptLanguage(this);

		},

		onAfterRendering: function (oEvent) {
			// sap.ui.core.BusyIndicator.hide(); 
		},

		//Appel de la méthode du base controller
		onRealisationClick: function (oEvent) {

			this.baseController.onRealisationClick(oEvent, this, this.nomfragment);
			var self = this;

			// gapi.client.setApiKey(self._API_KEY);
			// window.setTimeout(self.checkAuth(self), 1);

			// sap.m.URLHelper.triggerEmail("adrien.ahr@gmail.com", "portfolio adrien", "portfolio message");

			// this.initializeGMailInterface();

		},

		// handleAuthResult: function(authResult) {
		// 	var self = this;
		// 	if (authResult && !authResult.error) {
		// 		self.loadGmailApi();
		// 	}
		// },

		// initializeGMailInterface: function() {
		// 	var self = this;
		// 	gapi.auth.authorize({
		// 		client_id: self._CLIENT_ID,
		// 		scope: self._SCOPES,
		// 		immediate: false
		// 	}, self.handleAuthResult);

		// 	gapi.auth.signIn({
		// 		'callback': self.gPlusLoginCallback
		// 	});
		// },

		// gPlusLoginCallback: function(authResult) {
		// 	if (authResult['status']['signed_in']) {
		// 		this.doSmth(authRes['access_token']);
		// 	} else if (authResult['error'] == "immediate_failed") {
		// 		gapi.auth.authorize({
		// 			client_id: gplusClientId,
		// 			scope: 'https://www.googleapis.com/auth/plus.login email',
		// 			immediate: true
		// 		}, function(authRes) {
		// 			if (authRes['status']['signed_in']) {
		// 				this.doSmth(authRes['access_token']);
		// 			}
		// 		});
		// 	}
		// },

		// loadGmailApi: function() {
		// 	var self = this;
		// 	gapi.client.load('gmail', 'v1', function() {
		// 		console.log("Loaded GMail API");
		// 		self.sendEmail();
		// 	});
		// },

		// doSmth: function() {
		// 	this.sendEmail();
		// },

		// sendEmail: function() {
		// 	var content = 'HELLO';
		// 	// I have an email account on GMail.  Lets call it 'theSenderEmail@gmail.com'
		// 	var sender = 'portfoliomukuna@gmail.com';
		// 	// And an email account on Hotmail.  Lets call it 'theReceiverEmail@gmail.com'\
		// 	// Note: I tried several 'receiver' email accounts, including one on GMail.  None received the email.
		// 	var receiver = 'loulou.om@hotmail.fr';
		// 	var to = 'To: ' + receiver;
		// 	var from = 'From: ' + sender;
		// 	var subject = 'Subject: ' + 'HELLO TEST';
		// 	var contentType = 'Content-Type: text/plain; charset=utf-8';
		// 	var mime = 'MIME-Version: 1.0';

		// 	var message = "essai portfolio";
		// 	message += to + "\r\n";
		// 	message += from + "\r\n";
		// 	message += subject + "\r\n";
		// 	message += contentType + "\r\n";
		// 	message += mime + "\r\n";
		// 	message += "\r\n" + content;

		// 	this.sendMessage(message, receiver, sender);
		// },

		// sendMessage: function(message, receiver, sender) {
		// 	var headers = this.getClientRequestHeaders();
		// 	var path = "gmail/v1/users/me/messages/send?key=" + this._CLIENT_ID;
		// 	var base64EncodedEmail = btoa(message).replace(/\+/g, '-').replace(/\//g, '_');
		// 	gapi.client.request({
		// 		path: path,
		// 		method: "POST",
		// 		headers: headers,
		// 		body: {
		// 			'raw': base64EncodedEmail
		// 		}
		// 	}).then(function(response) {
		// 		alert("email envoyé");
		// 	});
		// },

		// getClientRequestHeaders: function() {
		// 	if (!this.t) this.t = gapi.auth.getToken();
		// 	gapi.auth.setToken({
		// 		token: this.t['access_token']
		// 	});
		// 	var a = "Bearer " + this.t["access_token"];
		// 	return {
		// 		"Authorization": a,
		// 		"X-JavaScript-User-Agent": "Google APIs Explorer"
		// 	};
		// },

		// checkAuth: function(self) {
		// 	var scopes = 'https://www.googleapis.com/auth/gmail.readonly " + "https://www.googleapis.com/auth/gmail.send';

		// 	gapi.auth.authorize({
		// 		client_id: self._CLIENT_ID,
		// 		scope: scopes,
		// 		immediate: true
		// 	}, self.handleAuthResult);
		// },

		// //Check les autorisations
		// handleAuthResult: function(oAuth) {
		// 	var self = this;
		// 	if (oAuth && !oAuth.error) {
		// 		gapi.client.load("gmail", "v1", function() {
		// 			console.log("Loaded GMail API");
		// 			self.sendEmail();
		// 		});
		// 	}
		// },

		// sendEmail: function() {
		// 	// $('#send-button').addClass('disabled');
		// 	var self = this;

		// 	this.sendMessage({
		// 			"To": "loulou.om@hotmail.fr",
		// 			"Subject": "essai mail"
		// 		},
		// 		"mail venant du portfolio",
		// 		self.composeTidy
		// 	);

		// 	return false;
		// },

		// composeTidy: function() {
		// 	// alert("composeTidy");
		// 	// vider les champs du formulaire
		// },

		// sendMessage: function(headers_obj, message, callback) {
		// 	var email = "";

		// 	for (var header in headers_obj)
		// 		email += header += ": " + headers_obj[header] + "\r\n";

		// 	email += "\r\n" + message;

		// 	var sendRequest = gapi.client.gmail.users.messages.send({
		// 		"userId": "me",
		// 		"resource": {
		// 			"raw": window.btoa(email).replace(/\+/g, "-").replace(/\//g, "_")
		// 		}
		// 	});

		// 	return sendRequest.execute(callback);
		// },

		/* Au clic sur une compétence technique */
		onCompetenceTechClick: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var id = oEvent.getSource().data("id_competence");
			var id2 = oEvent.getSource().data("detail_competence");
			//Compétences techniques
			if (id === "rpa_competence" || id2 === "rpa_competence") {
				oRouter.navTo("rpa");
			} else if (id === "sap_competence" || id2 === "sap_competence") {
				oRouter.navTo("sap");
			} else if (id === "htmlcssjs_competence" || id2 === "htmlcssjs_competence") {
				oRouter.navTo("htmlcssjavascript");
			} else if (id === "javaphp_competence" || id2 === "javaphp_competence") {
				oRouter.navTo("javaphp");
			} else if (id === "sql_competence" || id2 === "sql_competence") {
				oRouter.navTo("sql");
			} else if (id === "technosap_competence" || id2 === "technosap_competence") {
				oRouter.navTo("technosap");
			}
		},

		/* Au clic sur une compétence humaine */
		onCompetenceHumClick: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var id = oEvent.getSource().data("id_competence");
			var id2 = oEvent.getSource().data("detail_competence");
			//Compétences humaines
			if (id === "flexibilite_competence" || id2 === "flexibilite_competence") {
				oRouter.navTo("flexibilite");
			} else if (id === "presenter_competence" || id2 === "presenter_competence") {
				oRouter.navTo("presenter");
			} else if (id === "transmettre_competence" || id2 === "transmettre_competence") {
				oRouter.navTo("transmettre");
			} else if (id === "autonomie_competence" || id2 === "autonomie_competence") {
				oRouter.navTo("autonomie");
			}
		},

		loadLanguageModel: function (model, id, oEvent) {

			// //Chargement des données 
			model.attachRequestCompleted(function (oEve) {
				//On modifie les données du competence tec avec le bon fichier json
				model.setData(oEvent.getSource().getData());
			});
			this.setModel(model, id);
		},

		/* Au clic sur un drapeau de traduction */
		changeLanguage: function (oEvent) {
			sap.ui.core.BusyIndicator.show();
			var altFlag = oEvent.getSource().getProperty("alt");
			var languageModel = this.getModel("languageModel");
			var languageData = languageModel.getData();

			if (languageData.current_language === "fr-FR" && altFlag === "flag_french") {
				sap.ui.core.BusyIndicator.hide();
				return;
			} else if (languageData.current_language === "en-EN" && altFlag === "flag_england") {
				sap.ui.core.BusyIndicator.hide();
				return;
			} else if (languageData.current_language === "fr-FR" && altFlag !== "flag_french") {
				//Passage à l'anglais
				languageModel.setData({
					"current_language": "en-EN"
				});
				this.baseController.adaptLanguage(this);
				sap.ui.core.BusyIndicator.hide();

			} else {
				//Passage au français
				languageModel.setData({
					"current_language": "fr-FR"
				});
				this.baseController.adaptLanguage(this);
				sap.ui.core.BusyIndicator.hide();
			}
		},

		validateEmail: function (email) {
			var re =
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},

		contactFormChange: function (e) {
			var good = true;
			var minimalLength = this.getModel("general").getData().error_minimal_length_message;
			var errorMailValidityMsg = this.getModel("general").getData().invalid_mail_message;
			var contactFormName = this.getView().byId("contactFormName");
			var contactFormMail = this.getView().byId("contactFormMail");
			var contactFormMessage = this.getView().byId("contactFormMessage");

			if (contactFormName.getValue() === "" || contactFormMail.getValue() === "" || contactFormMessage.getValue() === "") {
				good = false;
			}

			if (contactFormMail.getValue().length > 1 && this.validateEmail(contactFormMail.getValue()) === false) {
				good = false;
				this.getView().byId("errorMailValidityLabel").setText(errorMailValidityMsg);
				this.getView().byId("errorMailValidityLabel").setVisible(true);
			} else this.getView().byId("errorMailValidityLabel").setVisible(false);

			if (contactFormMessage.getValue().length > 0 && contactFormMessage.getValue().length < 10) {
				good = false;
				this.getView().byId("errorMessageLengthLabel").setText(minimalLength);
				this.getView().byId("errorMessageLengthLabel").setVisible(true);
			} else this.getView().byId("errorMessageLengthLabel").setVisible(false);

			this._canSubmitContactForm(good);
		},

		_canSubmitContactForm: function (active) {
			this.getView().byId("submitFormButton").setEnabled(active);
		},

		/* Soumission du formulaire de contact */
		submitContactForm: function () {
			var self = this;
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			var goodSendingMsg = this.getModel("general").getData().good_sending_message;
			var errorSendingMsg = this.getModel("general").getData().bad_sending_message;
			var confirmMsg = this.getModel("general").getData().confirm_message;
			var errorMsg = this.getModel("general").getData().error_message;

			var contactFormName = this.getView().byId("contactFormName");
			var contactFormMail = this.getView().byId("contactFormMail");
			var contactFormMessage = this.getView().byId("contactFormMessage");
			var contactFormNameValue = contactFormName.getValue();
			var contactFormMailValue = contactFormMail.getValue();
			var contactFormMessageValue = contactFormMessage.getValue();

			sap.ui.core.BusyIndicator.show();

			// parameters: service_id, template_id, template_parameters
			emailjs.send("gmail", "portfolio", {
				name: contactFormNameValue,
				email: contactFormMailValue,
				message: contactFormMessageValue
			}).then(function (response) {
				sap.ui.core.BusyIndicator.hide();

				if (response.status === 200) {
					//On vide les champs
					contactFormName.setValue("");
					contactFormMail.setValue("");
					contactFormMessage.setValue("");
					self._canSubmitContactForm(false);

					MessageBox.confirm(
						goodSendingMsg, {
							title: confirmMsg,
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {
					MessageBox.error(
						errorSendingMsg, {
							title: errorMsg,
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				}

			}, function (err) {
				sap.ui.core.BusyIndicator.hide();
				MessageBox.error(
					errorSendingMsg, {
						title: errorMsg,
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			});

		}

	});
});
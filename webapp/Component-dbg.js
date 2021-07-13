sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"adrien_ratsimihah_portfolio/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("adrien_ratsimihah_portfolio.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();

			var language = this.getLanguage();
			//Modele pour traduction langue
			var languageModel = new sap.ui.model.json.JSONModel();
			this.setModel(languageModel, "languageModel");

			languageModel.setData({
				"current_language": language
			});

			//chemin absolue du root 
			var path = jQuery.sap.getModulePath("adrien_ratsimihah_portfolio");

			//Chemin pour les images 
			var oImageModel = new sap.ui.model.json.JSONModel({
				path: path
			});
			this.setModel(oImageModel, "imageModel");

		},

		/**
		 * The component is destroyed by UI5 automatically.
		 * In this method, the ErrorHandler is destroyed.
		 * @public
		 * @override
		 */
		destroy: function() {
			this._oErrorHandler.destroy();
			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		},

		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass: function() {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},

		getLanguage: function() {
			return sap.ui.getCore().getConfiguration().getLanguage();
		}
	});
});
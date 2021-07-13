sap.ui.define([
	"adrien_ratsimihah_portfolio/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("adrien_ratsimihah_portfolio.controller.App", {
		
		onInit: function() {
			var oViewModel;
			// fnSetAppNotBusy,
			// oListSelector = this.getOwnerComponent().oListSelector,
			var iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

			oViewModel = new JSONModel({
				busy: true,
				delay: 0
			});
			this.setModel(oViewModel, "appView");

			oViewModel.setProperty("/busy", false);
			oViewModel.setProperty("/delay", iOriginalBusyDelay);

			// fnSetAppNotBusy = function() {
			// 	oViewModel.setProperty("/busy", false);
			// 	oViewModel.setProperty("/delay", iOriginalBusyDelay);
			// };

			// this.getOwnerComponent().getModel().metadataLoaded()
			// 		.then(fnSetAppNotBusy);

			// // Makes sure that master view is hidden in split app
			// // after a new list entry has been selected.
			// oListSelector.attachListSelectionChange(function () {
			// 	this.byId("app").hideMaster();
			// }, this);

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}

	});

});
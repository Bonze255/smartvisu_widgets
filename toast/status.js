// ----- status.message -------------------------------------------------------
$.widget("sv.status_message", $.sv.widget, {

	initSelector: 'span[data-widget="status.toast"]',

	_update: function(response) {
		// response is: {{ gad_trigger }}, {{ gad_message }}
		var id = this.element.attr('id');
		var item = response[0];
		var head = response[1];
		var icon = response[2];
		var message =response[3];
		var cfg_allowToastClose = response[4];
		var cfg_showHideTransition = response[5];
		var cfg_bgColor = response[6];
		var cfg_textColor= response[7];
		var cfg_allowToastClose = response[8];
		var cfg_hideAfter = response[9];
		var cfg_stack = response[10];
		var cfg_textAlign  = response[11];
		var cfg_position = response[12];
		
		if (cfg_showHideTransition == ''){
			cfg_showHideTransition = 'fade';
		}
		if (cfg_allowToastClose == ''){
			cfg_allowToastClose = true;
		}
		if (cfg_hideAfter == ''){
			cfg_hideAfter = 3000;
		}
		if (cfg_textAlign == ''){
			cfg_textAlign = 'left';
		}
		if ( cfg_position == ''){
			 cfg_position = 'bottom-left';
		}
		var toast = $.toast({
		    text: message, // Text that is to be shown in the toast
		    heading: head, // Optional heading to be shown on the toast
		    icon: icon, // Type of toast icon
		    showHideTransition: 'fade', // fade, slide or plain
		    allowToastClose: true, // Boolean value true or false
		    hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
		    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
		    position: 'bottom-left', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
		    textAlign: 'left',  // Text alignment i.e. left, right or center
		    loader: true,  // Whether to show loader or not. True by default
		    loaderBg: '#9EC600',  // Background color of the toast loader
		    beforeShow: function () {}, // will be triggered before the toast is shown
		    afterShown: function () {}, // will be triggered after the toat has been shown
		    beforeHide: function () {}, // will be triggered before the toast gets hidden
		    afterHidden: function () {}  // will be triggered after the toast has been hidden
		});
		$('.toast').append(toast);
		
	},

});

// ----- toast.toast -------------------------------------------------------
$.widget("sv.status_toast", $.sv.widget, {

	initSelector: 'span[data-widget="status.toast"]',

	options: {
		bgColor: null,
		color: null,
		align: null,
		position: null,
		stack: null,
		hideAfter: 50000,
		allowClose: null,
		showHide: null,
		showLoader: null,
		template: null,
	},

	_create: function() {
	this._super();

	},
	
	_update: function(response) {
		var id = this.element.attr('id');
		var date = new Date;
		var timestamp = Date.now();
		var heute = date.getHours() +":" + date.getMinutes()+":" + date.getSeconds()+" " +date.getDate()+ "."+ (date.getMonth()+ 1)+"." + date.getFullYear()+" <br>";
		var color;
		var showIcon;
		var showTitle;
		var showText;
		var allowToastClose;
		var hideAfter;
		var showPosition;
		var showLoader;
		var textAlign;
		var loaderBg;
		var bgColor;
		var allowClose;
		var send;
		
		//check ob item oder text angegeben
		//response[0] = triggeritem
		showTitle = response[1] || this.element.attr('data-info').explode()[0];
		showText = response[2] || this.element.attr('data-info').explode()[1];
		send = response[4];
		
		if(this.options.template == 'info'){
			console.log("template info");
			showIcon = 'info';
			hideAfter = 50000;
			bgColor = 'gray';
			color = '#eee';
		}else if (this.options.template == 'warning'){
			console.log("template warning");
			showIcon = 'warning';
			hideAfter = self.options.hideAfter;
			bgColor = '#ff6609';
			color = '#000000';
		}else if (this.options.template == 'error'){
			console.log("template error");
			showIcon = 'error';
			hideAfter= false;
			bgColor = '#e03d3d';
			allowClose = false;
			color = '#FFF';
			showText+='<br/><input class ="button ui-btn ui-mini ui-corner-all ui-btn-inline"  id ='+timestamp+' type="button" value="'+this.element.attr('data-button').explode()[0]+'" />';
		}else{
			console.log("template free");
			showIcon = response[3] || this.element.attr('data-info').explode()[2];
			hideAfter = self.options.hideAfter;
			bgColor = self.options.bgColor;
			allowClose = self.options.allowClose;
			color= self.options.color;
		};
		//if (response[0] == 1){
			
			console.log("title, text, icon", showTitle, showText, showIcon);
			var toast = $.toast({
				text: showText, // Text that is to be shown in the toast
				heading: showTitle, // Optional heading to be shown on the toast
				icon: showIcon, // Type of toast icon
				showHideTransition: this.element.attr('data-showHide'), // fade, slide or plain
				allowToastClose: allowClose, // Boolean value true or false
				hideAfter: hideAfter, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
				stack: this.options.stack, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
				position: this.options.position, // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
				textAlign: this.options.align,  // Text alignment i.e. left, right or center
				loader: this.options.showLoader,  // Whether to show loader or not. True by default
				loaderBg: this.options.loaderBg,  // Background color of the toast loader
				bgColor: bgColor,
				textColor: color
				
			});
		
		$('#' + id).append(toast);
	

	$(".button").click(function() {
		var id = $(this).attr('id');
		console.log("button pressed "+ id);
		if (send != undefined){
			io.write(send, 'True');
		};
		
		console.log($(this).parent().get( 0 ));
		$(this).parent().get( 0 ).remove();
	});
	
	},
	
	_events: {
	}
});

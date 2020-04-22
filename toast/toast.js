// ----- toast.toast -------------------------------------------------------
$.widget("sv.status_toast", $.sv.widget, {

	initSelector: 'span[data-widget="status.toast"]',

	options: {
		bgcolor: null,
		color: null,
		align: null,
		position: null,
		stack: null,
		hideafter: null,
		allowClose: null,
		showhide: null,
		showloader: null,
	},

	_create: function() {
	this._super();
	},
	
	_update: function(response) {
		var id = this.element.attr('id');
		//response[0-3] = {{item_trigger}}{{item_head}}, {{item_text}}, {{item_icon|default('')}}
		console.log("toast response", response[0],response[1], response[2], response[3]);
		console.log("toast options", this.options.bgcolor);
		
		var text = '';
		var head = '';
		var icon = '';
		var showHideTrans ='';
		var allowToastClose = '';
		var head = '';
		var icon = '';
		var showhide ='';
		var position ='';
		var textAlign ='';
		var loaderbg = '';
		
		var date = new Date;
		var heute = date.getHours() +":" + date.getMinutes()+":" + date.getSeconds()+" " +date.getDate()+ "."+ (date.getMonth()+ 1)+"." + date.getFullYear()+" <br>";
		
		//if (response[0] == 1){
			var iconfs = $('#icon').text();
			var textfs = $('#text').text();
			var titlefs = $('#title').text();
			$('#' + 'icon').remove();
			$('#' + 'text').remove();
			$('#' + 'title').remove();
			console.log("icon", iconfs);
			var toast = $.toast({
				text: heute+response[2], // Text that is to be shown in the toast
				heading: titlefs+response[1], // Optional heading to be shown on the toast
				icon: response[3], // Type of toast icon
				showHideTransition: this.options.showhide, // fade, slide or plain
				allowToastClose: this.options.allowclose, // Boolean value true or false
				hideAfter: this.options.hideafter, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
				stack: this.options.stack, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
				position: this.options.position, // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
				textAlign: this.options.align,  // Text alignment i.e. left, right or center
				loader: this.options.showloader,  // Whether to show loader or not. True by default
				loaderBg: this.options.loaderbg,  // Background color of the toast loader
				bgColor: this.options.bgcolor,
				textColor: this.options.color
			});
		//}//else{
		//	toast.reset(); // remove the toast "Some toast that needs to be removed"
		//}
		$('#' + id).append(toast);
	},

});

// ----- toast.toast -------------------------------------------------------
$.widget("sv.status_toast", $.sv.widget, {

	initSelector: 'span[data-widget="status.toast"]',

	options: {
		template: null,
		hideAfter:null,
		showHide: null, 
	},

	_create: function() {
	this._super();

	},
	
	_update: function(response) {
		var id = this.element.attr('id');
		var date = new Date;
		var timestamp = Date.now();
		var heute = date.getHours() +":" + date.getMinutes()+":" + date.getSeconds()+" " +date.getDate()+ "."+ (date.getMonth()+ 1)+"." + date.getFullYear()+" <br>";
		var random = timestamp + getRandomInt(1,25);
		
		function getRandomInt(min, max) {
		  min = Math.ceil(min);
		  max = Math.floor(max);
		  return Math.floor(Math.random() * (max - min)) + min;
		}

		//Style values
		var bgColor = this.element.attr('data-style').explode()[0];
		var color = this.element.attr('data-style').explode()[1];
		var loaderBg = this.element.attr('data-style').explode()[2];
		var textAlign = this.element.attr('data-style').explode()[3];
		var showPosition = this.element.attr('data-style').explode()[4];
		var stack = this.element.attr('data-style').explode()[5];
		var showLoader = this.element.attr('data-style').explode()[6];
		var hideAfter = this.element.attr('data-style').explode()[7];
		var allowClose = this.element.attr('data-style').explode()[8];
		var showHide = this.element.attr('data-style').explode()[9];
		//Button
		var sendButton = this.element.attr('data-button').explode()[0];
		var sendItem = this.element.attr('data-button').explode()[1];
		var sendVal = this.element.attr('data-button').explode()[2] || false;
		
		//Title, Text, Icon check if text or item
		var itemsStr = this.options.item.explode();
		var items = [];
		var text = this.element.attr('data-text').explode();
		//console.log("items as String ", itemsStr);
		//console.log("response item daten übergabe",response);
		//console.log("response text daten übergabe",text);
		var i2 =0;
		items.push(response[0]);
		for (var i = 1; i < itemsStr.length; i++) {
			if(itemsStr[i]!= ''){
				items.push(response[i-i2]);
				i2= 0;
			}else{
				if(text[i-1]){
					items.push(text[i-1]);
					i2++;
				}else{
					items.push('');
				}
			}
		}
		//console.log("gefuellte items", items);
		var showTrigger = items[0];//items[0];
		var showTitle = items[1];
		var showText = items[2];
		var showIcon = items[3];
		
		//Template 
		var template = this.element.attr('template');
		if(this.options.template == 'info'){
			//console.log("Lade template info");
			showIcon = 'info';
			hideAfter = 2000;
			bgColor = '#81BEF7';
			allowClose = true;
			hideAfter= true;
			color = '#eee';
		}else if(this.options.template == 'success'){
			//console.log("Lade template success");
			showIcon = 'success';
			hideAfter = 2000;
			bgColor = '#1ad600';
			allowClose = true;
			hideAfter= true;
			color = '#000';
		}else if (this.options.template == 'warning'){
			//console.log("Lade template warning");
			showIcon = 'warning';
			hideAfter = 2000;
			bgColor = '#ff6609';
			allowClose = true;
			hideAfter= false;
			color = '#000000';
		}else if (this.options.template == 'error'){
			//console.log("Lade template error");
			showIcon = 'error';
			hideAfter= false;
			bgColor = '#e03d3d';
			allowClose = false;
			color = '#FFF';
			showText+='<br/><input class ="button ui-btn ui-mini ui-corner-all ui-btn-inline" id ='+random+' type="button" value="'+this.element.attr('data-button').explode()[0]+'" />';
		}else{
			this.options.template = "free";//console.log("template free");
			showIcon = response[3] || this.element.attr('data-text').explode()[2];
		};
		
		if (response[0]){
			
			console.log("Template:", this.options.template ,"| Title:",showTitle, "| Text:", showText,"| Icon:", showIcon);
			var toast = $.toast({
				text: showText, // Text that is to be shown in the toast
				heading: showTitle, // Optional heading to be shown on the toast
				icon: showIcon, // Type of toast icon
				showHideTransition: showHide, // fade, slide or plain
				allowToastClose: allowClose, // Boolean value true or false
				hideAfter: hideAfter, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
				stack: 99, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
				position: showPosition, // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
				textAlign: textAlign,  // Text alignment i.e. left, right or center
				loader: showLoader,  // Whether to show loader or not. True by default
				loaderBg: loaderBg,  // Background color of the toast loader
				bgColor: bgColor,
				textColor: color
				
			});
			
			$('#' + id).append(toast);//add toast to widget
		
		
			//eigenes icon nutzen
			if (this.element.attr('data-text').explode()[2]){ 
				var pic = this.element.attr('data-text').explode()[2];

				// add default path if icon has no path
				if(pic.indexOf('.') == -1){
					pic = pic+'.svg';
				};
				if(pic.indexOf('/') == -1){
					pic = 'icons/ws/'+pic;
				}else{
					pic = pic;	
				};
				
				$("div.jq-toast-single").last().addClass('jq-has-icon');
				$("div.jq-has-icon").last().css({'background-position-x': '5px','background-size': '3.5em' }); //button id holen
				$("div.jq-toast-single").last().css({'background-image':'url('+pic+')'}); //button id holen
			};

		}else{ 
			if (allowClose = true){
				console.log("should close?",allowClose,hideAfter);
				
				console.log($(this));
				$("div.jq-toast-single").last().remove();
			};
		}
		
		//Close by button click
		$(".button").click(function() {
			var button_id = $(this).attr('id'); //button id holen
			//console.log("button pressed "+ button_id);
			if (sendItem == undefined || sendItem == ''|| sendItem.indexOf(".") == -1){
				console.log("INFO: TOAST Button pressed, but NO Item or a string? given ");
			}else{
				io.write(sendItem, sendVal);
			};
			$(this).closest('div').remove();
		});
	},
	
	_events: {
	}
});

// ----- status_slider-------------------------------------------------------
$.widget("sv.status_roundslider", $.sv.widget, {

	initSelector: 'div[data-widget="status.roundslider"]',

	options: {
		radius : 120,
		startangle : 315,
		handlesize:20,
		step:1,
		scale_interval:10, 
		scale_min:0, 
		scale_max:100, 
		width:20, 
		thickness:0.1,
		circleshape:"pie", 
		slidertype:"min-range",
		icon:"",
	},

	_create: function() {
	this._super();
	},
	
	_update: function(response) {
		//item trigger-> gibt value vor
		//item_array mit bildern
		//item wohin value geschickt werden soll
		
		var id = this.element.attr('id');
		var user_value = response[0];
		var user_value_length = 0;
		var user_data_send = response[1];
		if (Array.isArray(user_value)){
			user_value_length = user_value.length;
			user_value= user_value_length;
			console.log("USer Value 1, is array und hat länge ",user_value_length);
		};
		var user_value_item = this.options.item.explode();
		//var user_value = this.element.attr('data-values').explode()[0];
		var unit = this.element.attr('data-values').explode()[0];
		var pre_value = this.element.attr('data-values').explode()[1];
		var to_value = this.element.attr('data-values').explode()[2];
		var scale = this.element.attr('data-values').explode()[3];
		var scale_interval = this.options.scale_interval;
		
		console.log("Value1 ",response[0]);
		console.log("Value2 ",response[1]);
		console.log("Value length ",user_value_length);
		console.log("Value item ",user_value_item);
		console.log("Value send ",response[1] );
		// generiert die scale-nummern
		//s
		if (scale == "true"){
			$.fn.roundSlider.prototype.defaults.create = function() {
			  var o = this.options;
			  for (var i = o.min; i <= o.max-1; i += scale_interval) {
				var angle = this._valueToAngle(i);
				var numberTag = this._addSeperator(angle, "rs-custom");
				var number = numberTag.children();
				number.clone().css({
				  "width": o.width + this._border(),
				  "margin-top": this._border(true) / -2,
				  "margin-right": '10px',
				}).appendTo(numberTag);
				number.removeClass().addClass("rs-number").html(i).rsRotate(-angle);
				$("span.rs-number").css("color","#875009"); 
				$(".rs-seperator ").css("border-color","#875009");
				$(".rs-seperator ").css("border-width","2px");
				$(".rs-seperator ").css("width","10px");
				$(".rs-seperator ").css("margin-left","-10px"); 
				
			  };
			  var interval = scale_interval/2;
			  for (var i = o.min; i <= o.max-1; i += interval) {
				var angle = this._valueToAngle(i);
				var numberTag = this._addSeperator(angle, "rs-custom_1");
				numberTag.addClass( "rs-seperator_1" );
				$("rs-seperator_1").css("border-color","#875009");
				$("rs-seperator_1").css("border-width","2px");
				$("rs-seperator_1").css("width","5px");
				$("rs-seperator_1").css("height","1px");
				$("rs-seperator_1").css("margin-left","-10px"); 
				
			  };
			};
		};
		$(".rs-handle").css('box-shadow', '0px 0px 15px #875009');
		$(".rs-handle").css('background-color', '#ee921e');
		//$(".rs-handle").css('border', ' 1px solid black');
		//falls trigger= array und value gesetzt
		//dann müssen 2 items übermittelt werden, 1 das triggeritem bzw die daten 
		//und das 2te , an welches der ausgewählte wert gesendet werden soll
		//man kann dann das bild wählen, welches dann im kreis angezeigt wird
		if (Array.isArray(user_value)){
			console.log("Value ist array, länge ", user_trigger.length);
			if (Number.isInteger(user_value)){
				console.log("Value numerisch und index des arrays", user_index);
				var val = $("div#"+id).roundSlider("option", "value");
				console.log(val);
				$(".rs-tooltip").prepend("<img src="+user_trigger[val]+" width='25%' style='border-radius: 100%;-webkit-border-radius: 100%;-moz-border-radius: 100%;>");
				
			};
		};
		
	$("div#"+id).roundSlider({
		circleShape: this.options.circleshape,
		sliderType: this.options.slidertype,
		editableTooltip: false,
		handleSize: this.options.handlesize,
		radius: this.options.radius,
		width: this.options.width,
		thickness: this.options.thickness,
		min: this.options.scale_min,
		max: this.options.scale_max,
		step: this.options.step,
		value: user_value,
		
		startAngle: this.options.startangle,
		svgMode: true,
			tooltipFormat: 'changeTooltip',
			
			drag: function (args) {
				console.log("FIRE DRAGGING!");
				//user_trigger =  array mit bildern
				//user_data_send = item welches beschrieben werden soll
				if (Array.isArray(user_value)){
					console.log("Value",args.value);
					console.log("Item",user_value_item[1]);
					io.write(user_value_item[1], args.value);
					$("#"+id).find(".img").append("<img  src="+user_value[args.value]+" style='clip-path: circle(); '>")
				}else{
					console.log("Value",args.value);
					console.log("Item",user_value_item[0]);
					io.write(user_value_item[0], args.value);
				}
					
			},
			tooltipColor: function (args) {
				return "white";
			},
			rangeColor: function (args) {
				return "#ee921e";
			},
			pathColor: function (args) {
				return "#875009";
			},
			borderColor: function (args) {
				return "#875010";
			}//,
			//create: function(args){
			//	$(".rs-path").css('box-shadow:', '0px 0px 15px  red');
				//$(".rs-handle").css('box-shadow:', '0px 0px 15px  red');
			//}
		});
		
		window.changeTooltip = function (args) {
				var val = args.value;
				var icon = $("div#"+id).attr('data-icon');
				console.log("icon übergebn", icon);
				if (Array.isArray(user_value)){
					
					return "<img src="+user_value[val] +" style='width:100%; margin:auto; margin-bottom: 0em; border-radius: 30%; -webkit-border-radius: 50%; -moz-border-radius: 50%;display:block !important;'>";
				}else if (icon != ''){
					//add default path if icon has no path
					if(icon.indexOf('.') == -1){
						icon = icon+'.svg';
					};
					if(icon.indexOf('/') == -1){
						icon = 'icons/ws/'+icon;
					}else{
						icon = icon;	
					};
					return "<img src="+icon +" style='width:100%; margin:auto; margin-bottom: 0em; margin-top:-2em; clip-path: circle(); display:block !important;'><div id='value' style='font-weight:bold;font-size:1em;'>" + args.value + unit +"</div><div id='rs_value_to' style='font-size:0.5em;'>"+to_value+unit+"</div>";;
				}else{
					return "<div id='rs_value_pre' style='font-size:0.5em; '>"+ pre_value +"</div><div id='value' style='font-weight:bold;font-size:1em;'>" + args.value + unit +"</div><div id='rs_value_to' style='font-size:0.5em;'>"+to_value+unit+"</div>";
				}
			
			}
	},
	
	_events: {
	}
});
// ----- status_rtr_slider-------------------------------------------------------
$.widget("sv.status_rtr_slider", $.sv.widget, {

	initSelector: 'span[data-widget="status.rtr_slider"]',

	options: {

	},

	_create: function() {
	this._super();

	},
	
	_update: function(response) {
		var id = this.element.attr('id');
		var scale_min = this.element.attr('data-values').explode()[0];
		var scale_max = this.element.attr('data-values').explode()[1];
		var step = this.element.attr('data-values').explode()[2];
		var value = this.element.attr('data-values').explode()[3];
		var unit = this.element.attr('data-values').explode()[4];
		var pre_value = this.element.attr('data-values').explode()[5];
		var to_value = this.element.attr('data-values').explode()[6];
		var scale_interval = 5;
		var radius = 120;
		var startangle = 315;
		var handlesize = 20;

			// Start code current degree in outer slider
		// *********
		var _focusOut = $.fn.roundSlider.prototype._focusOut;
		$.fn.roundSlider.prototype._focusOut = function(e) {
		  if (e.type == "change") _focusOut.call(this, e);
		}
		window.valueChange = function(e) {
		  this._handles().children().html(e.handle.value.toFixed(1) + "&deg").rsRotate(-e.handle.angle);
		  this.input.val(e.handle.value);
		}
		// **************
		// End code current degree in outer slider

		$("#slider").roundSlider({
		  sliderType: "min-range",
		  radius: 120,
		  showTooltip: false,
		  value: 15,
		  circleShape: "full",
		  startAngle: "315",
		  endAngle: "225",
		  min: "5",
		  max: "30",
		  handleShape: "square",
		  handleSize: "20,0",

		  create: function() {
			this._editTooltip();
			this._handles().append("<div class='inner-handle rs-transition'></div>");
			this._handles().children().html(this.options.value.toFixed(1) + "&deg").rsRotate(-this._handle2.angle);
		  },
		  change: "valueChange",
		  drag: "valueChange",
		});

		window.changeTooltip = function(e) {
		  var val = e.value.toFixed(1),
			speed;
		  if (val < 20) speed = "COOLING";
		  else speed = "HEATING";

		  return "<div>" + speed + "<div>" + "<div2>" + val + "<div2>"
		}

		$("#inner-slider").roundSlider({
		  step: "0.1",
		  min: "5",
		  max: "30",
		  sliderType: "min-range",
		  radius: 100,
		  showTooltip: true,
		  value: 20.0,
		  circleShape: "full",
		  startAngle: "315",
		  endAngle: "225",
		  handleShape: "square",
		  handleSize: "35,10",
		  tooltipFormat: "changeTooltip",
		  editableTooltip: false,

		  create: function() {
			var that = this;
			var btn1 = $("<button id='sub'>&#9660</button>");
			var btn2 = $("<button id='add'>&#9650</button>");
			this.innerBlock.append(btn1);
			this.innerBlock.append(btn2);
			btn1.click(function() {
			  that.setValue(that.options.value - 0.1);
			});
			btn2.click(function() {
			  that.setValue(that.options.value + 0.1);
			});
		  }
		});

	},
	
	_events: {
	}
});

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
	},

	_create: function() {
	this._super();
	},
	
	_update: function(response) {
		var id = this.element.attr('id');
		var user_trigger = response[0];
		var user_value = this.element.attr('data-values').explode()[0];
		var unit = this.element.attr('data-values').explode()[1];
		var pre_value = this.element.attr('data-values').explode()[2];
		var to_value = this.element.attr('data-values').explode()[3];
		var scale = this.element.attr('data-values').explode()[4];

		// generiert die scale-nummern
		//sclae_interval ist noch variabel zu machen ..
		if (scale == "true"){
			$.fn.roundSlider.prototype.defaults.create = function() {
			  var o = this.options;
			  for (var i = o.min; i <= o.max-1; i += 20) {
				var angle = this._valueToAngle(i);
				var numberTag = this._addSeperator(angle, "rs-custom");
				var number = numberTag.children();
				number.clone().css({
				  "width": o.width + this._border(),
				  "margin-top": this._border(true) / -2,
				  "margin-right": '20px',
				}).appendTo(numberTag);
				number.removeClass().addClass("rs-number").html(i).rsRotate(-angle);
				$("span.rs-number").css("color","white"); 
			  };
			};
		};
		
				//falls trigger= array und value gesetzt
		if (Array.isArray(user_trigger)){
			console.log("Value ist array, länge ", user_trigger.length);
			if (Number.isInteger(user_value)){
				console.log("Value numerisch und index des arrays", user_index);
				var val = $("div#"+id).roundSlider("option", "value");
				console.log(val);
				$("#img").append("<img src="+user_trigger[val]+" width='25%'></div>");
				
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
			tooltipFormat: function (args) {
				return "<div id='rs_value_pre' style='font-size:0.5em; '>"+ pre_value +"</div><div id='value' style='font-weight:bold;font-size:1em;'>" + args.value + unit +"</div><div id='rs_value_to' style='font-size:0.5em;'>"+to_value+unit+"</div>";
			},
			drag: function (args) {
				console.log("FIRE DRAGGING!");
				$("#img").html("<img src="+user_trigger[args.value]+" width='25%'></div>");
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
			}
		});
		
	},
	
	_events: {
	}
});
// ----- status_rtr_slider-------------------------------------------------------
$.widget("sv.status_rtr_slider", $.sv.widget, {

	initSelector: 'span[data-widget="status.rtr_slider"]',

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

	$(".slider").roundSlider({
	  sliderType: "min-range",
	  circleShape: "pie",
	  startAngle: 315,
	  editableTooltip: false,

	  beforeCreate: function () {
		this.options.radius = this.control.parent().width() / 2;

		this["_bind"]($(window), "resize", function () {
		  var radius = this.control.parent().width() / 2;
		  this.option("radius", radius);
		});
	  }
	});

	$("#red").roundSlider({ width: 18,value: 60 });
	$("#blue").roundSlider({ width: 12, radius:70,  value:20, handleSize:-22,showTooltip:false});
	$("#blue").css({"margin-top":"-9.9em","margin-left":"18px", "z-index":"5"});

	// for sample use
	$("#page_url").html(window.location.href).attr("href", window.location.href);

			


	},
	
	_events: {
	}
});

// ----- toast.toast -------------------------------------------------------
$.widget("sv.status_roundslider", $.sv.widget, {

	initSelector: 'span[data-widget="status.roundslider"]',

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
		
		
		
		
		//------------------------------------------------#
$(document).ready(function(){
	$.fn.roundSlider.prototype._invertRange = false;

  // this is core functionality to generate the numbers
  $.fn.roundSlider.prototype.defaults.create = function() {
	var o = this.options, tickInterval = 25;
	
	for (var i = o.min; i <= o.max; i += tickInterval) {
	  var angle = this._valueToAngle(i);
	  var numberTag = this._addSeperator(angle, "rs-custom");
	  var number = numberTag.children();
	  number.clone().css({
		"width": o.width + this._border(),
		"margin-top": this._border(true) / -2
	  });
	  number.removeClass().addClass("rs-number").html(i).rsRotate(-angle);
	}
  }
	$("#shape").roundSlider({
		lineCap: "square",//"round",
				handleSize: "-22", //handleverschwindet
				radius: 150,
				circleShape: "pie",
				sliderType: "min-range",
				startAngle: 315,
				editableTooltip: false,
				min: scale_min, 
				max: scale_max,
				value: value,
				mouseScrollAction: true,
				
			change: function (args) {
				console.log("FIRE EVENT!");
				console.log(this.getValue());
			},
			
			drag: function (args) {
				console.log("FIRE DRAGGING!");
			},
			tooltipFormat: function (args) {
				return "<div id='rs_value_pre'>"+ pre_value +"</div><div id='value' style='font-weight:bold'>" + args.value + unit +"</div><div id='rs_value_to'>"+to_value+"</div>";
			},
			tooltipColor: function (args) {
				return "black";
			},
			rangeColor: function (args) {
				return "#DB5959";
			},
			pathColor: function (args) {
				return "#F0C5C5";
			}
		});
	});


	},
	
	_events: {
	}
});

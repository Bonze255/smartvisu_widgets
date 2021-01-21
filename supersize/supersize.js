// ----- multimedia.slideshow3 ----------------------------------------------------
$.widget("sv.supersize", $.sv.widget, {

	initSelector: '[data-widget="supersize"]',

	options: {
	},

	_create: function () {
		this._super();
		this.element.cycle();
		
	},

	_update: function (response) {
		var id = this.element.attr('id');		
		var supersized = false;
		$(".supersize").click(function () {
			if (supersized == false){
				$(this).closest("div .block").css( "width", "100%" );
				$(this).closest("div .block").css( "display", "block" );
				console.log("SUPERSIZE ME");
				supersized = true;
				$(this).closest("supersize").attr("src", "icons/ws/control_arrow_down_left.svg");
			}else{
				$(this).closest("supersize").attr("src", "icons/ws/control_arrow_up_right.svg");
				$(this).closest("div .block").css( "width", "50%" );
				console.log("MINIMIZE ME");
				supersized = false;
			}
		});
		
	},


	_repeat: function () {

	},

	_events: {
	}

});




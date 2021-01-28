// ----- supersize.supersize ----------------------------------------------------
$.widget("sv.supersize", $.sv.widget, {

	initSelector: '[data-widget="supersize"]',

	options:{

	},

	_create: function () {
		this._super();
		this.element.cycle();
		$("#index").append('<div class="mask"> </div>');
	},

	_update: function (response) {
		var supersized = false;
			$(".supersize").click(function (e) {
				if (supersized == false){
					$(".mask").css('display','block');
					$(this).closest("div").addClass("overlay");
					$('.overlay').show('slow');
					$(this).closest("div").css( "width", "100%" );
					$(this).closest(".supersize").attr("src", "\icons/sw/jquery_minus.svg");
					console.log("SUPERSIZE ME");
					supersized = true;
				}else{
					$(".mask").css('display','none');
					$(this).closest("div").removeClass("overlay");
					console.log("MINIMIZE ME");
					supersized = false;
					$(this).closest(".supersize").attr("src", "\icons/sw/control_arrow_up_right.svg");
				}
			//$(window).trigger('resize');
		    e.stopPropagation();
			e.stopImmediatePropagation();     
		});
},


	_repeat: function () {

	},

	_events: {
	}

});




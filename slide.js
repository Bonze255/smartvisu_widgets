/**
* A widget to display a slideshow2
*
* @param {id=} unique id for this widget (optional)
* @param {text} a directory where the pictures are located
* @param {value=2} delay between the slides in sec (optional, default: 4 sec)
* @param {item=} item to switch to the next slide (optional)
* @param {item=} item to switch to the previous slide (optional)
  (if this is same as item_next: 0 triggers previous, any value greater than 0 triggers next, negative values are ignored)
* @param {item=} item to stop the animation (optional)
* @param {item=} item to start the animation (optional)
  (if this is same as item_stop: 0 stops, any value greater than 0 starts, negative values are ignored)
* @param {value=0} Show the pictures in reverse order; possible values are 1 or 0 (optional, default 0)
* @param {value=0} Show controls; possible values are 1 or 0 (optional, default 0)
	(they just take effect on the slideshow and do not send anything to backend)
* @author Alex ???, Stefan Widmer
*
* @info based on cycle2 jquery-plugin: (c) 2012 M. Alsup; Dual licensed: MIT/GPL
* @link http://jquery.malsup.com/cycle2
*/
{% macro slideshow2(id, item, delay, item_next, item_prev, item_stop, item_start, reverse, controls) %}
	{% set uid = uid(page, id) %}

	<div{% if not id is empty %} id="{{ uid(page, id) }}"{% endif %} class="cycle-slideshow" data-widget="multimedia.slideshow2"
		data-cycle-log="true" data-cycle-speed="2000" data-cycle-timeout="{{ delay|default(4) * 1000 }}" data-cycle-reverse="{{ reverse|default(0) }}" data-item="{{ item }}"
		data-control_item="{{ item_prev }}, {{ item_next }}, {{ item_stop }}, {{ item_start }}">

		{% for file in ['http://192.168.178.91/smartVISU2.9/doorbirdimg/1580661904.334102.jpg', 'http://192.168.178.91/smartVISU2.9/doorbirdimg/1580485978.719445.jpg'] %}
			<img src="{{ file }}" style="display: block;" title="{{ file }}" alt="{{ file }}" />
		{% endfor %}
		
		
	</div>
  {% if controls %}
	<span id="oldest">. </span>
	<div data-role="controlgroup" data-type="horizontal">
		
		<a data-cycle-cmd="prev" href="#" class="ui-btn ui-micro ui-corner-all ui-btn-inline ui-nodisc-icon">
			<img class="icon" src="icons/ws/audio_rew.svg" alt="prev">
		</a>
		<a data-cycle-cmd="pause" href="#" class="ui-btn ui-micro ui-corner-all ui-btn-inline ui-nodisc-icon">
			<img class="icon" src="icons/ws/audio_stop.svg" alt="stop">
		</a>
		<a data-cycle-cmd="resume" href="#" class="ui-btn ui-micro ui-corner-all ui-btn-inline ui-nodisc-icon">
			<img class="icon" src="icons/ws/audio_play.svg" alt="resume">
		</a>
		<a data-cycle-cmd="next" href="#" class="ui-btn ui-micro ui-corner-all ui-btn-inline ui-nodisc-icon">
			<img class="icon" src="icons/ws/audio_ff.svg" alt="next">
		</a>
		
	</div>
	<span id="newest">. </span>
	{% endif %}
{% endmacro %}

// ----- multimedia.slideshow ----------------------------------------------------
$.widget("sv.multimedia_slideshow2", $.sv.widget, {

	initSelector: '[data-widget="multimedia.slideshow2"]',

	options: {
	},
	
	_create: function() {
		this._super();
		this.element.cycle();
	},

	_update: function(response) {
		console.log(item);
        var latetest = item[0];
        var newest = item[length(item)-1];
        var file_name_array = file_name_string.split(".");
        var file_name = file_name_array[file_name_array.length - 2];
        
		$("#oldest").text('test');
		$("#newest").text('test');
        var control_items = String(this.options.control_item).explode();
		for(var i = 0; i <= 4; i++) {
			if(control_items[i] == '' || (i % 2 == 1 && control_items[i] == control_items[i-1])) // continue if item is not used
				continue;
			var value = response.shift();
			if(value >= 0) {
				// if item_prev is same as item_next, treat false as prev, any other value as next (same with item_stop and item_start)
				if((i == 0 || i == 2) && control_items[i] == control_items[i+1] && value > 0)
					i++;
				this.element.cycle(['prev','next','pause','resume'][i]);
				widget.set(control_items[i], -1);
				break;
			}
		}
	},

	_repeat: function() {
	},

	_events: {
	}

});

$(document).on('pagecontainerchange', function (event, ui) {
	if(ui.prevPage != null)
		ui.prevPage.find('[data-widget="multimedia.slideshow2"]').cycle('pause');
	if(ui.toPage != null)
		ui.toPage.find('[data-widget="multimedia.slideshow2"]').cycle('resume');
});

// ----- multimedia.slideshow3 ----------------------------------------------------
$.widget("sv.multimedia_slideshow3", $.sv.widget, {

	initSelector: '[data-widget="multimedia.slideshow3"]',

	options: {
	},
	
	_create: function() {
		this._super();
		this.element.cycle();
	},

	_update: function(response) {
		console.log('test_update');
		var slideIndex = 1;
		var items = String(this.options.item).explode();
		console.log(response[0]);
		//var oldest = response[0].split('/').pop();
		//var newest = response[-1]url.split('/').pop();
		
		//displays slideshop
		var image_array = ['http://192.168.178.91/smartVISU2.9/doorbirdimg/1581351557.317934.jpg', 'http://192.168.178.91/smartVISU2.9/doorbirdimg/1581351381.52909.jpg'];
		var image_array_length = image_array.length;
		var times = [];
	
		
		if (Array.isArray(image_array )){
			for(var i = 0; i <= image_array_length-1; i++) {
				//save a date for each image
				var timestamp = image_array[i].substring(image_array[i].lastIndexOf("/") + 1, image_array[i].lastIndexOf("."));
				var datetime = new Date(timestamp * 1000);
				times[i] = (datetime.getUTCDay()+1)+ '.'+ (datetime.getUTCMonth()+1)+'.'+datetime.getUTCFullYear() + '  '+datetime.getUTCHours()+ ':'+ datetime.getUTCMinutes()+ 'Uhr ';
				console.log(times[i]);
				
				//add images to the slideshow
				var i_display = i+1;
				$(".slideshow-container").prepend('<div class="slideshow-mySlides" > <div class="slideshow-numbertext">'+i_display+'/'+image_array_length+' '+'vom '+times[i]+'</div><img src="'+image_array[i]+'"style="width:100%"></div>');
				$(".slideshow-row").append('<div class="slideshow-column" ><img class="slideshow-demo cursor" src="'+image_array[i]+'"style="width:100%" id = "'+i+'" onclick="#"></div>');
			}
		showSlides(1);
		}
		$(".slideshow-prev" ).click(function() {
			//if (slideIndex < image_array_length){
				slideIndex=+1;
				showSlides(slideIndex);
			//}
		});
				
		$(".slideshow-next" ).click(function() {
			//if (slideIndex < image_array_length){
				slideIndex=-1;
				showSlides(slideIndex);
			//}
		});
		
		$(".slideshow-demo" ).click(function(e) {
			e.preventDefault();
			var id = this.id;
			console.log(id);
			showSlides(id+1);
		});
		
	function showSlides(n) {
	  var i;
	  var slides = document.getElementsByClassName("slideshow-mySlides");
	  var dots = document.getElementsByClassName("slideshow-demo");
	  var captionText = document.getElementById("slideshow-caption");
	  if (n > slides.length) {
		  slideIndex = 1
		  }
	  if (n < 1) {
		  slideIndex = slides.length
		  }
	  for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	  }
	  for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	  }
	  slides[slideIndex-1].style.display = "block";
	  dots[slideIndex-1].className += " active";
	  captionText.innerHTML = dots[slideIndex-1].alt;
	} 
		
	},

	_repeat: function() {

	},

	_events: {
	}

});


/**
* A widget to display a slideshow, controlled by items/items
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

	<div{% if not id is empty %} id="{{ uid(page, id) }}"{% endif %} class="slideshow cycle-slideshow" data-widget="multimedia.slideshow2"
		data-cycle-log="false" data-cycle-speed="2000" data-cycle-timeout="{{ delay|default(4) * 1000 }}" data-cycle-reverse="{{ reverse|default(0) }}" data-items="{{ item }}"
		data-control_item="{{ item_prev }}, {{ item_next }}, {{ item_stop }}, {{ item_start }}">
		{% for file in item %}
			<img src="{{ file.path }}" style="display: block;" title="{{ file}}" alt="{{ file }}" />
		{% endfor %}
	</div>
  {% if controls %}
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
	{% endif %}
{% endmacro %}


/*
*/
// ----- multimedia.slideshow ----------------------------------------------------
$.widget("sv.multimedia_slideshow2", $.sv.widget, {

	initSelector: '[data-widget="multimedia.slideshow"2]',

	options: {
	},
	
	_create: function() {
		this._super();
		this.element.cycle();
	},

	_update: function(response) {
		
        var lastet = items[0]
        var newest = items[length(items)-1] 
        var file_name_array = file_name_string.split(".");
        var file_name = file_name_array[file_name_array.length - 2];
        
        
        var control_items = String(this.options.item).explode();
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
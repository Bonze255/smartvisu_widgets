// ----- multimedia.slideshow3 ----------------------------------------------------
$.widget("sv.multimedia_katwarn", $.sv.widget, {

	initSelector: '[data-widget="multimedia.katwarn"]',

	options: {
	},
	
	_create: function() {
		this._super();
		this.element.cycle();
		
	},

	_update: function(response) {
		console.log("katwarn");
		var node = $(".katwarn-container");
		node.empty();
		var data = response[0]; 
		var i ;

		for (i = 0; i < data.length; i++) { 
			showMessage(data[i]);
		};
		
		
		function showMessage(messages) {
			//console.log(messages);
			var start_date = new Date(messages.start);
			start_date = start_date.toLocaleString('de-DE');

			if (messages.end !== ''){
				var end_date = new Date(messages.end);
				end_date = end_date.toLocaleString('de-DE');
			}else{
				var end_date = '';
			}
			var icons = {"starkes Gewitter":"icons/ws/weather_thunderstorm.svg",
						"Hochwassser": "icons/ws/jquery_alert.svg",
						"Achtung": "icons/ws/message_attention.svg",
						"starker Schneefall": "icons/ws/weather_snow_ice_warning.svg",
						"Coronavirus": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/ISO_7010_W009.svg/1024px-ISO_7010_W009.svg.png",
						"Sturm": "icons/ws/weather_wind.svg"
						};

						
				var a =  $('<li  data-id= "entry'+i+'" data-icon="false" style="margin-top:1px;margin-bottom:1px; margin-left:1em;  padding:0px; display:block; padding-right:0px;  ">').append(
							$('<a class="ui-btn" style="padding:0px; width: 100%; max-height:50px;" >'
						).append(
							$('<img class="icon" style=" float:left;">').css('background', 'yellow' ).attr('src', "icons/ws/message_attention.svg")
						).append(
							$('<div class="color1" style="float:left; left: 50px; width:6px; height:48px; margin-right:6px;">').css('background', '#666666')
						).append(
							$('<h3 style=" overflow: visible; white-space: nowrap;">').text(messages.head)
						).append(
							$('<p style="margin-top: -0.5em;">').text(start_date, " - ", end_date)
						));
				if(messages.city){
						a.append($('<span class="ui-li-count ui-body-inherit" >').text(messages.city));
					}
				$(".katwarn-container").append(a);
				var urgency = messages.urgency;
				var severity = messages.severity;
				var certainty = messages.certainty;
				
				var content = $('<div class="content" style=" display: none; margin-left:1em; margin-bottom:2em; height:100%; text-align:left;"> '+messages.description+": <br/>"+ messages.instruction+"</div>"
					).append(
						$('</br> <div style="margin-top:0.5em; display: flex; flex-direction: row;"> <span style="width:33%;"><b>Dringlichkeit: </b> '+messages.urgency+'</span><span style="width:33%;"><b> Schwere: </b> '+messages.severity+'</span> <span style="width:33%;"><b> Sicher: </b> ' + messages.certainty+'</span></div>')
					).append(
						$('<div style="margin-top:0em; display: flex; flex-direction: row;"> <span style="width:33%;"><b>Type: </b> '+messages.type+'</span><span style="width:33%;"><b> Event: </b> '+messages.event+'</span> <span style="width:33%;"><b> Kategory: </b> ' + messages.category+'</span></div>')
					);
				$(".katwarn-container").append(content);
				//Ändere Icon nach Text ab
				for (let [key, value] of Object.entries(icons)) {
					//console.log(key, value);
					if (messages.head.search(key)>0 ){
						//console.log("gefunden");
						$("icon").attr("src", value );
					}
				};
				//node.trigger('prepare').listview('refresh').trigger('redraw');
			};
			
		
		function ISOtoDT(date){
			var dt = new Date(date)
			console.log("Datum", dt.getDay(), dt.getMonth(),dt.getYear());
		};
		
		//add Description Text to entry
		$("li").click(function() {
			if ($(".content").css("display").length == 0){
				$(".content").css("display","none");
			}else{
				var id = $(this).attr('data-id');
				$(this).next('.content').slideToggle('slow');
			}
			
			//$(this).find('.content').slideToggle('slow');
		});
		//
	},
	
	
	_repeat: function() {

	},

	_events: {
	}

});



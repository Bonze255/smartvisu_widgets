// ----- multimedia.slideshow3 ----------------------------------------------------
$.widget("sv.doorbird_history", $.sv.widget, {

	initSelector: '[data-widget="doorbird.history"]',

	options: {
		history : [],
		motion : [],
	},
	
	_create: function() {
		this._super();
		this.element.cycle();
		
	},

	_update: function(response) {
		var slideInterval;
		var slideIndex = 0;
		var items = String(this.options.item).explode();
		console.log("snapshots ",response[0] , "motion ",response[1], "doorbell",response[2]);

		//displays slideshop
		//var image_array = ['http://192.168.178.91/smartVISU2.9/doorbirdimg/1581351557.317934.jpg', 'http://192.168.178.91/smartVISU2.9/doorbirdimg/1581351381.52909.jpg'];
		//var image_array;
		var snapshot_items = response[0];
		var motion_items = response[1];
		var doorbell_items = response[2];
		
		//if ((this.options.history == undefined) && (this.options.motion == undefined)){
		image_array = snapshot_items;
		//}else if (history == true){
		//	image_array = response[1];
			
		//}else if (motion == true){
		//	image_array = response[2];
			
		//}
		var image_array = response[0];
		var image_array_length;
		if(image_array.length > 10){
			image_array_length = 11;
		} else{
			image_array_length = image_array.length-1;
		}
		
		var times = [];
		var fuellwort = "";
		var auto_on = false; 
		var slideIndex;
		var slideTime = 2000;
		showPics(image_array);
		//if (Array.isArray(image_array )){
		//	for(var i = 0; i <= image_array_length; i++) {
		//		//save a date for each image
		//		var timestamp = image_array[i].substring(image_array[i].lastIndexOf("/") + 1, image_array[i].lastIndexOf("."));
		//		var datetime = new Date(timestamp * 1000);
		//		
		//		if (isNaN(datetime.getTime())){
		//			times[i] = '';
		//		}else{
		//			times[i] = (datetime.getUTCDay()+1)+ '.'+ (datetime.getUTCMonth()+1)+'.'+datetime.getUTCFullYear() + '  '+datetime.getUTCHours()+ ':'+ datetime.getUTCMinutes()+ 'Uhr ';
		//			fuellwort = " vom ";
		//		}
		//		var i_display = image_array_length-i+1;

		//		console.log(times[i]);
				
		//		//add images to the slideshow
		//		$(".doorbird-container").prepend('<div class="doorbird-mySlides" > <div class="doorbird-numbertext">'+i_display+'/'+(image_array_length+1)+' '+fuellwort+times[i]+'</div><img src="'+image_array[i]+'"style="width:100%"></div>');
		//		$(".doorbird-row").append('<div class="doorbird-column" ><div class = "doorbird-column-text">'+times[i]+'</div><img class="doorbird-demo cursor" src="'+image_array[i]+'"style="width:100%" id = "'+i+'" onclick="#"></div>');
		//		$(".doorbird-controls").detach().appendTo($(".controldiv"));

		//	}
		//showSlides(0);
		//}

		//Button events 
		
		$(".doorbird-prev").click(function() {
			if (slideIndex >= 1) {
				slideIndex -= 1;
			} else if (slideIndex == 0) {
				//überlauf, von hinten anfangen
				slideIndex = image_array_length;
			}
			console.log("prev" + slideIndex);
			showSlides(slideIndex);
		});

		$(".doorbird-next").click(function() {
			if (slideIndex < image_array_length) {
				slideIndex += 1;
			} else if (slideIndex >= image_array_length) {
				//überlauf von vorne anfangen 
				slideIndex = 0;
			}
			console.log("next" + slideIndex);
			showSlides(slideIndex);
		});
		
		$("#doorbird-pause").click(function() {
			auto_on = false;
			console.log("pause" + slideIndex);
			clearInterval(slideInterval);
		});
		$("#doorbird-play").click(function() {
			auto_on= true;
			console.log("play" + slideIndex);
			
			slideInterval = setInterval(function() {
				if (slideIndex < image_array_length) {
					slideIndex += 1;
				} else if (slideIndex >= image_array_length) {
				//überlauf von vorne anfangen 
					slideIndex = 0;
				}
			showSlides(slideIndex);
			}, slideTime);
		});
		
		$("#doorbird-history").click(function() {
			image_array = doorbell_items;
			//image_array = response[1];
			console.log("History");
			
			$("div .doorbird-row").empty();
			$("div .doorbird-mySlides").remove();
			showPics(image_array);
		});
		$("#doorbird-motion").click(function() {
			motion=true;
			//image_array = response[2];
			console.log("Motion");
			image_array = motion_items;
			//image_array = response[1];
			$("div .doorbird-row").empty();
			$("div .doorbird-mySlides").remove();
			console.log("History");
			showPics(image_array);
		});
		
		$(".cursor").click(function() {
			console.log("Click vorschaubild ",slideIndex);
			slideIndex = event.target.id;
			console.log("Cursor ",slideIndex);
			showSlides(slideIndex);
			
		});
		
		
		//Zeigt Miniaturbilder 
		function showPics(image_array ) {
			if (Array.isArray(image_array )){
				
				for(var i = 0; i <= image_array_length; i++) {
					//save a date for each image
					var timestamp = image_array[i].substring(image_array[i].lastIndexOf("/") + 1, image_array[i].lastIndexOf("."));
					var datetime = new Date(timestamp * 1000);
					
					if (isNaN(datetime.getTime())){
						times[i] = '';
					}else{
						times[i] = (datetime.getUTCDay()+1)+ '.'+ (datetime.getUTCMonth()+1)+'.'+datetime.getUTCFullYear() + '  '+datetime.getUTCHours()+ ':'+ datetime.getUTCMinutes()+ 'Uhr ';
						//fuellwort = " vom ";
						fuellwort = "";
					}
					var i_display = image_array_length-i+1;

					//console.log(times[i]);
					
					//add miniature images to the slideshow
					$(".doorbird-container").prepend('<div class="doorbird-mySlides" > <div class="doorbird-numbertext">'+i_display+'/'+(image_array_length+1)+' '+fuellwort+times[i]+'</div><img src="'+image_array[i]+'"style="width:100%"></div>');
					$(".doorbird-row").append('<div class="doorbird-column" ><div class = "doorbird-column-text">'+times[i]+'</div><img class="doorbird-demo cursor" src="'+image_array[i]+'"style="width:100%" id = "'+i+'" onclick="#"></div>');
					$(".doorbird-controls").detach().appendTo($(".controldiv"));

			};
			};
			showSlides(0);
		};
		
		//Zeigt Großes bild an 
		function showSlides(n) {
			var i;
			var slides = document.getElementsByClassName("doorbird-mySlides");
			var dots = document.getElementsByClassName("doorbird-demo");
			var captionText = document.getElementById("doorbird-caption");
			console.log("SlideIndex" + slideIndex);
			//alle Bilder deaktivieren
			for (i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";
			}
			//alle voschaubilder deaktivieren
			for (i = 0; i < dots.length; i++) {
				dots[i].className = dots[i].className.replace(" active", "");
			}

			//aktuelles BIld anzeigen, und vorschaubild aktivieren
			if (slides.length > 0){
				slides[slideIndex].style.display = "block";
				dots[slideIndex].className += " active";
				captionText.innerHTML = dots[slideIndex].alt;
			}
			return slideIndex;
		}
		
		
		if (auto_on == true) {
		    var slideInterval = setInterval(function() {
				if (slideIndex < image_array_length) {
					slideIndex += 1;
				} else if (slideIndex >= image_array_length) {
				//überlauf von vorne anfangen 
					slideIndex = 0;
				}
			showSlides(slideIndex);
		  }, slideTime);
		};
	},
	
	
	_repeat: function() {

	},

	_events: {
	}

});



// ----- multimedia.slideshow3 ----------------------------------------------------
$.widget("sv.doorbird_live", $.sv.widget, {

	initSelector: '[data-widget="doorbird.live"]',

	options: {
		btntext: [],
		
	},
	
	_create: function() {
		this._super();	
		this.element.cycle();
		
	},

	_update: function(response) {
		var mute = false;
		var items = this.options.item.explode(); 
		$(".doorbird-live-container").empty();
		console.log(response[1]);
		$(".doorbird-live-container").prepend(response[3]);
		$(".doorbird-live-container img").css("position","relative");
		$(".doorbird-live-container img").css("z-index","1");
		
		
		//ADD Buttons Dynamically
		/* var btns="";
		btns+= '<a id="btnMute" href="#" class="ui-btn ui-midi ui-corner-all ui-btn-inline ui-nodisc-icon ui-first-child"><svg class="Mute" style="vertical-align: middle; width:40px; height:40px;" viewBox="20 20 321 321"><g fill="none"  stroke-width="9"><path d="m75.486,215.572c0,2.246 1.82,4.065 4.065,4.065h34.323c2.245,0 4.065-1.819 4.065-4.065v-70.002c0-2.244-1.82-4.064-4.065-4.064h-34.323c-2.245,0-4.065,1.82-4.065,4.064v70.002z"/><path d="m182.104,244.256c0,2.289-1.855,4.145-4.145,4.145l-43.063-24.179c-2.604-1.376-4.145-1.856-4.145-4.146v-79.252c0-2.289 .426-2.168 4.145-4.145l43.063-24.179c2.29,0 4.145,1.855 4.145,4.145v127.611z"/></g><g><path d="m205.938,135.532c24.4,24.918 24.401,64.764 0,89.683-4.514,4.608 2.553,11.684 7.07,7.07 28.209-28.807 28.209-75.017 0-103.824-4.518-4.613-11.584,2.462-7.07,7.071z"/><path d="m226.787,118.1c34.839,35.368 34.838,92.598 0,127.967-4.527,4.596 2.54,11.67 7.07,7.07 18.574-18.856 29.074-43.901 29.453-70.369 .382-26.785-10.757-52.759-29.453-71.739-4.53-4.6-11.597,2.474-7.07,7.071z"/></g></svg></a>';
		console.log("response-length", response.length);
		for (i = 2; i < response.length-2; i++) {
			if (i== 2){
				btns+= '<a id="btn'+i+'" href="#" class="ui-btn ui-midi ui-corner-all ui-btn-inline ui-nodisc-icon ">'+this.element.attr('btntext').explode()[i-2]+'</a>';
			}else if(i == response.length-2){
				btns+= '<a id="btn'+i+'" href="#" class="ui-btn ui-midi ui-corner-all ui-btn-inline ui-nodisc-icon ui-last-child">'+this.element.attr('btntext').explode()[i-2]+'</a>';
			}else{
				btns+= '<a id="btn'+i+'" href="#" class="ui-btn ui-midi ui-corner-all ui-btn-inline ui-nodisc-icon ">'+this.element.attr('btntext').explode()[i-2]+'</a>';
			}
		}			
				
		var html ='<div data-role="controlgroup" data-type="horizontal" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all" style="width:100%;left:0em;"><div class="ui-controlgroup-controls ">'+btns+'</div></div>';
		$(".doorbird-live-container").append(html); */

		
		//bei doorbell event	
		if (response[0]== true ){

			var myVar = setInterval(myTimer, 500);
			var i = 0; //animation 1-3
			var i2 = 0; //loopcounter 1-30s
			$(".doorbird-live-container").append('<div class="ringcontainer" style="z-index:2; float:left; position:relative; top:-13.5em; left: 0em;width:50%; "><div>');
			var track_color = $('ui-bar-a').css('background-image');
			
			function myTimer() {
				if (i==0){
					$(".ringcontainer").html('<svg style="width:10em; opacity: 0.95; position:relative;"  viewBox="20 20 321 321"><g fill="none"  stroke="red" stroke-width="8"><path d="m75.486,215.572c0,2.246 1.82,4.065 4.065,4.065h34.323c2.245,0 4.065-1.819 4.065-4.065v-70.002c0-2.244-1.82-4.064-4.065-4.064h-34.323c-2.245,0-4.065,1.82-4.065,4.064v70.002z"/><path d="m182.104,244.256c0,2.289-1.855,4.145-4.145,4.145l-43.063-24.179c-2.604-1.376-4.145-1.856-4.145-4.146v-79.252c0-2.289 .426-2.168 4.145-4.145l43.063-24.179c2.29,0 4.145,1.855 4.145,4.145v127.611z"/></g><path fill="red" d="m205.938,135.532c24.4,24.918 24.401,64.764 0,89.683-4.514,4.608 2.553,11.684 7.07,7.07 28.209-28.807 28.209-75.017 0-103.824-4.518-4.613-11.584,2.462-7.07,7.071z"/></svg>');
					i = i+1;
				}else if (i==1){
					$(".ringcontainer").html('<svg style="width:10em; opacity: 0.95; position:relative;" viewBox="20 20 321 321"><g fill="none"  stroke="red" stroke-width="9"><path d="m75.486,215.572c0,2.246 1.82,4.065 4.065,4.065h34.323c2.245,0 4.065-1.819 4.065-4.065v-70.002c0-2.244-1.82-4.064-4.065-4.064h-34.323c-2.245,0-4.065,1.82-4.065,4.064v70.002z"/><path d="m182.104,244.256c0,2.289-1.855,4.145-4.145,4.145l-43.063-24.179c-2.604-1.376-4.145-1.856-4.145-4.146v-79.252c0-2.289 .426-2.168 4.145-4.145l43.063-24.179c2.29,0 4.145,1.855 4.145,4.145v127.611z"/></g><g fill=red><path d="m205.938,135.532c24.4,24.918 24.401,64.764 0,89.683-4.514,4.608 2.553,11.684 7.07,7.07 28.209-28.807 28.209-75.017 0-103.824-4.518-4.613-11.584,2.462-7.07,7.071z"/><path d="m226.787,118.1c34.839,35.368 34.838,92.598 0,127.967-4.527,4.596 2.54,11.67 7.07,7.07 18.574-18.856 29.074-43.901 29.453-70.369 .382-26.785-10.757-52.759-29.453-71.739-4.53-4.6-11.597,2.474-7.07,7.071z"/></g></svg>');
					i = i+1;
				}else if (i==2){
					$(".ringcontainer").html('<svg style="width:10em; opacity: 0.95; position:relative;" viewBox="20 20 321 321"><g fill="none"  stroke="red" stroke-width="10"><path d="m75.486,215.572c0,2.246 1.82,4.065 4.065,4.065h34.323c2.245,0 4.065-1.819 4.065-4.065v-70.002c0-2.244-1.82-4.064-4.065-4.064h-34.323c-2.245,0-4.065,1.82-4.065,4.064v70.002z"/><path d="m182.104,244.256c0,2.289-1.855,4.145-4.145,4.145l-43.063-24.179c-2.604-1.376-4.145-1.856-4.145-4.146v-79.252c0-2.289 .426-2.168 4.145-4.145l43.063-24.179c2.29,0 4.145,1.855 4.145,4.145v127.611z"/></g><g fill=red><path d="m205.938,135.532c24.4,24.918 24.401,64.764 0,89.683-4.514,4.608 2.553,11.684 7.07,7.07 28.209-28.807 28.209-75.017 0-103.824-4.518-4.613-11.584,2.462-7.07,7.071z"/><path d="m226.787,118.1c34.839,35.368 34.838,92.598 0,127.967-4.527,4.596 2.54,11.67 7.07,7.07 18.574-18.856 29.074-43.901 29.453-70.369 .382-26.785-10.757-52.759-29.453-71.739-4.53-4.6-11.597,2.474-7.07,7.071z"/><path d="m248.941,101.159c21.034,21.292 32.931,49.652 33.275,79.588 .348,30.279-12.084,59.505-33.275,80.957-4.535,4.59 2.533,11.663 7.07,7.07 22.87-23.149 35.831-54.115 36.205-86.659 .377-32.863-13.209-64.75-36.205-88.028-4.536-4.592-11.605,2.482-7.07,7.072z"/></g></svg>');
					i=0;
				};
				
				if (i2 == 10){
						clearTimeout(myVar);
						$(".ringcontainer").empty();
				}else{
					i2 = i2+1;
				};
			} 
			 
		};

		//bei moving event
		if (response[1] == true){
			console.log("Motion!");
			var myVarMotion = setInterval(myTimerMotion, 100);
			var i3 = 0; //loopcounter 1-30s
			$(".doorbird-live-container").append('<div class="motioncontainer" style="z-index:2; float:left; position:relative;  width:50%; right: -1em;  top:-10.5em;  "><div>');
			$(".motioncontainer").html('<svg style="transform: rotate(90deg); stroke: yellow; width:5em;position:relative;" viewBox="20 20 321 321"><path fill="none"  stroke="yellow" stroke-width="10" d="m219.124,90.74c0,1.566-1.271,2.835-2.837,2.835h-70.909c-1.567,0-2.836-1.27-2.836-2.835v-13.237c0-1.566 1.27-2.836 2.836-2.836h70.909c1.566,0 2.837,1.271 2.837,2.836v13.237z"/><g fill="yellow"><path d="m205.119,131.934c-14.072,13.541-35.831,13.54-49.903,0-1.394-1.341-3.518,.778-2.121,2.121 15.253,14.677 38.892,14.678 54.145,0 1.397-1.344-.727-3.463-2.121-2.121z"/><path d="m288.168,244.826c-28.385,28.117-66.507,44.061-106.466,44.418-40.293,.359-79.307-16.155-107.839-44.418-1.375-1.362-3.497,.759-2.121,2.121 28.937,28.664 67.849,44.933 108.586,45.297 41.067,.366 80.882-16.493 109.96-45.297 1.377-1.362-.745-3.483-2.12-2.121z"/><path d="m205.583,93.576c-.327,13.741-11.01,24.423-24.75,24.75-13.74,.327-24.435-11.502-24.75-24.75-.107-4.506-7.107-4.517-7,0 .418,17.588 14.162,31.332 31.75,31.75 17.586,.418 31.347-14.791 31.75-31.75 .107-4.517-6.893-4.507-7,0z"/><path d="m193.512,97.804c-.163,7.441-3.531,17.934-12.465,18.328-1.927,.085-1.935,3.085 0,3 10.699-.472 15.263-12.096 15.465-21.328 .042-1.936-2.958-1.932-3,0z"/><path d="m164.821,97.804c.222,9.605 5.33,20.872 16.226,21.328 1.936,.081 1.928-2.919 0-3-9.165-.383-13.045-10.482-13.226-18.328-.045-1.932-3.045-1.936-3,0z"/><path d="m179.333,97.804c0,6.613 0,13.226 0,19.838 0,1.935 3,1.935 3,0 0-6.613 0-13.226 0-19.838 0-1.935-3-1.935-3,0z"/><path d="m152.86,132.237c-26.971,37.427-53.942,74.854-80.913,112.282-.146,.203-.293,.407-.44,.61-1.133,1.572 1.471,3.067 2.591,1.514 26.971-37.428 53.942-74.855 80.913-112.282 .146-.204 .293-.407 .44-.61 1.133-1.573-1.471-3.068-2.591-1.514z"/><path d="m204.885,133.751c27.465,37.335 54.93,74.67 82.395,112.004 .219,.297 .437,.593 .654,.889 1.133,1.541 3.738,.047 2.59-1.514-27.465-37.335-54.93-74.669-82.395-112.004-.219-.296-.437-.592-.654-.888-1.133-1.542-3.739-.048-2.59,1.513z"/></g></svg>');
			function myTimerMotion() {
				if (i3 == 100){
						clearTimeout(myVarMotion);
						//$(".motioncontainer").empty();
				}else{
					i3 = i3+1;
				}
			} 
		
		}; 
		
		// if(mute == true){
			// $(".Mute").css('stroke','green');
			// $(".Mute").css('fill','green');
			// console.log("machs grün");
		// } else {
			// $(".Mute").css('stroke','red');
			// $(".Mute").css('fill','red');

			// console.log("machs rot");
		// }

		// $('a').click(function(){
			// var button_id = this.id;
			// console.log("Btnid", button_id);
			// if (button_id == 'btnMute'){
				// mute = !mute;
				// console.log("Invertiere", mute);
				// if(mute == true){
					// $(".Mute").css('stroke','green');
					// $(".Mute").css('fill','green');
					// console.log("machs grün");
				// } else {
					// $(".Mute").css('stroke','red');
					// $(".Mute").css('fill','red');

					// console.log("machs rot");
				// }
			// }else{
				// console.log("items", items);
				// button_id = parseInt(button_id.slice(3));
				// console.log("btnid", parseInt(button_id));
				// console.log("btnid", items[button_id]);
				// io.write(items[button_id+2], 1);
			// };
			
		
		//});
	},


	_events: {
		
	}
		
	
	
});




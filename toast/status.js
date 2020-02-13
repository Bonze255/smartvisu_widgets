// ----- status.message -------------------------------------------------------
$.widget("sv.status_message", $.sv.widget, {

	initSelector: 'span[data-widget="status.message"]',

	_update: function(response) {
		// response is: {{ gad_trigger }}, {{ gad_message }}
		var id = this.element.attr('id');
		if (response[0] != 0) {
			$('#' + id + '-message p span').html(response[1] ? '<b>' + response[1] + '</b><br />' : '');
			$('#' + id + '-message .stamp').html(response[2] ? new Date(response[2]).transShort() : new Date().transShort());
			$('#' + id + '-message').popup('open');
			console.log(id + ' open ' + response[0]);
		}
		else {
			$('#' + id + '-message').popup('close');
			console.log(id + ' ' + response[0]);
		}
	},

});

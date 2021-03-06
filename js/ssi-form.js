jQuery(function($) {
	var base_path = '/wordpress/wp-content/plugins/simple-sign-in/';
	// let them see what they're typing in for the password
	$('#simple-sign-in :password').showPassword('#ssi-show-password');

	// handle the dropdown and show the form
	$('.ssi-toggle').click(function(e) {
		e.preventDefault();
		$('.ssi-form-wrapper').toggle();
		$('.ssi-toggle').toggleClass('menu-open');

		// open PIN reset options in modal window
		$('.forgot a').openDOMWindow({
			draggable: 1,
			height: 400,
			width: 700,
			eventType: 'click',
			windowSource: 'iframe',
			windowPadding: 10,
			loader: 1,
			loaderImagePath: 'images/ajax-loader.gif',
			// relative path to the image needed
			loaderHeight: 48,
			loaderWidth: 48
		}); // end modal
	}); // end sign-in display
	// don't fire the submit if you're just closing the form
	$('.ssi-form-wrapper').mouseup(function() {
		return false;
	});

	// hide the form once it's submitted
	$(document).mouseup(function(e) {
		if ($(e.target).parent('a.ssi-toggle').length === 0) {
			$('.ssi-toggle').removeClass('menu-open');
			$('.ssi-form-wrapper').hide();
		}
	});


});

function check_whereto() {
	var ssi_form = $('#simple-sign-in'),
		form_url = ssi_form.attr('action'),
		whereto = $('input[name="whereto"]:checked').val();

	// if they're going to Fastcase, validate their info and send them on
	if (whereto === 'fastcase') {
		ssi_form.append('<input id="url" name="url" type="hidden" value="http://my.okbar.org/Fastcase">');
	}
	// now keep on truckin' and submit the form
	ssi_form.submit();
}

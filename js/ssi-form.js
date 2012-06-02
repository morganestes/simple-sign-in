jQuery(document).ready(function($) {
	var base_path = '/wordpress/wp-content/plugins/simple-sign-in/';
	// let them see what they're typing in for the password
	$('#password').showPassword('#show');

	// handle the dropdown and show the form
	$('.signin-link').click(function(e) {
		e.preventDefault();
		$('#signin-menu').toggle();
		$('.signin-link').toggleClass('menu-open');


			// open PIN reset options in modal window
			$('a#resend-password-link').openDOMWindow({
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
	$('#signin-menu').mouseup(function() {
		return false;
	});

	// hide the form once it's submitted
	$(document).mouseup(function(e) {
		if ($(e.target).parent('a.signin-link').length === 0) {
			$('.signin-link').removeClass('menu-open');
			$('#signin-menu').hide();
		}
	});

function submitForm() {
	var ssi_form = $('#simple-sign-in'),
		form_url = ssi_form.attr('action'),
		whereto = $('input[name="whereto"]:checked').val();

	// if they're going to Fastcase, validate their info and send them on
	if (whereto === 'fastcase') {
		ssi_form.append('<input id="url" name="url" type="hidden" value="http://my.okbar.org/Fastcase" />');
	}
	// else, keep on truckin' and submit the form
	ssi_form.submit();
}
});

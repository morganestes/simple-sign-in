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

	// see if we can save the user number for the next time
	ssi_save_user();
}

function supports_html5_storage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

function ssi_save_user() {
	if (!supports_html5_storage()) {
		console.log('no localStorage');
		return false;
	} else {
		$("#simple-sign-in").submit(function() {
			localStorage.ssi_user = $("#ssi-user").val();
			console.log(localStorage.ssi_user);
		});
	}
}

jQuery(function($) {
	var base_path = '<?php plugin_dir_path( __FILE__ ); ?>';

	// let them see what they're typing in for the password
	$('#simple-sign-in :password').showPassword('#ssi-show-password');


	// pre-fill the bar number field on before opening
	if (localStorage.ssi_user == null) {
		localStorage.ssi_user = '';
	} else {
		$("#ssi-user").val(localStorage.ssi_user);
	}

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


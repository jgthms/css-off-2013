jQuery(document).ready(function ($) {

	var $triggers = [
		[$('#transformers'), $('#transformers-ticket-date')],
		[$('#overflow'), $('#overflow-last')]
	];
	var pfx = ['webkitAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend'];
	var $zones = $('#masthead, #staying-afloat, #bullets, #abbey-road, #immigration, #transformers, #overflow, footer');

	$zones.each( function() {
		$(this).css('opacity', 0);
	})

	function AnimationListener($element) {
		$element.removeClass('start');
		if (!$element.hasClass('stop')){
			$element.addClass('stop');
		}
	}

	function PrefixedEvent(i, callback) {
		for (var p = 0; p < pfx.length; p++) {
			$triggers[i][1].bind(pfx[p], function() { callback($triggers[i][0]) });
			// if(window.addEventListener) {
				// $element.addEventListener(pfx[p], function() { callback($element) }, false);
			// } else {
			// 	$element.attachEvent(pfx[p], function() { callback($element) }, false);
			// }
		}
	}

	for (var i = 0; i < $triggers.length; i++) {
		PrefixedEvent(i, AnimationListener);
	}

	$(window).scroll( function() {
		var position = $(window).scrollTop();
		var height = $(window).height();
		var trigger = height / 2;
		$zones.each( function(index) {
			var zone_offset = $(this).offset();
			if (position + trigger > zone_offset.top) {
				$(this).css('opacity', 1).addClass('start');
			}
			if ($(window).scrollTop() + $(window).height() == $(document).height()) {
				$('footer').css('opacity', 1).addClass('start');
			}
		});
	});

});
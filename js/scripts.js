jQuery(document).ready(function ($) {

	var $triggers = [
		[$('#staying-afloat'), $('#staying-afloat img')],
		[$('#bullets'), $('#bullet-thumper-240')],
		[$('#abbey-road'), $('#abbey-road-text')],
		[$('#immigration'), $('#immigration-last')],
		[$('#transformers'), $('#transformers-ticket-date')],
		[$('#overflow'), $('#overflow-last')]
	];
	var pfx = ['webkitAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend'];
	var $zones = $('#staying-afloat, #bullets, #abbey-road, #immigration, #transformers, #overflow, footer');
	var startWidth = window.innerWidth;

	if (startWidth > 860) {
		$('#masthead').addClass('start');
		$zones.each( function() {
			$(this).css('opacity', 0);
		})
	}

	function AnimationListener($element) {
		if (!$element.hasClass('stop')) {
			$element.removeClass('start').addClass('stop');
		}
	}

	function PrefixedEvent(i, callback) {
		for (var p = 0; p < pfx.length; p++) {
			$triggers[i][1].bind(pfx[p], function() { callback($triggers[i][0]) });
		}
	}

	for (var i = 0; i < $triggers.length; i++) {
		PrefixedEvent(i, AnimationListener);
	}

	$(window).scroll( function() {
		var position = $(window).scrollTop();
		var height = $(window).height();
		var trigger = height / 2;
		if (startWidth > 860) {
			$zones.each( function(index) {
				var zone_offset = $(this).offset();
				if (position + trigger > zone_offset.top) {
					if (!$(this).hasClass('stop')) {
						$(this).css('opacity', 1).addClass('start');
					}
				}
				if ($(window).scrollTop() + $(window).height() == $(document).height()) {
					$('footer').css('opacity', 1).addClass('start');
				}
			});
		}
	});

});
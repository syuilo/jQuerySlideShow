(function($) {
	$.fn.slideShow = function(options) {

		var defaults = {
			index : 0,
			interval : 5000,
			duration : 1500,
			transition : 'cubic-bezier(.5, 0, .25, 1)',
			showIndex : true,
		};

		var setting = $.extend(defaults,options);

		var $slideShow = $(this).children('ol');
		var slideCount = $slideShow.children('li').length;

		if (setting.interval > 0) {
			var timer = setInterval(function() {
				change();
			}, setting.interval);
		}

		$(this).css('position', 'relative');

		$slideShow.attr('class', 'slides');

		$slideShow.css({
			'display' : 'block',
			'white-space' : 'nowrap',
			'overflow' : 'hidden',
			'padding' : 0,
			'list-style' : 'none',
		});

		$slideShow.children('li').each(function() {
			$(this).css({
				'display' : 'inline-block',
				'vertical-align' : 'bottom',
				'width' : '100%',
				'margin' : 0,
				'padding' : 0,
				'transition' : 'all ' + setting.duration + 'ms ' + setting.transition,
			});
		});

		if (setting.showIndex) {
			var $index = $('<ol/>');
			for (var i = 0; i < slideCount; i++) {
				var $item = $('<li/>');
				var $button = $('<button/>');

				$item.css({
					'display' : 'inline-block',
					'margin' : '8px',
				});

				$button.attr({
					'type' : 'button',
					'data-index' : i
				});

				$button.css({
					'display' : 'inline',
					'padding' : '4px',

					'-webkit-appearance' : 'none',
					'appearance' : 'none',
					'cursor' : 'pointer',
					'outline' : 'solid 1px rgba(0, 0, 0, 0.5)',
					'border' : 'none',
					'background' : 'rgba(0, 0, 0, 0.5)',
				});

				if (i == setting.index) {
					$button.css({
						'background' : '#fff',
					});
				}

				$button.on('click', function() {
					clearInterval(timer);
					setting.index = $(this).attr('data-index') - 1;
					change();
				});

				$item.append($button);
				$index.append($item);
			}
			$index.css({
				'position' : 'absolute',
				'bottom' : 0,
				'left' : 0,
				'box-sizing' : 'border-box',
				'width' : '100%',
				'text-align' : 'center',
				'margin' : '0 auto',
				'padding' : '8px',
				'list-style' : 'none',
			});
			$(this).append($index);
		}

		function change() {
			var slideShowWidth = $slideShow.width();

			if (setting.showIndex) {
				$index.find('li').each(function() {
					$button = $(this).children('button');
					if ($button.attr('data-index') == setting.index + 1 || ($button.attr('data-index') == 0 && setting.index + 1 == slideCount)) {
						$button.css({
							'background' : '#fff',
						});
					} else {
						$button.css({
							'background' : 'rgba(0, 0, 0, 0.5)',
						});
					}
				});
			}

			if (setting.index + 1 == slideCount) {
				$($slideShow.children('li')[0]).css({
					'margin-left' : '0px',
				});
				setting.index = 0;
			} else {
				$($slideShow.children('li')[0]).css({
					'margin-left' : (-((setting.index + 1) * slideShowWidth)) + 'px',
				});
				setting.index++;
			}
		}

		$(window).resize(function() {
			var slideShowWidth = $slideShow.width();
			if (setting.showIndex) {
				$($slideShow.children('li')[0]).css({
					'margin-left' : (-(setting.index * slideShowWidth)) + 'px',
				});
			}
		});
	}
})(jQuery);
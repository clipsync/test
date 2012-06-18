var clipsync = function () {
	var flashvars;

	var minWidth = 640;
	var minHeight = 360;

	function getViewportSize() {
		var size = [0, 0];
		if (typeof window.innerWidth != 'undefined')
			size = [window.innerWidth, window.innerHeight];
		else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
			size = [document.documentElement.clientWidth, document.documentElement.clientHeight];
		else
			size = [document.getElementsByTagName('body')[0].clientWidth, document.getElementsByTagName('body')[0].clientHeight];
		return size;
	}

	function createFullBrowserFlash() {
		swfobject.createCSS('html', 'height:100%;');
		swfobject.createCSS('body', 'height:100%;');
		swfobject.createCSS('#container', 'margin:0; width:100%; height:100%; min-width:' + minWidth + 'px; min-height:' + minHeight + 'px;');
		$(window).resize(function () {
			var el = $('#container');
			var size = getViewportSize();
			el.width(size[0] < minWidth ? minWidth + 'px' : '100%');
			el.height(size[1] < minHeight ? minHeight + 'px' : '100%');
		});
		$(window).trigger('resize');
	}

	return {
		embed:function () {
			var swfVersionStr = '10.2.0';
			var xiSwfUrlStr = 'expressInstall.swf';

			var queryParams = new Array('config', 'contentID', 'userID', 'username', 'thumbURL', 'playlist', 'mode', 'popout');

			// Flashvar list description:
			//
			// config - config file URL
			// contentID - video content ID (optional?)
			// userID - user ID (optional?)
			// username - user name (optional?)
			// thumbURL - thumbnail URL (optional?)
			// playlist - playlist URL
			// mode - normal (by default if not passed) - video clips player, liveFeed - live feed mode, liveShow - live show player

			flashvars = {};
			for (var i = 0; i < queryParams.length; i++) {
				var param = queryParams[i];
				var value = swfobject.getQueryParamValue(param);
				if (value) flashvars[param] = decodeURIComponent(value);
			}
			flashvars.popout = true;

			var params = {};
			params.scale = 'true';
			params.quality = 'high';
			params.allowscriptaccess = 'sameDomain';
			params.bgcolor = '#000000';
			params.allowFullScreen = 'true';

			var attributes = {};
			attributes.id = 'Player';
			attributes.name = 'Player';
			attributes.align = 'middle';

			swfobject.embedSWF('Player.swf', 'flashContent', '100%', '100%',
				swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
			swfobject.createCSS('#flashContent', 'display:block;text-align:left;');

			if (swfobject.hasFlashPlayerVersion(swfVersionStr))
				swfobject.addDomLoadEvent(createFullBrowserFlash);
		}
	};
}();
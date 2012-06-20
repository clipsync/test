var clipsync = function () {
	var flashvars;
	var minWidth = 768, minHeight = 480;

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

	// Player call when user select date in calendar and press play button
	//
	// timestamp - date as unix timestamp
	window.loadFlashback = function (timestamp) {
		playlist = 'playlist/hdn2_flashback2.xml' + '?r=' + Math.random();
		// some position calculation based on timestamp for testing purpose
		timestamp = timestamp / 100000;
		var position = (timestamp - Math.floor(timestamp)) * 1000;
		loadPlaylist(playlist, position);
	}

	// Load playlist in player
	//
	// url - playlist URL or XML string with playlist content
	// position - start position for video
	window.loadPlaylist = function (url, position) {
		var player = swfobject.getObjectById('Player');
		player.loadPlaylist(url, position);
	}

	return {
		embed:function (parameters, width, height) {
			var swfVersionStr = "10.2.0"; // required flash player version
			var xiSwfUrlStr = "expressInstall.swf"; // path to express install of flash player

			var queryParams = new Array("contentID", "mode", "playlist", "show", "position"); // params list that we will read from query string

			flashvars = {};
			for (var i = 0; i < queryParams.length; i++) {
				var param = queryParams[i];
				var value = swfobject.getQueryParamValue(param);
				if (value) flashvars[param] = decodeURIComponent(value);
			}

			if (parameters) {
				for (param in parameters) {
					value = parameters[param];
					if (value) flashvars[param] = value;
				}
			}

			width = width || "100%";
			height = height || "100%";

			var params = {};
			params.scale = "true";
			params.quality = "high";
			params.allowscriptaccess = "sameDomain";
			params.bgcolor = "#000000";
			params.allowFullScreen = "true";

			var attributes = {};
			attributes.id = "Player";
			attributes.name = "Player";
			attributes.align = "middle";

			swfobject.embedSWF("Player.swf", "flashContent", width, height,
				swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
			swfobject.createCSS("#flashContent", "display:block;text-align:left;");

			if (swfobject.hasFlashPlayerVersion(swfVersionStr))
				swfobject.addDomLoadEvent(createFullBrowserFlash);
		}
	};
}();
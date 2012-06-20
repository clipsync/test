var clipsync = function () {
	var playlist, flashvars;

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

	// open player popout. This function should retur true or false when popout is open or not
	//
	// position - stream position, flashvar parameter position (video clip player only)
	// camera - selected camera in flashback or liveFeed player
	window.openPlayerPopout = function (position, camera) {
		var url = "PlayerPopout.html";

		// for testing we get flashvars from player embed and pass it in query string
		if (position) flashvars.position = position;
		if (camera) flashvars.show = camera;
		if (playlist) flashvars.playlist = urlEncodeIfNecessary(playlist);

		var query = "";
		for (var key in flashvars) {
			query += key + "=" + flashvars[key] + "&";
		}

		var w = window.open(url + "?" + query, "PlayerPopout",
			"location=no,status=no,menubar=no,resizable=yes,scrollbars=yes,width=768,height=480");
		return w != null; // return true if browser allow to open popout otherwise false
	};

	function urlEncodeIfNecessary(s) {
		var regex = /[\\\"<>\.;]/;
		var hasBadChars = regex.exec(s) != null;
		return hasBadChars && typeof encodeURIComponent != 'undefined' ? encodeURIComponent(s) : s;
	}

	return {
		embed:function (parameters, width, height) {
			var swfVersionStr = "10.2.0"; // required flash player version
			var xiSwfUrlStr = "expressInstall.swf"; // path to express install of flash player

			var queryParams = new Array("contentID", "mode", "playlist"); // params list that we will read from query string

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

			width = width || 928;
			height = height || 600;

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
		},

		resizePlayer:function (width, height) {
			var player = swfobject.getObjectById('Player');
			player.width = width;
			player.height = height;
			try {
				player.resizePlayer(width, height);
			}
			catch (e) {
			}
		},

		takeSnapshot:function () {
			var player = swfobject.getObjectById('Player');
			var result;
			try {
				result = player.getSnapshot();
			}
			catch (e) {
			}
			return result;
		}
	};
}();
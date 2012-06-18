var clipsync = function () {
	var playlist, flashvars;
	
	// open player popout
	//
	// position - stream position, flashvar parameter position (video clip player only)
	window.openPlayerPopout = function (position, camera) {
		var url = "Player.html";

		if (position) flashvars.position = position;
		if (camera) flashvars.show = camera;
		if (playlist && !flashvars.mode) flashvars.playlist = urlEncodeIfNecessary(playlist);
		flashvars.popout = true;

		var query = "";
		for (var key in flashvars) {
			query += key + "=" + flashvars[key] + "&";
		}

		var w = window.open(url + "?" + query, "PlayerPopout",
			"location=no,status=no,menubar=no,resizable=yes,scrollbars=yes,width=640,height=360");
		return w != null; // return true if browser allow to open popout otherwise false
	};

	window.loadFlashback = function(timestamp) {
		playlist = 'playlist/hdn2_flashback2.xml' + '?r=' + Math.random();
		// some position calculation based on timestamp for testing purpose
		timestamp = timestamp / 100000;
		var position = (timestamp - Math.floor(timestamp)) * 1000;
		loadPlaylist(playlist, position);
	}

	window.loadPlaylist = function(url, position) {
		var player = swfobject.getObjectById('Player');
		player.loadPlaylist(url, position);
	}

	return {
		embed:function () {
			var swfVersionStr = "10.2.0";
			var xiSwfUrlStr = "expressInstall.swf";

			var queryParams = new Array("config", "contentID", "userID", "username", "thumbURL", "playlist", "mode", "popout");

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

			swfobject.embedSWF("Player.swf", "flashContent", "928", "600",
				swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
			swfobject.createCSS("#flashContent", "display:block;text-align:left;");
		}
	};
}();
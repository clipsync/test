var clipsync = (function () {
	return {
		embed:function () {
			var swfVersionStr = "10.2.0";
			var xiSwfUrlStr = "expressInstall.swf";

			// take flashvars from URL and pass it to application
			var queryParams = decodeURIComponent(swfobject.getQueryParamValue()).split('&');
			var flashvars = {};
			for (var i = 0; i < queryParams.length; i++) {
				var param = queryParams[i].split('=')[0];
				var value = swfobject.getQueryParamValue(param);
				if (value)
					flashvars[param] = decodeURIComponent(value);
			}

			var params = {};
			params.quality = "high";
			params.bgcolor = "#000000";
			params.allowscriptaccess = "sameDomain";
			params.allowfullscreen = "true";

			var attributes = {};
			attributes.id = "TabletPlayer";
			attributes.name = "TabletPlayer";
			attributes.align = "middle";

			swfobject.embedSWF("TabletPlayer.swf", "flashContent", "100%", "100%",
				swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
			swfobject.createCSS("#flashContent", "display:block;text-align:left;");
		}
	}
})();
var Cookie = function () {
	var BROWSER_CONNECTION_NAME = 'browserConnectionName',
		CLIENT_CONNECTION_NAME = 'clientConnectionName',
		browserConnectionName,
		clientConnectionName;

	(function init() {
		browserConnectionName = getCookie(BROWSER_CONNECTION_NAME);

		if (!browserConnectionName) {
			browserConnectionName = Math.random().toString();
			setCookie(BROWSER_CONNECTION_NAME, browserConnectionName);
		}

		clientConnectionName = getCookie(CLIENT_CONNECTION_NAME);
		if (!clientConnectionName) {
			clientConnectionName = Math.random().toString();
			setCookie(CLIENT_CONNECTION_NAME, clientConnectionName);
		}
	})();

	function setCookie(name, value, expires, path, domain, secure) {
		document.cookie = name + "=" + encodeURIComponent(value) +
			((expires) ? "; expires=" + expires : "") +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			((secure) ? "; secure" : "");
	}

	function getCookie(name) {
		var cookie = " " + document.cookie;
		var search = " " + name + "=";
		var setStr = null;
		var offset = 0;
		var end = 0;
		if (cookie.length > 0) {
			offset = cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length;
				end = cookie.indexOf(";", offset)
				if (end == -1) {
					end = cookie.length;
				}
				setStr = decodeURIComponent(cookie.substring(offset, end));
			}
		}
		return(setStr);
	}

	return {
		getChatBrowserConnection:function () {
			return browserConnectionName;
		},

		getChatClientConnection:function () {
			return clientConnectionName;
		}
	};
}();
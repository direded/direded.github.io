// Simple image loader

(function() {
    let content = {};
    let loading = [];
    let readyCallbacks = [];

    function load(url, name, callBack) {
        if (content[name])
            return content[name];
        else {
            let img = new Image();
            img.onload = function() {
                content[name] = img;
				if (callBack) callBack(url, name);
                if (isReady())
                    readyCallbacks.forEach(function(func) {});
			};
            content[name] = null;
            img.src = url;
        }
    };

    function get(name) {
        return content[name];
    };

    function isReady(name) {
		if (name != undefined)
			return content.hasOwnProperty(k) && content[k];
		else {
	        for (let k in content)
	            if (content.hasOwnProperty(k) && !content[k])
	                return false;
	        return true;
		}
    };

    function onReady(func) {
        readyCallbacks.push(func);
    };

	window.resources = window.resources || {};
    window.resources.img = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
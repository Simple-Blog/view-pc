;!function(win) {
    const zbase = {};
    zbase.doc = document;
    zbase.head = zbase.doc.getElementsByTagName("head")[0];
    zbase.jsArray = [];
    zbase.onload = [];
    zbase.config = {
        prefix : "/js/",
        suffix : ".js"
    };
    zbase.load = function(urls, onload) {
        urls = typeof urls === 'string' ? [urls] : urls;
        for (let i = 0; i < urls.length; ++i)
            urls[i] = zbase.config.prefix + urls[i] + zbase.config.suffix;
        this.loadUrl(urls, onload);
    };
    zbase.loadUrl = function(urls, onload) {
        this.onload.push(onload);
        urls = typeof urls === 'string' ? [urls] : urls;
        for (let url of urls) {
            if (!url.startsWith("http")) {
                if (url.startsWith("/") || url.startsWith("\\"))
                    url = window.location.protocol + "//" + win.location.host.toString().split("?")[0] + url;
                else {
                    let location = zbase.doc.location.toString();
                    let pathname = win.location.pathname.toString();
                    url = location.substring(0, location.lastIndexOf(pathname)) + "/" + url;
                }
            }

            if (this.jsArray.indexOf(url) > -1) {
                return;
            } else {
                this.jsArray.push(url);
            }

            console.log("loading -> " + url);

            let node = document.createElement("script");
            node.async = true;
            node.charset = "utf-8";
            node.src = url;
            this.head.appendChild(node);
            this.head.removeChild(node);
        }
    };
    win.onload = function() {
        zbase.onload = zbase.onload.reverse();
        for(let func of zbase.onload) {
            if (func != undefined)
                func();
        }
    };
    win.zbase = zbase;
}(window);
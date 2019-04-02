;!function(win) {
    const zhjs = {};
    zhjs.doc = document;
    zhjs.head = zhjs.doc.getElementsByTagName("head")[0];
    zhjs.jsArray = [];
    zhjs.onload = [];
    zhjs.config = {
        prefix : "/js/",
        suffix : ".js"
    };
    zhjs.load = function(url, onload) {
        this.loadUrl(zhjs.config.prefix + url + zhjs.config.suffix, onload);
    };
    zhjs.loadUrl = function(url, onload) {
        if (!url.startsWith("http")) {
            if (url.startsWith("/") || url.startsWith("\\"))
                url = window.location.protocol + "//" + win.location.host.toString().split("?")[0] + url;
            else {
                let location = zhjs.doc.location.toString();
                let pathname = win.location.pathname.toString();
                url = location.substring(0, location.lastIndexOf(pathname)) + "/" + url;
            }
        }

        console.log("loading -> " + url);

        if (this.jsArray.indexOf(url) > -1) {
            return;
        } else {
            this.jsArray.push(url);
        }

        let node = document.createElement("script");
        // node.async = true;
        node.charset = "utf-8";
        node.src = url;
        this.head.appendChild(node);
        // this.head.removeChild(node);
        this.onload.push(onload);
    };
    win.zhjs = zhjs;
    win.onload = function() {
        for(let i = 0; i < zhjs.onload.length; ++i)
            if (zhjs.onload[i] != undefined)
                zhjs.onload[i]();
    }
}(window);
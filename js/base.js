;!function(win) {
    const zhjs = new Object();
    zhjs.doc = document;
    zhjs.head = zhjs.doc.getElementsByTagName("head")[0];
    zhjs.load = function(url) {
        let node = document.createElement("script");
        node.async = true;
        node.charset = "utf-8";
        node.src = url;
        this.head.appendChild(node);
        this.head.removeChild(node);
    };
    win.zhjs = zhjs;
}(window);
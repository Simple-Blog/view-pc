zbase.load(["template-web", "httputil"], function() {
    const parser = {};
    parser.parse = async function(arg, element) {
        let child;
        while ((child = getElement(element).querySelector(arg)) !== null) {
            await this.parse(arg, child);
        }

        if (!isMatchArg(arg, element))
            return;

        let url = element.getAttribute('parser-url');
        if (url === undefined || url === "")
            element.outerHTML = element.innerHTML;
        else {
            try {
                let html = document.createElement("temp");
                let result = await httputil.get(parseUrl(url));
                html.innerHTML = template.compile(element.innerHTML)(result);
                loadImg(html);
                element.outerHTML = html.innerHTML;
                return;
            } catch (e) {
                console.log("获取响应参数失败");
                console.log(e);
                element.outerHTML = element.innerHTML;
            }
        }
    };

    function getElement(element) {
        if (element === undefined)
            return document;

        if (element.tagName === "TEMPLATE")
            return element.content;

        return element;
    }

    function isMatchArg(arg, element) {
        if (element === undefined || element === document)
            return false;
        if (arg.startsWith("#"))
            return element.getAttribute("id") === arg.substring(1);
        if (arg.startsWith("."))
            return element.getAttribute("class").indexOf(arg.substring(1)) > -1;
        else {
            return element.tagName === arg.toUpperCase();
        }
    }

    function loadImg(element) {
        for (let img of element.getElementsByTagName("img")) {
            let src = img.getAttribute("my-src");
            if (src === null || src === "")
                continue;
            img.setAttribute("src", src);
            img.removeAttribute("my-src");
        }
    }

    function parseUrl(url) {
        let search = window.location.search;
        if (search.length === 0)
            return url;

        let params = search.substring(1).split("&");
        for (let param of params) {
            param = param.split('=');
            if (param.length !== 2)
                continue;

            while (url.indexOf(param[0]) > 0) {
                url = url.replace('{' + param[0] + '}', param[1]);
            }
        }
        return url;
    }

    window.parser = parser;
});
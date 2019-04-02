;!function(win) {
    zhjs.load("httputil");
    zhjs.load("template-web");

    const parser = {};
    parser.parseTemplate = async function(element, arg) {
        let child;
        while ((child = getFirstChild(element, arg)) != undefined) {
            await parser.parseTemplate(child, arg);
        }

        if (!isMatchArg(element, arg))
            return;

        let url = element.getAttribute('parser-url');
        if (url != undefined && url != "") {
            try {
                let html = document.createElement("template");
                let result = await httputil.get(url);
                html.innerHTML = template.compile(element.innerHTML)(result.data);
                loadImg(html);
                element.outerHTML = html.innerHTML;
                return;
            } catch (e) {
                console.log("获取响应参数失败");
                console.log(e);
            }
        }
        element.outerHTML = element.innerHTML;
    };

    function isMatchArg(element, arg) {
        if (arg.startsWith("#"))
            return element.getAttribute("id") == arg.substring(1);
        if (arg.startsWith("."))
            return element.getAttribute("class").indexOf(arg.substring(1)) > -1;
        else {
            return element.tagName == arg.toUpperCase();

        }
    }

    function getFirstChild(element, arg) {
        if (arg.startsWith("#"))
            return element.getElementById(arg.substring(1))[0];
        if (arg.startsWith("."))
            return element.getElementsByClassName(arg.substring(1))[0];
        else
            return element.getElementsByTagName(arg)[0];
    }

    function loadImg(element) {
        let imgs = element.getElementsByTagName("img");
        for (let i = 0; i < imgs.length; ++i) {
            let src = imgs[i].getAttribute("my-src");
            if (src == null || src == "")
                continue;
            imgs[i].setAttribute("src", src);
            imgs[i].removeAttribute("my-src");
        }
    }

    win.parser = parser;
}(window);
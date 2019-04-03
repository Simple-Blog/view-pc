zbase.load(["template-web", "httputil"], function() {
    const parser = {};
    parser.parseTemplate = async function(element, arg) {
        console.log("11111");

        console.log(element);
        console.log($(element.innerHTML).find(arg));
        console.log("11111");
        let child;
        while ((child = getFirstChild(element, arg)) != undefined) {
            await this.parseTemplate(child, arg);
        }
        if (!isMatchArg(element, arg))
            return;

        let url = element.getAttribute('parser-url');
        if (url != undefined && url != "") {
            try {
                let html = document.createElement("temp");
                let result = await httputil.get(url);
                html.innerHTML = template.compile(element.innerHTML)(result);
                // loadImg(html);
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
        for (let img of element.getElementsByTagName("img")) {
            let src = img.getAttribute("my-src");
            if (src == null || src == "")
                continue;
            img.setAttribute("src", src);
            img.removeAttribute("my-src");
        }
    }

    window.parser = parser;
});
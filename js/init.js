layui.define(['httputil', 'laytpl'], function(exports) {
    let httputil = layui.httputil;
    let laytpl = layui.laytpl;

    exports('init', function () {
        parseTemplet(document);
    });

    async function parseTemplet(element) {
        while (element.getElementsByTagName("templet").length > 0) {
            await parseTemplet(element.getElementsByTagName("templet")[0]);
        }

        if (element == document)
            return;

        let url = element.getAttribute('url');
        if (url == "")
            return;

        try {
            let html = document.createElement("templet");
            let result = await httputil.get(url);
            html.innerHTML = laytpl(element.innerHTML).render(result.data != null ? result.data : {});
            loadImg(html);
            element.outerHTML = html.innerHTML;
        } catch (e) {
            console.log("获取响应参数失败");
            console.log(e);
        }
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
});
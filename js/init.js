layui.define(['httputil', 'jquery', 'laytpl'], function(exports) {
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
            let html = element.innerHTML;
            let result = await httputil.get(url);
            html = laytpl(html).render(result.data != null ? result.data : {});
            element.outerHTML = html;
        } catch (e) {
            console.log("获取响应参数失败");
            console.log(e);
        }
    }
});
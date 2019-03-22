layui.define(['httputil', 'jquery', 'laytpl'], function(exports){
    let httputil = layui.httputil;
    let jquery = layui.jquery;
    let laytpl = layui.laytpl;

    exports('init', function(){
        jquery('.templet').each(async function(){
            jquery(this).hide();
            let url = jquery(this).attr('url');
            let html = jquery(this).html();

            try {
                let result = await httputil.get(url);
                html = laytpl(html).render(result.data != null ? result.data : {});
                jquery(this).html(html);
                jquery(this).show();
                return;
            } catch (e) {
                console.log("获取响应参数失败");
                console.log(e);
            }
        });
    });
});
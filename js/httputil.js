layui.define(['axios', 'jquery'], function(exports){
    let axios = layui.axios;
    let jquery = layui.jquery;

    const strSender = axios.create({
        baseURL : '/api',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        responseType: 'json',
        // 参数序列化
        paramsSerializer: function(params) {
            // console.log("paramsSerializer : ");
            // console.log(params);
            if (params == undefined)
                return params;
            return jquery.param(params);
        },
        // 请求前拦截器
        transformRequest: [function(data) {
            // console.log("transformRequest : ");
            // console.log(data);
            if (data == undefined)
                return data;
            return jquery.param(data);
        }],
        // 请求后拦截器
        transformResponse: [function(data) {
            // console.log("transformResponse : ");
            // console.log(data);
            return data;
        }],
        validateStatus: function (status) {
            if (status == 404)
                window.location = "/404.html";
            return status == 200;
        },
    });

    exports('httputil', {
        post : function(url, data) {
            return strSender.post(url, data);
        },
        get : function(url, data) {
            return strSender.get(url, data);
        }
    });
});
zbase.load(["template-web", "httputil", "jquery"], function() {
    const parser = {};
    parser.temp = 0;
    parser.config = {
        textTags : ["script", "noscript"],
        contentTags : ["template"]
    };
    parser.parse = async function(arg, element) {
        if (element === undefined)
            element = document;

        console.log(element);
        while ($(getElement(element)).find(arg).length > 0) {
            if (this.temp++ > 10)
                return;
            await this.parse(arg, $(element).find(arg)[0]);
        }


        element.prop('outerHTML', element.html());
    };

    function getElement(element) {
        let tagName = element.tagName.toLowerCase();
        console.log(tagName);
        if (parser.config.contentTags.indexOf(tagName))
            return element.content;
        if (parser.config.textTags.indexOf(tagName))
            return element.innerHTML;
        return element;
    }

    window.parser = parser;
});
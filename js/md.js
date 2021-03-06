zbase.load(['marked', 'highlight'], function () {
    marked.setOptions({
        gfm: true,
        tables : true,
        langPrefix: 'hljs lang-',
        breaks: true,
        headerIds: false,
        xhtml: true,
        highlight: function (code ,event) {
            return hljs.highlightAuto(code, [event]).value;
        }
    });

    window.md = {
        parse: function (str) {
            return marked(str);
        },
        parseAuto: function (before, after) {
            if (after === undefined)
                after = before;
            let text = typeof(before) == 'string' ? before : before.innerHTML;
            // text = text.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return {'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'}[t];});
            convertCode(after, this.parse(text));
        }
    }

    function convertCode(element, contentStr) {
        let content = document.createElement("div");
        content.innerHTML = contentStr;
        content.querySelectorAll('code.hljs').forEach(function (codeElement) {
            let showLine = false;
            let ul = document.createElement("ul");
            codeElement.innerHTML.split(/[\n]/g).forEach(function (line, index) {
                if (index == 0 && line == ":set number") {
                    showLine = true;
                    return;
                }
                let li = document.createElement("li");
                if (showLine)
                    setLineNumber(li, index);
                setCode(li, line);
                ul.appendChild(li);
            });
            clean(codeElement).appendChild(ul);
        });

        clean(element);
        for (let i = 0; i < content.childNodes.length; i++)
            element.appendChild(content.childNodes[i]);

        element.querySelectorAll('code.hljs ul').forEach(function (ulElement) {
            let width = ulElement.scrollWidth + "px";
            ulElement.childNodes.forEach(function (liElement) {
                liElement.style.width = width;
            });
        });
        content = null;
    }

    function clean(element) {
        while (element.hasChildNodes())
            element.removeChild(element.firstChild);
        return element;
    }

    function setLineNumber(element, num) {
        let lineNumber = document.createElement("span");
        lineNumber.className = 'hljs-ln-num';
        lineNumber.setAttribute("ln-num", num);
        element.appendChild(lineNumber);
    }

    function setCode(element, str) {
        let code = document.createElement("span");
        code.className = 'hljs-ln-code';
        code.innerHTML = str;
        element.appendChild(code);
    }
});

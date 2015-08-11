var YSY = (function() {

    /**
     * JavaScript function to match (and return) the video Id
     * of any valid Youtube Url, given as input string.
     * @author: Stephan Schmitz <eyecatchup@gmail.com>
     * @url: http://stackoverflow.com/a/10315969/624466
     */
    function ytVidId(url) {
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? RegExp.$1 : false;
    }

    /**
     *
     * @param {HTMLElement} el
     * @param {Object} [settings]
     * @constructor
     */
    function YSY(el, settings) {
        settings = settings || {};

        this.el = el;
        this.anchors = el.querySelectorAll('a');
        this.settings = {};

        var defaults = YSY.defaults,
            i;

        for (i in defaults) if (defaults.hasOwnProperty(i)) {
            this.settings[i] = settings.hasOwnProperty(i) ? settings[i] : defaults[i];
        }
    }

    YSY.prototype = {
        build: function() {
            var anchors = this.anchors,
                anchor,
                max = anchors.length,
                i = 0,
                me = this,
                parent = this.el.parentNode,
                uis = [],
                href,
                youtubeId;

            for (; i < max; i++) {
                anchor = anchors[i];
                href = anchor.getAttribute('href');

                if (!(youtubeId = ytVidId(href))) continue;

                var parserDiv = document.createElement('div'),
                    template = this.template.replace(/{{\s*[\w\.]+\s*}}/g, function (str) {
                        str = str.substring(2, str.length - 2);
                        var key = str.trim();

                        if (key.toLowerCase() === 'id') {
                            return youtubeId;
                        } else {
                            return me.settings.hasOwnProperty(key) ? me.settings[key] : '';
                        }
                    });

                parserDiv.innerHTML = template;

                parent.insertBefore(parserDiv.children[0], this.el.nextSibling);

                uis.push(parserDiv.childNodes);
            }

            return uis;
        },
        template: '<iframe \
            width="{{width}}"\
            height="{{height}}"\
            src="https://www.youtube.com/embed/{{id}}"\
            frameborder="0"\
            allowfullscreen></iframe>'
    };

    YSY.defaults = {
        width: 560,
        height: 315
    };

    return YSY;
})();
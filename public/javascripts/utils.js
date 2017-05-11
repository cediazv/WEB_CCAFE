(function(){
    var QueryString = {
        toString: function () {
            var retorno = '',
                sep = '';
            for (var name in QueryString) {
                if (typeof QueryString[name] !== 'function') {
                    retorno += sep + name + '=' + QueryString[name];
                    sep = '&';
                }
            }
            return retorno;
        },
        hasProperties: function () {
            for (var name in QueryString)
                if (typeof QueryString[name] !== 'function')
                    return true;
            return false;
        }
    };

    var hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    if (window.location.href.lastIndexOf(hashes[0]) != 0) {
        hashes.forEach(function (hash) {
            hash = hash.split('=');
            QueryString[hash[0].toLowerCase()] = hash[1].split('#').shift();
        });
    }

    var addEvent = function (_this, type, callback) {
        if (_this.addEventListener) {
            _this['_' + type] = callback;
            _this.addEventListener(type, callback, false);
        }
        else if (_this.attachEvent) {
            _this['_' + type] = callback;
            _this['e' + type + callback] = callback;
            _this[type + callback] = function () {
                _this['e' + type + callback](window.event);
            }
            _this.attachEvent('on' + type, _this[type + callback]);
        }
        return _this;
    }

    window['QueryString'] = QueryString;
    window['AddEvent'] = addEvent;
})();
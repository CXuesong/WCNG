System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LocalizedResourceProvider;
    return {
        setters: [],
        execute: function () {
            LocalizedResourceProvider = (function () {
                function LocalizedResourceProvider(locale) {
                    this.loadedDicts = {};
                    this.observables = {};
                    this.currentLocale(locale);
                }
                LocalizedResourceProvider.prototype.currentLocale = function (value) {
                    var _this = this;
                    if (typeof value == "undefined")
                        return this._currentLocale;
                    if (!value)
                        value = "";
                    this._currentLocale = value;
                    if (!(value in this.loadedDicts)) {
                        this.loadedDicts[value] = null;
                        this.fetchResourceDictAsync(value, (function (dict) {
                            console.debug("Loaded resource dictionary for ", value);
                            _this.loadedDicts[value] = dict;
                            _this.refreshObservables();
                        }));
                    }
                };
                LocalizedResourceProvider.prototype.getString = function (key) {
                    var dict = this.loadedDicts[this._currentLocale];
                    return dict ? dict[key] : null;
                };
                LocalizedResourceProvider.prototype.getObservableString = function (key) {
                    var v = this.observables[key];
                    if (v)
                        return v;
                    var lv = this.getString(key);
                    v = ko.observable(lv ? lv : "[" + key + "]");
                    this.observables[key] = v;
                    return v;
                };
                LocalizedResourceProvider.prototype.refreshObservables = function () {
                    for (var key in this.observables) {
                        var lv = this.getString(key);
                        console.debug(key, lv);
                        if (lv)
                            this.observables[key](lv);
                    }
                };
                LocalizedResourceProvider.prototype.fetchResourceDictAsync = function (locale, callback) {
                    var path = "data/localization";
                    if (locale)
                        path += "/" + locale;
                    $.getJSON(path + "/text.json", function (data, textStatus, jqXHR) { return callback(data); });
                };
                return LocalizedResourceProvider;
            }());
            exports_1("LocalizedResourceProvider", LocalizedResourceProvider);
        }
    };
});

//# sourceMappingURL=localization.js.map

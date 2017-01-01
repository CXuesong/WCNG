System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function fallbackLanguageTag(tag) {
        var index = tag.lastIndexOf("-");
        if (index <= 0)
            return "";
        return tag.substr(0, index);
    }
    var LocalizedResourceProvider;
    return {
        setters: [],
        execute: function () {
            LocalizedResourceProvider = (function () {
                function LocalizedResourceProvider(locale) {
                    var _this = this;
                    this.loadedDicts = {};
                    this.observables = {};
                    $.getJSON(LocalizedResourceProvider.LocalizedResourcePath + "/catalog.json", function (data, textStatus, jqXHR) {
                        _this._catalog = data;
                        _this.setCurrentLocale(locale);
                    });
                }
                LocalizedResourceProvider.prototype.getCurrentLocale = function () {
                    return this._currentLocale;
                };
                LocalizedResourceProvider.prototype.setCurrentLocale = function (value) {
                    var _this = this;
                    console.assert(!!this._catalog);
                    value = (value || "").toLowerCase();
                    while (value && this._catalog.languages.indexOf(value) < 0) {
                        value = fallbackLanguageTag(value);
                    }
                    if (!value) {
                        console.assert(this._catalog.languages.indexOf(LocalizedResourceProvider.FallbackLanguage) >= 0);
                        value = LocalizedResourceProvider.FallbackLanguage;
                    }
                    this._currentLocale = value;
                    if (!(value in this.loadedDicts)) {
                        this.loadedDicts[value] = null;
                        this.fetchResourceDictAsync(value, (function (dict) {
                            console.debug("Loaded resource dictionary for ", value);
                            _this.loadedDicts[value] = dict;
                            if (_this._currentLocale == value)
                                _this.refreshObservables();
                        }));
                    }
                };
                LocalizedResourceProvider.prototype.getString = function (key) {
                    var dict = this.loadedDicts[this._currentLocale];
                    if (!dict)
                        return null;
                    var value = dict[key];
                    if (!value)
                        return undefined;
                    if (value instanceof Array)
                        value = value.join("");
                    return value;
                };
                LocalizedResourceProvider.prototype.getObservableString = function (key) {
                    var v = this.observables[key];
                    if (v)
                        return v;
                    var lv = this.getString(key);
                    v = ko.observable(lv || "[" + key + "]");
                    this.observables[key] = v;
                    return v;
                };
                LocalizedResourceProvider.prototype.refreshObservables = function () {
                    for (var key in this.observables) {
                        var lv = this.getString(key);
                        if (lv)
                            this.observables[key](lv);
                    }
                };
                LocalizedResourceProvider.prototype.fetchResourceDictAsync = function (locale, callback) {
                    console.assert(!!locale);
                    $.getJSON(LocalizedResourceProvider.LocalizedResourcePath + "/" + locale + "/text.json", function (data, textStatus, jqXHR) { return callback(data); });
                };
                return LocalizedResourceProvider;
            }());
            LocalizedResourceProvider.LocalizedResourcePath = "data/localization";
            LocalizedResourceProvider.FallbackLanguage = "en";
            exports_1("LocalizedResourceProvider", LocalizedResourceProvider);
        }
    };
});

//# sourceMappingURL=localization.js.map

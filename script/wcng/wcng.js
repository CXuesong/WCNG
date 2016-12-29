System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NameGenerator;
    return {
        setters: [],
        execute: function () {
            NameGenerator = (function () {
                function NameGenerator(prefixes, suffixes) {
                    this.prefixes = prefixes;
                    this.suffixes = suffixes;
                    if (prefixes.length == 0)
                        throw "prefixes cannot be empty.";
                    if (suffixes.length == 0)
                        throw "suffixes cannot be empty.";
                }
                NameGenerator.prototype.nextName = function () {
                    for (var i = 0; i < NameGenerator.MaxAllowedRetries; i++) {
                        var pi = Math.floor(Math.random() * this.prefixes.length);
                        var si = Math.floor(Math.random() * this.suffixes.length);
                        var p = this.prefixes[pi], s = this.suffixes[si];
                        if (p == s)
                            continue;
                        var builder = p + s;
                        return builder[0].toUpperCase() + builder.substring(1).toLowerCase();
                    }
                };
                return NameGenerator;
            }());
            NameGenerator.MaxAllowedRetries = 10;
            exports_1("NameGenerator", NameGenerator);
        }
    };
});

//# sourceMappingURL=wcng.js.map

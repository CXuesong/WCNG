System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function titleCase(str) {
        if (!str)
            return str;
        return str[0].toUpperCase() + str.substring(1).toLowerCase();
    }
    var ClanCatName, NameGenerator;
    return {
        setters: [],
        execute: function () {
            ClanCatName = (function () {
                function ClanCatName(prefix, suffix) {
                    this.prefix = prefix;
                    this.suffix = suffix;
                    console.assert(prefix == prefix.toLowerCase());
                    console.assert(suffix == suffix.toLowerCase());
                }
                ClanCatName.prototype.getKitName = function () {
                    return titleCase(this.prefix + "kit");
                };
                ClanCatName.prototype.getApprenticeName = function () {
                    return titleCase(this.prefix + "paw");
                };
                ClanCatName.prototype.getWarriorName = function () {
                    var splitter = this.prefix[this.prefix.length - 1] == this.suffix[0] ? "-" : "";
                    return titleCase(this.prefix + splitter + this.suffix);
                };
                ClanCatName.prototype.getLeaderName = function () {
                    return titleCase(this.prefix + "star");
                };
                ClanCatName.prototype.getAncientName = function () {
                    return titleCase(this.prefix) + " " + titleCase(this.suffix);
                };
                ClanCatName.prototype.toString = function () {
                    return this.getWarriorName();
                };
                return ClanCatName;
            }());
            exports_1("ClanCatName", ClanCatName);
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
                        var p = this.prefixes[pi].toLowerCase(), s = this.suffixes[si].toLowerCase();
                        if (p == s)
                            continue;
                        return new ClanCatName(p, s);
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

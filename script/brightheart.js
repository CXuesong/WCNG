System.register(["./wcng/wcng", "./wcng/localization"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function onLoad() {
        var vm = new BrightheartViewModel();
        ko.applyBindings(vm);
    }
    var Wcng, Localization, BrightheartViewModel;
    return {
        setters: [
            function (Wcng_1) {
                Wcng = Wcng_1;
            },
            function (Localization_1) {
                Localization = Localization_1;
            }
        ],
        execute: function () {
            BrightheartViewModel = (function () {
                function BrightheartViewModel() {
                    var _this = this;
                    this.lcProvider = new Localization.LocalizedResourceProvider(null);
                    this.generatedName = ko.observable("Brightheart");
                    this.generator = null;
                    $.getJSON("data/parts.json", function (data, textStatus, jqXHR) {
                        _this.generator = new Wcng.NameGenerator(data.clanCat.prefixes, data.clanCat.suffixes);
                    });
                }
                BrightheartViewModel.prototype.generateNameCommand = function () {
                    if (this.generator != null) {
                        this.generatedName(this.generator.nextName());
                    }
                };
                BrightheartViewModel.prototype.LC = function (key) {
                    return this.lcProvider.getObservableString(key);
                };
                return BrightheartViewModel;
            }());
            onLoad();
        }
    };
});

//# sourceMappingURL=brightheart.js.map

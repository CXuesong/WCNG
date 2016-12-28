System.register(["./wcng/wcng"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function onLoad() {
        var vm = new BrightheartViewModel();
        ko.applyBindings(vm);
        vm.initializeDataCommand();
    }
    var Wcng, BrightheartViewModel;
    return {
        setters: [
            function (Wcng_1) {
                Wcng = Wcng_1;
            }
        ],
        execute: function () {
            BrightheartViewModel = (function () {
                function BrightheartViewModel() {
                    this.generatedName = ko.observable("Brightheart");
                    this.generator = null;
                    this.isInitializing = false;
                }
                BrightheartViewModel.prototype.generateNameCommand = function () {
                    if (this.generator != null) {
                        this.generatedName(this.generator.nextName());
                    }
                };
                BrightheartViewModel.prototype.initializeDataCommand = function () {
                    var _this = this;
                    if (this.isInitializing)
                        return;
                    $.getJSON("data/parts.json", function (data, textStatus, jqXHR) {
                        _this.generator = new Wcng.NameGenerator(data.clanCat.prefixes, data.clanCat.suffixes);
                    });
                };
                return BrightheartViewModel;
            }());
            onLoad();
        }
    };
});

//# sourceMappingURL=brightheart.js.map

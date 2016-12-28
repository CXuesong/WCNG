/// <reference path="../../typings/index.d.ts"/>

import * as Wcng from "./wcng/wcng";
import * as Schemas from "./wcng/schemas";

/**
 * brightheart.html main VM.
 */
class BrightheartViewModel {
    public generatedName = ko.observable("Brightheart");
    public generator: Wcng.NameGenerator = null;
    public isInitializing = false;
    public generateNameCommand() {
        if (this.generator != null) {
            this.generatedName(this.generator.nextName());
        }
    }
    public initializeDataCommand() {
        if (this.isInitializing) return;
        $.getJSON("data/parts.json", (data: Schemas.NameParts, textStatus, jqXHR) => {
            this.generator = new Wcng.NameGenerator(data.clanCat.prefixes, data.clanCat.suffixes);
        });
    }
}

function onLoad() {
    let vm = new BrightheartViewModel();
    ko.applyBindings(vm);
    vm.initializeDataCommand();
}

onLoad();
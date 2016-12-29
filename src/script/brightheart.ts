/// <reference path="../../typings/index.d.ts"/>

import * as Wcng from "./wcng/wcng";
import * as Schemas from "./wcng/schemas";
import * as Localization from "./wcng/localization";


/**
 * brightheart.html main VM.
 */
class BrightheartViewModel {
    private lcProvider = new Localization.LocalizedResourceProvider(null);
    public generatedName = ko.observable("Brightheart");
    public generator: Wcng.NameGenerator = null;

    constructor() {
        $.getJSON("data/parts.json", (data: Schemas.NameParts, textStatus, jqXHR) => {
            this.generator = new Wcng.NameGenerator(data.clanCat.prefixes, data.clanCat.suffixes);
        });
    }

    public generateNameCommand() {
        if (this.generator != null) {
            this.generatedName(this.generator.nextName());
        }
    }

    public LC(key: string) {
        return this.lcProvider.getObservableString(key);
    }
}

function onLoad() {
    let vm = new BrightheartViewModel();
    ko.applyBindings(vm);
}

onLoad();
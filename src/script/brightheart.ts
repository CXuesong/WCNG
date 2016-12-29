/// <reference path="../../typings/index.d.ts"/>

import * as Wcng from "./wcng/wcng";
import * as Schemas from "./wcng/schemas";
import * as Localization from "./wcng/localization";


/**
 * brightheart.html main VM.
 */
class BrightheartViewModel {
    private lcProvider = new Localization.LocalizedResourceProvider(navigator.language);
    private generatedName: Wcng.ClanCatName;

    public generatedKitName = ko.observable("Brightkit");
    public generatedApprenticeName = ko.observable("Brightpaw");
    public generatedWarriorName = ko.observable("Brightheart");
    public generatedLeaderName = ko.observable("*");
    public generatedAncientCatName = ko.observable("Bright Heart");
    public generator: Wcng.NameGenerator = null;

    constructor() {
        $.getJSON("data/parts.json", (data: Schemas.NameParts, textStatus, jqXHR) => {
            this.generator = new Wcng.NameGenerator(data.clanCat.prefixes, data.clanCat.suffixes);
        });
    }

    public generateNameCommand() {
        if (this.generator != null) {
            let n = this.generator.nextName();
            this.generatedName = n;
            this.generatedKitName(n.getKitName());
            this.generatedApprenticeName(n.getApprenticeName());
            this.generatedWarriorName(n.getWarriorName());
            this.generatedLeaderName(n.getLeaderName());
            this.generatedAncientCatName(n.getAncientName());
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
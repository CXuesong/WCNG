/// <reference path="../../../typings/index.d.ts"/>

import * as Schemas from "./schemas"

type TextDict = { [key: string]: string };

function fallbackLanguageTag(tag: string) {
    let index = tag.lastIndexOf("-");
    if (index <= 0) return "";
    return tag.substr(0, index);
}

export class LocalizedResourceProvider {

    public static readonly LocalizedResourcePath = "data/localization";
    public static readonly FallbackLanguage = "en";

    private loadedDicts: { [locale: string]: TextDict } = {};
    private observables: { [key: string]: KnockoutObservable<string> } = {};
    private _currentLocale: string;
    private _catalog: Schemas.LocalizationCatalog;

    constructor(locale: string) {
        $.getJSON(LocalizedResourceProvider.LocalizedResourcePath + "/catalog.json",
            (data: Schemas.LocalizationCatalog, textStatus, jqXHR) => {
                this._catalog = data;
                this.setCurrentLocale(locale);
            });
    }

    public getCurrentLocale() {
        return this._currentLocale;
    }

    public setCurrentLocale(value: string) {
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
            this.fetchResourceDictAsync(value, (dict => {
                console.debug("Loaded resource dictionary for ", value);
                this.loadedDicts[value] = dict;
                if (this._currentLocale == value)
                    this.refreshObservables();
            }));
        }
    }

    public getString(key: string) {
        var dict = this.loadedDicts[this._currentLocale];
        return dict ? dict[key] : null;
    }

    public getObservableString(key: string) {
        let v = this.observables[key];
        if (v) return v;
        let lv = this.getString(key);
        v = ko.observable(lv || `[${key}]`);
        this.observables[key] = v;
        return v;
    }

    public refreshObservables() {
        for (let key in this.observables) {
            let lv = this.getString(key);
            // console.debug(key, lv);
            if (lv) this.observables[key](lv);
        }
    }

    private fetchResourceDictAsync(locale: string, callback: (dict: TextDict) => any) {
        console.assert(!!locale);
        $.getJSON(`${LocalizedResourceProvider.LocalizedResourcePath}/${locale}/text.json`,
            (data: TextDict, textStatus, jqXHR) => callback(data));
    }
}


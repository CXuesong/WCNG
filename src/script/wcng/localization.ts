/// <reference path="../../../typings/index.d.ts"/>

import * as Schemas from "./schemas"

type TextDict = {[key: string]: string};

export class LocalizedResourceProvider {
    private loadedDicts: {[locale: string]: TextDict} = {};
    private observables: {[key: string]: KnockoutObservable<string>} = {};
    private _currentLocale: string;

    constructor(locale: string) {
        this.currentLocale(locale);
    }

    public currentLocale(): string;
    public currentLocale(value: string): void;
    public currentLocale(value?: string)
    {
        if (typeof value == "undefined") return this._currentLocale;
        if (!value) value = "";
        this._currentLocale = value;
        if (!(value in this.loadedDicts))
        {
            this.loadedDicts[value] = null;
            this.fetchResourceDictAsync(value, (dict => {
                console.debug("Loaded resource dictionary for ", value);
                this.loadedDicts[value] = dict;
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
        v = ko.observable(lv ? lv : `[${key}]`);
        this.observables[key] = v;
        return v;
    }

    public refreshObservables()
    {
        for (let key in this.observables)
        {
            let lv = this.getString(key);
            console.debug(key, lv);
            if (lv) this.observables[key](lv);
        }
    }

    private fetchResourceDictAsync(locale: string, callback: (dict: TextDict) => any) {
        let path = "data/localization";
        if (locale) path += "/" + locale;
        $.getJSON(`${path}/text.json`, (data: TextDict, textStatus, jqXHR) => callback(data));
    }
}


function titleCase(str: string){
    if (!str) return str;
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
}
/**
 * Represents a series of names used by a clan cat.
 */
export class ClanCatName {

    constructor(public prefix: string, public suffix: string)
    {
        console.assert(prefix == prefix.toLowerCase());
        console.assert(suffix == suffix.toLowerCase());
    }

    public getKitName() {
        return titleCase(this.prefix + "kit");
    }

    public getApprenticeName() {
        return titleCase(this.prefix + "paw");
    }

    public getWarriorName() {
        // E.g. one-eye
        let splitter = this.prefix[this.prefix.length - 1] == this.suffix[0] ? "-" : "";
        return titleCase(this.prefix + splitter + this.suffix);
    }

    public getLeaderName() {
        return titleCase(this.prefix + "star");
    }

    public getAncientName() {
        return titleCase(this.prefix) + " " + titleCase(this.suffix);
    }

    public toString() {
        return this.getWarriorName();
    }
}

export class NameGenerator {

    public static readonly MaxAllowedRetries = 10;

    constructor(public prefixes: string[], public suffixes: string[]) {
        if (prefixes.length == 0) throw "prefixes cannot be empty.";
        if (suffixes.length == 0) throw "suffixes cannot be empty.";
    }

    /**
     * Generates the next warrior name.
     */
    public nextName(): ClanCatName {
        for (let i = 0; i < NameGenerator.MaxAllowedRetries; i++)
        {
            let pi = Math.floor(Math.random()*this.prefixes.length);
            let si = Math.floor(Math.random()*this.suffixes.length);
            let p = this.prefixes[pi].toLowerCase(), s = this.suffixes[si].toLowerCase();
            // Sanity check
            // Prefix cannot be the same as suffix
            if (p == s) continue;
            return new ClanCatName(p, s);
        }
    }
}

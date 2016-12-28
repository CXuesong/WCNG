export class NameGenerator {
    constructor(public prefixes: string[], public suffixes: string[]) {
        if (prefixes.length == 0) throw "prefixes cannot be empty.";
        if (suffixes.length == 0) throw "suffixes cannot be empty.";
    }

    /**
     * Generates the next warrior name.
     */
    public nextName(): string {
        var pi = Math.floor(Math.random()*this.prefixes.length);
        var si = Math.floor(Math.random()*this.suffixes.length);
        var builder = this.prefixes[pi] + this.suffixes[si];
        return builder[0].toUpperCase() + builder.substring(1).toLowerCase();
    }
}

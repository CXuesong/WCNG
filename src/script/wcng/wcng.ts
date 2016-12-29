export class NameGenerator {

    public static readonly MaxAllowedRetries = 10;

    constructor(public prefixes: string[], public suffixes: string[]) {
        if (prefixes.length == 0) throw "prefixes cannot be empty.";
        if (suffixes.length == 0) throw "suffixes cannot be empty.";
    }

    /**
     * Generates the next warrior name.
     */
    public nextName(): string {
        for (let i = 0; i < NameGenerator.MaxAllowedRetries; i++)
        {
            let pi = Math.floor(Math.random()*this.prefixes.length);
            let si = Math.floor(Math.random()*this.suffixes.length);
            let p = this.prefixes[pi], s = this.suffixes[si];
            // Sanity check
            // Prefix cannot be the same as suffix
            if (p == s) continue;
            let builder = p + s;
            return builder[0].toUpperCase() + builder.substring(1).toLowerCase();
        }
    }
}

/**
 * parts.json/clanCat
 */
export interface ClanCatNameParts {
    prefixes: string[];
    suffixes: string[];
}

/**
 * parts.json Root.
 */
export interface NameParts {
    clanCat: ClanCatNameParts;
}

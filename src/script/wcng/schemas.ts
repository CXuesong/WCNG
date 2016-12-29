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

/**
 * localization/text.json Root.
 */
export interface LocalizedTextDict {
    name_generator: string;
    warrior_name: string;
    next_name: string;
}
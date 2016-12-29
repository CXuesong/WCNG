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
 * localization/catalog.json Root.
 */
export interface LocalizationCatalog {
    /**
     * Known languages.
     */
    languages: string[];
}
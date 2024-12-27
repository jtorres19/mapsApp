export interface PlacesRs {
    features:    Feature[];
    attribution: string;
    type:        string;
}

export interface Feature {
    geometry:   Geometry;
    id:         string;
    type:       string;
    properties: Properties;
}

export interface Geometry {
    coordinates: number[];
    type:        string;
}

export interface Properties {
    feature_type:    string;
    mapbox_id:       string;
    bbox:            number[];
    name:            string;
    coordinates:     Coordinates;
    context:         Context;
    place_formatted: string;
    full_address:    string;
    name_preferred:  string;
}

export interface Context {
    country:   Country;
    place:     Locality;
    region:    Region;
    locality?: Locality;
}

export interface Country {
    country_code:         string;
    mapbox_id:            string;
    translations:         Translations;
    name:                 string;
    wikidata_id:          string;
    country_code_alpha_3: string;
}

export interface Translations {
    es: Es;
}

export interface Es {
    name:     string;
    language: Language;
}

export enum Language {
    Es = "es",
}

export interface Locality {
    mapbox_id:    string;
    translations: Translations;
    name:         string;
    wikidata_id?: string;
}

export interface Region {
    mapbox_id:        string;
    translations:     Translations;
    name:             string;
    wikidata_id:      string;
    region_code_full: string;
    region_code:      string;
}

export interface Coordinates {
    latitude:  number;
    longitude: number;
}

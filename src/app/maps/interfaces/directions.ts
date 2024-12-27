export interface DirectionsRs {
    routes:    Route[];
    code:      string;
    waypoints: Waypoint[];
    uuid:      string;
}

export interface Route {
    duration:    number;
    distance:    number;
    legs:        Leg[];
    weight_name: string;
    weight:      number;
    geometry:    Geometry;
}

export interface Geometry {
    coordinates: Array<number[]>;
    type:        Type;
}

export enum Type {
    LineString = "LineString",
}

export interface Leg {
    duration:      number;
    summary:       string;
    distance:      number;
    sirns:         Sirns;
    weight:        number;
    via_waypoints: any[];
    steps:         Step[];
    admins:        Admin[];
}

export interface Admin {
    iso_3166_1:        string;
    iso_3166_1_alpha3: string;
}

export interface Sirns {
}

export interface Step {
    duration:      number;
    mode:          Mode;
    distance:      number;
    name:          string;
    weight:        number;
    geometry:      Geometry;
    driving_side:  DrivingSide;
    intersections: Intersection[];
    maneuver:      Maneuver;
    ref?:          string;
    destinations?: string;
}

export enum DrivingSide {
    Left = "left",
    Right = "right",
    SlightLeft = "slight left",
    SlightRight = "slight right",
    Straight = "straight",
}

export interface Intersection {
    entry:              boolean[];
    bearings:           number[];
    admin_index:        number;
    geometry_index:     number;
    location:           number[];
    mapbox_streets_v8?: MapboxStreetsV8;
    out?:               number;
    duration?:          number;
    in?:                number;
    turn_weight?:       number;
    turn_duration?:     number;
    weight?:            number;
    traffic_signal?:    boolean;
    is_urban?:          boolean;
    lanes?:             Lane[];
    classes?:           ClassElement[];
    stop_sign?:         boolean;
}

export enum ClassElement {
    Motorway = "motorway",
    Tunnel = "tunnel",
}

export interface Lane {
    valid:             boolean;
    indications:       DrivingSide[];
    valid_indication?: DrivingSide;
    active:            boolean;
}

export interface MapboxStreetsV8 {
    class: MapboxStreetsV8Class;
}

export enum MapboxStreetsV8Class {
    Motorway = "motorway",
    MotorwayLink = "motorway_link",
    Primary = "primary",
    PrimaryLink = "primary_link",
    Secondary = "secondary",
    SecondaryLink = "secondary_link",
    Service = "service",
    Street = "street",
    Tertiary = "tertiary",
    Trunk = "trunk",
    TrunkLink = "trunk_link",
}

export interface Maneuver {
    instruction:    string;
    bearing_after:  number;
    bearing_before: number;
    location:       number[];
    type:           string;
    modifier?:      DrivingSide;
}

export enum Mode {
    Driving = "driving",
}

export interface Waypoint {
    distance: number;
    name:     string;
    location: number[];
}

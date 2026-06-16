export type Place = {
    name: string;
    type: 'spot' | 'restaurant' | 'transport' | 'hotel';
    lat?: number;
    lon?: number;
    description?: string;
    mustEat?: string[];
    mustOrder?: string[];
    mustBuy?: string[];
    time?: string;
    story?: string;
    imageUrl?: string;
};

export type DayItinerary = {
    day: number;
    date: string;
    title: string;
    locations: Place[];
    accommodation?: Place;
    lat: number; // main lat for weather
    lon: number; // main lon for weather
};

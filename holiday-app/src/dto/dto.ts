 export class HoliDayResponseDTO {
    date: string;
    localName: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties: string[];
    launchYear: number;
    types: string[];
}

export class CountryListDTO {
    countryCode: string;
    name: string;
}

export class TestDTO {
    message: string;
    dbResult: object[];
}

export class ResponseDTO {
    status: number;
    data: object;
}
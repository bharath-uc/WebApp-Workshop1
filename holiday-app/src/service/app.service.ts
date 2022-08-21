import axios, { AxiosResponse } from "axios";
import { db } from "../config/db.config";
import { CountryListDTO, ResponseDTO, TestDTO } from "../dto/dto";
import { BadRequestException } from "./error-handler.service";

class AppService {
    constructor() {}

    async test(): Promise<ResponseDTO> {
        const sqlQuery: string = "SELECT NOW();";
        const result = await db.query(sqlQuery);

        return { status: 200, data: { message: "Express + TypeScript Server", dbResult: result.rows } };
    }

    async getCountryList(): Promise<ResponseDTO> {
        const countryListUrl: string = "https://date.nager.at/api/v3/AvailableCountries";
        const countryListResponse: AxiosResponse = await axios.get(countryListUrl);

        return { status: 200, data: countryListResponse.data };
    }

    async saveCountryHolidays(countryCode: string, year: number) {
        const holidayListUrl = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
        const insertQuery = `INSERT INTO country(country_code, holiday_year) VALUES('${countryCode}','${year}')`;
    }
}

export const appService = new AppService();
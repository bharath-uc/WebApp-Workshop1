import axios, { AxiosResponse } from "axios";
import { db } from "../config/db.config";
import { ResponseDTO } from "../dto/dto";

class AppService {
    constructor() {}

    async test(): Promise<ResponseDTO> {
        try {
            const sqlQuery: string = "SELECT NOW();";
            const result = await db.query(sqlQuery);
            
            return { status: 200, data: { message: "Express + TypeScript Server", dbResult: result.rows } };
        } catch(e) {
            console.log(e);
            return { status: 500, data: { message: "Something Went Wrong!." } };
        } 
    }

    async getCountryList(): Promise<ResponseDTO> {
        try {
            const countryListUrl: string = "https://date.nager.at/api/v3/AvailableCountries";
            const countryListResponse: AxiosResponse = await axios.get(countryListUrl);

            return { status: 200, data: countryListResponse.data };
        } catch(e) {
            console.log(e);
            return { status: 500, data: { message: "Something Went Wrong!." } };
        } 
    }

    async saveCountryHolidays(countryCode: string, year: number) {
        try {
            if(!countryCode || !year) {
                return { status: 400, data: { message: "Invalid Data." } };
            }

            const insertQuery = `INSERT INTO country(country_code, holiday_year) VALUES('${countryCode}','${year}') ON CONFLICT ON CONSTRAINT uq_year_code_together DO NOTHING RETURNING id`;
            const insertResult = await db.query(insertQuery);

            if (insertResult.rowCount === 0) { 
                return { status: 400, data: { message: "Duplicate Data." } };
            }

            const primaryKeyId: number = insertResult.rows[0].id;
            const holidayApiUrl = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
            const holidayInfoResponse: AxiosResponse = await axios.get(holidayApiUrl);
            const data = holidayInfoResponse.data;

          /* TO DO: Insert  all the holiday list into database. */
          const sqlHolidayInsertQuery = `INSERT INTO holiday (country_id, holiday_date, local_name, holiday_name, launch_year) VALUES(
            ${primaryKeyId},
           '${data[0].date}',
           '${data[0].localName.replace("'", "")}',
           '${data[0].name.replace("'", "")}',
            ${data[0].launchYear})`;
            
            await db.query(sqlHolidayInsertQuery);

            return { status: 200, data: { message: "Inserted Data." } };
        } catch(e) {
            console.log(e);
            return { status: 500, data: { message: "Something Went Wrong!." } };
        }  
    }
}

export const appService = new AppService();
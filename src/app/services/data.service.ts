import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GlobalDataSummary } from '../models/global-data';
import { DateWiseData } from '../models/date-wise-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/05-26-2020.csv
  private globalDataUrl = 'https://coronavirus-19-api.herokuapp.com/countries';
  private dateWiseDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

  constructor(private http: HttpClient) { }

  getDateWiseData() {
    return this.http.get(this.dateWiseDataUrl, { responseType: 'text' })
      .pipe(map(result => {
        let rows = result.split('\n');
        let mainData = {};
        let header = rows[0];
        let dates = header.split(/,(?=\S)/);
        dates.splice(0, 4);
        // console.log(dates);
        rows.splice(0, 1);

        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          let country = cols[1];
          cols.splice(0, 4);
          // console.log(country, cols);
          mainData[country] = [];
          cols.forEach((value, index) => {
            let dw: DateWiseData = {
              cases: +value,
              country: country,
              date: new Date(Date.parse(dates[index]))
            }
            mainData[country].push(dw);
          })
        })
        // console.log(mainData);

        return mainData;
      }))
    }

  getGlobalData() {
    return this.http.get(this.globalDataUrl).pipe(
      map(result => {
        let data: GlobalDataSummary[] = [];

        return result;
      })
    )
  }
}

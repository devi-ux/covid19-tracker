import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { DateWiseData } from '../../models/date-wise-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  data;
  countries: string[] = [];
  totalConfirmed = 0;
  totalCritical = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  dateWiseData;
  loading = true;
  dataTable;
  selectedCountryData: DateWiseData[];
  chart: {
    LineChart: "LineChart",
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out'
      }
    }
  }

  constructor(private dataServise: DataService) {}

  ngOnInit(): void {
    merge(
      this.dataServise.getDateWiseData().pipe(
        map(result => {
          this.dateWiseData = result;
        })
      ),
      this.dataServise.getGlobalData().pipe(
        map(result => {
          this.data = result;
          this.data.splice(0, 2);
          this.data.forEach(element => {
            this.countries.push(element['country'])
          });
        })
      )
    ).subscribe(
      {
        complete: () => {
          this.updateValues('India');
          // this.updateChart();
          this.loading = false;
        }
      }
    )
  }

  updateChart(){
    this.dataTable = [];
    this.dataTable.push(["Date" , 'Cases'])
    this.selectedCountryData.forEach(cs=>{
      this.dataTable.push([cs.date , cs.cases])
    })
  }

  updateValues(country: string) {
    // console.log(country);
    this.data.forEach(cs => {
      if(cs['country'] == country) {
        this.totalCritical = cs['critical']
        this.totalDeaths = cs['deaths']
        this.totalConfirmed = cs['cases']
        this.totalRecovered = cs['recovered']
      }
    })

    this.selectedCountryData = this.dateWiseData[country];
    // console.log(this.dateWiseData[country]);
    this.updateChart();
  }

}

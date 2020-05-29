import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DataService } from '../../services/data.service';
// import { GlobalDataSummary } from '../../models/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalCritical = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  data;
  myType = 'PieChart';
  dataTable = [];
  chart = {
    PieChart : "PieChart" ,
    ColumnChart : 'ColumnChart' ,
    LineChart : "LineChart",
    height: 500,
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }
  }

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getGlobalData()
    .subscribe( result => {
      this.data = result;
      // console.log(this.data);
      this.totalCritical = this.data[0]['critical']
      this.totalConfirmed = this.data[0]['cases']
      this.totalDeaths = this.data[0]['deaths']
      this.totalRecovered = this.data[0]['recovered']

      this.initChart('c');
      this.loading = false;
    })
  }

  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);
  }


  initChart(caseType: string) {

    this.dataTable = [];
    // dataTable.push(['Country', 'Cases'])
    this.data.forEach(cs => {
      let value: number;
      let worldCases = cs['cases'] < this.totalConfirmed
      if (caseType == 'c')
        if((cs['cases'] > 9000) && worldCases)
          value = cs['cases']

      if (caseType == 'd')
        if((cs['deaths'] > 2000) && worldCases)
          value = cs['deaths']

      if (caseType == 'r')
        if((cs['recovered'] > 9000) && worldCases)
          value = cs['recovered']

      if (caseType == 'a')
        if((cs['critical'] > 9000) && worldCases)
          value = cs['critical']

        this.dataTable.push([
          cs['country'], value
        ])
    })
  }

  backgroundToggle() {
    let element = document.body;
    element.classList.toggle('dark-mode');
  }

}

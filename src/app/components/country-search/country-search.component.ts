import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.css']
})
export class CountrySearchComponent implements OnInit {
  data;
  loading = true;
  term;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(
      result => {
        this.data = result;
        this.loading = false;
      }
    );
  }

}

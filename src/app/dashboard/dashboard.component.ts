import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  error: any;

  constructor(private excelService: ExcelService) { }

  ngOnInit(): void {
    this.fetchDataFromBackend();
  }

  fetchDataFromBackend(): void {
    this.excelService.fetchExcelData()
      // .pipe(
      //   catchError(error => {
      //     this.error = error;
      //     console.error('Error fetching data', error);
      //     return of(null);  // Return null or default value if needed
      //   })
      // )
      .subscribe(res => {
        this.data = res;
        console.log("EXCEL====>",this.data)
      });
  }
}

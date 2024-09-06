import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApidataService } from '../apidata.service';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {
 
  constructor(private readonly route: Router, private readonly quizApi: ApidataService) { }
  defaultNumber:number = 0;
  ngOnInit() {
     this.defaultNumber = 10;
  }
 
  getFormValue(item:{amount: number, category:string, difficulty: string, type: string}) {
    this.route.navigate(['quiz']);
    this.quizApi.setApiUrl(item);
  }
}

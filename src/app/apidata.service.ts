import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ApiType {
  amount:number,category:string,difficulty:string,type:string
}

@Injectable({
  providedIn: 'root'
})
export class ApidataService {
  constructor(private readonly http: HttpClient) { }
  url:string = 'https://opentdb.com/api.php';

  setApiUrl(form:ApiType) {
    this.url = `${this.url}?amount=${form.amount}&category=${form.category!='any' ? form.category:''}&difficulty=${form.difficulty!='any' ? form.difficulty: ''}&type=${form.type!='any' ? form.type : ''}`;
  }

  getApiData() {
   return this.http.get(this.url);
  }
}

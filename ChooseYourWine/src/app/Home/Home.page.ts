import { Component, OnInit } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-Home',
  templateUrl: 'Home.page.html',
  styleUrls: ['Home.page.scss']
})
@Injectable()
export class HomePage {
  constructor(private http: Http) { }

  private sparkqlData = null;

  sparkql() {
    let headers: Headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });

    let params = new URLSearchParams();
    params.append('query', 'SELECT * WHERE { <http://dbpedia.org/resource/Awolnation> ?pref ?obj } LIMIT 10');
    params.append('format', 'json');

    let options: RequestOptionsArgs = {
      headers: headers,
      params: URLSearchParams
    };

    this.http.get('http://dbpedia.org/sparql', options) // 1
      .pipe(map(response => response.json()))
      .subscribe(data => {
          console.log(data);
          this.sparkqlData = data; // 3
       });
     console.log(this.sparkqlData);  // 2
  }
}


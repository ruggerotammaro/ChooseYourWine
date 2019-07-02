import { Component} from '@angular/core';
import { Http, RequestOptionsArgs, Headers, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-Home',
  templateUrl: 'Home.page.html',
  styleUrls: ['Home.page.scss']
})

export class HomePage {
  constructor(private http: Http) { }

  private sparkqlData = null;

  sparkql() {
    let headers: Headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });

    console.log("qua ci sono");
    let params = new URLSearchParams();
    params.append('query', 'SELECT * WHERE { <http://dbpedia.org/resource/Awolnation> ?pref ?obj } LIMIT 10');
    params.append('format', 'json');

    let options: RequestOptionsArgs = {
      headers: headers,
      params: URLSearchParams
    };
    console.log("pure qua");
    this.http.get('http://dbpedia.org/sparql', options) // 1
      //.pipe(map(response => response.json()))
      .subscribe(data => {
          console.log(data);
          this.sparkqlData = data; // 3
       });
     console.log(this.sparkqlData);  // 2
  }
}


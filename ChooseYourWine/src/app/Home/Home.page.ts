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
      'Content-type':'application/x-www-form-urlencoded',
      'Accept':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Headers':'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    });

    let params = new URLSearchParams();
    let query = 'PREFIX vino: <http://w3id.org/food/ontology/disciplinare-vino#> SELECT ?Nome ?Tipologia WHERE { ?x vino:haDenominazione ?Nome. ?Nome vino:haTipologia ?Tipologia. }';
    params.append('default-graph-uri','http://localhost:8890/wineIMG');
    params.append('query', query);
    params.append('format', 'application sparql-results json');
    params.append('timeout', '0');
    params.append('debug','on');
    params.append('run','Run Query');

    console.log(params);
  
    let options: RequestOptionsArgs = {
      headers: headers,
      params: params
    };
    this.http.post('http://localhost:8890/sparql', options).subscribe(data => {
          console.log(data);
          this.sparkqlData = data;
       });
  }
}


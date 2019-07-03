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
  public jsonObject: any;

 /* sparkql() {
    let headers: Headers = new Headers({
      'Content-type':'application/x-www-form-urlencoded',
      'Accept':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Headers':'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    });

    let params = new URLSearchParams();
    let query = 'select+distinct+%3FConcept+where+%7B%5B%5D+a+%3FConcept%7D+LIMIT+10';
    params.append('default-graph-uri','http://dbpedia.org');
    params.append('named-graph-uri','NULL');
    params.append('query', query);
    params.append('format', 'application/sparql-results+json');
    params.append('timeout', '0');
    params.append('debug','on');
    params.append('run','+Run+Query+');


/*let query = 'PREFIX vino: <http://w3id.org/food/ontology/disciplinare-vino#> SELECT ?Nome ?Tipologia WHERE { ?x vino:haDenominazione ?Nome. ?Nome vino:haTipologia ?Tipologia. }';
    params.append('default-graph-uri','http://localhost:8890/wineIMG');
    params.append('named-graph-uri','NULL');
    params.append('query', query);
    params.append('format', 'application/sparql-results+json');
    params.append('timeout', '0');
    params.append('debug','on');
    params.append('run','Run Query');*/

   
   /* console.log("paramas "+params);
  
    let options: RequestOptionsArgs = {
      headers: headers,
      params: params
       };
    this.http.get('http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query='+query+'&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=30000&debug=on&run=+Run+Query+')
    .pipe(map(Response =>Response.json()))
      .subscribe(data => {
        this.sparkql = JSON.parse(data['_body']).results;
          console.log("data "+data);
      });
       console.log("sparql data "+this.sparkqlData);
  }
*/



// fai la query su virtuoso poi prendi il link e lo sostituisci nella get, volendo metti in query la parte della query proprio
// altimenti basta inserire tutto li.
  public par(){
    let query = 'select+distinct+%3FConcept+where+%7B%5B%5D+a+%3FConcept%7D+LIMIT+10';
    this.http.get('http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query='+query+'&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=30000&debug=on&run=+Run+Query+').pipe(map(
      res => res.json())).subscribe( data => {this.jsonObject = data;
        console.log("dati "+this.jsonObject);
      });
    };
}


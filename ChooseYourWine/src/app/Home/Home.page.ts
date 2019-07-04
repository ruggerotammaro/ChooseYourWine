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
        this.sparkqlData=JSON.stringify(this.jsonObject);
        console.log("dati "+this.sparkqlData);
      });
    };


    public splittingString(string){
      var x = string.split("/");
      var element = x[x.length-1];
      if(!element.includes("#")){
        if(element.includes("_")){
          var newElement = element.replace("_"," ");
          alert (newElement);
          return newElement;
        }
        return element;
      }
      else {
        element = x[x.length-1].split("#")[1];
        if(element.includes("_")){
          var newElement = element.replace(/_/g," ");
          return newElement;
        }
        return element;
      }
    }
  /*
    public getDetailsWine(wine) {
      var obj = JSON.parse(wine);
      document.getElementById("img").src = obj.results.bindings[0].immagine.value;
      var luogo = this.splittingString(obj.results.bindings[0].luogo.value);
      document.getElementById("luogo").innerHTML = luogo;
      var produttore = this.splittingString(obj.results.bindings[0].produttore.value);
      document.getElementById("produttore").innerHTML = produttore;
      var tipologia = this.splittingString(obj.results.bindings[0].tipologia.value);
      document.getElementById("tipologia").innerHTML = tipologia;
      var annata = this.splittingString(obj.results.bindings[0].annata.value);
      document.getElementById("annata").innerHTML = annata;
      var vigneto = this.splittingString(obj.results.bindings[0].vigneto.value);
      document.getElementById("vigneto").innerHTML = vigneto;
      var gradazione = this.splittingString(obj.results.bindings[0].gradazione.value);
      document.getElementById("gradazione").innerHTML = gradazione;
      var temperaturaServizione = this.splittingString(obj.results.bindings[0].temperaturaServizione.value);
      document.getElementById("temperaturaServizione").innerHTML = temperaturaServizione;
      var calice = this.splittingString(obj.results.bindings[0].calice.value);
      document.getElementById("calice").innerHTML = calice;	
    }
  */
    public getAllWine(allWine) {
      var obj = JSON.parse(allWine);
      var n = obj.results.bindings.length;
      for (var i = 0; i < n; i++) {
        var node = document.createElement("SPAN");   
        var br = document.createElement("br");              
        //var textnode = document.createTextNode(obj.results.bindings[i].NomiVini.value);     splittingString(obj.results.bindings[0].annata.value);
        var value = this.splittingString(obj.results.bindings[i].NomiVini.value);
        var textnode = document.createTextNode(value); 
        node.appendChild(textnode); 
        node.appendChild(br);                                        
        document.getElementById("uri").appendChild(node);     
      }
    }
}


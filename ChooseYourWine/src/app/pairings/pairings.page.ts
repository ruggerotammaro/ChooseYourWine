import { Component} from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pairings',
  templateUrl: './pairings.page.html',
  styleUrls: ['./pairings.page.scss'],
})

export class PairingsPage {
  vino:any;
  v:any;
  constructor(private http: Http,private router: Router,private route:ActivatedRoute) { 

    this.vino=this.route.snapshot.paramMap.get("id");
    this.v=this.splittingString(this.vino);
    console.log(this.v);
    let query = 'select+%3Fnome+%3Fimmagine%0D%0Awhere+%7B%0D%0A%3Fx+vino%3AhaDenominazione+%3Fy%0D%0AFILTER+regex%28%3Fy%2C+%22'+this.vino+'%22%29.%0D%0A%3Fy+vino%3Aabbinato+%3Fnome.%0D%0A%3Fnome+vino%3AImmagineCibo+%3Fimmagine.';
    this.query(query);
  }
  private sparkqlData = null;
  public jsonObject: any;
  cibi:Array<{nome:any,immagine:any}>=[];
  
  
  query(query){
    this.http.get('http://localhost:8890/sparql?default-graph-uri=http%3A%2F%2Flocalhost%3A8890%2Fvino&query=PREFIX+vino%3A+%3Chttp%3A%2F%2Fw3id.org%2Ffood%2Fontology%2Fdisciplinare-vino%23%3E+%0D%0A'+query+'%7D&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on').pipe(map(
    res => res.json())).subscribe( data => {this.jsonObject = data;
      this.sparkqlData=JSON.stringify(this.jsonObject);
      this.getAllWine(this.sparkqlData);      
    });
  }
  
  
  public splittingString(string){
    let x = string.split("/");
    let element = x[x.length-1];
    if(!element.includes("#")){
      if(element.includes("_")){
        var newElement = element.replace(/_/g," ");
        return newElement;
      }
      return element;
    }
    else {
      element = x[x.length-1].split("#")[1];
      if(element.includes("_")){
        let newElement = element.replace(/_/g," ");
        return newElement;
      }
      return element;
    }
  }
  
  public getAllWine(allWine) {
    let obj = JSON.parse(allWine);
    let n = obj.results.bindings.length;
    for (var i = 0; i < n; i++) {
      this.cibi.push({
        nome: this.splittingString(obj.results.bindings[i].nome.value),
        immagine: obj.results.bindings[i].immagine.value
        });
    }
  }
  
  }
  
  
  

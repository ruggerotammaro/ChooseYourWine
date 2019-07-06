import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-food-pairings',
  templateUrl: './food-pairings.page.html',
  styleUrls: ['./food-pairings.page.scss'],
})
export class FoodPairingsPage{

  abbina:any;
  vini:any;
  pas:any;
  constructor(private http: Http, private router: Router,private route:ActivatedRoute) {
    this.vini=[];
    this.abbina=[];
      let query = 'select+%3Fcibo+%3Fdenominazione%0D%0Awhere+%7B%3Fx+vino%3AhaDenominazione+%3Fdenominazione.%0D%0A%3Fdenominazione+vino%3Aabbinato+%3Fcibo%7D%0D%0AORDER+BY%28%3Fcibo%29';
      this.query(query);
   }
  private sparkqlData = null;
  public jsonObject: any;

 query(query){
    this.http.get('http://localhost:8890/sparql?default-graph-uri=http%3A%2F%2Flocalhost%3A8890%2FwineIMG&query=PREFIX+vino%3A+%3Chttp%3A%2F%2Fw3id.org%2Ffood%2Fontology%2Fdisciplinare-vino%23%3E+%0D%0A'+query+'&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on').pipe(map(
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
        var newElement = element.replace("_"," ");
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
    let cibo="base";
    for (var i = 0; i < n; i++) {
      if(cibo!=this.splittingString(obj.results.bindings[i].cibo.value)){
        cibo=this.splittingString(obj.results.bindings[i].cibo.value);
      this.abbina.push(this.splittingString(obj.results.bindings[i].cibo.value));
      this.vini.push(this.splittingString(obj.results.bindings[i].denominazione.value));
    }else{
      this.vini.push(this.splittingString(obj.results.bindings[i].denominazione.value));
    }
  }
  }
}

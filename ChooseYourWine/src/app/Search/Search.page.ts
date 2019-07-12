import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-Search',
  templateUrl: 'Search.page.html',
  styleUrls: ['Search.page.scss']
})
export class SearchPage {

  vini:any;
  pas:any;
  tipo:any;
  luogo:any;
  tipologia:any;
  cantina:any;
  constructor(private http: Http, private router: Router,private route:ActivatedRoute) {
    this.vini=[]; 
    this.tipologia=[];
    this.cantina=[]; 
    this.http.get('http://localhost:8890/sparql?default-graph-uri=http%3A%2F%2Flocalhost%3A8890%2Fvino&query=PREFIX+vino%3A%3Chttp%3A%2F%2Fw3id.org%2Ffood%2Fontology%2Fdisciplinare-vino%23%3E%0D%0Aselect+DISTINCT+%3Ftipologia%0D%0Awhere%7B%0D%0A%3Fx+vino%3AhaDenominazione+%3Fy.%0D%0A%3Fy+vino%3AhaTipologia+%3Ftipologia.%0D%0A%7D&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on').pipe(map(
    res => res.json())).subscribe(data => {this.jsonObject=data;
    this.sparkqlData=JSON.stringify(this.jsonObject);
    this.getTipologia(this.sparkqlData);
  })

  this.http.get('http://localhost:8890/sparql?default-graph-uri=http%3A%2F%2Flocalhost%3A8890%2Fvino&query=PREFIX+vino%3A%3Chttp%3A%2F%2Fw3id.org%2Ffood%2Fontology%2Fdisciplinare-vino%23%3E%0D%0Aselect+DISTINCT+%3Fluogo%0D%0Awhere%7B%0D%0A%3Fx+vino%3AhaDenominazione+%3Fy.%0D%0A%3Fy+vino%3A%C3%A9Prodotto+%3Fluogo.%0D%0A%7D&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on').pipe(map(
    res => res.json())).subscribe(data => {this.jsonObject=data;
    this.sparkqlData=JSON.stringify(this.jsonObject);
    this.getLuogo(this.sparkqlData);
  })
   }
  private sparkqlData = null;
  public jsonObject: any;

  query(query){
    this.http.get('http://localhost:8890/sparql?default-graph-uri=http%3A%2F%2Flocalhost%3A8890%2Fvino&query=PREFIX+vino%3A+%3Chttp%3A%2F%2Fw3id.org%2Ffood%2Fontology%2Fdisciplinare-vino%23%3E+%0D%0A'+query+'+format=application%2Fsparql-results%2Bjson&timeout=0&debug=on').pipe(map(
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
    for (var i = 0; i < n; i++) {
      this.vini.push(this.splittingString(obj.results.bindings[i].denominazione.value));
    }
  }

  showWine(vino){
    this.pas=this.convert(vino);
    
    console.log(this.pas);
    this.router.navigate(['/tabs/wine-details',{id:this.pas}])
  }

  convert(vino){
    var x= vino.replace(/ /g,"_");
    return x;
  }

  search(form: NgForm){
    this.vini=[];
    this.tipo=form.value.tipologia;
    this.luogo=form.value.luogo;
    console.log("partenza query");
    console.log(this.tipo);
    console.log(this.luogo);
    let query = 'select+%3Fdenominazione%0D%0Awhere%7B%0D%0A%3Fx+vino%3AhaDenominazione+%3Fdenominazione.%0D%0A%3Fdenominazione+vino%3AhaTipologia+%3Ftipologia.%0A+%3Fdenominazione+vino%3A%C3%A9Prodotto+%3Fluogo%0D%0AFILTER+regex%28%3Ftipologia%2C%22'+this.tipo+'%22%29.+FILTER+regex%28%3Fluogo%2C%22'+this.luogo+'%22%29%7D&';
    this.query(query);    
  }

  setTipo(tipologia){
    this.tipo=tipologia;
    console.log(this.tipo);
  }

  setLuogo(luogo){
    this.luogo=luogo;
    console.log(this.luogo);
  }

  getTipologia(data){
    let obj = JSON.parse(data);
    let n = obj.results.bindings.length;
    for (var i = 0; i < n; i++) {
        this.tipologia.push(this.splittingString(obj.results.bindings[i].tipologia.value));
  }
}
getLuogo(data){
  let obj = JSON.parse(data);
  let n = obj.results.bindings.length;
  this.cantina.push("");
  for (var i = 0; i < n; i++) {
      this.cantina.push(this.splittingString(obj.results.bindings[i].luogo.value));
}}
}
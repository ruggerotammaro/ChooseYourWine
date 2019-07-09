import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wine-details',
  templateUrl: './wine-details.page.html',
  styleUrls: ['./wine-details.page.scss'],
})
export class WineDetailsPage {

  vini:Array<{denominazione:string,immagine:any,luogo:string,produttore:string,tipologia:string,annata:string,vitigno:string,gradazione:string,temperaturaServizio:string,calice:string,immagineCalice:string}>=[];
  vino:any;
  sparkqlData:any;
  jsonObject:any;
  pas:any;
  constructor(private http: Http,private router: Router,private route:ActivatedRoute) {

  this.vino=this.route.snapshot.paramMap.get("id");
  this.vini=[];
  let query='SELECT+%3Fdenominazione%2C%3Fimmagine%2C+%3Fluogo%2C+%3Fproduttore%2C+%3Ftipologia%2C+%3Fannata%2C+%3Fvitigno%2C+%3Fgradazione%2C+%3Fcalice%2C+%3FimmagineCalice%2C+%3FtemperaturaServizio%0D%0A+WHERE+%7B+%0D%0A++%3Fx+vino%3AhaDenominazione+%3Fdenominazione.%0D%0A++FILTER+regex%28%3Fdenominazione%2C+%22'+this.vino+'%22%29.%0D%0A+%3Fdenominazione+vino%3AImmagineVino+%3Fimmagine.%0D%0A+%3Fdenominazione+vino%3A%C3%A9Prodotto+%3Fluogo.+%0D%0A+%3Fdenominazione+vino%3AProduttore+%3Fproduttore.%0D%0A+%3Fdenominazione+vino%3AhaTipologia+%3Ftipologia.%0D%0A+%3Fdenominazione+vino%3AhaAnnata+%3Fannata.%0D%0A+%3Fdenominazione+vino%3AhaVitigno+%3Fvitigno.%0D%0A+%3Fdenominazione+vino%3AhaGradazione+%3Fgradazione.%0D%0A+%3Fdenominazione+vino%3A%C3%A9Servito+%3Fcalice.%0D%0A+%3Fcalice+vino%3AImmagineCalice+%3FimmagineCalice.%0D%0A+%3Fdenominazione+vino%3AhaTemperatura+%3FtemperaturaServizio.';
  this.query(query);
  }

   
  query(query){
    this.http.get('http://localhost:8890/sparql?default-graph-uri=http%3A%2F%2Flocalhost%3A8890%2FwineMR&query=PREFIX+vino%3A+%3Chttp%3A%2F%2Fw3id.org%2Ffood%2Fontology%2Fdisciplinare-vino%23%3E+%0D%0A'+query+'+%0D%0A%7D&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on').pipe(map(
    res => res.json())).subscribe( data => {this.jsonObject = data;
      this.sparkqlData=JSON.stringify(this.jsonObject);
      this.getDetailsWine(this.sparkqlData);   
    });
  }
  

  public getDetailsWine(wine) {
    var obj = JSON.parse(wine);
    this.vini.push({
    denominazione:this.splittingString(obj.results.bindings[0].denominazione.value),
    immagine:obj.results.bindings[0].immagine.value,
    luogo:this.splittingString(obj.results.bindings[0].luogo.value),
    produttore:this.splittingString(obj.results.bindings[0].produttore.value),
    tipologia:this.splittingString(obj.results.bindings[0].tipologia.value),
    annata:this.splittingString(obj.results.bindings[0].annata.value),
    vitigno:this.splittingString(obj.results.bindings[0].vitigno.value),
    gradazione:this.splittingString(obj.results.bindings[0].gradazione.value),
    temperaturaServizio:this.splittingString(obj.results.bindings[0].temperaturaServizio.value),
    calice:this.splittingString(obj.results.bindings[0].calice.value),
    immagineCalice:obj.results.bindings[0].immagineCalice.value});
    }

    public splittingString(string){
      let x = string.split("/");
      let element = x[x.length-1];
      if(!element.includes("#")){
        if(element.includes("_")){
          let newElement = element.replace("_"," ");
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


    showPairings(nome){
      this.pas=this.convert(nome);
   this.router.navigate(['/tabs/pairings',{id:this.pas}]);
    }


  convert(vino){
    var x= vino.replace(/ /g,"_");
    return x;
  }
}

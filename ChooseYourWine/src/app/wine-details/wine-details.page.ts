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

  vino:any;
  sparkqlData:any;
  jsonObject:any;
  constructor(private http: Http,private router: Router,private route:ActivatedRoute) {

 // this.route.queryParams.subscribe(params => {
  //  this.vino = params['key'];
//})
  this.vino='Fidelis_2015';
  let query='SELECT+%3Fdenominazione%2C%3Fimmagine%2C+%3Fluogo%2C+%3Fproduttore%2C+%3Ftipologia%2C+%3Fannata%2C+%3Fvigneto%2C+%3Fgradazione%2C+%3Fcalice%2C+%3FtemperaturaServizio%0D%0A+WHERE+%7B+%0D%0A++%3Fx+vino%3AhaDenominazione+%3Fdenominazione.%0D%0A++FILTER+regex%28%3Fdenominazione%2C+%22'+this.vino+'%22%29.%0D%0A+%3Fdenominazione+vino%3AImmagineVino+%3Fimmagine.%0D%0A+%3Fdenominazione+vino%3A%C3%A9Prodotto+%3Fluogo.+%0D%0A+%3Fdenominazione+vino%3AProduttore+%3Fproduttore.%0D%0A+%3Fdenominazione+vino%3AhaTipologia+%3Ftipologia.%0D%0A+%3Fdenominazione+vino%3AhaAnnata+%3Fannata.%0D%0A+%3Fdenominazione+vino%3AhaVitigno+%3Fvigneto.%0D%0A+%3Fdenominazione+vino%3AhaGradazione+%3Fgradazione.%0D%0A+%3Fdenominazione+vino%3A%C3%A9Servito+%3Fcalice.%0D%0A+%3Fdenominazione+vino%3AhaTemperatura+%3FtemperaturaServizio.';
  this.query(query);
  console.log('query run forse');
  }

  
  query(query){
    this.http.get('http://localhost:8890/sparql?default-graph-uri=http%3A%2F%2Flocalhost%3A8890%2FwineIMG&query=PREFIX+vino%3A+%3Chttp%3A%2F%2Fw3id.org%2Ffood%2Fontology%2Fdisciplinare-vino%23%3E+%0D%0A'+query+'+%0D%0A%7D&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on').pipe(map(
    res => res.json())).subscribe( data => {this.jsonObject = data;
      this.sparkqlData=JSON.stringify(this.jsonObject);    
    });
  }
  

}

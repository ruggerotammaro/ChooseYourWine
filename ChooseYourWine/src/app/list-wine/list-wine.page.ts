import { Component} from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-wine',
  templateUrl: './list-wine.page.html',
  styleUrls: ['./list-wine.page.scss'],
})


export class ListWinePage {
  constructor(private http: Http,private router: Router,private route:ActivatedRoute) { 

  this.cibo=this.route.snapshot.paramMap.get("id");
  this.c=this.splittingString(this.cibo);
  let query = 'select+%3Fcibo+%3Fdenominazione+%3Fimmagine%0D%0Awhere+%7B%0D%0A%3Fy+vino%3AhaDenominazione+%3Fdenominazione.%0D%0A%3Fdenominazione+vino%3AImmagineVino+%3Fimmagine.%0D%0A%3Fdenominazione+vino%3Aabbinato+%3Fcibo.%0D%0AFILTER+regex%28%3Fcibo%2C%22'+this.cibo+'%22%29.';
  this.query(query);
}
cibo:any;
c:any;
pas:any;
private sparkqlData = null;
public jsonObject: any;
vini:Array<{denominazione:any,immagine:any}>=[];


query(query){
  this.http.get('http://localhost:8890/sparql?default-graph-uri=http%3A%2F%2Flocalhost%3A8890%2FvinoMR&query=PREFIX+vino%3A+%3Chttp%3A%2F%2Fw3id.org%2Ffood%2Fontology%2Fdisciplinare-vino%23%3E+%0D%0A'+query+'+%0D%0A%7D&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on').pipe(map(
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
    this.vini.push({
      denominazione: this.splittingString(obj.results.bindings[i].denominazione.value),
      immagine: obj.results.bindings[i].immagine.value
      });
  }
}

convert(vino){
  var x= vino.replace(/ /g,"_");
  return x;
}
showWine(vino){
  this.pas=this.convert(vino);
  
  console.log(this.pas);
  this.router.navigate(['/tabs/wine-details',{id:this.pas}])
}

}



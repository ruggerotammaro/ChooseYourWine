import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-Home',
  templateUrl: 'Home.page.html',
  styleUrls: ['Home.page.scss']
})

export class HomePage {

  vini:any;
  pas:any;
  constructor(private http: Http, private router: Router,private route:ActivatedRoute) {
    this.vini=[];
      let query = 'SELECT+%3FNomiVini+%0D%0AWHERE+%7B+%3Fx+vino%3AhaDenominazione+%3FNomiVini.';
      this.query(query);
   }
  private sparkqlData = null;
  public jsonObject: any;
/*
  go() {
    this.router.navigateByUrl();
  }
 */
  public getAllWines(){
    this.vini=[];
    let query = 'SELECT+%3FNomiVini+%0D%0AWHERE+%7B+%3Fx+vino%3AhaDenominazione+%3FNomiVini.';
   this.query(query);
   

    };

    query(query){
      this.http.get('http://localhost:8890/sparql?default-graph-uri=http%3A%2F%2Flocalhost%3A8890%2FwineIMG&query=PREFIX+vino%3A+%3Chttp%3A%2F%2Fw3id.org%2Ffood%2Fontology%2Fdisciplinare-vino%23%3E+%0D%0A'+query+'+%0D%0A%7D&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on').pipe(map(
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
        this.vini.push(this.splittingString(obj.results.bindings[i].NomiVini.value));
      }
    }

    showWine(vino){
      this.pas=this.convert(vino);
      
      console.log(this.pas);
      //this.router.navigate(['/tabs/wine-details'],{queryParams:{key:this.pas}});
    }

    convert(vino){
      var x= vino.replace(/ /g,"_");
      return x;
    }
  }
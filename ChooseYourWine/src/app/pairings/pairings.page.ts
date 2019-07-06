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
  constructor(private http: Http,private router: Router,private route:ActivatedRoute) { }
}

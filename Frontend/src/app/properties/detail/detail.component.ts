import { Component, OnInit } from '@angular/core';

import { IProperty } from '../../model/iproperty';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  standalone:false
})
export class DetailComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute,private router:Router)   { }
property:IProperty;
id:number;
  ngOnInit() {
    this.id = +this.actRoute.snapshot.params['id'];
    this.actRoute.params.subscribe( (params) => {
      this.id = +params['id'];
    });
  }
goNext(){
this.id=this.id+1;
this.router.navigate(['detail',this.id]);
}
}

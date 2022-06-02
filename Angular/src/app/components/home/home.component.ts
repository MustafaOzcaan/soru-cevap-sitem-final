import { Makale } from './../../models/Makale';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  makaleler: Makale[];
  constructor(
    public apiServis: ApiService
  ) { }

  ngOnInit() {
    this.SonEklenenler();
  }

  SonEklenenler() {
    this.apiServis.MakaleListeSonEklenenler(5).subscribe((d: Makale[]) => {
      this.makaleler = d;
    });
  }

}

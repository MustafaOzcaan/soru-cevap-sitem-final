import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Uye } from './../../models/Uye';
import { Makale } from './../../models/Makale';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uyemakale',
  templateUrl: './uyemakale.component.html',
  styleUrls: ['./uyemakale.component.scss']
})
export class UyemakaleComponent implements OnInit {
  makaleler: Makale[];
  uyeId: number;
  uye: Uye;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {

      if (p.uyeId) {
        this.uyeId = p.uyeId;
        this.UyeById();
        this.MakaleListeByUyeId();
      }

    });
  }
  UyeById() {
    this.apiServis.UyeById(this.uyeId).subscribe((d: Uye) => {
      this.uye = d;
    });
  }
  MakaleListeByUyeId() {
    this.apiServis.MakaleListeByUyeId(this.uyeId).subscribe((d: Makale[]) => {
      this.makaleler = d;

    });
  }
}

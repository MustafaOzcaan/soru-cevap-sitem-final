
import { Kategori } from 'src/app/models/Kategori';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Makale } from 'src/app/models/Makale';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-Kategori',
  templateUrl: './Kategori.component.html',
  styleUrls: ['./Kategori.component.scss']
})
export class KategoriComponent implements OnInit {
  makaleler: Makale[];
  katId: number;
  kat: Kategori;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {

      if (p.katId) {
        this.katId = p.katId;
        this.KategoriById();
        this.MakaleListeByKatId();
      }

    });
  }
  KategoriById() {
    this.apiServis.KategoriById(this.katId).subscribe((d: Kategori) => {
      this.kat = d;
    });
  }
  MakaleListeByKatId() {
    this.apiServis.MakaleListeByKatId(this.katId).subscribe((d: Makale[]) => {
      this.makaleler = d;

    });
  }
}

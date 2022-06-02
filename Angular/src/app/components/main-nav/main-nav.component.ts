import { Kategori } from './../../models/Kategori';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Makale } from 'src/app/models/Makale';
import { MakaleDialogComponent } from '../dialogs/makale-dialog/makale-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  kadi: string;
  kategoriler: Kategori[];
  makaleler: Makale[];
  secKat: Kategori;
  katId: number;
  uyeId: number;
  dataSource: any;
  displayedColumns = ['Baslik', 'Tarih', 'UyeKadi', 'Okunma', 'detay'];
  dialogRef: MatDialogRef<MakaleDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
  ) { }
  ngOnInit(): void {
    this.KategoriListele();
    if (this.apiServis.oturumKontrol) {
      this.kadi = localStorage.getItem("kadi");
    }
    this.uyeId = parseInt(localStorage.getItem("uid"));
    
  }
  OturumKapat() {
    localStorage.clear();
    location.href = "/";
  }
  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    });
  }
  Ekle() {
    var yeniKayit: Makale = new Makale();
    this.dialogRef = this.matDialog.open(MakaleDialogComponent, {
      width: '800px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        yeniKayit = d;
        yeniKayit.Foto = "foto.jpg";
        yeniKayit.Tarih = new Date();
        yeniKayit.Okunma = 0;
        yeniKayit.UyeId = this.uyeId;
        // console.log(yeniKayit);
        this.apiServis.MakaleEkle(yeniKayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
        });
      }
    });
  }
}

import { MakaleDialogComponent } from './../../dialogs/makale-dialog/makale-dialog.component';
import { Makale } from './../../../models/Makale';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from '../../dialogs/kategori-dialog/kategori-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  makaleler: Makale[];
  kategoriler: Kategori[];
  secKat: Kategori;
  katId: number;
  uyeId: number;
  dataSource: any;
  displayedColumns = ['Baslik', 'Tarih', 'UyeKadi', 'Okunma', 'detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<MakaleDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.KategoriListele();
    this.uyeId = parseInt(localStorage.getItem("uid"));
    this.route.params.subscribe(p => {
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriById();
      }

    });
  }
  KategoriById() {
    this.apiServis.KategoriById(this.katId).subscribe((d: Kategori) => {
      this.secKat = d;
      this.MakaleListele();
    });
  }
  MakaleListele() {
    this.apiServis.MakaleListeByKatId(this.katId).subscribe((d: Makale[]) => {
      this.makaleler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    });
  }
  KategoriSec(kat: Kategori) {
    this.katId = kat.KategoriId;
    this.MakaleListele();
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
          if (s.islem) {
            this.MakaleListele();
          }
        });
      }
    });
  }
  Duzenle(kayit: Makale) {
    this.dialogRef = this.matDialog.open(MakaleDialogComponent, {
      width: '800px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        this.apiServis.MakaleDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.MakaleListele();
          }
        });
      }
    });
  }
  Detay(kayit: Makale) {
    this.dialogRef = this.matDialog.open(MakaleDialogComponent, {
      width: '800px',
      data: {
        kayit: kayit,
        islem: 'detay'
      }
    });
  }
  Sil(kayit: Makale) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.Baslik + " Başlıklı Makale Silinecektir Onaylıyor musunuz?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.MakaleSil(kayit.MakaleId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.MakaleListele();
          }
        });
      }
    });
  }
}


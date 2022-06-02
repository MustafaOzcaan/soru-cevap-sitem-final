import { Uye } from './../../../models/Uye';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UyeDialogComponent } from '../../dialogs/uye-dialog/uye-dialog.component';
import { FotoDialogComponent } from '../../dialogs/foto-dialog/foto-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alertService';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-uye',
  templateUrl: './admin-uye.component.html',
  styleUrls: ['./admin-uye.component.css']
})
export class AdminUyeComponent implements OnInit {

  dataSource: any;
  kayitlar: Uye[];
  displayedColumns = ['Foto', 'UyeId', 'KullaniciAdi', 'AdSoyad', 'UyeAdmin', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<UyeDialogComponent>;
  fotoDialogRef: MatDialogRef<FotoDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.KayitGetir();
  }

  KayitGetir() {
    this.apiServis.UyeListe().subscribe(d => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  UyeEkle() {
    var yeniKayit = new Uye();
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: "600px",
      data: {
        islem: 'ekle',
        kayit: yeniKayit
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.ogrFoto = "profil.png";
        this.apiServis.UyeEkle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
  }
  UyeDuzenle(uye: Uye) {
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: "300px",
      data: {
        islem: 'duzenle',
        kayit: uye
      }
    });

    this.dialogRef.afterClosed().subscribe((d: Uye) => {
      if (d) {
        uye.AdSoyad = d.AdSoyad;
        uye.Email = d.Email;
        uye.KullaniciAdi = d.KullaniciAdi;
        uye.Sifre = d.Sifre;
        uye.UyeAdmin = d.UyeAdmin


        this.apiServis.UyeDuzenle(uye).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
  }
  UyeSil(uye: Uye) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = uye.AdSoyad + " isimli üye Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyeSil(uye.UyeId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });

  }

  FotoGuncelle(uye: Uye) {
    var yeniKayit = new Uye();
    this.fotoDialogRef = this.matDialog.open(FotoDialogComponent, {
      width: "400px",
      data: uye
    });

    this.fotoDialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.UyeId = uye.UyeId;
        this.apiServis.UyeFotoGuncelle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
  }

  Filterele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

import { Uye } from './../../../models/Uye';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Uye;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuilder: FormBuilder
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Yeni Uye Ekle";
    }
    else {
      this.dialogBaslik = "Uye Düzenle";
    }
    this.frm = this.FormOlustur();
   }

  ngOnInit() {
  }

  FormOlustur(): FormGroup {
    return this.frmBuilder.group({
      "AdSoyad": [this.yeniKayit.AdSoyad.trim()],
      "Email": [this.yeniKayit.Email.trim()],
      "KullaniciAdi": [this.yeniKayit.KullaniciAdi.trim()],
      "Sifre": [this.yeniKayit.Sifre.trim()],
      "UyeAdmin": [this.yeniKayit.UyeAdmin],
    });
  }

}

import { UyeFoto } from './../../../models/UyeFoto';
import { Component, Inject, OnInit } from '@angular/core';
import { Uye } from 'src/app/models/Uye';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-foto-dialog',
  templateUrl: './foto-dialog.component.html',
  styleUrls: ['./foto-dialog.component.css']
})
export class FotoDialogComponent implements OnInit {

  secilenFoto: any;
  ogrFoto: UyeFoto = new UyeFoto();
  secOgrenci: Uye;
  constructor(
    public dialogRef: MatDialogRef<FotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) {
    this.secOgrenci = this.data;
  }

  ngOnInit() {
  }
  FotoSec(e: any) {
    var fotolar = e.target.files;
    var foto = fotolar[0];
    var fr = new FileReader();
    fr.onload = () => {
      this.secilenFoto = fr.result,
        this.ogrFoto.FotoData = fr.result.toString(),
        this.ogrFoto.FotoUzanti = foto.type
    }
    fr.readAsDataURL(foto);
  }
}

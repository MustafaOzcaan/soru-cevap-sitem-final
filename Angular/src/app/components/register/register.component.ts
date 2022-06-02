import { Uye } from './../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  yeniye: Uye = new Uye();
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
  }

  

  KayitOl(kadi,adsoyad,email,parola){
    console.log(kadi, adsoyad, email, parola)
    this.yeniye.AdSoyad = adsoyad
    this.yeniye.KullaniciAdi = kadi
    this.yeniye.Email = email
    this.yeniye.Sifre = parola
    this.yeniye.UyeAdmin = 0
    this.apiServis.UyeEkle(this.yeniye).subscribe((d => {
      ("Kayıt başarılı oturum açabilirsiniz!")
      location.href = "/login";
    }))
  }

}

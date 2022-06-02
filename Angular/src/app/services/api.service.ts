import { UyeFoto } from './../models/UyeFoto';
import { Yorum } from './../models/Yorum';
import { Uye } from './../models/Uye';
import { Makale } from './../models/Makale';
import { Kategori } from './../models/Kategori';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sonuc } from '../models/Sonuc';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:8748/api/";
  apiUrlv2 = "http://localhost:8748/";

  constructor(
    public http: HttpClient
  ) { }

  /*   Oturum İşlemleri Başla  */
  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler) {
    var sonuc: boolean = false;

    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));

    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
      });
    }

    return sonuc;
  }

  /*   Oturum İşlemleri Bitiş  */


  /*  API  */

  KategoriListe() {
    return this.http.get(this.apiUrl + "/kategoriliste");
  }
  KategoriById(katId: number) {
    return this.http.get(this.apiUrl + "/kategoribyid/" + katId);
  }
  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + "/kategoriekle", kat);
  }
  KategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiUrl + "/kategoriduzenle", kat);
  }
  KategoriSil(katId: number) {
    return this.http.delete(this.apiUrl + "/kategorisil/" + katId);
  }

  MakaleListe() {
    return this.http.get(this.apiUrl + "/makaleliste");
  }
  MakaleListeSonEklenenler(s: number) {
    return this.http.get(this.apiUrl + "/makalelistesoneklenenler/" + s);
  }
  MakaleListeByKatId(katId: number) {
    return this.http.get(this.apiUrl + "/makalelistebykatid/" + katId);
  }
  MakaleListeByUyeId(uyeId: number) {
    return this.http.get(this.apiUrl + "/makalelistebyuyeid/" + uyeId);
  }
  MakaleById(makaleId: number) {
    return this.http.get(this.apiUrl + "/makalebyid/" + makaleId);
  }
  MakaleEkle(makale: Makale) {
    return this.http.post(this.apiUrl + "/makaleekle", makale);
  }
  MakaleDuzenle(makale: Makale) {
    return this.http.put(this.apiUrl + "/makaleduzenle", makale);
  }
  MakaleSil(makaleId: number) {
    return this.http.delete(this.apiUrl + "/makalesil/" + makaleId);
  }
  

  
  UyeListe() {
    return this.http.get<Uye[]>(this.apiUrl + "/uyeliste");
  }
  UyeById(uyeId: number) {
    return this.http.get(this.apiUrl + "/uyebyid/" + uyeId);
  }
  UyeEkle(uye: Uye) {
    return this.http.post<Sonuc>(this.apiUrl + "/uyeekle", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put<Sonuc>(this.apiUrl + "/uyeduzenle", uye);
  }
  UyeSil(uyeId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "/uyesil/" + uyeId);
  }
  UyeFotoGuncelle(uyeFoto: UyeFoto) {
    return this.http.post<Sonuc>(this.apiUrl + "/uyefotoguncelle", uyeFoto);
  }

  YorumListe() {
    return this.http.get(this.apiUrl + "/yorumliste");
  }
  YorumListeByUyeId(uyeId: number) {
    return this.http.get(this.apiUrl + "/yorumlistebyuyeid/" + uyeId);
  }
  YorumListeBymakaleId(makaleId: number) {
    return this.http.get(this.apiUrl + "/yorumlistebymakaleid/" + makaleId);
  }
  YorumListeSonEklenenler(s: number) {
    return this.http.get(this.apiUrl + "/yorumlistesoneklenenler/" + s);
  }
  YorumById(yorumId: number) {
    return this.http.get(this.apiUrl + "/yorumbyid/" + yorumId);
  }
  YorumEkle(yorum: Yorum) {
    return this.http.post(this.apiUrl + "/yorumekle", yorum);
  }
  YorumDuzenle(yorum: Yorum) {
    return this.http.put(this.apiUrl + "/yorumduzenle", yorum);
  }
  YorumSil(yorumId: number) {
    return this.http.delete(this.apiUrl + "/yorumsil/" + yorumId);
  }
}

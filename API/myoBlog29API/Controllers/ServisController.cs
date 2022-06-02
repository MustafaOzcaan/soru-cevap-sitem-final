using myoBlog29API.Models;
using myoBlog29API.ViewModel;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web.Http;

namespace myoBlog29API.Controllers
{

    public class ServisController : ApiController
    {
        Database1Entities db = new Database1Entities();
        SonucModel sonuc = new SonucModel();

        #region Kategori

        [HttpGet]
        [Route("api/kategoriliste")]

        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {
                KategoriId = x.KategoriId,
                KategoriAdi = x.KategoriAdi,
                KatMakaleSay = x.Makale.Count
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/kategoribyid/{katId}")]
        public KategoriModel KategoriById(int katId)
        {
            KategoriModel kayit = db.Kategori.Where(s => s.KategoriId == katId).Select(x => new KategoriModel()
            {
                KategoriId = x.KategoriId,
                KategoriAdi = x.KategoriAdi,
                KatMakaleSay = x.Makale.Count
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategori.Count(s => s.KategoriAdi == model.KategoriAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Adı Kayıtlıdır!";
                return sonuc;
            }

            Kategori yeni = new Kategori();
            yeni.KategoriAdi = model.KategoriAdi;
            db.Kategori.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.KategoriId == model.KategoriId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.KategoriAdi = model.KategoriAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kategorisil/{katId}")]
        public SonucModel KategoriSil(int katId)
        {
            Kategori kayit = db.Kategori.Where(s => s.KategoriId == katId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Makale.Count(s => s.KategoriId == katId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Makale Kayıtlı Kategori Silinemez!";
                return sonuc;
            }

            db.Kategori.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }
        #endregion

        #region Makale

        [HttpGet]
        [Route("api/makaleliste")]
        public List<MakaleModel> MakaleListe()
        {
            List<MakaleModel> liste = db.Makale.Select(x => new MakaleModel()
            {
                MakaleId = x.MakaleId,
                Baslik = x.Baslik,
                Icerik = x.Icerik,
                Foto = x.Foto,
                KategoriId = (int)x.KategoriId,
                KategoriAdi = x.Kategori.KategoriAdi,
                Okunma = (int)x.Okunma,
                Tarih = (System.DateTime)x.Tarih,
                UyeId = (int)x.UyeId,
                DogruCevapId = x.DogruCevapId,
                UyeKadi = x.Uye.KullaniciAdi

            }).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/makalelistesoneklenenler/{s}")]
        public List<MakaleModel> MakaleListeSonEklenenler(int s)
        {
            List<MakaleModel> liste = db.Makale.OrderByDescending(o => o.MakaleId).Take(s).Select(x => new MakaleModel()
            {
                MakaleId = x.MakaleId,
                Baslik = x.Baslik,
                Icerik = x.Icerik,
                Foto = x.Foto,
                KategoriId = (int)x.KategoriId,
                KategoriAdi = x.Kategori.KategoriAdi,
                Okunma = (int)x.Okunma,
                Tarih = (System.DateTime)x.Tarih,
                UyeId = (int)x.UyeId,
                UyeKadi = x.Uye.KullaniciAdi,
                DogruCevapId = x.DogruCevapId

            }).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/makalelistebykatid/{katId}")]
        public List<MakaleModel> MakaleListeByKatId(int katId)
        {
            List<MakaleModel> liste = db.Makale.Where(s => s.KategoriId == katId).Select(x => new MakaleModel()
            {
                MakaleId = x.MakaleId,
                Baslik = x.Baslik,
                Icerik = x.Icerik,
                Foto = x.Foto,
                KategoriId = (int)x.KategoriId,
                KategoriAdi = x.Kategori.KategoriAdi,
                Okunma = (int)x.Okunma,
                Tarih = (System.DateTime)x.Tarih,
                UyeId = (int)x.UyeId,
                UyeKadi = x.Uye.KullaniciAdi,
                DogruCevapId = x.DogruCevapId

            }).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/makalelistebyuyeid/{uyeId}")]
        public List<MakaleModel> MakaleListeByUyeId(int uyeId)
        {
            List<MakaleModel> liste = db.Makale.Where(s => s.UyeId == uyeId).Select(x => new MakaleModel()
            {
                MakaleId = x.MakaleId,
                Baslik = x.Baslik,
                Icerik = x.Icerik,
                Foto = x.Foto,
                KategoriId = (int)x.KategoriId,
                KategoriAdi = x.Kategori.KategoriAdi,
                Okunma = (int)x.Okunma,
                Tarih = (System.DateTime)x.Tarih,
                UyeId = (int)x.UyeId,
                UyeKadi = x.Uye.KullaniciAdi,
                DogruCevapId = x.DogruCevapId

            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/makalebyid/{makaleId}")]
        public MakaleModel MakaleById(int makaleId)
        {
            MakaleModel kayit = db.Makale.Where(s => s.MakaleId == makaleId).Select(x => new MakaleModel()
            {
                MakaleId = x.MakaleId,
                Baslik = x.Baslik,
                Icerik = x.Icerik,
                Foto = x.Foto,
                KategoriId = (int)x.KategoriId,
                KategoriAdi = x.Kategori.KategoriAdi,
                Okunma = (int)x.Okunma,
                Tarih = (System.DateTime)x.Tarih,
                UyeId = (int)x.UyeId,
                UyeKadi = x.Uye.KullaniciAdi,
                DogruCevapId = x.DogruCevapId
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/makaleekle")]
        public SonucModel MakaleEkle(MakaleModel model)
        {
            if (db.Makale.Count(s => s.Baslik == model.Baslik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Makale Başlığı Kayıtlıdır!";
                return sonuc;
            }

            Makale yeni = new Makale();
            yeni.Baslik = model.Baslik;
            yeni.Icerik = model.Icerik;
            yeni.Tarih = model.Tarih;
            yeni.Okunma = model.Okunma;
            yeni.KategoriId = model.KategoriId;
            yeni.UyeId = model.UyeId;
            yeni.Foto = model.Foto;
            db.Makale.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Makale Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/makaleduzenle")]
        public SonucModel MakaleDuzenle(MakaleModel model)
        {
            Makale kayit = db.Makale.Where(s => s.MakaleId == model.MakaleId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.Baslik = model.Baslik;
            kayit.Icerik = model.Icerik;
            kayit.Tarih = model.Tarih;
            kayit.Okunma = model.Okunma;
            kayit.KategoriId = model.KategoriId;
            kayit.UyeId = model.UyeId;
            kayit.DogruCevapId = model.DogruCevapId;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Makale Düzenlendi";
            return sonuc;

        }

        [HttpDelete]
        [Route("api/makalesil/{makaleId}")]
        public SonucModel MakaleSil(int makaleId)
        {
            Makale kayit = db.Makale.Where(s => s.MakaleId == makaleId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Yorum.Count(s => s.MakaleId == makaleId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Yorum Kayıtlı Makale Silinemez!";
                return sonuc;
            }

            db.Makale.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Makale Silindi";
            return sonuc;
        }


        #endregion

        #region Üye

        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                AdSoyad = x.AdSoyad,
                Email = x.Email,
                KullaniciAdi = x.KullaniciAdi,
                Foto = x.Foto,
                Sifre = x.Sifre,
                UyeAdmin = (int)x.UyeAdmin
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyeModel UyeById(int uyeId)
        {
            UyeModel kayit = db.Uye.Where(s => s.UyeId == uyeId).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                AdSoyad = x.AdSoyad,
                Email = x.Email,
                KullaniciAdi = x.KullaniciAdi,
                Foto = x.Foto,
                Sifre = x.Sifre,
                UyeAdmin = (int)x.UyeAdmin
            }).SingleOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uye.Count(s => s.KullaniciAdi == model.KullaniciAdi || s.Email == model.Email) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kullanıcı Adı veya E-Posta Adresi Kayıtlıdır!";
                return sonuc;
            }

            Uye yeni = new Uye();
            yeni.AdSoyad = model.AdSoyad;
            yeni.Email = model.Email;
            yeni.KullaniciAdi = model.KullaniciAdi;
            yeni.Foto = model.Foto;
            yeni.Sifre = model.Sifre;
            yeni.UyeAdmin = model.UyeAdmin;

            db.Uye.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uye kayit = db.Uye.Where(s => s.UyeId == model.UyeId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            kayit.AdSoyad = model.AdSoyad;
            kayit.Email = model.Email;
            kayit.KullaniciAdi = model.KullaniciAdi;
            kayit.Foto = model.Foto;
            kayit.Sifre = model.Sifre;
            kayit.UyeAdmin = model.UyeAdmin;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        public SonucModel UyeSil(int uyeId)
        {
            Uye kayit = db.Uye.Where(s => s.UyeId == uyeId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }

            if (db.Makale.Count(s => s.UyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Makale Kaydı Olan Üye Silinemez!";
                return sonuc;
            }

            if (db.Yorum.Count(s => s.UyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Yorum Kaydı Olan Üye Silinemez!";
                return sonuc;
            }

            db.Uye.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";
            return sonuc;
        }

        [HttpPost]
        [Route("api/uyefotoguncelle")]
        public SonucModel UyeFotoGuncelle(UyeFotoModel model)
        {
            Uye uye = db.Uye.Where(s => s.UyeId == model.UyeId).SingleOrDefault();
            if (uye == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunmadı!";
                return sonuc;
            }
            if (uye.Foto != "profil.png")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + uye.Foto);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }

            string data = model.FotoData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgBytes = Convert.FromBase64String(base64);
            string dosyaAdi = uye.UyeId + model.FotoUzanti.Replace("image/", ".");
            using (var ms = new MemoryStream(imgBytes, 0, imgBytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosyaAdi));
            }
            uye.Foto = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Fotograf Güncellendi";

            return sonuc;
        }



        #endregion

        #region Yorum

        [HttpGet]
        [Route("api/yorumliste")]
        public List<YorumModel> YorumListe()
        {
            List<YorumModel> liste = db.Yorum.Select(x => new YorumModel()
            {
                YorumId = x.YorumId,
                YorumIcerik = x.YorumIcerik,
                MakaleId = (int)x.MakaleId,
                UyeId = (int)x.UyeId,
                Tarih = (System.DateTime)x.Tarih,
                KullaniciAdi = x.Uye.KullaniciAdi,

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/yorumlistebyuyeid/{uyeId}")]
        public List<YorumModel> YorumListeByUyeId(int uyeId)
        {
            List<YorumModel> liste = db.Yorum.Where(s => s.UyeId == uyeId).Select(x => new YorumModel()
            {
                YorumId = x.YorumId,
                YorumIcerik = x.YorumIcerik,
                MakaleId = (int)x.MakaleId,
                UyeId = (int)x.UyeId,
                Tarih = (System.DateTime)x.Tarih,
                KullaniciAdi = x.Uye.KullaniciAdi,

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/yorumlistebymakaleid/{makaleId}")]
        public List<YorumModel> YorumListeBymakaleId(int makaleId)
        {
            List<YorumModel> liste = db.Yorum.Where(s => s.MakaleId == makaleId).Select(x => new YorumModel()
            {
                YorumId = x.YorumId,
                YorumIcerik = x.YorumIcerik,
                MakaleId = (int)x.MakaleId,
                UyeId = (int)x.UyeId,

                Tarih = (System.DateTime)x.Tarih,
                KullaniciAdi = x.Uye.KullaniciAdi,

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/yorumlistesoneklenenler/{s}")]
        public List<YorumModel> YorumListeSonEklenenler(int s)
        {
            List<YorumModel> liste = db.Yorum.OrderByDescending(o => o.MakaleId).Take(s).Select(x => new YorumModel()
            {
                YorumId = x.YorumId,
                YorumIcerik = x.YorumIcerik,
                MakaleId = (int)x.MakaleId,
                UyeId = (int)x.UyeId,
                Tarih = (System.DateTime)x.Tarih,
                KullaniciAdi = x.Uye.KullaniciAdi,

            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/yorumbyid/{yorumId}")]

        public YorumModel YorumById(int yorumId)
        {
            YorumModel kayit = db.Yorum.Where(s => s.YorumId == yorumId).Select(x => new YorumModel()
            {
                YorumId = x.YorumId,
                YorumIcerik = x.YorumIcerik,
                MakaleId = (int)x.MakaleId,
                UyeId = (int)x.UyeId,
                Tarih = (System.DateTime)x.Tarih,
                KullaniciAdi = x.Uye.KullaniciAdi,
            }).SingleOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/yorumekle")]
        public SonucModel YorumEkle(YorumModel model)
        {
            if (db.Yorum.Count(s => s.UyeId == model.UyeId && s.MakaleId == model.MakaleId && s.YorumIcerik == model.YorumIcerik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Aynı Kişi, Aynı Makaleye Aynı Yorumu Yapamaz!";
                return sonuc;
            }

            Yorum yeni = new Yorum();
            yeni.YorumId = model.YorumId;
            yeni.YorumIcerik = model.YorumIcerik;
            yeni.MakaleId = model.MakaleId;
            yeni.UyeId = model.UyeId;
            yeni.Tarih = model.Tarih;
            db.Yorum.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yorum Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/yorumduzenle")]
        public SonucModel YorumDuzenle(YorumModel model)
        {

            Yorum kayit = db.Yorum.Where(s => s.YorumId == model.YorumId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.YorumId = model.YorumId;
            kayit.YorumIcerik = model.YorumIcerik;
            kayit.MakaleId = model.MakaleId;
            kayit.UyeId = model.UyeId;
            kayit.Tarih = model.Tarih;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yorum Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/yorumsil/{yorumId}")]
        public SonucModel YorumSil(int yorumId)
        {
            Yorum kayit = db.Yorum.Where(s => s.YorumId == yorumId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            db.Yorum.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yorum Silindi";

            return sonuc;
        }


        #endregion
    }
}

using myoBlog29API.Models;
using myoBlog29API.ViewModel;
using System.Linq;

namespace myoBlog29API.Auth
{
    public class UyeService
    {
        Database1Entities db = new Database1Entities();

        public UyeModel UyeOturumAc(string kadi, string parola)
        {
            UyeModel uye = db.Uye.Where(s => s.KullaniciAdi == kadi && s.Sifre == parola).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                AdSoyad = x.AdSoyad,
                Email = x.Email,
                KullaniciAdi = x.KullaniciAdi,
                Foto = x.Foto,
                Sifre = x.Sifre,
                UyeAdmin = (int)x.UyeAdmin
            }).SingleOrDefault();
            return uye;

        }
    }
}

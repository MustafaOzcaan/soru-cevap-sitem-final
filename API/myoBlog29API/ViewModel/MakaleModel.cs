using System;

namespace myoBlog29API.ViewModel
{
    public class MakaleModel
    {
        public int MakaleId { get; set; }
        public string Baslik { get; set; }
        public string Icerik { get; set; }
        public string Foto { get; set; }
        public DateTime Tarih { get; set; }
        public int KategoriId { get; set; }
        public string KategoriAdi { get; set; }
        public int UyeId { get; set; }
        public string UyeKadi { get; set; }
        public int Okunma { get; set; }
        public Nullable<int> DogruCevapId { get; set; }
    }
}

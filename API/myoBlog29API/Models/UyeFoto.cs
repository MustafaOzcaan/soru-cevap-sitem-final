//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace myoBlog29API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class UyeFoto
    {
        public int UyeId { get; set; }
        public string FotoData { get; set; }
        public string FotoUzanti { get; set; }
        public int FotoId { get; set; }
    
        public virtual Uye Uye { get; set; }
    }
}
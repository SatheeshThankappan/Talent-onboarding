//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace My_crud_project1.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class sale
    {
       

        public int Id { get; set; }
        public int productId { get; set; }
        public int customerId { get; set; }
        public int storeId { get; set; }
        public DateTime datesold { get; set; }
    
        public virtual customer customer { get; set; }
        public virtual product product { get; set; }
        public virtual store store { get; set; }



    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace My_crud_project1.Models
{
    public class ProductView
    {
        public int Id { get; set; }
        public string name { get; set; }
        public decimal? price { get; set; }
    }
}
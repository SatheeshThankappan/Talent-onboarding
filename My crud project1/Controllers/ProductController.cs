using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using My_crud_project1.Models;

namespace My_crud_project1.Controllers
{
    public class ProductController : Controller
    {
        private project1Entities1 db = new project1Entities1();
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllProducts()
        {

            List<ProductView> productList = db.products.Select(p =>
            new ProductView
            {
                Id = p.Id,
                name = p.name,
                price = p.price
            }).ToList();
            return Json(productList, JsonRequestBehavior.AllowGet);

        }
        //adding  product
        [HttpPost]
        public ActionResult AddProduct(product product)
        {
            db.products.Add(product);
            db.SaveChanges();
            return Json(product, JsonRequestBehavior.AllowGet);
        }

        //edit
        [HttpPost]
        public ActionResult EditProduct(product product)
        {
            db.Entry(product).State = EntityState.Modified;
            db.SaveChanges();
            return Json(product, JsonRequestBehavior.AllowGet);

        }
        public ActionResult DeleteProduct(product product)
        {
            int id = product.Id;
            product prdt = db.products.Find(id);
            db.products.Remove(prdt);
            db.SaveChanges();
            return Json(product, JsonRequestBehavior.AllowGet);

        }
    }
}
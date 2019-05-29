using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using My_crud_project1.Models;

namespace My_crud_project1.Controllers
{
    public class SalesController : Controller
    {
        private project1Entities1 db = new project1Entities1();
       

        // GET: Sales
        public ActionResult Index()
        {

            return View();
        }

        public ActionResult GetAllSales()
        {
            var salesList = db.sales.Select(sale =>
             new salesView
             {
                 Id = sale.Id,
                 ProductId = sale.productId,
                 CustomerId = sale.customerId,
                 StoreId = sale.storeId,
                 CustomerName = sale.customer.name,
                 ProductName = sale.product.name,
                 StoreName = sale.store.name,
                 DateSold = sale.datesold

             }).ToList();

            return Json( salesList , JsonRequestBehavior.AllowGet );

        }
        //adding  product
        [HttpPost]
        public ActionResult AddSales(salesView addSale)
        {
            var response = false;
            try
            {
                if (addSale.Id > 0)
                {
                    sale sale = db.sales.Where(x => x.Id == addSale.Id).FirstOrDefault();
                    sale.Id = addSale.Id;
                    
                    sale.productId = addSale.ProductId;
                    sale.customerId = addSale.CustomerId;
                    sale.storeId = addSale.StoreId;
                    sale.datesold = DateTime.Now;
                    db.SaveChanges();
                    response = true;
                }
                else
                {
                    sale newSale = new sale();
                    
                    newSale.productId = addSale.ProductId;
                    newSale.customerId = addSale.CustomerId;                    
                    newSale.storeId = addSale.StoreId;
                    newSale.datesold = DateTime.Now;
                    db.sales.Add(newSale);
                    db.SaveChanges();
                    response = true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Json(new { response });
        }
        //delete
        [HttpPost]
        public JsonResult DeleteSales(salesView addSale)
        {
            sale sale = db.sales.SingleOrDefault(s => s.Id == addSale.Id);
            var response = false;
            try
            {
                if (sale != null)
                {
                    db.sales.Remove(sale);
                    db.SaveChanges();
                    response = true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Json(new { response });
        }
    }
}
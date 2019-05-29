using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using My_crud_project1.Models;


namespace My_crud_project1.Controllers
{
    public class CustomerController : Controller
    {
        private project1Entities1 db = new project1Entities1();
        // GET: Customer
     
        public ActionResult Index()
        {
            var madel = db.customers.ToList();
           
            return View(madel);
        }
        public ActionResult GetAllCustomers()
        {
            List<CustomerView> customerList = db.customers.Select(c =>
            new CustomerView
            {
                Id = c.Id,
                name = c.name,
                address = c.address
            }).ToList();
            return Json( customerList, JsonRequestBehavior.AllowGet);
        }





        //adding a customer
        [HttpPost]
        public  ActionResult Createcustomer(customer customer)
        {
            db.customers.Add(customer);
            db.SaveChanges();
            return Json(customer, JsonRequestBehavior.AllowGet);
        }

        //edit
        [HttpPost]
        public ActionResult Editcustomer(customer customer)
        {
            db.Entry(customer).State = EntityState.Modified;
            db.SaveChanges();
            return Json(customer, JsonRequestBehavior.AllowGet);

        }
        public ActionResult Deletecustomer(customer customer)
        {
            int id = customer.Id;
            customer cust = db.customers.Find(id);
            db.customers.Remove(cust);
            db.SaveChanges();
            return Json(customer, JsonRequestBehavior.AllowGet);

        }

    }
}

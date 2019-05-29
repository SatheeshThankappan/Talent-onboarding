using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using My_crud_project1.Models;

namespace My_crud_project1.Controllers
{

 

    public class StoreController : Controller
    {
        private project1Entities1 db = new project1Entities1();
        // GET: Store
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllStores()
        {

            List<StoreView> storeList = db.stores.Select(st =>
            new StoreView
            {
                Id = st.Id,
                name = st.name,
                address = st.address
            }).ToList();
            return Json(storeList, JsonRequestBehavior.AllowGet);

        }
        //adding a customer
        [HttpPost]
        public ActionResult CreateStore(store store)
        {
            db.stores.Add(store);
            db.SaveChanges();
            return Json(store, JsonRequestBehavior.AllowGet);
        }

        //edit
        [HttpPost]
        public ActionResult EditStore(store store)
        {
            db.Entry(store).State = EntityState.Modified;
            db.SaveChanges();
            return Json(store, JsonRequestBehavior.AllowGet);

        }
        public ActionResult DeleteStore(store store)
        {
            int id = store.Id;
            store st = db.stores.Find(id);
            db.stores.Remove(st);
            db.SaveChanges();
            return Json(store, JsonRequestBehavior.AllowGet);

        }

    }
}
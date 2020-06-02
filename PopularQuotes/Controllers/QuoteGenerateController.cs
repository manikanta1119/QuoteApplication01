using PopularQuotes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PopularQuotes.Controllers
{
    public class QuoteGenerateController : Controller
    {
        // GET: QuoteGenerate
        public ActionResult Index()
        {
            return View();
             
        }

        public JsonResult GetQuotes()
        {
            QuoteEntity entity = new QuoteEntity();

            List<Quote> quote = entity.Quotes.ToList();


  
            return  Json(quote, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Get_QuoteById(string Id)
        {
            QuoteEntity entity = new QuoteEntity();
            int ID = int.Parse(Id);
            return Json(entity.Quotes.Find(ID), JsonRequestBehavior.AllowGet);
        }

        public String Insert_quote(Quote quote)
        {
            QuoteEntity entity = new QuoteEntity();
            if(quote !=null)
            {
                string resource = quote.Resource;
                string c = "https://";

                char ch = c.ToCharArray()[10];


                resource.Append(ch);


                entity.Quotes.Add(quote);
                entity.SaveChanges();
                return "Quote added successfully";
            }
            else
                {
                return "Quote failed to ADD";
            }
           

        }

        public string Delete_Quote(Quote quote)
        {
            if(quote != null)
            {
                QuoteEntity entity = new QuoteEntity();

                var quote_ = entity.Entry(quote);
                if(quote_.State == System.Data.Entity.EntityState.Detached)
                {
                    entity.Quotes.Attach(quote);

                    entity.Quotes.Remove(quote);

                }

                entity.SaveChanges();
                return "Quote deleted Successfully";
            }
            else
            {
                return "Quote deleted Failed";
            }
        }

        public string Update_Quote(Quote quote)
        {
            if(quote!= null)
            {
                QuoteEntity entity = new QuoteEntity();

                var quote_ = entity.Entry(quote);

                Quote quoteObj = entity.Quotes.Where(x => x.Id == quote.Id).FirstOrDefault();

                
                quoteObj.Id = quote.Id;

                quoteObj.Resource = quote.Resource;
                quoteObj.Tags = quote.Tags;
                quoteObj.Author = quote.Author;
                quoteObj.Agenda = quote.Agenda;
                entity.SaveChanges();

                return "Successfully udapted";
            }
            else
            {
                return "Failed updated";
            }
        }
    }
}
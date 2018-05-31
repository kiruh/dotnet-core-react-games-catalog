using System.Linq;
using Distributed.Models;
using Microsoft.AspNetCore.Mvc;
using Distributed.FormModels;
using System;
using Microsoft.EntityFrameworkCore;

namespace Distributed.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class HomeController : Controller
    {
        [Route("")]
        [Route("Admin/{id?}")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
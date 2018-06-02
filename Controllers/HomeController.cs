using Microsoft.AspNetCore.Mvc;

namespace Distributed.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class HomeController : Controller
    {
        [Route("")]
        [Route("Login")]
        [Route("Register")]
        [Route("Admin/{id?}")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
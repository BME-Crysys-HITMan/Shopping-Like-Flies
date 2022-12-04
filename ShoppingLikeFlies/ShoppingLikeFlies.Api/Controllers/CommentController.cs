using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShoppingLikeFiles.DomainServices.DTOs;
using ShoppingLikeFlies.Api.Security.DAL;

namespace ShoppingLikeFlies.Api.Controllers
{


    [Route("api/[controller]")]
    [ApiController]

    public class CommentController : ControllerBase
    {
        private readonly ICaffService caffService;

        public CommentController(ICaffService caffService,UserManager<ApplicationUser> userManager)
        {
            this.caffService = caffService;
        }


        [HttpPost]
        [Route("/addComment")]
        public async Task AddCommentAsync(AddCommentDTO commentDTO)
        {
            var loginId = User.Claims.First(x => x.Type == "uuid");
            await caffService.AddCommentAsync(commentDTO, Guid.Parse(loginId.Value));
        }
    }
}

using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PopularQuotes.Startup))]
namespace PopularQuotes
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

# README

This repository was built from scratch following the steps described in the original blog post *[Server rendering Vue.js applications with ASP.NET Core](https://stu.ratcliffe.io/2017/07/20/vuejs-serverside-rendering-with-aspnet-core)* from Stu Ratcliffe. The aim of this repository is to adding more steps and comments from my experience following the steps that make it works as a supplement of the original blog post. I personally did not have any prior knowledge in VueJS nor modern web development frameworks. I were a C# developer and learn VueJS by my own from VueJS documentation and Stu Ratcliffe blog post. Hope this helps if you also read the same blog post and got stuck some way. :pray: :grinning:

You can get the complete code repo made by Stu Ratcliffe from [[Here]](https://github.com/sturatcliffe/VueDotnetSSR)

## Install and run:
    dotnet restore
    npm install
    dotnet run

if you see the following lines, than you are looking great!

    Now listening on: http://localhost:5000
    Application started. Press Ctrl+C to shut down.
    info: Microsoft.AspNetCore.NodeServices[0]
        webpack built c91dc3e2f186f013c53c in 3212ms

## Packages used: *The description may not accurate, just my understanding*
- vue <- VueJS
- lodash <- similiar to numpy in Python, utilies library for manipulating array/object.
- axios <- Promise based HTTP client for the browser and Node.js, think of $.ajax() if you come from jQuery world
- vuex <- Vue variant of Flux implementation, just like Redux in React  
- nprogress <- loading indiciator
- vue-router <- enable client side "page" routing
- vue-server-renderer <- enable Server Side Rendering
- aspnet-prerendering <- enable ASP.NET to trigger Node for SSR

- webpack <- pack your JavaScript files into bundles for faster loading, remove duplicate imports, reduce final code size
- webpack-cli <- since webpack version 4 the command line tool placed in this package instead, install only if you want to pack the JavaScript code manually
- webpack-merge <- merge webpack config so common configuration attributes can be shared among configurations
- webpack-hot-middleware <- enable hot reload of code changes
- aspnet-webpack <- enable ASP.NET to execute webpack on demand during runtime.
- vue-loader <- required for packing vuejs code
- css-loader <- required if you have css file to pack
- style-loader <- required if you use template with style
- json-loader <- requiredd if you need to pack json file
- vue-template-compiler <- required for packing if you use template in vue components
- babel-* <- transpile code syntax used in Vue into browser understandable version before packing

### Working with data:
- .Net part
    1. Message.cs
    2. FakeMessageStore.cs
    3. ClientState.cs
- Vue part
    0. (create ClientApp/vuex folder)
    1. ClientApp/vuex/action.js
    2. ClientApp/vuex/store.js  

### Client side routing:
0. Move to ClientApp/components
1. Dashboard.vue
2. Messages.vue
3. Modify App.vue
4. create ClientApp/router folder
5. Move to ClientApp/router
6. index.js
7. Move back to ClientApp folder
8. Modify app.js
9. Move back to .
10. Modify Startup.cs  

### Loading indicator:
Here we try to modify the implementation order different from the original post.
We are going to add the loading indicator before implementing the Server Side Rendering.
To simulate timely API call form remote server, we add the following line in HomeController.cs:

    public JsonResult initialMessages(){
        //Added to simulate initial loading from remote server
        Thread.Sleep(2000);
        ...
    }

1. Add nprogess in package.json dependency:  

        "dependencies": {
            "vue": "^2.5.8",
            "vuex": "^3.0.1",
            "vue-router": "^3.0.1",
            "lodash": "^4.17.4",
            "axios": "^0.17.1",
            "nprogress": "^0.2.0"
        }

2. Add style-loader and css-loader to webpack.config:  

        { 
            test: /\.css$/, 
            loader: "style-loader!css-loader" 
        }

3. Modify `ClientApp/vuex/actions.js`, add `NProgress.start()` and `NProgress.done()` before and after axios remote call.

### Server Side Renderering (SSR)

1. Add the following dependencies to package.json:

    - devDependencies:
        - aspnet-webpack
        - webpack-merge
    - dependencies:x
        - vue-server-renderer
        - aspnet-prerenderer

2. Split the code into two part:

    1. `server.js` <- this will load by renderOnServer.js, which aspnet-prerendering will trigger Node to execute and return pre-rendered result back to renderOnServer.js and thus send to browser as initial state of app.
    2. `client.js` <- once initial app state rendered and injected in the resulting index.cshtml, the script tag will load client.js and mount it to pre-rendered app tag.

3. Create Node server code for ASP.NET Core to trigger the Node hosting service to execute

    - `rendererOnServer.js` <- responsible for loading the webpacked server.js for Node to render the initial app state.

4. ASP.NET Core part

    - Edit `Views/Home/index.cshtml` app tag to use `aspnet-prerendering` attributes

5. Webpack Configuration

    - Edit `webpack.config.js`, make use of `webpack-merge` to split the original configuration into two sets.
  
### Thoughts:
SSR was by far the most difficult part of my VueJS journey, it takes more than half of the time of my VueJS learning. Whether to use Server Side Rendering or not is highly optional, you don't need it to write a cool SPA. The performance and user experience gain is arguablely worth the complexity and develop time involved.

### BootstrapVue:
Bootstrap is a very popular library for beautiful and simple UI components and styles.
Using Bootstrap in VueJS application is easy with BootstrapVue (it seems bootstrap is not required in package.json to use bootstrap-vue, installing bootstrap-vue install bootstrap as well):

- Install: `npm i bootstrap-vue`
- Import into app.js: `import BootstrapVue from 'bootstrap-vue'
- Import the css files: (tricky here, for this repo I need to add the imports at client.js instead of app.js)  
    import 'bootstrap/dist/css/bootstrap.css'
    import 'boostrap-vue/dist/bootstrap-vue.css'
- Add the Bootstrap components (e.g. I added a badge at Dashboard.vue template.)

### Prevent XSS Attack:
During the journey in solving the asp-prerendering v3.0.0+ dependency issue, I found an article talking about Cross-site scripting attack in JavaScript applications: *[The Most Common XSS Vulnerability in React.js Applications](https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0)* And turns out rednerOnServer.js also has such vulnerability.

    module.exports = prerendering.createServerRenderer(function (params) {
    return new Promise(
        function (resolve, reject) {
        const context = {
            url: params.url,
            xss:"</script><script>alert('Possible XSS vulnerability from user input!')</script>"
        }
        resolve({
            globals: {
            __INITIAL_STATE__: context
            }
        })
    })
    });

If we modify the renderOnServer.js as above, an alert will be shown when we load the page from browser. This will potentially enable attacker to execute arbitary code. To fix this vulnerability, we can make use of `serialize-javascript` package from Yahoo engineers and cleanse all initial state assignment from user input:

    npm install --save serialize-javascript

and serialize the initial state like this:

    //prevent XSS attack when initialize state
    var serialize = require('serialize-javascript')

    module.exports = prerendering.createServerRenderer(function (params) {
        return new Promise(
            function (resolve, reject) {
                const context = {
                url: params.url,
                xss: serialize("</script><script>alert('Possible XSS vulnerability from user input!')</script>")
            }
            resolve({
                globals: {
                __INITIAL_STATE__: context
                }
            })
        })
    });

and when you inspect the HTML from browser you will see the tags are escaped:

    window.__INITIAL_STATE__ = {"url":"/","xss":"\"\\u003C\\u002Fscript\\u003E\\u003Cscript\\u003Ealert('Possible XSS vulnerability from user input!')\\u003C\\u002Fscript\\u003E\""};

Cheers. :smirk:

### Reference
*[Building Single Page Applications on ASP.NET Core with JavaScriptServices](https://blogs.msdn.microsoft.com/webdev/2017/02/14/building-single-page-applications-on-asp-net-core-with-javascriptservices/)*
*[Use JavaScriptServices to Create Single Page Applications in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa-services)*
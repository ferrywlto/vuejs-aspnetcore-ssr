# README

This repository was built from scratch following the steps described in the original blog post *[Server rendering Vue.js applications with ASP.NET Core](https://stu.ratcliffe.io/2017/07/20/vuejs-serverside-rendering-with-aspnet-core)* from Stu Ratcliffe. The aim of this repository is to adding more steps and comments from my experience following the steps that make it works as a supplement of the original blog post. Hope this helps if you also read the same blog post and got stuck some way. :)

You can get the complete code repo made by Stu Ratcliffe from [[Here]](https://github.com/sturatcliffe/VueDotnetSSR)

## Install and run:
if Webpack is not installed yet:  

    npm install -g webpack
else  

    dotnet restore
    npm install
    webpack
    dotnet run

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
    - dependencies:
        - vue-server-renderer
        - aspnet-prerenderer *(Note that only version ^1.0.0 is supported, using latest ^3.0.0+ will break the code.)*

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
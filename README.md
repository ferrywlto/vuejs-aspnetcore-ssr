This repository is a clone from Stu Ratcliffe [Server rendering Vue.js applications with ASP.NET Core](https://github.com/sturatcliffe/VueDotnetSSR)

Following his articile and trying to have some write up. (e.g. using latest packages in package.json)

## Install and run:
if Webpack is not installed yet:
    npm install -g webpack

    dotnet restore
    npm install
    webpack
    dotnet run
## Packages used:
- lodash <- similiar to numpy in Python, utilies library for manipulating array/object.
- axios <- Promise based HTTP client for the browser and Node.js, think of $.ajax() if you come from jQuery world
- vuex <- Vue variant of Flux implementation, just like Redux in React
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
3. Modify ClientApp/vuex/actions.js, add `NProgress.start()` and `NProgress.done()` before and after axios remote call. 
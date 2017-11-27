This repository is a clone from Stu Ratcliffe [Server rendering Vue.js applications with ASP.NET Core](https://github.com/sturatcliffe/VueDotnetSSR)

Following his articile and trying to have some write up. (e.g. using latest packages in package.json)

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
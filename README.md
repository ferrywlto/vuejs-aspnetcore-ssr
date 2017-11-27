This repository is a clone from Stu Ratcliffe [Server rendering Vue.js applications with ASP.NET Core](https://github.com/sturatcliffe/VueDotnetSSR)

Following his articile and trying to have some write up. (e.g. using latest packages in package.json)

## Packages used:
- lodash <- similiar to numpy in Python
- axios <- Promise based HTTP client for the browser and Node.js
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
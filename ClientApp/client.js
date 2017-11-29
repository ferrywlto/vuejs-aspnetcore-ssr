import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
    app,
    router,
    store
} from './app'

store.replaceState(__INITIAL_STATE__)

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    if (!activated.length) {
      return next()
    }

    NProgress.start()

    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({store, route: to})
      }
    })).then(() => {
      NProgress.done()
      next()
    }).catch(next)
  })
  app.$mount('#app')
})

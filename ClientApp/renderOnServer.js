process.env.VUE_ENV = 'server'

const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../wwwroot/dist/main-server.js')
const code = fs.readFileSync(filePath, 'utf8')

var prerendering = require('aspnet-prerendering')

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

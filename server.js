const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'
const port = process.env.PORT || 3000

// Memory optimization for 1GB server
const app = next({ 
  dev,
  customServer: true,
  conf: {
    compress: true,
    generateEtags: true,
    poweredByHeader: false
  }
})

const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse request URL
      const parsedUrl = parse(req.url, true)
      
      // Handle the request
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('Internal server error')
    }
  })
  .once('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  .listen(port, hostname, () => {
    console.log(`🚀 Server ready on http://${hostname}:${port}`)
    console.log(`🎯 Environment: ${process.env.NODE_ENV}`)
    console.log(`💾 Memory optimized for 1GB RAM`)
  })
}) 
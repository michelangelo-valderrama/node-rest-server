import http2 from "node:http2"
import fs from "node:fs"

const port = 8080

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    const url = req.url === "/" ? "/index.html" : req.url

    try {
      const requestedFile = fs.readFileSync(`./public${url}`, {
        encoding: "utf-8",
      })

      const fileExtension = url?.split(".").at(-1)

      const MIMETypeByFileExtension = {
        js: "application/javascript",
        css: "text/css",
        html: "text/html",
      }

      res.writeHead(200, {
        "Content-Type":
          MIMETypeByFileExtension[
            fileExtension as keyof typeof MIMETypeByFileExtension
          ] ?? "text/plain",
      })

      res.end(requestedFile)
    } catch (error) {
      res.writeHead(404)
      res.end(`<h1>404 | Not Found</h1>\n<pre>${error}</pre>`)
    }
  }
)

server.listen(port, () => {
  console.log(`Server listening on https://localhost:${port}`)
})

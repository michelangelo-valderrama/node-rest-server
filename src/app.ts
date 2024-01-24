import { Server } from "./presentation/server"
import { envs } from "./config/envs"

;import { AppRoutes } from "./presentation/routes";
(() => {
  main()
})()

function main() {
  const server = new Server({
    PORT: envs.PORT,
    PUBLIC_PATH: envs.PUBLIC_PATH,
    routes: AppRoutes.routes
  })
  server.start()
}

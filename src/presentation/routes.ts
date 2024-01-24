import { Router } from "express"
import { TodosRoutes } from "./todos/routes"

export class AppRoutes {
  static get routes() {
    const router = Router()

    router.use("/api/todos", TodosRoutes.routes)

    return router
  }
}

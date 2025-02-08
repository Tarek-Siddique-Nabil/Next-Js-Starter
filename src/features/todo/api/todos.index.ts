import { createRouter } from "@/lib/create-app";

import * as handlers from "./todos.handlers";
import * as routes from "./todos.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.newTodo, handlers.create)
  .openapi(routes.getTodo, handlers.get)
  .openapi(routes.updateTodo, handlers.update)
  .openapi(routes.deleteTodo, handlers.remove);

export default router;

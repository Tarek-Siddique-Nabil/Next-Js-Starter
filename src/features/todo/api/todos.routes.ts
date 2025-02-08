import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { IdParamsSchema, createErrorSchema } from "stoker/openapi/schemas";
import getParamsSchema from "stoker/openapi/schemas/get-params-schema";

import {
  insertTodoSchema,
  patchTodoSchema,
  selectTodosSchema,
} from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["todos"];
export const list = createRoute({
  path: "/todos",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTodosSchema),
      "The list of carts"
    ),
  },
});

export const newTodo = createRoute({
  path: "/todos/new",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(insertTodoSchema, "The new todo"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(selectTodosSchema, "The new todo"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "The todo was not found"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(selectTodosSchema),
      "The validation error(s)"
    ),
  },
});

export const getTodo = createRoute({
  path: "/todos/{id}",
  method: "get",
  tags,
  request: {
    params: getParamsSchema({ name: "id", validator: "cuid2" }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTodosSchema, "The todo"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "The todo was not found"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(getParamsSchema({ name: "id", validator: "cuid2" })),
      "The validation error(s)"
    ),
  },
});

export const updateTodo = createRoute({
  path: "/todos/{id}",
  method: "patch",
  tags,
  request: {
    params: getParamsSchema({ name: "id", validator: "cuid2" }),
    body: jsonContentRequired(patchTodoSchema, "The todo"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTodosSchema, "The updated todo"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "The todo was not found"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema({
        ...getParamsSchema({ name: "id", validator: "cuid2" }),
        ...patchTodoSchema,
      }),
      "The validation error(s)"
    ),
  },
});

export const deleteTodo = createRoute({
  path: "/todos/todo/{id}/user{userId}",
  method: "delete",
  tags,
  request: {
    params: z.object({
      id: getParamsSchema({ name: "id", validator: "cuid2" }),
      userId: IdParamsSchema,
    }),
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "The todo was deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "The todo was not found"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema({
        IdParamsSchema,
        ...getParamsSchema({ name: "id", validator: "cuid2" }),
      }),
      "The validation error(s)"
    ),
  },
});

export type ListRoute = typeof list;
export type NewTodoRoute = typeof newTodo;
export type GetTodoRoute = typeof getTodo;
export type UpdateTodoRoute = typeof updateTodo;
export type DeleteTodoRoute = typeof deleteTodo;

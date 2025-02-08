import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";

import db from "@/db";
import { todo } from "@/db/schema";
import { AppRouteHandler } from "@/lib/types";

import {
  DeleteTodoRoute,
  GetTodoRoute,
  ListRoute,
  NewTodoRoute,
  UpdateTodoRoute,
} from "./todos.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const list = await db.query.todo.findMany();
  return c.json(list, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<NewTodoRoute> = async (c) => {
  const body = c.req.valid("json");
  const newTodo = await db
    .insert(todo)
    .values({
      authorId: body.authorId,
      title: body.title,
      status: body.status,
    })
    .returning()
    .then((rows) => rows[0]);
  return c.json(newTodo, HttpStatusCodes.CREATED);
};

export const get: AppRouteHandler<GetTodoRoute> = async (c) => {
  const id = c.req.param("id");
  const findtodo = await db.query.todo.findFirst({
    where: eq(todo.id, id),
  });
  if (!todo) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(findtodo, HttpStatusCodes.OK);
};

export const update: AppRouteHandler<UpdateTodoRoute> = async (c) => {
  const id = c.req.param("id");
  const body = c.req.valid("json");
  const updatedTodo = await db
    .update(todo)
    .set({
      title: body.title,
      status: body.status,
      description: body.description,
    })
    .where(eq(todo.id, id))
    .returning()
    .then((rows) => rows[0]);
  if (!updatedTodo) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(updatedTodo, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<DeleteTodoRoute> = async (c) => {
  const id = c.req.param("id");
  const deletedTodo = await db
    .delete(todo)
    .where(eq(todo.id, id))
    .returning()
    .then((rows) => rows[0]);
  if (!deletedTodo) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(deletedTodo, HttpStatusCodes.OK);
};

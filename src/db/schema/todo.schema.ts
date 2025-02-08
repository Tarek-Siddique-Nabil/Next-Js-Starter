import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { user } from "./users.schema";

const todo = pgTable("todo", {
  id: text().$defaultFn(() => createId()),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  status: text("status", { enum: ["to-do", "working", "done", "next-time"] })
    .default("to-do")
    .notNull(),
  authorId: varchar("author_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const todoRelations = relations(todo, ({ one }) => ({
  author: one(user, { fields: [todo.authorId], references: [user.id] }),
}));

export default todo;

export const selectTodosSchema = createSelectSchema(todo);
export type selectTodosSchema = z.infer<typeof selectTodosSchema>;

export const insertTodoSchema = createInsertSchema(todo, {
  title: (schema) => schema.min(3).max(256),
})
  .required({
    authorId: true,
    title: true,
    status: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export type insertTodoSchema = z.infer<typeof insertTodoSchema>;
export const patchTodoSchema = insertTodoSchema.partial();
export type patchTodoSchema = z.infer<typeof patchTodoSchema>;

import { relations } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./users.schema";

 const todo = pgTable("todo", {
  id: varchar("id", { length: 256 }).primaryKey(),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 256 }),
  authorId: varchar("author_id", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});


export const todoRelations = relations(todo, ({ one }) => ({
    author: one(user, { fields: [todo.authorId], references: [user.id] }),
  }));
  
export default todo;
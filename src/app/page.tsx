import { eq } from "drizzle-orm";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db";
import { selectTodosSchema, todo } from "@/db/schema";

const MainPage = async () => {
  const todos = await db.query.todo.findMany({
    where: eq(todo.authorId, "1"),
  });

  if (todos.length === 0) {
    return (
      <main className="container mx-auto">
        <nav className="flex items-end justify-end py-4">
          <ThemeToggle />
        </nav>
        <section>
          <h3 className="text-center font-exo_2 text-lg underline lg:text-4xl">
            Todos
          </h3>
          <p className="text-center text-lg">No Todos</p>
        </section>
      </main>
    );
  }
  return (
    <main className="container mx-auto">
      <nav className="flex items-end justify-end py-4">
        <ThemeToggle />
      </nav>
      <section className="space-y-4">
        <h3 className="text-center font-exo_2 text-lg underline lg:text-4xl">
          Todos
        </h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainPage;

function Todo({ todo }: { todo: selectTodosSchema }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{todo.status}</CardTitle>
        <CardDescription>
          {todo.createdAt
            ? new Date(todo.createdAt).toLocaleDateString()
            : "N/A"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{todo.title}</p>
      </CardContent>
      <CardFooter>
        <p>{todo.description}</p>
      </CardFooter>
    </Card>
  );
}

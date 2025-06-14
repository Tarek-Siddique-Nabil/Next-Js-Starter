import { Button } from "@/components/ui/button";

const TodosPage = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-5">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Your Todos </h1>
        {/* <p className="mt-4">Create Todos</p> */}
      </div>
      <div>
        <Button>Create Todo</Button>
      </div>
    </main>
  );
};

export default TodosPage;

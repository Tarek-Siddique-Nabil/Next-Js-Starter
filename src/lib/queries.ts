import { queryOptions } from "@tanstack/react-query";

import apiClient, { formatApiError } from "./api-client";

export const queryKeys = {
  LIST_TODOS: { queryKey: ["list-todos"] },
  LIST_TODO: (id: string) => ({ queryKey: [`list-todo-${id}`] }),
};

export const todoQueryOptions = queryOptions({
  ...queryKeys.LIST_TODOS,
  queryFn: async () => {
    const res = await apiClient.todos.$get();
    return res.json();
  },
});
export const todoQueryOptionsById = (id: string) =>
  queryOptions({
    ...queryKeys.LIST_TODO(id),
    queryFn: async () => {
      const res = await apiClient.todos[":id"].$get({
        param: { id },
      });
      const json = await res.json();
      if ("message" in json) {
        return new Error(json.message);
      }
      if ("success" in json) {
        const msg = formatApiError(json);
        return new Error(msg);
      }
      return json;
    },
  });

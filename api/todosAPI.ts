import { useQuery } from "react-query";
import { Todo } from "../types";

const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function useTodos() {
  return useQuery("todos", fetchTodos);
}

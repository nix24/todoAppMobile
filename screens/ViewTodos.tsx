import {
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  Pressable,
  View,
} from "react-native";
import { useTodoStore } from "../store/todoStore";
import { useTodos } from "../api/todosAPI";
import { useEffect, useState } from "react";

export default function ViewTodos() {
  const { todos, toggleTodo, updateTodo } = useTodoStore((state) => ({
    todos: state.todos,
    toggleTodo: state.toggleTodo,
    updateTodo: state.updateTodo,
  })); // Destructuring the needed methods and state
  const { data, isError, isLoading, refetch } = useTodos(); // Fetching from server

  const [editTitle, setEditTitle] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    if (data) {
      //zustand method to update the state
      useTodoStore.setState({ todos: data });
    }
  }, [data]);

  const handleToggle = (id: number) => {
    toggleTodo(id);
    refetch();
  };

  //when user long presses the todo, it will be editable
  const handleLongPress = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setIsEditing(todo.id);
      setEditTitle(todo.title);
    }
  };
  const handleTitleChange = (text) => {
    setEditTitle(text);
  };

  const handleUpdate = (id: number) => {
    updateTodo(id, editTitle);
    setIsEditing(null);
    setEditTitle("");
  };

  const handleKeyPress = (e, todo) => {
    if (e.nativeEvent.key === "Enter") {
      handleUpdate(todo.id);
    }
  };
  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error fetching todos</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleToggle(Number(item.id))}
            onLongPress={() => handleLongPress(Number(item.id))}
            delayLongPress={250}
            style={({ pressed }) => [
              styles.todoItem,
              pressed && styles.pressedItem,
            ]}
          >
            {isEditing === item.id ? (
              <TextInput
                style={styles.input}
                value={editTitle}
                onChangeText={handleTitleChange}
                onSubmitEditing={() => handleUpdate(Number(item.id))}
                onBlur={() => handleUpdate(Number(item.id))}
                autoFocus={true}
              />
            ) : (
              <Text style={styles.todoText}>
                {item.title} - {item.completed ? "Completed" : "In Progress"}
              </Text>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    fontSize: 18,
    color: "#666",
  },
  error: {
    fontSize: 18,
    color: "red",
  },
  todoItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pressedItem: {
    backgroundColor: "#ddd",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  todoText: {
    fontSize: 16,
  },
});

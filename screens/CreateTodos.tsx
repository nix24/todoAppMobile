import { StyleSheet, Pressable, Text, TextInput, View } from "react-native";
import { useTodoStore } from "../store/todoStore";
import { useState } from "react";
export default function CreateTodos({ navigation }) {
  //creating a new todo
  const { todos, createTodo } = useTodoStore((state) => ({
    todos: state.todos,
    createTodo: state.createTodo,
  }));
  //calls method from zustand store
  //returns to view todos screen
  const [newTodo, setNewTodo] = useState({
    title: "",
    id: 0,
    completed: false,
    userId: 1,
  });
  const handleCreate = () => {
    //set todo id to the length of the todos array + 1
    createTodo(newTodo);
    setNewTodo({
      title: "",
      id: todos.length + 1,
      completed: false,
      userId: 1,
    });
    navigation.navigate("View Todos");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Todos</Text>
      <TextInput
        style={styles.input}
        value={newTodo.title}
        onChangeText={(text) => setNewTodo({ ...newTodo, title: text })}
        placeholder="Enter todo"
        placeholderTextColor="#999"
      />
      <Pressable style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff", // A pleasant blue, or choose your accent color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

import React from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { useTodoStore } from "../store/todoStore";

export default function DeleteTodos({ navigation }) {
  const { todos, deleteTodo } = useTodoStore((state) => ({
    todos: state.todos,
    deleteTodo: state.deleteTodo,
  }));

  // Separate todos into completed and remaining
  const completedTodos = todos.filter((todo) => todo.completed);
  const remainingTodos = todos.filter((todo) => !todo.completed);

  // Delete all completed todos
  const handleDeleteCompleted = () => {
    completedTodos.forEach((todo) => {
      deleteTodo(todo.id);
    });
  };

  // Render Todo Item
  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.title}</Text>
      <Pressable
        onPress={() => deleteTodo(item.id)}
        style={styles.deleteButton}
      >
        <Text>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Completed Todos</Text>
      {completedTodos.length > 0 ? (
        <FlatList
          data={completedTodos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No completed todos</Text>
      )}
      <Pressable onPress={handleDeleteCompleted} style={styles.deleteAllButton}>
        <Text>Delete All Completed</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Remaining Todos</Text>
      {remainingTodos.length > 0 ? (
        <FlatList
          data={remainingTodos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No remaining todos</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9", // Adds a light background color for contrast
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 4,
    backgroundColor: "#ffffff", // white background to stnad out
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: "#fe0034",
    padding: 8,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "300",
  },
  deleteAllButton: {
    backgroundColor: "#fe0034",
    padding: 10,
    borderRadius: 15,
    marginVertical: 20,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    fontWeight: "300",
  },
});

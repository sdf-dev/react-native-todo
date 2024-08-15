import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import logo from './assets/logo.png';
import Icesvg from './assets/ice-svg.svg';
import uuid from 'react-native-uuid';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    // check if the task is empty, no empty tasks
    // give task unique key 
    if (task.length > 0) {
      setTasks([...tasks, { key: uuid.v4(), value: task }]);
      setTask('');
    }
  };

  // remove task from list by uid key
  const removeTask = (taskKey) => {
    setTasks(tasks.filter(task => task.key !== taskKey));
  };
  // return the view/GUI (think html of website)
  return (
    <View style={styles.container}>
      {/* <Image source={logo} /> */}
      <Icesvg width={100} height={100} />
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter an item"
        onChangeText={setTask}
        value={task}
      />
      <Button title="Add Item" onPress={addTask} />

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeTask(item.key)}>
            <View style={styles.taskItem}>
              <Text>{item.value}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// basic css styling for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
});


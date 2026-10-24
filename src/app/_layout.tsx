import { useState } from "react";
import { Alert, Button, FlatList, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function App() {

const [taskText,setTaskText] = useState('');

const [tasks, setTasks] = useState<Task[]>([]);

const addTask = () => {
    if (taskText.trim() === '') {
   
      if (Platform.OS === 'web') {
        window.alert('Please enter a task.'); 
      } else {
        Alert.alert('Please enter a task.');
      }
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      completed: false
    };
    
setTasks([...tasks, newTask]);
    setTaskText('');
  };
const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
const toggleComplete = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

    
return (
<View style={styles.container}>
<Text style={styles.title}> To-Do List </Text>

   <TextInput
style={styles.input}
  placeholder="Enter task"
   value={taskText}
   onChangeText={setTaskText}
   
   />

<Button title="Add Task" onPress={addTask} />

<FlatList
style={styles.list}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
         <TouchableOpacity 
              style={{ flex: 1, justifyContent: 'center' }} 
              onPress={() => toggleComplete(item.id)}
            >
<Text style={[styles.taskText, item.completed ? styles.completedText : null]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
        
              <TouchableOpacity onPress={() => toggleComplete(item.id)}>
                <MaterialCommunityIcons 
                  name={item.completed ? "check-circle" : "check-circle-outline"} 
                  size={24} 
                  color={item.completed ? "green" : "gray"} 
                />
              </TouchableOpacity>
              
            
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <MaterialCommunityIcons 
                  name="trash-can-outline" 
                  size={24} 
                  color="red" 
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

   </View>
  );
}


const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
paddingTop: 60,
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
},
input: {
height: 40,
borderColor: 'gray',
borderWidth: 1,
paddingHorizontal: 10,
width: '80%',
marginBottom: 20,
},
list: {
    width: '80%',
    marginTop: 20,
  },
taskItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,

  },
completedText: {
  textDecorationLine: 'line-through',
  textDecorationStyle: 'solid',
  color: 'gray',
},
 
  iconContainer: {
    flexDirection: 'row',
    gap: 15,
  }
});
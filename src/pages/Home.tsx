import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const createdTaskIndex = tasks.findIndex(task => task.title === newTaskTitle);
    if(createdTaskIndex >= 0){
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
        [
          { text: "OK", onPress: ()=>{} }
        ]
      );
    }

    const newTask : Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const index = tasks.findIndex(task => task.id === id);
    if(index >= 0){
      const taskList = tasks.map(task => ({ ... task }));
      taskList[index].done = !taskList[index].done;
      setTasks(taskList);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        { text: "Não", onPress: ()=>{} },
        { text: "Sim", onPress: ()=>setTasks(tasks.filter(task => task.id !== id))}
      ]
    );
    
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const index = tasks.findIndex(task => task.id === taskId);
    if(index >= 0){
      const taskList = tasks.map(task => ({ ... task }));
      taskList[index].title = taskNewTitle;
      setTasks(taskList);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
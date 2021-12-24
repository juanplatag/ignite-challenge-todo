import React, { useState, useRef, useEffect } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/pen.png';


interface TaskItemProps {
    index: number;
    item: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, taskNewTitle: string) => void;
}


export function TaskItem({index, item, toggleTaskDone, removeTask, editTask} : TaskItemProps){
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setEditing(true);
    }

    function handleCancelEditing() {
        setTitle(item.title);
        setEditing(false);
    }

    function handleSubmitEditing() {
        editTask(item.id, title);
        setEditing(false);
    }

    useEffect(()=>{
        if(editing)
            textInputRef.current?.focus();
        else
            textInputRef.current?.blur();
    }, [editing]);

    return (
        <>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    editable={editing}
                    onSubmitEditing={handleSubmitEditing}
                    style={item.done ? styles.taskTextDone : styles.taskText}
                    ref={textInputRef}
                />



              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
                {
                    editing ? 
                    
                    <TouchableOpacity
                    testID={`pen-${index}`}
                    style={{ paddingHorizontal: 24 }}
                    onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#B2B2B2" />
                    </TouchableOpacity> 

                    : 

                    <TouchableOpacity
                    testID={`pen-${index}`}
                    style={{ paddingHorizontal: 24 }}
                    onPress={handleStartEditing}
                    >
                        <Image source={penIcon} style={{tintColor: '#606060'}} />
                    </TouchableOpacity>
                }                

                <View style={{width: 1, height: 24, backgroundColor: 'rgba(196, 196, 196, 0.24)'}} />

                <TouchableOpacity
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 24, opacity: editing ? 0.2 : 1 }}
                onPress={() => removeTask(item.id)}
                disabled={editing}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>

            
        </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })
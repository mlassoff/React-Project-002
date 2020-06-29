import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

let reminder = "";
let lastId=0;
let reminderList = [];


function Item({ title }) {
  return (
    <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default function App() {
  retrieveList();
  return (
    <View style={styles.container}>
      <View style={styles.list}>
      <FlatList
          data = {reminderList}
          renderItem={({ item }) => <View style={styles.listview}>
                                    <Text style={styles.datestyle}>{item.date}</Text>
                                    <Text style={styles.entrystyle}>{item.text}</Text>
                                    </View>}
          keyExtractor={item => item.id }
      />
      </View>
      <TextInput 
        style={styles.ti}
        placeholder="Type your reminder"
        onChangeText={(text) => reminder = text}
      />
      <TouchableOpacity style={styles.button}
                        onPress={storeItem}>
        <Text style ={styles.buttonText}>Add to Reminders</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}


let retrieveList = async() => {
      try{
        let list = await AsyncStorage.getItem('reminders');
        if(list != null){
          reminderList = JSON.parse(list);
          lastId = reminderList.length;
        } else {
          reminderList = [];  
        }
        console.log(reminderList);
      }catch(e){
        console.log(e.message);
      }
    }


let storeItem = async() => {
    let reminderstore = new Object();
    reminderstore.text = reminder;
    reminderstore.date = new Date();
    lastId += 1;
    reminderstore.id = lastId; 
    reminderList.push(reminderstore);
    
    try{
      console.log("Saving");
      await AsyncStorage.setItem('reminders', JSON.stringify(reminderList));
    } catch (e){
      console.log(e.message);
    }
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    marginTop: 50
  },
  ti: {
    backgroundColor: '#eee',
    padding: 20,
    fontSize: 20,
    width: '95%',
    borderWidth: 2,
    borderColor: '#fda738',
    borderStyle: 'dashed'
  },
  button: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#2175bc',
    width: '95%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  listview:{
    width: '100%',
    backgroundColor: '#eee',
    marginBottom: 5,
    padding: 10,
    flex: 1
  },
  datestyle:{
    color: '#fda738'
  },
  entrystyle:{
    color: '#2175bc',
    fontSize: 18,
    width: '100%'
  },
  list:{
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
  }
});

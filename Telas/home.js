import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity,Keyboard, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import {firebase} from "../config";
import {FontAwesome} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native"
import { QuerySnapshot } from 'firebase/firestore';

const Home = () => {
  const [tarefas,setTarefas] = useState([]);
  const tarefaRef = firebase.firestore().collection("tarefas");
  const [addData, setAddData] = useState('');
  const navigation = useNavigation();

  //le os dados da firestore
  useEffect(() => {
    tarefaRef
    .orderBy("createdAt", "desc")
    .onSnapshot(QuerySnapshot => {
        const tarefas  = [];
        QuerySnapshot.forEach((doc) => {
          const {heading} = doc.data()
          tarefas.push({
            id: doc.id,
            heading,
          })
        })
        setTarefas(tarefas)
      })
    }, [])

    //deleta uma tarefa do firestore

    const deletarTarefa = (tarefas) => {
      tarefaRef
      .doc(tarefas.id)
      .delete()
      .then(() => {
        alert("deletado com sucesso")
      })
      .catch((error) => {
        alert(error);
      }) 
  }

  // adiciona uma tarefa
  const addTarefa = () => {
    //ve se tem uma tarefa
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp
      };
      tarefaRef
        .add(data)
        .then(() => {
          setAddData('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error)
        })
    }
  }

  return(
    <View style={{flex:1}}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Adicionar tarefa'
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize='none'
        />
        <TouchableOpacity style={styles.button} onPress={addTarefa}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tarefas}
        numColumns={1}
        renderItem={({item}) =>(
          <View>
            <Pressable
              style={styles.container}
              onPress={() => navigation.navigate('Detail', {item})}
              
            >
              <FontAwesome 
                name="trash-o"
                color="red"
                onPress={() => deletarTarefa(item)}
                style={styles.todoIcon}
              />
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}

                </Text>
              </View>

            </Pressable>
          </View>
        )}
      />

    </View>
  )

}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection:"row",
    alignItems:"center",

  },
  innerContainer: {
    alignItems:"center",
    flexDirection:"column",
    marginLeft:45,

  },
  itemHeading: {
    fontWeight:"bold",
    fontSize:18,
    marginRight:22,

  },
  formContainer: {
    flexDirection:"row",
    height:80,
    marginLeft:10,
    marginRight:10,
    marginTop:100,

  },
  input: {
    height:48,
    borderRadius:5,
    overflow:"hidden",
    backgroundColor:"white",
    paddingLeft:16,
    flex:1,
    marginRight:5,

  },
  button: {
    height:47,
    borderRadius:5,
    backgroundColor:"#788eec",
    width:80,
    alignItems:"center",
    justifyContent:"center",

  },
  buttonText: {
    color:"white",
    fontSize:20,

  },
  todoIcon: {
    marginTop: 5,
    fontSize:20,
    marginLeft:14,
    
  }
})
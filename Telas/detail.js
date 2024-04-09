import { View, Text, TextInput, StyleSheet, Pressable, } from 'react-native'
import React, {useState} from 'react'
import {firebase} from "../config";
import {useNavigation} from "@react-navigation/native"

const Detail = ({route}) => {
  const tarefaRef = firebase.firestore().collection("tarefas");
  const [textHeading, onChangeHeading] = useState(route.params.item.name);
  const navigation = useNavigation();
  
  const updateTarefa = () => {
    if(textHeading && textHeading.length > 0) {
      tarefaRef
      .doc(route.params.item.id)
      .update({
        heading: textHeading,

      }).then(() => {
        navigation.navigate('Home', {screen:"Home"})
      }).catch((error) => {
        alert(error.message)
      })
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        onChangeText={onChangeHeading}
        value={textHeading}
        placeholder='atualizar tarefa'
      />
      <Pressable 
      style={styles.buttonUpdate}
      onPress={() => {updateTarefa()}}
      >
          <Text>atualizar</Text>
      </Pressable>

    </View>
  )


}

export default Detail

const styles = StyleSheet.create({
  container: {
    marginTop:80,
    marginLeft:15,
    marginRight:15,
  },
  textField: {
    marginBottom:10,
    padding:10,
    fontSize:15,
    color:"#000000",
    backgroundColor:"#e0e0e0",
    borderRadius:5
  },
  buttonUpdate: {
    marginTop:25,
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:12,
    paddingHorizontal:32,
    borderRadius:4,
    elevation:10,
    backgroundColor:"#0de065"
  }
})
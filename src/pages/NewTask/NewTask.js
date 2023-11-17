import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'

import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, addDoc } from 'firebase/firestore/lite';
import { database } from '../../config/firebase-config'
import styles from "./style"
import { Switch } from 'react-native-gesture-handler';

export default function NewTask({ navigation, route }) {
  const [description, setDescription] = useState('')
  
  const [status, setStatus] = useState(false)
  const [num1, setNum1] = useState('') // Novo estado para o primeiro número
  const [num2, setNum2] = useState('') // Novo estado para o segundo número
  const [resultado, setResultado] = useState('') // Novo estado para o resultado

  async function addTask() {
    try {
      await addDoc(collection(database, route.params.idUser), {
        description,
        status,
        num1,
        num2,
        resultado
      })
      navigation.navigate('Task', { idUser: route.params.idUser })
    }
    catch (e) {
      console.log(e)
    }
  }

  // Função para somar os números e exibir o resultado
  function somarNumeros() {
    const numero1 = parseFloat(num1);
    const numero2 = parseFloat(num2);

    if (!isNaN(numero1) && !isNaN(numero2)) {
      const resultadoSoma = numero1 + numero2;
      setResultado(
        <div style={{ backgroundColor: 'blue', padding: '10px', textAlign: 'center' }}>
          Valor cobrado: {resultadoSoma}
        </div>
      );
    } else {
      setResultado(
        <div style={{ backgroundColor: 'blue', padding: '10px', textAlign: 'center' }}>
          Por favor, insira números válidos.
        </div>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Nome de identificação
      </Text>
      <TextInput
        style={styles.inputText}
        placeholder='Ex: Nome da Obra'
        onChangeText={setDescription}
        value={description}
      />

      <Text style={styles.label}>
        Valor por metro
      </Text>
      <TextInput
        style={styles.inputText}
        placeholder='Ex: Digite o primeiro número'
        onChangeText={setNum1}
        value={num1}
        keyboardType="numeric"
      />

      <Text style={styles.label}>
        Metragem
      </Text>
      <TextInput
        style={styles.inputText}
        placeholder='Ex: Digite o segundo número'
        onChangeText={setNum2}
        value={num2}
        keyboardType="numeric"
      />

      <Text style={styles.label}>
        Status
      </Text>
      <Switch
        style={styles.statusTask}
        onValueChange={setStatus}
        value={status}
      />

      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => addTask()}
      >
        <Text style={styles.iconButtonSave}>Save</Text>
      </TouchableOpacity>

      {/* Adiciona um botão para calcular a soma */}
      <Button style={styles.Calculo} title="Calcular Soma" onPress={somarNumeros} />

      {/* Exibe o resultado da soma */}
      <Text>{resultado}</Text>
    </View>
  )
}
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';

import {
  getFirestore,
  collection,
  updateDoc,
  query,
  where,
  deleteDoc,
  doc,
  addDoc, // Alterado de addDoc para updateDoc
} from 'firebase/firestore/lite';
import { database } from '../../config/firebase-config';
import styles from './style';
import { Switch } from 'react-native-gesture-handler';

export default function Details({ navigation, route }) {
  const { params } = route;
  const { description, status, id, num1, num2, resultado } = params;
  const [descriptionEdit, setDescriptionEdit] = useState(description || '');
  const [statusEdit, setStatusEdit] = useState(status || '');
  const [num1Edit, setNum1Edit] = useState(num1 || '');
  const [num2Edit, setNum2Edit] = useState(num2 || '');
  const [resultadoEdit, setResultadoEdit] = useState(resultado || '');
  const idTask = id;

  async function editTask() {
  try {
    const taskRef = doc(collection(database, route.params.idUser), idTask);

    await updateDoc(taskRef, {
      description: descriptionEdit,
      status: statusEdit,
      num1: num1Edit, // Usar num1Edit em vez de num1
      num2: num2Edit, // Usar num2Edit em vez de num2
      resultado: resultadoEdit,
    });

    navigation.navigate('Task', { idUser: route.params.idUser });
  } catch (e) {
    console.log(e);
  }
}

  // Função para somar os números e exibir o resultado
  function somarNumeros() {
    console.log(num1Edit)
    const numero1 = parseFloat(num1Edit); // Usar num1Edit em vez de num1
    const numero2 = parseFloat(num2Edit); // Usar num2Edit em vez de num2

    if (!isNaN(numero1) && !isNaN(numero2)) {
      const resultadoSoma = numero1 + numero2;
      setResultadoEdit(`Valor cobrado: ${resultadoSoma}`);
    } else {
      setResultadoEdit('Por favor, insira números válidos.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome de identificação</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Ex: Nome da Obra"
        onChangeText={setDescriptionEdit}
        value={descriptionEdit}
      />

      <Text style={styles.label}>Valor por metro</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Ex: Digite o primeiro número"
        onChangeText={(text) => setNum1Edit(text)} // Atualiza num1Edit
        value={num1Edit}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Metragem</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Ex: Digite o segundo número"
        onChangeText={(text) => setNum2Edit(text)} // Atualiza num2Edit
        value={num2Edit}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Status</Text>
      <Switch
        style={styles.statusTask}
        onValueChange={setStatusEdit}
        value={statusEdit}
      />

<TouchableOpacity
  style={styles.buttonNewTask}
  onPress={() => editTask()}
>
  <Text style={styles.iconButtonSave}>Update</Text>
</TouchableOpacity>


      {/* Adiciona um botão para calcular a soma */}
      <Button title="Calcular Soma" onPress={somarNumeros} />

      {/* Exibe o resultado da soma */}
      <Text>{resultadoEdit}</Text>
    </View>
  );
}

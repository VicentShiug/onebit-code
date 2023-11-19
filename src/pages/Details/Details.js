import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, TextInput, TouchableOpacity, Button, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';

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

export default function Details ({ navigation, route }) {
  const { params } = route;
  const { description, status, id, num1, num2, resultado, address } = params;
  const [descriptionEdit, setDescriptionEdit] = useState(description || '');
  const [addressEdit, setAddressEdit] = useState(address || '');
  const [statusEdit, setStatusEdit] = useState(status || '');
  const [num1Edit, setNum1Edit] = useState(num1 || '');
  const [num2Edit, setNum2Edit] = useState(num2 || '');
  const [resultadoEdit, setResultadoEdit] = useState(resultado || '');
  const [erro, setErro] = useState('');
  const idTask = id;

  async function editTask () {
    try {
      const taskRef = doc(collection(database, route.params.idUser), idTask);

      await updateDoc(taskRef, {
        description: descriptionEdit,
        address: addressEdit,
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
  function somarNumeros () {
    console.log(num1Edit)
    const numero1 = parseFloat(num1Edit); // Usar num1Edit em vez de num1
    const numero2 = parseFloat(num2Edit); // Usar num2Edit em vez de num2

    if (!isNaN(numero1) && !isNaN(numero2)) {
      const resultadoSoma = numero1 * numero2;
      setResultadoEdit(resultadoSoma);
    } else {
      setResultadoEdit('');
      setErro('Por favor, insira números válidos.');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}
    >
      <View
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.label}>Nome de identificação</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Ex: Nome da Obra"
          onChangeText={setDescriptionEdit}
          value={descriptionEdit}
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Ex: Endereço da Obra"
          onChangeText={setAddressEdit}
          value={addressEdit}
        />

        <View style={styles.flexItem}>
          <Text style={styles.label}>Valor por metro</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Ex: Digite o primeiro número"
            onChangeText={(text) => setNum1Edit(text)} // Atualiza num1Edit
            onBlur={somarNumeros}
            value={num1Edit}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.flexItem}>
          <Text style={styles.label}>Metragem</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Ex: Digite o segundo número"
            onChangeText={(text) => {
              setNum2Edit(text)
            }} // Atualiza num2Edit
            onBlur={somarNumeros}
            value={num2Edit}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.flexItem}>
          <Text style={styles.label2}>Concluída:</Text>
          <Switch
            style={styles.statusTask}
            onValueChange={setStatusEdit}
            value={statusEdit}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonNewTask}
          onPress={() => editTask()}
        >
          <Text style={styles.iconButtonSave}>Update</Text>
        </TouchableOpacity>


        {/* Adiciona um botão para calcular a soma */}

        {/* Exibe o resultado da soma */}

        {
          resultadoEdit || erro
            ? <View style={styles.flexItem2}>
              <Text style={styles.label2}>Valor cobrado:</Text>
              <Text style={styles.label2}>{'R$ ' + resultadoEdit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") || erro || 'Dados não informados'}</Text>
            </View>
            : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

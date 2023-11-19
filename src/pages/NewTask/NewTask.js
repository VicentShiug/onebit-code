import React, { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard, View, Text, TextInput, TouchableOpacity, Button, Platform, KeyboardAvoidingView } from 'react-native'

import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, addDoc } from 'firebase/firestore/lite';
import { database } from '../../config/firebase-config'
import styles from "./style"
import { Switch } from 'react-native-gesture-handler';

export default function NewTask ({ navigation, route }) {
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')

  const [status, setStatus] = useState(false)
  const [num1, setNum1] = useState('') // Novo estado para o primeiro número
  const [num2, setNum2] = useState('') // Novo estado para o segundo número
  const [resultado, setResultado] = useState('') // Novo estado para o resultado
  const [erro, setErro] = useState('') // Novo estado para o resultado

  async function addTask () {
    try {
      await addDoc(collection(database, route.params.idUser), {
        description,
        address,
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
  function somarNumeros () {
    const numero1 = parseFloat(num1);
    const numero2 = parseFloat(num2);

    if (!isNaN(numero1) && !isNaN(numero2)) {
      const resultadoSoma = numero1 * numero2;
      setResultado(resultadoSoma);
    } else {
      setResultado('');
      setErro('Por favor, insira números válidos.');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >

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
          Endereço
        </Text>
        <TextInput
          style={styles.inputText}
          placeholder='Ex: Endereço da Obra'
          onChangeText={setAddress}
          value={address}
        />

        <View style={styles.flexItem}>
          <Text style={styles.label}>
            Valor por metro
          </Text>
          <TextInput
            style={styles.inputText}
            placeholder='Ex: Digite o primeiro número'
            onBlur={somarNumeros}
            onChangeText={setNum1}
            value={num1}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.flexItem}>
          <Text style={styles.label}>
            Metragem
          </Text>
          <TextInput
            style={styles.inputText}
            placeholder='Ex: Digite o segundo número'
            onBlur={somarNumeros}
            onChangeText={setNum2}
            value={num2}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.flexItem}>
          <Text style={styles.label2}>Concluída:</Text>
          <Switch
            style={styles.statusTask}
            onValueChange={setStatus}
            value={status}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonNewTask}
          onPress={() => addTask()}
        >
          <Text style={styles.iconButtonSave}>Save</Text>
        </TouchableOpacity>

        {/* Adiciona um botão para calcular a soma */}

        {/* Exibe o resultado da soma */}
        {
          resultado || erro
            ? <View style={styles.flexItem2}>
              <Text style={styles.label2}>Valor cobrado:</Text>
              <Text style={styles.label2}>{'R$ ' + resultado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") || erro || 'Dados não informados'}</Text>
            </View>
            : null}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
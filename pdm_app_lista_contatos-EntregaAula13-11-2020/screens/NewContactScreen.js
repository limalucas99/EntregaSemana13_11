import React, { useState } from 'react';

import { 
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';

import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import { documentDirectory, moveAsync } from 'expo-file-system';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import SelectImage from '../components/SelectImage';
import Colors from '../constantes/Colors';
import db from '../database/db';

const NewContactScreen = (props) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [imageURI, setImageURI] = useState();

  const handleChangeName = (name) => {
    setName(name);
  }

  const handleChangeNumber = (number) => {
    setNumber(number);
  }

  const handleCaptureImageURI = (imageURI) => {
    setImageURI(imageURI);
  }

  const handleSaveImageInDevice = async () => {
    try {
      let imagePath;

      if(imageURI) {
        const fileName = imageURI.split('/').pop();
        imagePath = documentDirectory + fileName;

        await moveAsync({
          from: imageURI,
          to: imagePath
        });

      }
      
      return imagePath || null;
    }
    catch(err) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o contato. Tente novamente mais tarde!');
      throw err;
    }
  }

  const handleVerifyLocationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    return status === 'granted';
  }

  const handleCaptureLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({timeout: 8000}); 

      return {latitude: location.coords.latitude, longitude: location.coords.longitude};
    } catch (err) {
      Alert.alert(
        "Impossível obter a localização",
        "Tente novamente mais tarde.",
        [{text: 'OK'}]
      );
    }
  }

  const handleAddContact = async () => {
    if(!name.trim() || !number) {
      Alert.alert('Atenção!', 'Preencha todos os campos');
      return;
    }
    if(!(number.replace(/[^0-9]+/g, '').length >= 10)) {
      Alert.alert('Atenção!', 'Preencha o telefone corretamente');
      return;
    }
  
    if(!(await handleVerifyLocationPermission())) {
      Alert.alert(
        'Sem permissão para uso do mecanismo de localização',
        'É preciso liberar o acesso ao recurso de localização',
        [{text: 'OK'}]
      );

      return;
    }

    const location = await handleCaptureLocation();

    const imagePath = await handleSaveImageInDevice();

    db.collection('contacts').add({
      name,
      number,
      imageURI: imagePath,
      location,
      dateTime: new Date()
    })
    props.navigation.navigate('ContactList');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Novo Contato</Text>
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={handleChangeName}
          style={styles.input}
        />
        <TextInputMask
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
          keyboardType={'phone-pad'}
          placeholder="Número"
          value={number}
          onChangeText={handleChangeNumber}
          style={styles.input}
        />
        <SelectImage onCaptureImage={handleCaptureImageURI} />
        <RectButton onPress={handleAddContact} style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </RectButton>
      </View>
    </ScrollView>
  );
}

export default NewContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 30,
    backgroundColor: Colors.background
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 38,
    color: Colors.titlePrimary,
    textAlign: 'center',
    marginBottom: 24
  },
  input: {    
    backgroundColor: Colors.white,
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 16,
    paddingVertical: 0,
    justifyContent: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
    fontSize: 17,
    fontFamily: 'Poppins_400Regular'
  },
  addButton: {
    backgroundColor: Colors.button,
    height: 54,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: Colors.white,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18
  }
});

NewContactScreen.navigationOptions = options => {
  return {
    headerTitle: 'Adicionar contato'
  }
}
import React from 'react';
import { 
  Text, 
  View, 
  Image,
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import Colors from '../constantes/Colors';
import defaultUserImg from '../assets/images/default-user-image.png';

const ContactItem = (props) => {
  return (
    <TouchableOpacity onLongPress={() => props.onDelete(props.contact.id)} style={styles.container}>
      <Image source={props.contact.imageURI ? {uri: props.contact.imageURI} : defaultUserImg} style={styles.contactImage} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{props.contact.name}</Text>
        <Text style={styles.contactNumber}>{props.contact.number}</Text>
      </View>
    </TouchableOpacity>
  ); 
};

export default ContactItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.white,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  contactInfo: {
    marginLeft: 16,
    justifyContent: 'center',
    marginRight: 50
  },
  contactImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#CCC',
    borderColor: '#555',
    borderWidth: 1,
  },
  contactName: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 18
  },
  contactNumber: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    marginTop: 3
  },
});
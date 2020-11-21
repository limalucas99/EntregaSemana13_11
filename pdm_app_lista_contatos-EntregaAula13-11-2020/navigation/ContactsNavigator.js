import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import ContactListScreen from '../screens/ContactListScreen';
import NewContactScreen from '../screens/NewContactScreen';
import Colors from '../constantes/Colors';

const ContactsNavigator = createStackNavigator({
  ContactList: ContactListScreen,
  NewContact: NewContactScreen
}, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
        height: 100
      },
      headerTitleStyle: {
        fontSize: 24,
        fontFamily: 'Archivo_700Bold'
      },
      headerTintColor: Colors.white
    }
  }
);

export default createAppContainer(ContactsNavigator);
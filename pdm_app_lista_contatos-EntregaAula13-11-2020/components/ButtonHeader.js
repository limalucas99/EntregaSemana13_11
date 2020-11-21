import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constantes/Colors';

const ButtonHeader = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={35}
      color={Colors.button}
    />
  );
}

export default ButtonHeader;
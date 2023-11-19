import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import Menu from './src/components/Menu/Menu';
import MiPerfil from './src/screens/MiPerfil/Miperfil'
import Perfil from './src/screens/Perfil/Perfil'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
          <Stack.Screen name='Register' component={Register} options={ { headerShown: false } }/>
          <Stack.Screen name='Menu' component={Menu} options={ { headerShown: false } }/>
          <Stack.Screen name="MiPerfil" component={MiPerfil} />
          <Stack.Screen name="Perfil" component={Perfil} />
          
        </Stack.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
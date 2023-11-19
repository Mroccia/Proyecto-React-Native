import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import Home from '../../screens/Home/Home';
import PostForm from '../../screens/PostForm/PostForm';
import MiPerfil from '../../screens/MiPerfil/Miperfil';
import Resultados from '../../screens/Resultados/Resultados';

const Tab = createBottomTabNavigator();

function Menu (){
    return(
            <Tab.Navigator screenOptions={{
                tabBarStyle: {
                  backgroundColor: '#2c3e50', 
                },
                tabBarActiveTintColor: 'green', 
                tabBarInactiveTintColor: 'gray', 
                tabBarLabelStyle: {
                    fontSize: 14, 
                }
            }}>
            <Tab.Screen name='BURGERDAY' component={Home} options={{tabBarLabel: 'BURGERDAY', headerTintColor: 'brown'}}/>
            <Tab.Screen name='Postear' component={PostForm} options={{tabBarLabel: 'POST', headerTintColor: 'brown'}}/>
            <Tab.Screen name = "Buscar Usuarios" component={Resultados} options={{tabBarLabel: 'BUSCADOR', headerTintColor: 'brown'}}/>
            <Tab.Screen name='Miperfil' component={MiPerfil} options={{tabBarLabel: 'TU PERFIL SEÑORITO', headerTintColor: 'brown'}}/>
        </Tab.Navigator> 
    )
}


export default Menu;
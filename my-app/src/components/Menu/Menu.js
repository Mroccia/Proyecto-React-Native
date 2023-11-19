import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import Home from '../../screens/Home/Home';
import PostForm from '../../screens/PostForm/PostForm';
import MiPerfil from '../../screens/MiPerfil/MiPerfil';
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
            <Tab.Screen name='Home' component={Home} options={{tabBarLabel: 'BURGERDAY', headerTintColor: 'brown'}}/>
            <Tab.Screen name='Postear' component={PostForm} color="green"/>
            <Tab.Screen name = "Buscar Usuarios" component = {Resultados} color="green"/>
            <Tab.Screen name='MiPerfil' component={MiPerfil} color="green"/>
        </Tab.Navigator> 
    )
}


export default Menu;
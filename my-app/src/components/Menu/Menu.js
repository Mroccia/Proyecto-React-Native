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
            <Tab.Screen name='Postear' component={PostForm} color="green"/>
            <Tab.Screen name = "Buscar Usuarios" component = {Resultados} color="green"/>
            <Tab.Screen name='Miperfil' component={MiPerfil} color="green"/>
        </Tab.Navigator> 
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2c3e50',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      backgroundColor: '#2c3e50',
      color: '#fff',
      padding: 20,
      textAlign: 'center'
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#34495e',
        padding: 10,
      },
      navText: {
        color: '#fff',
        textDecorationLine: 'none',
        padding: 10,
      },
})


export default Menu;
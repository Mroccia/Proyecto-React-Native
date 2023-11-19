import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import Home from '../../screens/Home/Home';
import PostForm from '../../screens/PostForm/PostForm';
import MiPerfil from '../../screens/MiPerfil/Miperfil';


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
            <Tab.Screen name='PUBLICA AQUI TU CARITA LINDO ;3' component={PostForm} options={{tabBarLabel: 'POSTEAR', headerTintColor: 'brown'}}/>
            <Tab.Screen name='BIENVENIDO AL PERFIL' component={MiPerfil} options={{tabBarLabel: 'MI PERFIL', headerTintColor: 'brown'}}/>
        </Tab.Navigator> 
    )
}


export default Menu;
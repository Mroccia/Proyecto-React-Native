import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../../screens/Home/Home';
import PostForm from '../../screens/PostForm/PostForm';
import MiPerfil from '../../screens/MiPerfil/Miperfil';


const Tab = createBottomTabNavigator();

function Menu (){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} color="green"/>
            <Tab.Screen name='Postear' component={PostForm} color="green"/>
            <Tab.Screen name='Miperfil' component={MiPerfil} color="green"/>
        </Tab.Navigator> 
    )
}


export default Menu;
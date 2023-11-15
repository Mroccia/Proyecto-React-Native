import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../../screens/Home/Home';
import PostForm from '../../screens/PostForm/PostForm';

const Tab = createBottomTabNavigator();

function Menu (){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Postear' component={PostForm}/>
            <Tab.Screen name="mi perfil" component ={Miperfil}/>
        </Tab.Navigator> 
    )
}


export default Menu;
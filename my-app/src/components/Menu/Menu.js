import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, {Component} from "react";

import Home from '../../screens/Home/Home';
import PostForm from '../../screens/PostForm/PostForm';
import Miperfil from '../MiPerfil/Miperfil';

const Tab = createBottomTabNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.state={};
    

    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='postear' component={PostForm}/>
            <Tab.Screen name="mi perfil" component ={Miperfil}/>
        </Tab.Navigator>
    )}
}


export default Menu;
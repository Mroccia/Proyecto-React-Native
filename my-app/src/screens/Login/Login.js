import React, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';

class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }

    login(){
        this.state.email == '' || this.state.password == '' ? 
        this.setState({requiredField: 'Debe completar el email y la contraseña para enviar este formulario.'})
        :
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( res => {
            
            this.props.navigation.navigate('Menu')
        })
        .catch(err => {this.setState({error: "Credenciales incorrectas"})})
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Image source={require('../../../assets/elperro.jpg')}
                resizeMode= 'contain'
                style={styles.imageLogo}
                />
                <Text>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <Text style={styles.error}>{this.state.error}</Text>
                <Text style={styles.error}>{this.state.requiredField}</Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
                   <Text>No tengo cuenta. Registrarme.</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    imageLogo: {
        height: 200,
        width: 1400,
        marginTop: 10,
        borderRadius: 100,
        flex: 1,
      }

})


export default Login;

import React, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image, ImageBackground} from 'react-native';

class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }
    componentDidMount(){
        console.log("Chequear si el usuario está loguado en firebase.");

        auth.onAuthStateChanged( user => {
            console.log(user)
            if( user ){
                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Menu')
            }

        } )

    }
    
    login(){
        this.state.email == '' || this.state.password == '' ? 
        this.setState({error: 'Debe completar el email y la contraseña para enviar este formulario.'})
        :
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( res => {
            
            this.props.navigation.navigate('Menu')
        })
        .catch(err => {this.setState({error: "Credenciales incorrectas"})
        console.error(err);
        this.setState({ error: "Credenciales incorrectas" });
    
    })
    }

    render(){
        return(
            <ImageBackground
            source={require('../../../assets/fondo2.jpg')}
            style={styles.background}
            >
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
                <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
                   <Text>No tengo cuenta. Registrarme.</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
      paddingHorizontal: 20,
      marginTop: 40,
      alignItems: 'center',
    },
    input: {
      height: 40,
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: '#7289da',
      borderRadius: 8,
      marginVertical: 15,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#7289da', 
      width: '100%',
      paddingVertical: 15,
      textAlign: 'center',
      borderRadius: 8,
      marginTop: 20,
    },
    textButton: {
      color: '#fff',
      fontSize: 16,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
      },
    imageLogo: {
      height: 100,
      width: 100,
      marginTop: 20,
      borderRadius: 50,
    },
});


export default Login;

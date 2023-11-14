import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image, ImageBackground} from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:''
        }
    }
    componentDidMount(){
        console.log("Chequear si el usuario está loguado en firebase.");
        // Puse la funcionalidad aquí para probarla. No necesariamente debe ir en este componente.

        auth.onAuthStateChanged( user => {
            console.log(user)
            if( user ){
                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Menu')
            }

        } )

    }

    register (email, pass, userName){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( response => {
                //Cuando firebase responde sin error
                console.log('Registrado ok', response);

                 //Cambiar los estados a vacío como están al inicio.

                 //Crear la colección Users
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    userName: userName,
                    createdAt: Date.now(), 
                })
                .then( res => console.log(res))


            })
            .catch( error => {
                //Cuando Firebase responde con un error
                console.log(error);

            })
    }



    render(){
        return(
            <ImageBackground
            source={require('../../../assets/National-Cheeseburger-Day.png')}
                style={styles.background}
                >
            <View style={styles.formContainer}>

                <Image source={require('../../../assets/elgato.jpg')}
                resizeMode= 'contain'
                style={styles.imageLogo}
                />

                <Text>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='user name'
                    keyboardType='default'
                    value={this.state.userName}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                   <Text>Ya tengo cuenta. Ir al login</Text>
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
      borderColor: '#7289da', // Color de Riot Games
      borderRadius: 8,
      marginVertical: 15,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#7289da', // Color de Riot Games
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


export default Register;
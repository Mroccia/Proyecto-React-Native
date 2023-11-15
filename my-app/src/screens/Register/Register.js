import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image, ImageBackground} from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
            bio: '', 
            profileImage: '',
         
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

    register(email, pass, userName) {

        this.state.email == '' || this.state.password == '' || this.state.userName == '' ? 
        this.setState({error: 'Debe completar el email, el username y la contraseña para enviar este formulario.'})
        :

        auth.createUserWithEmailAndPassword(email, pass)
          .then(response => {
            const user = response.user;
            console.log('Registrado ok', user);
      
            // Crear la colección Users
            db.collection('users').add({
              owner: auth.currentUser.email,
              userName: userName,
              bio: bio, 
              profileImage: profileImage,
              createdAt: Date.now(),
            })
              .then(res => {
                console.log(res);

                // Redireccionar al usuario a la pantalla de inicio de sesión después de un registro exitoso
                this.props.navigation.navigate('Login');
              })
          })
          .catch(error => {
            console.log(error);
            if (error.code === 'auth/email-already-in-use') {
                this.setState({ error: 'La dirección de correo electrónico ya está en uso.' });
            } else {
                this.setState({ error: `Error al registrar. Por favor, inténtalo de nuevo. Código de error: ${error.code}` });

            }
        });
          
      }
      
      
      
      



    render(){
        return(
            <ImageBackground
            source={require('../../../assets/fondo2.jpg')}
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
                 <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({bio: text})}
                    placeholder='Mini biografía (opcional)'
                    keyboardType='default'
                    value={this.state.bio}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({profileImage: text})}
                    placeholder='URL de la foto de perfil (opcional)'
                    keyboardType='default'
                    value={this.state.profileImage}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                <Text style={{ color: 'red' }}>{this.state.error}</Text>

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


export default Register;
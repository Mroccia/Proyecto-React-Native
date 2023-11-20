import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image, ImageBackground, ActivityIndicator} from 'react-native';

class Register extends Component {
  constructor(){
    super()
    this.state={
      email:'',
      userName:'',
      password:'',
      bio: '', 
      profileImage: '',
      cargando: true,
      error: ''
    }
  }
  
  componentDidMount(){
    console.log("Chequear si el usuario está loguado en firebase.");
    auth.onAuthStateChanged( user => {
      console.log(user)
      if( user ){
        //Redirigir al usuario a la home del sitio.
        this.props.navigation.navigate('Menu')
      } else {
        this.setState({cargando: false})
      }
    } )
  }

  register(email, pass, userName, bio, profileImage) {
    this.setState({
      error: ''
    })
    if(this.state.email == '' || this.state.email.includes("@") == false){
      return this.setState({error: "Es obligatorio ingresar un mail"})
    }else if (this.state.userName == '') {
      return this.setState({error:'Es obligatorio el nombre de usuario'})
    }else if (this.state.password == '' || this.state.password.length <6){
      return this.setState({error: "Es obligatoria la contraseña"})
    }
    auth.createUserWithEmailAndPassword(email, pass)
      .then(response => {
        const user = response.user;
        console.log('Registrado ok', user);
          
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
          } else if (error.code === 'auth/invalid-email') {
            return this.setState({ errorMessage: 'El correo electrónico no es válido' })
          } else {
            this.setState({ error: `Error al registrar. Por favor, inténtalo de nuevo. Código de error: ${error.code}` })
          }
        });
  }
  
  
  render(){
    const { email, password, userName } = this.state;
    const ButtonDisabled = !email || !password || !userName;
    if(this.state.cargando){
      return(
          <View>
          <ActivityIndicator size='large' color='orange'/>
          <Text>Cargando...</Text>
          </View>

      )}else{
        return (
          <View style={[styles.formContainer, { backgroundColor: 'orange' }]}>
            <Image
              source={require('../../../assets/elgato.jpg')}
              resizeMode='contain'
              style={styles.imageLogo}
            />
    
            <Text style={{ color: '#fff' }}>Register</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ email: text })}
              placeholder='email'
              keyboardType='email-address'
              value={this.state.email}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ userName: text })}
              placeholder='user name'
              keyboardType='default'
              value={this.state.userName}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder='password'
              keyboardType='default'
              secureTextEntry={true}
              value={this.state.password}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ bio: text })}
              placeholder='Mini biografía (opcional)'
              keyboardType='default'
              value={this.state.bio}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ profileImage: text })}
              placeholder='URL de la foto de perfil (opcional)'
              keyboardType='default'
              value={this.state.profileImage}
            />
            <TouchableOpacity
              style={[styles.button, { opacity: ButtonDisabled ? 0.5 : 1 }]}
              onPress={() => this.register(email, password, userName)}
              disabled={ButtonDisabled}
            >
              <Text style={styles.textButton}>Registrarse</Text>
            </TouchableOpacity>
            <Text style={{ color: 'red' }}>{this.state.error}</Text>
    
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              <Text>Ya tengo cuenta. Ir al login</Text>
            </TouchableOpacity>
          </View>
        );
  }
}
}
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#rgb(40, 40, 40)',
  },
  input: {
    height: 40,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#rgb(40, 40, 40)',
    borderRadius: 8,
    marginVertical: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#rgb(40, 40, 40)',
    width: '100%',
    paddingVertical: 15,
    textAlign: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  imageLogo: {
    height: 100,
    width: 100,
    marginTop: 20,
    borderRadius: 50,
  },
});

export default Register;

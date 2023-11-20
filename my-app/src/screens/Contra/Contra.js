import React, { Component } from 'react';
import { getAuth, updatePassword } from "firebase/auth";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const auth = getAuth();

class Contra extends Component {
    constructor() {
        super();
        this.state = {
            contraActual: '',
            nuevaContra: '',
            cargando: false,
            error: null,
        };
    }

    componentDidMount(){
        console.log("Chequear si el usuario está loguado en firebase.");
        auth.onAuthStateChanged( user => {
          console.log(user)
          if( user=== null ){
            //Redirigir al usuario al login
            this.props.navigation.navigate('Login')
          } else {
            this.setState({cargando: false})
          }
        } )
      }

    ejecutarcambio = () => {
        const { contraActual, nuevaContra } = this.state;

        if (!contraActual) {
            this.setState({ error: 'Por favor, ingresa tu contraseña actual.' });
            return;
        }

        
        if (!nuevaContra) {
            this.setState({ error: 'Por favor, ingresa una nueva contraseña.' });
            return;
        }

        
        this.setState({ cargando: true, error: null });

       
        const usuario = auth.currentUser;

        
        updatePassword(usuario, nuevaContra)
            .then(() => {
                
                this.setState({ cargando: false, contraseñaActual: '', nuevaContraseña: '', error: null });
                console.log('Contraseña actualizada exitosamente');
            })
            .catch((error) => {
        
                this.setState({ cargando: false, error: error.message });
            });
    }

    render() {

        return (
            <View style={styles.contenedor}>
                <TextInput
                    style={styles.entrada}
                    placeholder="Contraseña Actual"
                    secureTextEntry={true}
                    value={contraActual}
                    onChangeText={(texto) => this.setState({ contraActual: texto })}
                />
                <TextInput
                    style={styles.entrada}
                    placeholder="Nueva Contraseña"
                    secureTextEntry={true}
                    value={nuevaContra}
                    onChangeText={(texto) => this.setState({ nuevaContra: texto })}
                />
                {cargando && <ActivityIndicator size="small" color="#0000ff" />}
                {error && <Text style={styles.error}>{error}</Text>}
                <TouchableOpacity style={styles.boton} onPress={this.ejecutarcambio}>
                    <Text style={styles.textoBoton}>Cambiar Contraseña</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    entrada: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        width: '100%',
    },
    boton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    textoBoton: {
        color: 'white',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default Contra;

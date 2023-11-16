import { Camera } from 'expo-camera'
import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet} from "react-native"
import {storage} from '../../firebase/config'

class Camara extends Component {

    constructor(props){
        super(props)
        this.state = {
            mostraCamara: true,
            permisos: false,
            urlImg: ''
        }
        this.metodosDeCamara = ''
    }


    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(()=>{
                this.setState({
                permisos: true,
            })
        })
        .catch( e => console.log('El error fue' + e))          
    }

    takePicture(){
        console.log(this.metodosDeCamara);
        this.metodosDeCamara.takePictureAsync()
         .then(photo => {
            this.setState({
                urlImg: photo.uri, 
                mostraCamara:false
            })
        })
    }

    savePhoto(){
        fetch(this.state.urlImg)
        .then(res=>res.blob())
        .then(image =>{
            const ref = storage.ref(`photos/${Date.now()}.jpg`)
            ref.put(image)
            .then(()=>{
                ref.getDownloadURL()
                .then(url => {
                    this.props.onImageUpload(url);
                    //Borra la url temporal del estado.
                    this.setState({
                        urlImg: ''
                    })
                })
            })
        })
        .catch(e=>console.log(e))
    }
    
    borrarFoto() {
        this.setState({
            mostraCamara: true,
            urlImg: ''
        })
    }
    
    render() {
        return (
        <>
            {this.state.permisos ?
                
                this.state.mostraCamara ?
                <View style={styles.view}>
                    <Image
                        style={styles.camera}
                        source={{uri: this.state.urlImg}}
                    />

                    <View>
                        <TouchableOpacity onPress={() => {this.savePhoto()}}>
                            <Text>Usar esta imagen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.borrarFoto()}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>    

                :

                <View style={styles.view}>

                    <Camera
                    style={styles.camera}
                    type={Camera.Constants.Type.front}
                    ref = { (metodos) => this.metodosDeCamara = metodos }
                    />

                    <View style={styles.button}>

                        <TouchableOpacity onPress={() => this.takePicture()}>
                            <Text style={styles.field}>   Take a picture</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                : 

                <Text>
                    You don't have permission
                </Text>

            }
            
        </>
            
    )}
}
const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'black', // Color de fondo para evitar destellos de luz
            justifyContent: 'center',
            alignItems: 'center',
        },
        view: {
            flex: 1
        },
        camera: {
            flex: 1,
            width: '300px', // Ancho de la vista de la cámara
            height: '400px', // Alto de la vista de la cámara
        },
});

export default Camara;
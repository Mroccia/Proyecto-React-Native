import { Camera } from 'expo-camera'
import React, {Component} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TextInput} from "react-native"
import {StyleSheet} from 'react-native';
import {storage} from '../../firebase/config'

class Camara extends Component {

    constructor(props){
        super(props)
        this.state = {
            mostraCamara: true,
            permisos: false,
            urlImg: ''
        }
        this.metodosDeCamara = undefined
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
                    this.props.traerUrlDeFoto(url);
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
            Img: ''
        })
    }
    
    stopCamera() {
        this.setState({
            mostraCamara: false
        })
    }
    
    render() {
        return (
        <>
            {this.state.permisos ?
                
                this.state.mostraCamara === false ?
                <View style={styles.view}>
                    <Image
                    style={styles.camera}
                    source={{uri: this.state.urlImg}}
                    />

                    <View>
                        <TouchableOpacity onPress={() => {this.savePhoto() , this.stopCamera()}}>
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
        camera: {
            flex: 1,
            width: 300, // Ancho de la vista de la cámara
            height: 400, // Alto de la vista de la cámara
        },
});

export default Camara;
import { laCamara } from 'expo-camera'
import { React, Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image, TextInput} from "react-native"
import {StyleSheet} from 'react-native';
import {db} from '../firebase/config';

class Camara extends Component {

    constructor(props){
        super(props)
        this.state = {
            mostraCamara: true,
            permisos: false,
            url: ''
        }
        this.metodosDeCamara = undefined
    }


    componentDidMount() {
        laCamara.requestCameraPermissionsAsync()
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
              url: photo.uri, 
              showCamara:false
            })
        })
      }

      savePhoto(){
        fetch(this.state.url)
         .then(res=>res.blob())
         .then(image =>{
           const ref = db.ref(`photos/${Date.now()}.jpg`)
           ref.put(image)
                .then(()=>{
                   ref.getDownloadURL()
                        .then(url => {
                            this.props.onImageUpload(url);
                            
                        })
                 })
         })
         .catch(e=>console.log(e))
       }

       borrarFoto() {
        this.setState({
            showCamara: true,
            Img: ''
        })
       }

       stopCamera() {
        this.setState({
            showCamara: false
        })
       }
       
      
    
    render() {
        return (
            <View style={styles.algo}>
            
            <laCamara
            style={styles.cameraBody}
            type={laCamara.Constants.Type.back}
            ref={reference => this.camera = reference}
            />
            <TouchableOpacity 
            style={styles.shootButton}
            onPress={()=>this.takePicture()}>
                <Text>Shoot</Text>
                </TouchableOpacity>


            
    
            </View>
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
            width: 300, // Ancho de la vista de la cámara
            height: 400, // Alto de la vista de la cámara
        },
});

export default Camara;
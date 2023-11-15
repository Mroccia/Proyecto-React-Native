import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
//import Camara from '../../components/Camara/Camara';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',    
        //   camera:'',
        }
    }

    crearPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            textoPost: this.state.textoPost,
           // camera:camera,
            likes:[],
            comments:[],
            createdAt: Date.now()
        })
        .then(() => {
            this.props.navigation.navigate("Home") 
            this.setState({
              //  camera: true,
                post: ''
            })
        })
        .catch( e => console.log(e))
    }

    traerUrlDeFoto(url){
        this.setState({
          //  camera:url
        })
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>New Post</Text>
                {/* Corregir estilos para que se vea bien la cámara */}
                {/* <Camara style={styles.camera} traerUrlDeFoto = {url=>this.traerUrlDeFoto(url)} /> */}
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribir...'
                    keyboardType='default'
                    value={this.state.textoPost}
                    />
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email, this.state.textoPost, this.state.camera, Date.now())}>
                    <Text style={styles.textButton}>Postear</Text>    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        flex:6
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
        backgroundColor:'#28a745',
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
    camera:{
        height: 400,
    }

})


export default PostForm;
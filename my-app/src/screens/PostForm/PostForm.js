import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
//import Camara from '../../components/Camara/Camara';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',    
           camera: true,
           foto: ''
        }
    }

    crearPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            textoPost: this.state.textoPost,
            foto: this.state.foto,
            likes:[],
            comentarios:[],
            createdAt: Date.now()
        })
        .then(() => {
            this.props.navigation.navigate("Menu") 
            this.setState({
                camera: true,
                textoPost: ''
            })
        })
        .catch( e => console.log(e))
    }

    traerUrlDeFoto(url){
        this.setState({
            foto: url,
            camera: false
        })
    }

    render() {
        return(

            <View style={styles.formContainer}>
                <Text style={styles.title}>New post</Text>

                {this.state.camera ? 
                    <View style={styles.camera}>
                        <Camara traerUrlDeFoto={(url) => this.traerUrlDeFoto(url)} style={styles.camera}/> 
                    </View>
                    : 
                    <Image style={styles.img} source={{uri: this.state.foto}}/> 
                }

                <TextInput 
                    style={styles.input} 
                    placeholder="Escribir" 
                    onChangeText={ text => this.setState({ textoPost: text }) }
                    value={this.state.textoPost}
                />

                {this.state.foto == ''? 
                    <Text style={styles.error}>You need to upload a picture</Text>
                    :
                    <TouchableOpacity onPress={() =>  {this.crearPost();  this.props.navigation.navigate('Home')}}>
                        <Text style={styles.button}>Postear</Text>
                    </TouchableOpacity>
                }
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
    },
    img: {
        width: 200,
        height: 200,
        margin: 30
    },

})


export default PostForm;
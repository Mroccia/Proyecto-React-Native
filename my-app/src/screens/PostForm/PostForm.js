import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import Camara from '../../components/Camara/Camara';
import {TextInput, TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';

class PostForm extends Component {
    constructor() {
        super();
        this.state = {
            owner: '',
            textoPost: '',
            camera: true,
            createdAt: '',
            foto: ''
        };
    }

    crearPost() {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            textoPost: this.state.textoPost,
            foto: this.state.foto,
            likes: [],
            comentarios: [],
            createdAt: Date.now()
        })
        .then(() => {
            this.props.navigation.navigate("Home");
            this.setState({
                camera: true,
                textoPost: ''
            });
        })
        .catch(e => console.log(e));
    }

    onImageUpload(url){
        this.setState({
            foto: url,
            camera: false
        });
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <Text style={styles.title}>New post</Text>

                {this.state.camera ? (
                    <View style={styles.camera}>
                        <Camara onImageUpload={(url) => this.onImageUpload(url)} style={styles.camera}/> 
                    </View>
                ) : (
                    <Image style={styles.img} source={{ uri: this.state.foto }} />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Escribir...    "
                    onChangeText={text => this.setState({ textoPost: text })}
                    value={this.state.textoPost}
                />
                <TouchableOpacity onPress={()=>this.crearPost(this.state.owner, this.state.textoPost, this.state.foto)}>
                    <Text style={styles.input} >Publicar posteo</Text>
                </TouchableOpacity>
            </View>
        );
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
        flex: 1, 
        width: '100%', 
        height: '100%',
    },
    error: {
        color: 'red',
        marginTop: 2,
        textAlign: 'center',
        fontSize: 15,
    }

})


export default PostForm;
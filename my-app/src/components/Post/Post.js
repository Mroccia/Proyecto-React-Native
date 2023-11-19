import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mg: false,
            cantidadDeLikes: props.infoPost.datos.likes.length,
            comentarios: '',
            comentarioVacio: '',
        };
    }

    componentDidMount() {
        // Indicar si el post ya está likeado o no.
        if (this.props.infoPost.datos.likes.includes(auth.currentUser.email)) {
            this.setState({
                mg: true,
            });
        }
    }

    async likear() {
        try {
            await db.collection('posts').doc(this.props.infoPost.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
            });
            this.setState({
                mg: true,
                cantidadDeLikes: this.state.cantidadDeLikes + 1,
            });
        } catch (error) {
            console.log('Error en likear:', error);
        }
    }

    async disLike() {
        try {
            await db.collection('posts').doc(this.props.infoPost.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
            });
            this.setState({
                mg: false,
                cantidadDeLikes: this.state.cantidadDeLikes - 1,
            });
        } catch (error) {
            console.log('Error en disLike:', error);
        }
    }

    onSubmit() {
        if (this.state.comentarios === '') {
            this.setState({ comentarioVacio: 'Necesitas escribir algo' });
        } else {
            db.collection('posts')
                .doc(this.props.infoPost.id)
                .update({
                    comentarios: firebase.firestore.FieldValue.arrayUnion({
                        owner: auth.currentUser.email,
                        text: this.state.comentarios,
                        author: auth.currentUser.email,
                        createdAt: Date.now(),
                    }),
                })
                .then(() => {
                    this.setState({
                    comentarios: '',
                    comentarioVacio: '' });
                })
                .catch((error) => {
                    console.log('Error en onSubmit:', error);
                });
        }
    }

    irPerfil(user) {
        this.props.navigation.navigate("OtroPerfil", { user: user })
    }

    deleteMessage(){
        this.setState({deleteMessage: 'Estas seguro de borrar el post?', delete: true})
    }

    deletePost(){
        db.collection('posts').doc(this.props.infoPost.id).delete()
    }

    notDelete(){
        this.setState({deleteMessage: '', delete: false})
    }
   
    deleteComment(commentTimestamp) {
        const postId = this.props.infoPost.id;

        db.collection('posts')
            .doc(postId)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayRemove(
                    this.props.infoPost.datos.comentarios.find((c) => c.createdAt === commentTimestamp)
                ),
            })
            .then(() => {
                this.setState({ comentarios: '', comentarioVacio: '' });
                Alert.alert('Comentario eliminado', 'El comentario se eliminó exitosamente.');
            })
            .catch((error) => {
                console.log('Error en deleteComment:', error);
            });
    }

    render() {
        const date = this.props.infoPost.datos.createdAt

        const d = Date(date);

        const fecha = d.toString()
    
        let commentsToShow = showComments ? infoPost.datos.comentarios : infoPost.datos.comentarios.slice(0, 4);
    
        return (
            <View style={styles.postContainer}>
                <TouchableOpacity onPress={() => {if (this.props.infoPost.datos.owner == auth.currentUser.email){
                        this.props.navigation.navigate("MiPerfil")
                    }else{
                        this.props.navigation.navigate('OtroPerfil', {owner: this.props.infoPost.datos.owner})
                    }}
                       }>
                        <Text style = {styles.usuario}>{this.props.infoPost.datos.owner}</Text>
                </TouchableOpacity>
                <Image style={styles.img} source={{ uri: this.props.infoPost.datos.foto }} />
                <Text style={styles.bio}>
                    {this.props.infoPost.datos.post}  
                </Text>                

                <View style={styles.likesContainer}>
                    <View style={styles.like}>
                        {this.state.mg ? (
                            <TouchableOpacity onPress={() => this.disLike()}>
                                <FontAwesome name="heart" color="red" size={30} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => this.likear()}>
                                <FontAwesome name="heart" color="grey" size={30} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.likes}>{this.state.cantidadDeLikes} likes</Text>
                </View>

                <View style={styles.comentarios}>
                    {this.props.infoPost.datos.comentarios.length === 0 ?
                        <Text style={styles.comentarios}>Aún no hay comentarios</Text>
                        :
                        <FlatList
                            data={this.props.infoPost.datos.comentarios.sort((a, b) => a.createdAt - b.createdAt)}
                            keyExtractor={item => {

                                return item.createdAt.toString()
                            }}
                            renderItem={({ item }) => <Text>{item.author}: {item.text}</Text>}
                        />
                    }
                    <TextInput
                        keyboardType='default'
                        placeholder='   Write a comment'
                        onChangeText={text => this.setState({ comentarios: text })}
                        value={this.state.comentarios}
                        style={styles.field}
                    />

                    <Text style={styles.error}>{this.state.comentarioVacio}</Text>

                    <TouchableOpacity onPress={() => this.onSubmit()}>
                        <Text style={styles.button}>Add comment</Text>
                    </TouchableOpacity>

                    {
                        this.props.infoPost.datos.owner == auth.currentUser.email ?
                        <>
                            <TouchableOpacity onPress={() => this.deleteMessage()}>
                                <Text style={styles.deletebutton}>Delete post</Text>
                            </TouchableOpacity>

                             <Text style={styles.deleteMessage}>{this.state.deleteComment}</Text>
                            {this.state.delete  ?
                             <View style={styles.deleteContainer}>
                                <TouchableOpacity onPress={() => this.deletePost()}>
                                    <Text style={styles.confirmationButton}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.notDelete()}>
                                    <Text style={styles.denialButton}>No</Text>
                                </TouchableOpacity>
                             </View>
                            :
                            <></>
                             }
                        </>
                        :
                        <></>
                    }
                    
                    <Text style={styles.postedOn}> 
                    Posted on {fecha}
                    </Text>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    postContainer: {
        borderColor: '#E8E8E4',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        margin: 10,
        textAlign: 'left',
        padding: 10

    },
    img: {
        height: 200,
        width: 250,
        alignSelf: 'center',
        marginTop: '10%'
    },
    field: {
        fontSize: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: '1%',
        borderRadius: '30px',
        padding: '1%',
        color: 'rgb(153, 153, 153)',
        marginTop: '5%',
    },
    button: {
        backgroundColor: 'rgb(0, 128, 0)',
        borderRadius: '30px',
        marginTop: '1%',
        margin: '2%',
        padding: '1%',
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        color: 'rgb(40, 40, 40)'
    },
    error: {
        color: 'red',
        marginTop: '1%',
        textAlign: 'center',
        fontSize: 12,
    },
    nameOne: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 5
    },    
    bio: {
        fontSize: 20,
        margin: 10
    },
    postedOn: {
        color: '#999994',
        fontSize: 15,
        margin: 5
    },
    likesContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10
    },
    like: {
        flex: 1
    },
    likes: {
        flex: 3,
        fontSize: 15,
        alignSelf: 'flex-start'
    },
    comentarios: {
        backgroundColor: '#4CAF50',
        marginLeft: 8,
        padding: 8,
        borderRadius: 4,
    },    
    deleteContainer:{
        display: 'flex',
        flexDirection: 'row',       
        alignItems: 'center',  
        justifyContent: 'space-between'    
    },
    deletebutton: {
        backgroundColor: 'rgb(179, 0, 0)',
        borderRadius: 25,
        marginTop: 1,
        margin: 4,
        padding: 3,
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
    },
    confirmationButton: {
        marginTop: '2%',
        margin: '2%',
        padding: '1%',
        textAlign: 'center',
        fontSize: 14,
        color: 'black',
        borderColor: 'black',
        borderRadius: '30px',
        backgroundColor: '#e6e6e6'
    },
    denialButton: {
        margin: '2%',
        marginTop: '1%',
        padding: '1%',
        textAlign: 'center',
        fontSize: 14,
        color: 'black',
        borderRadius: '30px',
        backgroundColor: '#e6e6e6'
    },
    deleteMessage: {
        marginTop: '7%',
        marginBottom: '-5%',
        fontSize: 15,
        fontWeight: 'bold',
    },
    deleteContainer: {
        borderRadius: 10,
        borderWidth: 1,
        margin: 10,
        textAlign: 'left',
        padding: 10,
        borderColor: 'white',
    },
    deleteCommentButton: {
        flex: 1,
        padding: 8,
        borderColor: 'grey',
        backgroundColor: 'rgb(0, 128, 0)',
        borderWidth: 1,
        borderRadius: 4,
        textAlign: 'center',
        color: 'rgb(40, 40, 40)'
    },
    mail: {
        color: 'white',
        textAlign: 'right',
    },
    comentariosContador: {
        fontSize: 8,
        fontWeight: 'bold',
        color: 'black'
    },
});



export default Post;
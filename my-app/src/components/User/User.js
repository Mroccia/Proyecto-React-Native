import React, { Component } from 'react';
import { TouchableOpacity, View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { auth, db } from '../../firebase/config';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            estado: ""
        }
    }

    logOut() {
        auth.signOut()
        this.props.navigation.navigate('Login');
    }

    borrarPost(id) {
        db.collection('posts').doc(id).delete()
            .then(() => {
                console.log("Post eliminado")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.foto}>
                    {this.props.info.datos.photoURL === "" ?
                    <Image style={styles.profile} source={{ uri: 'https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png' }} />
                    :
                    <Image style={styles.userEmail} source={{ uri: this.props.info.datos.photoURL }} />}
                </View>
                <Text style={styles.usuario}>{this.props.info.datos.userName}</Text>
                <Text style={styles.text}>{this.props.info.datos.owner}</Text>
                {this.props.info.datos.bio === "" ?
                    "" : <Text style={styles.text}>{this.props.info.datos.bio}</Text>}
                <Text style={styles.text}>{this.props.posteos.length} posteos</Text>
                {this.props.posteos.length === 0 ?
                    "" :
                    (<FlatList
                        data={this.props.posteos}
                        keyExtractor={(post) => post.id}
                        renderItem={({ item }) => (
                            <View style={styles.postContainer}>
                                <Image style={styles.camera} source={{ uri: item.datos.foto }} />
                                <Text style={styles.text}>{item.datos.textoPost}</Text>
                                {this.props.info.datos.owner == auth.currentUser.email ?
                                    (<TouchableOpacity style={styles.button} onPress={() => this.borrarPost(item.id)}>
                                        <Text style={styles.textButton}>Borrar posteo</Text>
                                    </TouchableOpacity>) : ""}
                            </View>
                        )} />)}
                {this.props.info.datos.owner == auth.currentUser.email ?
                    (<TouchableOpacity style={styles.logoutButton} onPress={() => this.logOut()}>
                        <Text style={styles.text}>Salir</Text>
                    </TouchableOpacity>
                    ) (
                        <TouchableOpacity style={styles.logoutButton} onPress={() => this.props.navigation.navigate('Contra')}>
                        <Text style={styles.text}>Cambiar contraseña</Text>
                    </TouchableOpacity>
                    
                    
                    ) 
                    
                    
                    
                    : ""}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        backgroundColor: '#2c3e50',
        padding: 16,
        width: 800,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 16,
    },
    usuario: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
    },
    text: {
        fontSize: 16,
        color: 'grey',
    },
    postContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    camera: {
        width: 200,
        height: 200,
        margin: 30,
    },
    button: {
        backgroundColor: '#rgb(60, 60, 60)',
        padding: 12,
        borderRadius: 4,
        marginTop: 16,
        alignItems: 'center',
    },
    textButton: {
        color: '#fff',
    },
    logoutButton: {
        backgroundColor: '#rgb(60, 60, 60)',
        padding: 12,
        borderRadius: 4,
        marginTop: 16,
        alignItems: 'center',
    },
    deleteCommentButton: {
        flex: 1,
        padding: 8,
        borderColor: 'grey',
        backgroundColor: 'rgb(0, 128, 0)',
        borderWidth: 1,
        borderRadius: 4,
        textAlign: 'center',
        color: 'rgb(40, 40, 40)',
    },
});

export default User;

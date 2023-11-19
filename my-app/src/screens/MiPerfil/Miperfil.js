import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Image, FlatList } from "react-native";
import Post from "../../components/Post/Post";

class MiPerfil extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            nuevaPassword: "",
            nombreDeUsuario: "",
            usuarioLogueado: auth.currentUser ? auth.currentUser.email : "", // Asegurarse de que `auth.currentUser` no sea nulo
            posteos: []
        };
    }

    componentDidMount() {
        const { usuarioLogueado } = this.state;

        if (!usuarioLogueado) {
            // Si el usuario no está logueado, redirige a la página de login
            this.props.navigation.navigate('Login');
            return;
        }

        db.collection('users').where("owner", "==", usuarioLogueado).onSnapshot(
            docs => {
                let user = [];
                docs.forEach(doc => {
                    user.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({
                    data: user,
                });
                console.log("User data:", user);
            }
        );

        db.collection("posts").where("owner", "==", usuarioLogueado).onSnapshot(
            docs => {
                let showPosteos = [];
                docs.forEach(doc => {
                    showPosteos.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({ posteos: showPosteos });
            }
        );
    }

    logout() {
        auth.signOut();
        this.props.navigation.navigate('Login');
    }

    render() {
        const { data, posteos, usuarioLogueado } = this.state;

        return (
            <View style={styles.container}>
                {data.length > 0 && (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.user}>
                                <Image style={styles.profileImage} source={{ uri: item.data.urlImage }} />
                                <View style={styles.userData}>
                                    <Text style={styles.userName}>{item.data.userName}</Text>
                                    <Text style={styles.userEmail}>{usuarioLogueado}</Text>
                                    <Text style={styles.userBio}>{item.data.miniBio}</Text>
                                    <Text style={styles.userPostCount}>Cantidad de posteos: {posteos.length}</Text>
                                </View>
                            </View>
                        )}
                    />
                )}

                <Text>Mis posteos</Text>
                <FlatList
                    data={posteos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.data.textPost}</Text>
                            <Post dataPost={item} navigation={this.props.navigation} />
                        </View>
                    )}
                />

                <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
                    <Text>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
        justifyContent: 'center',
        padding: 16,
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 16,
    },
    userData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey'
    },
    userEmail: {
        fontSize: 16,
        color: 'grey',
    },
    userBio: {
        fontSize: 14,
        marginVertical: 8,
    },
    userPostCount: {
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#rgb(60, 60, 60)',
        padding: 12,
        borderRadius: 4,
        marginTop: 16,
        alignItems: 'center',
    },
});

export default MiPerfil;
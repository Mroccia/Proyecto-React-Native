import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import { updatePassword } from "firebase/auth";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image, FlatList} from "react-native";
import Post from "../../components/Post/Post";



class MiPerfil extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            nuevaPassword:"",
            nombreDeUsuario: "",
            usuarioLogueado: auth.currentUser.email,
            posteos: [] 
        }
    }

    componentDidMount() {
        db.collection('users').where("owner", "==", this.state.usuarioLogueado).onSnapshot(
            docs => {
                let user = [];
                docs.forEach(doc => {
                    user.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    data: user,
                })
            }

        )

        db.collection("posts").where("owner", "==", this.state.usuarioLogueado).onSnapshot(
            docs =>{
              let showPosteos = [];
              docs.forEach(doc=> {
                showPosteos.push({
                    id: doc.id,
                    data: doc.data()
                })
              })
              this.setState({posteos: showPosteos})
            }
          )
    }

    logout(){
        auth.signOut();
        this.props.navigation.navigate('Login');
    }

    

    render() {
       console.log(this.state.data)
       console.log(this.state.posteos)
       console.log(this.state.usuarioLogueado)
        
        return (
            <View style = {styles.container}>

                <FlatList
                    data={this.state.data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                           <Text>{item.data.userName}</Text>
                           <Image style={styles.profileImage} source={{ uri: item.data.urlImage }} />
                           <Text>{this.state.usuarioLogueado} </Text>
                           <Text>{item.data.miniBio} </Text>
                           <Text> Cantidad de posteos: </Text>
                        </View>
                    )}
                />
                <Text> Mis posteos</Text>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View >
                           <Text>{item.data.textPost}</Text>
                           <Post dataPost={item} navigation={this.props.navigation}/>
           
                        </View>
                    )}
                />

                <TouchableOpacity style= {styles.nav} onPress={() => this.logout()}>
                    <Text> Cerrar sesión</Text>
                </TouchableOpacity>
                
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2c3e50',
      alignItems: 'center',
      justifyContent: 'center',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#34495e',
        padding: 10,
    },

})

export default MiPerfil;
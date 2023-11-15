import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';

class Home extends Component {
    constructor(){
        super()
        this.state={
            listaPost: []
        }
    }

    componentDidMount(){
        //Traer datos
        db.collection('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            posteos => {
                let postsAMostrar = [];

                posteos.forEach( unPost => {
                    postsAMostrar.push(
                        {
                            id: unPost.id,
                            datos: unPost.data()
                        }
                    )
                })

                this.setState({
                    listaPost: postsAMostrar
                })
            }
        )
    }


    logout(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }


    render(){
        console.log(this.state);
        return(
            <View>
                <Text style={styles.nav}>
                    HOME</Text>
                <TouchableOpacity style={styles.container} onPress={()=>this.logout()}>
                    <Text style={styles.navText}>
                        Logout</Text>
                </TouchableOpacity>

                <Text>Lista de Posts</Text>
                {
                    this.state.listaPost.length === 0 
                    ?
                    <Text>Cargando...</Text>
                    :
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } /> }
                    />
                }
                
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
    header: {
      backgroundColor: '#2c3e50',
      color: '#fff',
      padding: 20,
    },
    nav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#34495e',
      padding: 10,
    },
    navText: {
      color: '#fff',
      textDecorationLine: 'none',
      padding: 10,
    },
    main: {
      padding: 20,
    },
    footer: {
      backgroundColor: '#2c3e50',
      color: '#fff',
      textAlign: 'center',
      padding: 10,
    }
})



export default Home;
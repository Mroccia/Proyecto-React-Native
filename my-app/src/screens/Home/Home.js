import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, Text, FlatList, ScrollView, Image, View} from 'react-native';
import { auth, db} from '../../firebase/config';
import Post from '../../components/Post/Post';

class Home extends Component {
    constructor(){
        super()
        this.state={
            post: '',
            posts: null
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            console.log(user);
            if (user === null) {
                // Redirigir al usuario al login
                this.props.navigation.navigate('Login');
            } else {
                // Traer datos
                db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
                    posteos => {
                        let posts = [];
    
                        posteos.forEach(unPost => {
                            posts.push({
                                id: unPost.id,
                                datos: unPost.data(),
                            });
                        });
    
                        this.setState({
                            posts: posts,
                        });
                    }
                );
            }
        });
    }
    

    render(){
        console.log(this.state);
        return(
            <ScrollView style={styles.containerHome}>
                <View style={styles.container}>
                    <Image style={styles.img} source={require('../../../assets/fondo.jpg')} resizeMode='contain'/>
                    <Text>Your best Burger</Text>
                    <Text>Lista de Posts</Text>
                </View>

                {this.state.posts === null ?
                    <ActivityIndicator size='large' color='orange' style={styles.loader} />

                    :
                    <FlatList 
                        data= {this.state.posts}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } navigation={this.props.navigation} /> }
                    />
                }
            </ScrollView>
        )

    }
}
    
    
        

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#rgb(255, 165, 0)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img:{
        flex: 1,
        height: 40,
        width: 40,              
    },
    loader:{
        marginTop: 100
    },
    containerHome: {
        alignContent: 'center',  
        textAlign: 'center',
        backgroundColor: '#rgb(255, 190, 0)',
        pading : 25,
    },
    header: {
      backgroundColor: '#819cab',
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
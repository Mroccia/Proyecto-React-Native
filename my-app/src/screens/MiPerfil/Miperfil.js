import React, {Component} from 'react';
import { auth, db } from '../../firebase/config';
import { View, Text, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import User from '../../components/User/User';


class MiPerfil extends Component {
    constructor(){
        super();
        this.state = 
        {infoUsuario: [],
        postUsuario: []
    
    }
    }

componentDidMount(){
    auth.onAuthStateChanged( user => {
        if( user ){
            db.collection('users').where('owner', '==',auth.currentUser.email).onSnapshot(
                usuarios => {
                    let users = [];
                    usuarios.forEach(user =>
                        {users.push({
                            id: user.id,
                            datos: user.data()
                        })})
                
                this.setState({
                    infoUsuario: users
                })
            }
            )
        } else{
            this.props.navigation.navigate('Login')
        }

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            posteos => {
                let publicaciones = [];
                posteos.forEach(post =>
                    {publicaciones.push({
                        id: post.id,
                        datos: post.data()
                    })})
                this.setState({
                    postUsuario: publicaciones
                })
            }
        )
        
  
    }
    
    )
  
}
<<<<<<< HEAD
render(){
        return(
            <View style = {styles.container}>
                {this.state.infoUsuario.length === 0?
                (<ActivityIndicator size='large' color='pink'/>):
                (<FlatList
                data = {this.state.infoUsuario}
                keyExtractor={user => user.id}
                renderItem = {({item}) => <User info = {item} posteos = {this.state.postUsuario}/>}/>)}
            </View>
)
    
}

}


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center',
    justifyContent: 'center',
        width: '100%'
    },
  });
=======

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
>>>>>>> 290ea06c4594c9bc023c8c270fbd25ccd3ed18f9

export default MiPerfil;
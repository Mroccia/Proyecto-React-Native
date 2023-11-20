import React, {Component} from 'react';
import { auth, db } from '../../firebase/config';
import { View, Text, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import User from '../../components/User/User';


class MiPerfil extends Component {
    constructor(){
        super();
        this.state = 
        {userInfo: [],
        userPost: []
    
    }
    }

componentDidMount(){
    auth.onAuthStateChanged( user => {
        if( user ){
            db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
                usuarios => {
                    let users = [];
                    usuarios.forEach(user =>
                        {users.push({
                            id: user.id,
                            datos: user.data()
                        })})
                
                this.setState({
                    userInfo: users
                })
                console.log("User data:", user);
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
                    userPost: publicaciones
                })
                
            }
        )
        
  
    }
    
    )
  
}
render(){
        return(
            <View style = {styles.container}>
                {this.state.userInfo.length === 0?
                (<ActivityIndicator size='large' color='orange'/>):
                (<FlatList
                data = {this.state.userInfo}
                keyExtractor={user => user.id}
                renderItem = {({item}) => <User info={item} posteos={this.state.userPost} navigation={this.props.navigation}/>}/>)}
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

export default MiPerfil;
import React, {Component} from 'react';
import { auth, db } from '../../firebase/config';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import User from '../../components/User/User';


class OtroPerfil extends Component {
    constructor(){
        super();
        this.state = {
            userInfo: [],
            userPost: []
        }
}

componentDidMount(){
    auth.onAuthStateChanged( user => {
        if( user ){
            db.collection('users')
            .where('owner', '==',this.props.route.params.owner)
            .onSnapshot(
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
                db.collection('posts')
                .where('owner', '==', this.props.route.params.owner)
                .onSnapshot(
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
        } else{
            this.props.navigation.navigate('Login')
        }

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
                renderItem = {({item}) => <User info = {item} posteos = {this.state.userPost}/>}/>)}
            </View>
)
    
}

}


const styles = StyleSheet.create({
    container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
    },
});

export default OtroPerfil;
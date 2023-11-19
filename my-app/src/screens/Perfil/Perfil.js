import React, {Component} from 'react';
import { auth, db } from '../../firebase/config';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';

class Perfil extends Component {
  constructor(){
    super();
    this.state = {
      infoUsuario: [],
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
render(){
        return(
            <View>
                <Text>Mi perfil</Text>
                {this.state.infoUsuario.length === 0?
                (<ActivityIndicator size='large' color='orange'/>)
                :
                (<View>
                  <Text >Usuario: {this.state.infoUsuario.datos.userName}</Text>
                  <Text>Email: {this.state.infoUsuario.datos.owner}</Text>
                  {this.props.infoUsuario.datos.bio === "" ? 
                  "": <Text>Mini bio: {this.props.infoUsuario.datos.bio}</Text>} 
                  {this.props.infoUsuario.datos.photo === "" ? "" :
                  <Image style={styles.camera}  source = {{uri: this.props.infoUsuario.datos.photo}}/> }
                  <Text>Cantidad de posteos: {this.props.postUsuario.length}</Text>
                  {this.props.infoUsuario.datos.email == auth.currentUser.email ? 
                  (<TouchableOpacity onPress={() => this.logOut()}>
                  <Text>Salir</Text>        
                  </TouchableOpacity>): ""}
                  {this.props.postUsuario.length === 0?
                     <Text>no tiene posteos</Text>:
                      (<FlatList
                      data = {this.props.postUsuario} 
                      keyExtractor={ doc => doc.createdAt}
                      renderItem = {({item}) => (
                          <View>
                              <Text>Posteos</Text>
                              <Image style={styles.camera} source = {{uri:item.datos.url}}/>
                              <Text>Descripción: {item.datos.post}</Text>
                              {this.props.infoUsuario.datos.owner == auth.currentUser.email ? 
                              (<TouchableOpacity onPress={() => this.borrarPost(item.id)}>
                              <Text>Borrar posteo</Text>        
                              </TouchableOpacity>): ""}
                          </View>
                      )}/>)}
              </View>)}
            </View>
)
    
}

}
const styles = StyleSheet.create({
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
        container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
            width: '100%'
    },
})

export default Perfil;
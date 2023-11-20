import React, {Component} from 'react';
import { TouchableOpacity, View, Text, FlatList, Image, StyleSheet} from 'react-native';
import { auth, db} from '../../firebase/config';

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            estado: ""
        }
    }


logOut(){
    auth.signOut()
    this.props.navigation.navigate('Login');
}

borrarPost(id){
    db.collection('posts').doc(id).delete()
    .then(()=>{
        console.log("Post eliminado")
    })
    .catch((error) =>{
        console.log(error)
    })}

render(){
    return(
        <View style = {styles.container}>
            <View style= {styles.photoContainer}>
            {this.props.info.datos.profileImage === "" ? <Image style = {styles.profile}  source={require('../../../assets/perfil-de-usuario.webp')}/> :
            <Image style={styles.profile}  source = {{uri: this.props.info.datos.profileImage}}/> }
            </View>
            <Text style = {styles.usuario}>{this.props.info.datos.userName}</Text>
            <Text style = {styles.text}>{this.props.info.datos.owner}</Text>
            {this.props.info.datos.miniBio === "" ? 
            "": <Text  style = {styles.text}>{this.props.info.datos.miniBio}</Text>} 
            <Text  style = {styles.text}>{this.props.posteos.length} posteos</Text>
            {this.props.info.datos.owner == auth.currentUser.email ? 
            (<TouchableOpacity style = {styles.button} onPress={() => this.logOut()}>
            <Text style = {styles.textButton} >Salir</Text>        
            </TouchableOpacity>): ""}
            {this.props.posteos.length === 0?
               "":
               (<FlatList
                data = {this.props.posteos}
                keyExtractor={(post) => post.id}
                renderItem = {({item}) => (
                    <View style = {styles.postContainer}>
                        <Image style={styles.camera} source = {{uri:item.datos.foto}}/>
                        <Text style = {styles.text}>{item.datos.post}</Text>
                        {this.props.info.datos.owner == auth.currentUser.email ? 
                        (<TouchableOpacity style = {styles.button} onPress={() => this.borrarPost(item.id)}>
                        <Text style = {styles.textButton}>Borrar posteo</Text>        
                        </TouchableOpacity>): ""}
                    </View>
                )}/>)}
        </View>
    ) }
 }

 const styles = StyleSheet.create({
    camera: {
        width: 370,
        height: 300
    },
    photoContainer: {
        width: 200, 
        height: 200, 
        borderRadius: 100, 
        overflow: 'hidden', 

    }, 
    profile: {
        width: '100%',
        height: '100%', 
        resizeMode: 'cover'
    }, 
    container: {
        flex: 1,
        alignItems: 'center',  
        justifyContent: 'center',  
        marginTop: 10
    }, 
    text: {
        fontSize: 20, 
        margin: 3
    },
    usuario: {
        fontSize: 20, 
        margin: 3,
        fontWeight: 'bold'
    },
    button:{
        backgroundColor:'#0099CC',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#0099CC',
        margin: 10,
        width: 250,
        alignItems: 'center',
        height: 35

    },
    textButton:{
        color: '#fff'
    }, 
    postContainer: {
        alignitems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: 10,
        margin: 15,
        backgroundColor: 'lightgrey',
        borderRadius: 6
    }
}
)

 export default User;
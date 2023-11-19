import React, {Component} from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import {db} from '../../firebase/config';


class Resultados extends Component{
    constructor(){
        super();
        this.state = {
            buscado: "", 
            results: []
        }
    }

buscador(){

    db.collection('users').where('owner', '>=', this.state.buscado).where('owner', '<=', this.state.buscado + '\uf8ff').onSnapshot(
    usuariosOwner => {
        db.collection('users').where('userName', '>=', this.state.buscado).where('email', '<=',this.state.buscado + '\uf8ff' ).onSnapshot(
            (usuariosEmail => {
                const users = []    ;
                usuariosOwner.forEach(user => {
                    users.push({
                        id: user.id,
                        datos: user.data()
                    });
                });
                usuariosEmail.forEach(doc => {
                        users.push({
                            id: doc.id,
                            datos: doc.data()
                        });
                    }
                    
                );

                let filtrado = []

                users.forEach((usuario) => {
                    if (
                    filtrado.some(
                    (item) => item.id == usuario.id))  
                        {null} 
                    else {
                      filtrado.push({ id: usuario.id, datos: usuario.datos });
                    }
                  });
                  
                  this.setState({
                    results: filtrado,
                  });
            })

    )})
   
}
    
    render(){
        console.log(this.state.results)
        return(
            <View style = {styles.container}> 
                 <TextInput
                    style={styles.textinput}
                    onChangeText={(text)=>{this.setState({buscado: text}), this.buscador()}}
                    placeholder='Buscar usuario o email'
                    keyboardType='default'
                    value={this.state.buscado}
                    />
                {this.state.results.length === 0?
                (<Text>Ningun usuario concuerda con tu búsqueda</Text>):
                (
                <FlatList
                    data = {this.state.results}
                    keyExtractor={(user, index) => user.id + index}
                    renderItem = {({item}) => (
                        <View style = {styles.results}>
                            <TouchableOpacity onPress={() =>this.props.navigation.navigate('Perfil', {owner: item.datos.owner})}>
                                <Text>{item.datos.owner} - {item.datos.email}</Text>
                            </TouchableOpacity> 
                        </View>
                    )} 
                    />)}
            </View>
        )
    }
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',  
    justifyContent: 'center',  
    marginTop: 10, 
    width: '100%'
}, 
textinput:{
    height:50,
    paddingVertical:15,
    paddingHorizontal: 10,
    borderWidth:1,
    borderColor: '#0099CC',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical:10,
    width: 350
},
results: {
    flex: 1, 
    marginVertical: 10,
    width: 350, 
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center'
}
})

export default Resultados;
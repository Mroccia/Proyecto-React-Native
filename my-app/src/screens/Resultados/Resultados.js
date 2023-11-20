import React, { Component } from "react";
import { auth, db } from "../../firebase/config";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";

class Resultados extends Component {
  constructor() {
    super();
    this.state = {
      backup: [],
      campoBusqueda: "",
      filtrado: [],
      filtrado2: [],
      userId: "",
      infoUsuario: null,
      usuarios: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchUsuarios();
  }

  fetchUsuarios() {
    db.collection("users")
      .get()
      .then((snapshot) => {
        const usuarios = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        this.setState({ backup: usuarios });
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  }

  busqueda() {
    this.setState({ isLoading: true });

    const busquedaLowerCase = this.state.campoBusqueda.toLowerCase();

    const filtradoUsuarios = this.state.backup.filter((elm) => {
      return elm.data.owner.toLowerCase().includes(busquedaLowerCase);
    });

    const filtradoUsuarios2 = this.state.backup.filter((elm) => {
      return elm.data.userName.toLowerCase().includes(busquedaLowerCase);
    });

    this.setState({
      filtrado: filtradoUsuarios,
      filtrado2: filtradoUsuarios2,
      isLoading: false,
    });
  }

  usuarioSeleccionado(userId) {
    this.props.navigation.navigate("OtroPerfil", userId);
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <View style={styles.container}>
          <View style={styles.containerBusqueda}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ campoBusqueda: text })}
              placeholder="Nombre de usuario o mail"
              keyboardType="default"
              value={this.state.campoBusqueda}
            />
            <TouchableOpacity style={styles.button} onPress={() => this.busqueda()}>
              <Text style={styles.textoBoton}>Buscar</Text>
            </TouchableOpacity>
          </View>

          {this.state.isLoading ? (
            <ActivityIndicator />
          ) : this.state.filtrado.length > 0 ? (
            <View style={styles.containerUser}>
              <Text style={styles.txt}>Resultados finales: {this.state.campoBusqueda}</Text>
              <Text style={styles.txt}>Mail de usuario buscado:</Text>
              <FlatList
                data={this.state.filtrado}
                keyExtractor={(unUsuario) => unUsuario.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.buttonUsuario}
                    onPress={() => this.usuarioSeleccionado(item.id)}
                  >
                    <Text style={styles.usuario}>{item.data.owner}</Text>
                  </TouchableOpacity>
                )}
              />

              <Text style={styles.textoo}>Nombre de usuario buscado: </Text>
              <FlatList
                data={this.state.filtrado2}
                keyExtractor={(unUsuario) => unUsuario.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.botonUsuario}
                    onPress={() => this.usuarioSeleccionado(item.id)}>
                    <Text style={styles.usuario}>{item.data.userName}</Text>
                  </TouchableOpacity>)}
              />
            </View>
          ) : (
            <View>
              <Text>No existe el email/usuario que busca</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255, 165, 0)',
    borderRadius: 8,
    margin: 10,
    padding: 10,
    elevation: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  containerBusqueda: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },

  containerUser: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    width: 750,
  },

  input: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
    width: '70%',
    marginRight: 10,
  },

  button: {
    backgroundColor: 'green',
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    width: '30%',
  },

  buttonUsuario: {
    backgroundColor: 'rgb(40, 40, 40)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    width: '80%',
    marginVertical: 5,
  },

  txt: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Resultados;

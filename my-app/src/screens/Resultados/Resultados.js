import React, { Component } from "react";
import { auth, db } from "../../firebase/config";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";

class Buscador extends Component {
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
      isLoading: false, // Nuevo estado para indicar si la búsqueda está en curso
    };
  }

  componentDidMount() {
    // No necesitas usar onSnapshot aquí para obtener la lista inicial de usuarios.
    // Puedes obtener la lista una vez y luego escuchar cambios en otro lugar si es necesario.
    this.fetchUsuarios();
  }

  async fetchUsuarios() {
    try {
      const snapshot = await db.collection("users").get();
      const usuarios = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));
      this.setState({ backup: usuarios });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  }

  async busqueda() {
    try {
      this.setState({ isLoading: true });

      const busquedaLowerCase = this.state.campoBusqueda.toLowerCase();

      const filtradoUsuarios = this.state.backup.filter(elm => {
        return elm.data.owner.toLowerCase().includes(busquedaLowerCase);
      });

      const filtradoUsuarios2 = this.state.backup.filter(elm => {
        return elm.data.userName.toLowerCase().includes(busquedaLowerCase);
      });

      this.setState({
        filtrado: filtradoUsuarios,
        filtrado2: filtradoUsuarios2,
      });
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  usuarioSeleccionado(userId) {
    this.props.navigation.navigate("ProfileUsers", userId);
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
            <ActivityIndicator size="large" color="#0000ff" />
          ) : this.state.filtrado.length > 0 ? (
            <View style={styles.containerUser}>
              <Text style={styles.textoo}>RESULTADOS DE BÚSQUEDA PARA: {this.state.campoBusqueda}</Text>
              <Text style={styles.textoo}>MAILS:</Text>
              <FlatList
                data={this.state.filtrado}
                keyExtractor={(unUsuario) => unUsuario.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.botonUsuario}
                    onPress={() => this.usuarioSeleccionado(item.id)}
                  >
                    <Text style={styles.usuario}>{item.data.owner}</Text>
                  </TouchableOpacity>
                )}
              />

              <Text style={styles.textoo}>NOMBRES DE USUARIO: </Text>
              <FlatList
                data={this.state.filtrado2}
                keyExtractor={(unUsuario) => unUsuario.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.botonUsuario}
                    onPress={() => this.usuarioSeleccionado(item.id)}
                  >
                    <Text style={styles.usuario}>{item.data.userName}</Text>
                  </TouchableOpacity>
                )}
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
    itemUsuario: {
        color: "black",
        padding: 20,
        borderColor: "red",
        borderWidth: 2
    },
    formContainer: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    container: {
        backgroundColor: 'rgb(255, 165, 0)',
        borderRadius: 8,
        height: 1000,
        margin: 10,
        padding: 10,
        elevation: 5,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    containerBusqueda: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        alignItems: "center"
    },
    containerUser: {
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 10,
        padding: 10,
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        width: "80%",
    },
    image: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: '#fff',
        marginRight: 10,
    },
    button: {
        backgroundColor: "green",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        width: "20%",
        height: "20px",
        paddingBottom: "15px",
        paddingTop: " 15px",
        flex: 1,
        justifyContent: " center"
    },
    textoBoton: {
        textAlign: "center",
        color: "#fff",
        width: "100%"
    },
    botonUsuario: {
        backgroundColor: "rgb(40, 40, 40)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grey",
        width: "60%",
        height: "20px",
        paddingBottom: "15px",
        paddingTop: " 15px",
        flex: 1,
        justifyContent: " center",
        alignItems: "center"
    },
    textoo:{
        marginTop: "10px",
        marginBottom: "10px"
    }
})

export default Buscador;
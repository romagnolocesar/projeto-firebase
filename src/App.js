import React, {Component} from 'react';
import firebase from 'firebase';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            lista: []
        };

        //Firebase Configurações
        let firebaseConfig = {
            apiKey: "AIzaSyCSmKMjLF8ziuj3sGXap36tsXHoOQeIPgM",
            authDomain: "reactapp-c2919.firebaseapp.com",
            projectId: "reactapp-c2919",
            storageBucket: "reactapp-c2919.appspot.com",
            messagingSenderId: "939382731975",
            appId: "1:939382731975:web:0b83e4c620cc60b5d4fae2"
        };
        // Inicializando Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.database().ref('usuarios').on('value', (snapshot) =>{
            let state = this.state;
            state.lista = [];

            snapshot.forEach( (childItem) => {
                state.lista.push({
                    key: childItem.key,
                    nome: childItem.val().nome,
                    idade: childItem.val().idade    
                });
            });

            this.setState(state);
        });


    }

    render(){
        return(
            <div>
                { this.state.lista.map( (item) => {
                    return(
                        <div>
                            <h3>ID: { item.key }</h3>
                            <h1>Olá { item.nome }</h1>
                            <h2>Idade: { item.idade } anos</h2>
                            <hr/>
                        </div>
                    );  
                })}
            </div>
        );
    }
}

export default App;
import React, {Component} from 'react';
import firebase from 'firebase';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: 'Carregando...',
            nome: '',
            idade: ''
        };
        let firebaseConfig = {
            apiKey: "AIzaSyCSmKMjLF8ziuj3sGXap36tsXHoOQeIPgM",
            authDomain: "reactapp-c2919.firebaseapp.com",
            projectId: "reactapp-c2919",
            storageBucket: "reactapp-c2919.appspot.com",
            messagingSenderId: "939382731975",
            appId: "1:939382731975:web:0b83e4c620cc60b5d4fae2"
          };
        // Initialize Firebase
        if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        }

    

        /* Não fica olhando em tempo real, chama apenas uma vez (ONCE) */
        firebase.database().ref('token').once('value').then((snapshot) => {
            let state = this.state;
            state.token = snapshot.val();
            this.setState(state);    
        });

        /* Olheiro -> Fica olhando o banco de dados em tempo real (ON) */
        firebase.database().ref('Usuários').child('1').on('value', (snapshot) =>{
            let state = this.state;
            state.nome = snapshot.val().nome;
            state.idade = snapshot.val().idade;
            this.setState(state);
        });
    }
    render(){
        const { token, nome, idade } = this.state; 
        return(
            <div>
                <h1>Token: { token }</h1>
                <h1>Nome: { nome }</h1>
                <h1>Idade: { idade }</h1>
            </div>
        );
    }
}

export default App;
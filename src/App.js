import React, {Component} from 'react';
import firebase from './firebaseConnection';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            nome: '',
            email: '',
            senha: ''
        };

        this.cadastrar = this.cadastrar.bind(this);
        this.logar = this.logar.bind(this);
        this.sair = this.sair.bind(this);

        firebase.auth().signOut();

        //Verifica se o usuário está logado
        firebase.auth().onAuthStateChanged( (user) => {
            if(user){
                firebase.database().ref('usuarios').child(user.uid).set({
                    nome: this.state.nome
                })
                .then( () => {
                    this.setState({
                        nome: '',
                        email: '',
                        senha: ''
                    })  
                });
            }
        });
    }

    cadastrar(e){
        let {email, senha} = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then( (success) => {
            alert('Usuário cadastrado com sucesso');
            // this.setState({email: '', senha: ''});
        })
        .catch( (error) => {
            // if(error.code === 'auth/wrong-password'){
            //     alert('Senha incorreta.');
            // }else if(error.code === 'auth/user-not-found' || error.code === 'auth/user-not-found'){
            //     alert('Usuário não encontrado.')
            // }else{
            //    alert('Codigo de Erro: ' + error.code); 
            // }
            alert('Codigo de Erro: ' + error.code); 
        });
        e.preventDefault();
    }

    
    logar(e){
        let {email, senha} = this.state;

        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then( (success) => {
            alert('Seja Bem vindo');
            // this.setState({email: '', senha: ''});
        })
        .catch( (error) => {
            if(error.code === 'auth/wrong-password'){
                alert('Senha incorreta.');
            }else if(error.code === 'auth/user-not-found' || error.code === 'auth/user-not-found'){
                alert('Usuário não encontrado.')
            }else{
               alert('Codigo de Erro: ' + error.code); 
            }
        })
        e.preventDefault();
    }


    sair(){
        firebase.auth().signOut()
        .then( (user) => {
            alert("Usuário deslogado com sucesso!");
        })
        .catch( (error) => {
            alert('Código do Erro: ' + error.code);
        });

    }

    render(){
        return(
            <div>
                <h1>Novo</h1>
                <form onSubmit={ (e) => this.cadastrar(e) }>
                    <label>Nome:</label><br/>
                    <input type="text" value={this.state.nome} 
                        onChange={ (e) => this.setState({nome: e.target.value}) }/><br/>

                    <label>Email:</label><br/>
                    <input type="text" value={this.state.email} 
                        onChange={ (e) => this.setState({email: e.target.value}) }/><br/>

                    <label>Senha:</label><br/>
                    <input type="text" value={this.state.senha}
                        onChange={ (e) => this.setState({senha: e.target.value})}/><br/>

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default App;
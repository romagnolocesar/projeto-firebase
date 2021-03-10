import React, {Component} from 'react';
import firebase from './firebaseConnection';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            senha: ''
        };

        this.cadastrar = this.cadastrar.bind(this);
    }

    cadastrar(e){
        let {email, senha} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then( (success) => {
            alert('Usuário cadastrado com sucesso');
            this.setState({email: '', senha: ''});
        })
        .catch( (error) => {
            if(error.code === 'auth/invalid-email'){
                alert('Email invalido!');
            }else if(error.code === 'auth/email-already-in-use'){
                alert('Email já está sendo utilizado!');
            }else if(error.code === 'auth/weak-password'){
                alert('Senha muito fraca!');
            }else{
               alert('Codigo de Erro: ' + error.code); 
            }
        })
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <form onSubmit={this.cadastrar}>

                    <label>Email:</label><br/>
                    <input type="text" value={this.state.email} 
                        onChange={ (e) => this.setState({email: e.target.value}) }/><br/>

                    <label>Senha:</label><br/>
                    <input type="text" value={this.state.senha}
                        onChange={ (e) => this.setState({senha: e.target.value})}/><br/>

                    <button type="submit">Cadastrar</button>
                </form>
                {this.state.email}
                {this.state.senha}
            </div>
        );
    }
}

export default App;
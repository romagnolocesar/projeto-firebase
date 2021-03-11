import React, {Component} from 'react';
import firebase from './firebaseConnection';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            nome: '',
            email: '',
            senha: '', 
            user: null
        };

        this.auth = this.auth.bind(this);
        this.cadastrar = this.cadastrar.bind(this);
        this.logar = this.logar.bind(this);
        this.sair = this.sair.bind(this);

        // firebase.auth().signOut();
        
    }


    componentDidMount(){
        this.auth();
    }

    auth(){
        firebase.auth().onAuthStateChanged( (user) => {
            if(user){
                this.setState({user: user});
            }
        });
    }

    cadastrar(){
        let {email, senha} = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then( (success) => {
            alert('Usuário cadastrado com sucesso');
            // this.setState({email: '', senha: ''});
        })
        .catch( (error) => {
            alert('Codigo de Erro: ' + error.code); 
        });
    }
 
    logar(){
        let {email, senha} = this.state;

        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then( (success) => {
            alert('Seja Bem vindo');
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
    }

    sair(){
        firebase.auth().signOut()
        .then( (user) => {
            alert("Usuário deslogado com sucesso!");
            this.setState({user: null});
        })
        .catch( (error) => {
            alert('Código do Erro: ' + error.code);
        });

    }    

    render(){
        return(
            <div>
                { this.state.user ?
                    <div>
                        <p>Painel Administrativo</p>
                        <p>Seja bem-vindo :)</p>
                        <p>Email: {this.state.user.email}</p>
                        <p>UID: {this.state.user.uid}</p>
                        <button onClick={ this.sair }>Sair</button>
                        
                    </div> :

                    <div>
                        <h1>Seja bem vindo</h1>

                        <label>Email:</label><br/>
                        <input type="text" value={this.state.email} 
                            onChange={ (e) => this.setState({email: e.target.value}) }/><br/>

                        <label>Senha:</label><br/>
                        <input type="text" value={this.state.senha}
                            onChange={ (e) => this.setState({senha: e.target.value})}/><br/>

                        <button onClick={this.cadastrar}>Cadastrar</button>
                        <button onClick={this.logar}>Logar</button>
                    </div>
                }
                
            </div>
        );
    }
}

export default App;
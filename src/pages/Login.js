import React from 'react';
import PropType from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/Login.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      loading: false,
    };
  }

  handleClick = async (e) => {
    e.preventDefault();
    const { nome } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: nome });
    history.push('/search');
  }

  render() {
    const { nome, loading } = this.state;
    return (
      <div data-testid="page-login" className="page-container">
        <form
          onSubmit={ this.handleClick }
          className="form-container"
          autoComplete="off"
        >
          <div className="title">
            <h3>TrybeTunes</h3>
          </div>
          <div className="mb-3 inputs">
            <input
              type="text"
              name="name"
              className="form-control"
              value={ nome }
              onChange={ ({ target }) => this.setState({ nome: target.value }) }
              placeholder="Insira seu nome"
              data-testid="login-name-input"
            />
            <button
              type="button"
              name="button"
              className="btn btn-success"
              onClick={ this.handleClick }
              data-testid="login-submit-button"
              disabled={ nome.length <= 2 }
            >
              Entrar
            </button>
          </div>
          { loading && <Loading /> }
        </form>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropType.objectOf(PropType.any).isRequired,
};

export default Home;

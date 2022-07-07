import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    this.setState({ loading: true });
    const data = await getUser();
    const { name, email, description, image } = data;
    this.setState({
      name,
      email,
      description,
      image,
      loading: false,
    });
  }

  checkInputs = () => {
    const newArray = [];
    const { name, email, description, image } = this.state;
    newArray.push(name, email, description, image);
    const check = /\S+@\S+\.\S+/;
    if (newArray.some((item) => item === '')) return true;
    if (!check.test(email)) return true;
    return false;
  }

  handleInputChange = ({ target }) => {
    const { value } = target;
    const { name } = target;
    this.setState({ [name]: value });
  }

  update = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { name, email, description, image } = this.state;
    const updatedData = { name, email, description, image };
    await updateUser(updatedData);
    this.setState({ loading: false });
    localStorage.mudoufoto = 'sim';
    sessionStorage.imagemPerfil = image;
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    const { name, email, description, image, loading } = this.state;
    return (
      <div data-testid="page-profile-edit" className="page-profile-edit-container">
        {loading ? <Loading /> : (
          <form onSubmit={ this.update } autoComplete="off" className="profile-edit-form">
            <h2>Edição de Perfil</h2>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                name="name"
                placeholder="Ex:. José"
                className="form-control"
                data-testid="edit-input-name"
                onChange={ this.handleInputChange }
                value={ name }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Ex:. email@email.com"
                data-testid="edit-input-email"
                onChange={ this.handleInputChange }
                value={ email }
              />
            </label>
            <label htmlFor="description">
              Descrição:
              <input
                type="text"
                name="description"
                className="form-control"
                placeholder="Descrição"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleInputChange }
              />
            </label>
            <label htmlFor="image">
              Imagem:
              <input
                type="text"
                name="image"
                className="form-control"
                placeholder="URL da imagem"
                data-testid="edit-input-image"
                onChange={ this.handleInputChange }
                value={ image }
              />
            </label>
            <button
              type="submit"
              className="btn btn-success profile-edit-btn"
              data-testid="edit-button-save"
              disabled={ this.checkInputs() }
            >
              Salvar Alterações

            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileEdit;

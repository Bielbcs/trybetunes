import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/Profile.css';

class Profile extends React.Component {
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

  onErrorFunc(e) {
    console.log('teste');
    e.target.src = 'https://www.auctus.com.br/wp-content/uploads/2017/09/sem-imagem-avatar.png';
  }

  getUserData = async () => {
    this.setState({ loading: true });
    const result = await getUser();
    const { name, email, description, image } = result;
    this.setState({
      name,
      email,
      description,
      image,
      loading: false,
    });
  }

  render() {
    const { loading, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile" className="page-profile-container">
        {loading ? <Loading /> : (
          <div className="profile-container">
            <div className="image-profile-container">
              <div className="only-image-container">
                <img
                  src={ image || 'https://www.auctus.com.br/wp-content/uploads/2017/09/sem-imagem-avatar.png' }
                  alt="Foto inválida"
                  data-testid="profile-image"
                  className="profile-image"
                  onError={ (e) => this.onErrorFunc(e) }
                />
              </div>
              <Link
                to="/profile/edit"
                className="btn btn-success"
              >
                Editar perfil
              </Link>
            </div>
            <b>Nome:</b>
            <p>{ name }</p>
            <b>E-mail:</b>
            {email ? (
              <p>{ email }</p>
            ) : <p><i>Vazio</i></p>}
            <b>Descrição:</b>
            { description ? (
              <p>{ description }</p>
            ) : <p><i>Vazio</i></p>}
          </div>
        )}
      </div>
    );
  }
}

export default Profile;

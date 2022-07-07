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
              <img src={ image } alt={ name } data-testid="profile-image" />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
            <b>Nome:</b>
            <p>{ name }</p>
            <b>E-mail:</b>
            <p>{ email }</p>
            <b>Descrição:</b>
            <p>{ description }</p>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;

import React from 'react';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.state = {
      username: {},
      loading: true,
      location: '',
    };
  }

  componentDidMount() {
    this.getUserName();
    this.setPathState();
  }

  componentDidUpdate() {
    if (localStorage.clicouHeader === 'sim') {
      this.setPathState();
    }
    if (localStorage.mudoufoto === 'sim') {
      this.getUserName();
    }
  }

  onErrorFunc(e) {
    console.log('teste');
    e.target.src = 'https://www.auctus.com.br/wp-content/uploads/2017/09/sem-imagem-avatar.png';
  }

  setPathState = () => {
    localStorage.clicouHeader = 'não';
    const { location } = this.props;
    const { pathname } = location;
    setTimeout(() => {
      this.setState({ location: pathname });
    }, 100);
  }

  getUserName = async () => {
    localStorage.mudoufoto = 'não';
    console.log('entrou');
    const name = await getUser();
    this.setState({
      username: name,
      loading: false,
    });
  }

  render() {
    const { username, loading, location } = this.state;
    const activeClass = 'link active';
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (
          <div className="header-container">
            <Link to="/profile" className="profile-link">
              <span
                data-testid="header-user-name"
                className="header-user-name"
              >
                {sessionStorage.imagemPerfil ? (<img
                  src={ sessionStorage.imagemPerfil }
                  alt=""
                  onError={ (e) => this.onErrorFunc(e) }
                  className="small-profile-image"
                />) : (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-person-circle circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0
                  0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805
                  10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>
                  </div>
                )}
                { username.name }
              </span>
            </Link>

            <div className="links-container">
              <Link
                to="/search"
                data-testid="link-to-search"
                className={ location === '/search' ? activeClass : 'link' }
                onClick={ localStorage.setItem('clicouHeader', 'sim') }
              >
                Pesquisar
              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className={ location === '/favorites' ? activeClass : 'link' }
                onClick={ localStorage.setItem('clicouHeader', 'sim') }
              >
                Favoritos
              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className={ location === '/profile' ? activeClass : 'link' }
                onClick={ localStorage.setItem('clicouHeader', 'sim') }
              >
                Perfil
              </Link>
            </div>
          </div>) }
      </header>
    );
  }
}

Header.propTypes = {
  location: PropType.objectOf(PropType.any).isRequired,
};

export default Header;

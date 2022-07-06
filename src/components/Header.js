import React from 'react';
import { Link } from 'react-router-dom';
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
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const name = await getUser();
    this.setState({
      username: name,
      loading: false,
    });
  }

  render() {
    const { username, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (
          <div className="header-container">
            <span
              data-testid="header-user-name"
              className="header-user-name"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
              { username.name }
            </span>
            <div className="links-container">
              <Link
                to="/search"
                data-testid="link-to-search"
                className="link"
              >
                Pesquisar
              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="link"
              >
                Favoritos
              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="link"
              >
                Perfil
              </Link>
            </div>
          </div>) }
      </header>
    );
  }
}

export default Header;

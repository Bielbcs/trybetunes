import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();
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
            >
              { username.name.toUpperCase() }
            </span>
            <div className="links-container">
              <Link
                to="/search"
                data-testid="link-to-search"
                className="link"
              >
                Search

              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="link"
              >
                Favorites
              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="link"
              >
                Profile

              </Link>
            </div>
          </div>) }
      </header>
    );
  }
}

export default Header;

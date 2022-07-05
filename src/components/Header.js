import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
          <span
            data-testid="header-user-name"
          >
            { username.name }
          </span>) }
      </header>
    );
  }
}

export default Header;

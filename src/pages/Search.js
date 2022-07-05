import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  render() {
    const { search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            value={ search }
            data-testid="search-artist-input"
            onChange={ (e) => this.setState({ search: e.target.value }) }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ search.length < 2 }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

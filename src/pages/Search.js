import React from 'react';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';
import '../styles/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      loading: false,
      albumList: [],
      searched: false,
      prevState: '',
    };
  }

  handleSearch = async (e) => {
    e.preventDefault();
    const { search } = this.state;
    this.setState((prevState) => ({
      loading: true,
      searched: true,
      prevState: prevState.search,
    }));
    const searchResult = await searchAlbumsAPI(search);
    const newArray = searchResult;
    this.setState({
      search: '',
      loading: false,
      albumList: newArray,
    });
  }

  render() {
    const { search, albumList, loading, searched, prevState } = this.state;
    return (
      <div data-testid="page-search" className="search-general-container">
        {loading ? <Loading /> : (
          <form onSubmit={ this.handleSearch } className="search-form-container">
            <div className="search-container">
              <h4>Pesquise um artista:</h4>
              <div className="inputs">
                <input
                  type="text"
                  value={ search }
                  className="form-control"
                  data-testid="search-artist-input"
                  onChange={ (e) => this.setState({ search: e.target.value }) }
                />
                <button
                  type="button"
                  className="btn btn-success"
                  data-testid="search-artist-button"
                  disabled={ search.length < 2 }
                  onClick={ this.handleSearch }
                >
                  Pesquisar
                </button>
              </div>
            </div>
          </form>
        )}
        {(searched && !loading && albumList.length > 0) && (
          <div className="album-list">
            <p>
              Resultado de álbuns de:
              {' '}
              {prevState}
            </p>
            <div className="albums-list-container">
              {albumList.map((item) => (<AlbumCard
                data={ item }
                key={ item.collectionId }
              />))}
            </div>
          </div>
        )}
        {(searched && !loading && albumList.length === 0)
          && <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}

export default Search;

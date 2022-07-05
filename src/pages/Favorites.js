import React from 'react';
import Header from '../components/Header';
import FavoriteMusic from '../components/FavoriteMusic';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      checked: true,
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  shouldLoading = (param) => {
    this.setState({ loading: param });
  }

  getFavorites = async () => {
    const result = await getFavoriteSongs();
    this.setState({ favorites: result });
  }

  render() {
    const { favorites, checked, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? (<h1>Carregando...</h1>) : (
          <div>
            {favorites.map((favorite) => (<FavoriteMusic
              key={ favorite.trackId }
              data={ favorite }
              getFavorites={ this.getFavorites }
              checked={ checked }
              shouldLoading={ this.shouldLoading }
              loading={ loading }
            />))}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;

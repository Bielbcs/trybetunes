import React from 'react';
import FavoriteMusic from '../components/FavoriteMusic';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';

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
    this.getFavoritesOnLoad();
  }

  getFavoritesOnLoad = async () => {
    this.setState({ loading: true });
    const result = await getFavoriteSongs();
    this.setState({ favorites: result, loading: false });
  }

  getFavorites = async () => {
    const result = await getFavoriteSongs();
    this.setState({ favorites: result });
  }

  render() {
    const { favorites, checked, loading } = this.state;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        {loading ? <Loading /> : (
          <div className="favorite-container">
            {favorites.length === 0
              ? (<h4>Você ainda não tem nenhuma música favorita :( </h4>) : (
                <div className="favorite-list">
                  {favorites.map((favorite) => (<FavoriteMusic
                    key={ favorite.trackId }
                    data={ favorite }
                    favorites={ favorites }
                    checked={ checked }
                    loading={ loading }
                    getFavorites={ this.getFavorites }
                  />))}
                </div>
              )}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;

import React from 'react';
import FavoriteMusic from '../components/FavoriteMusic';
import Loading from '../components/Loading';
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
    this.setState({ loading: true });
    const result = await getFavoriteSongs();
    this.setState({ favorites: result, loading: false });
  }

  render() {
    const { favorites, checked, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        {loading ? <Loading /> : (
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

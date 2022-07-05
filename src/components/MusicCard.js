import React from 'react';
import PropType from 'prop-types';
import '../styles/MusicCard.css';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.showFavorites();
  }

  showFavorites = async () => {
    this.setState({ loading: true });
    await this.getFavorites();
    const { favorites } = this.state;
    const { data } = this.props;
    const { trackId } = data;
    if (favorites.some((item) => item.trackId === trackId)) {
      this.setState({ checked: true });
    }
    this.setState({ loading: false });
  }

  getFavorites = async () => {
    const result = await getFavoriteSongs();
    this.setState({ favorites: result });
  }

  handleCheckboxChange = async (e) => {
    const { data } = this.props;
    if (e.target.checked) {
      this.setState({ loading: true });
      await addSong(data);
      this.setState({ loading: false, checked: true });
    }
    this.showFavorites();
  }

  render() {
    const { data } = this.props;
    const { previewUrl, trackName, trackId } = data;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <div className="music-card-container">
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            {loading ? <Loading /> : (
              <label htmlFor="favorita">
                Favorita
                <input
                  name="favorita"
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  checked={ checked }
                  onChange={ this.handleCheckboxChange }
                />
              </label>
            )}
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  data: PropType.objectOf(PropType.any).isRequired,
};

export default MusicCard;

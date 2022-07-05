import React from 'react';
import PropType from 'prop-types';
import '../styles/MusicCard.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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

  shouldLoading = (param) => {
    this.setState({ loading: param });
  }

  showFavorites = async () => {
    this.shouldLoading(true);
    await this.getFavorites();
    const { favorites } = this.state;
    const { data } = this.props;
    const { trackId } = data;
    if (favorites.some((item) => item.trackId === trackId)) {
      this.setState({ checked: true });
    }
    this.shouldLoading(false);
  }

  getFavorites = async () => {
    const result = await getFavoriteSongs();
    this.setState({ favorites: result });
  }

  handleCheckboxChange = async () => {
    const { data } = this.props;
    const { checked } = this.state;
    if (!checked) {
      this.shouldLoading(true);
      await addSong(data);
      this.setState({ loading: false, checked: true });
    } else if (checked) {
      this.shouldLoading(true);
      await removeSong(data);
      this.setState({ loading: false, checked: false });
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
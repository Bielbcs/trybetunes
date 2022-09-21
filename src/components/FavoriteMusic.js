import React from 'react';
import PropType from 'prop-types';
import { removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import svg from '../svg/suit-heart.svg';
import svg1 from '../svg/suit-heart-fill.svg';
import '../styles/FavoriteMusic.css';

class FavoriteMusic extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setAudioVolume();
  }

  getExactFavorite = ({ target }) => {
    const { favorites } = this.props;
    const name = parseInt(target.name, 10);
    return favorites.find((favorite) => favorite.trackId === name);
  }

  remove = async (e) => {
    this.setState({ loading: true });
    const { getFavorites } = this.props;
    const result = this.getExactFavorite(e);
    await removeSong(result);
    await getFavorites();
    this.setState({ loading: false });
  }

  setAudioVolume = () => {
    const volume = document.querySelectorAll('#music-audio');
    volume.forEach((item) => {
      item.volume = 0.05;
    });
  }

  render() {
    const { data, checked } = this.props;
    const { trackName, previewUrl, trackId, artworkUrl100 } = data;
    const { loading } = this.state;
    return (
      <div>

        <div className="music-card-container musics-container">
          <div className="music-image-container">
            <img src={ artworkUrl100 } alt={ trackName } className="music-image" />
          </div>
          <span className="track-name">{trackName}</span>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
            id="music-audio"
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          {loading ? <Loading /> : (
            <label htmlFor={ trackId } className="checkbox-music favorite-music">
              {checked ? (<img src={ svg1 } alt="teste" />) : (
                <img src={ svg } alt="teste" />
              )}
              <span className="visually-hidden">Favorita</span>
              <input
                name={ trackId }
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                checked={ checked }
                onChange={ (e) => this.remove(e) }
              />
            </label>
          )}
        </div>

      </div>
    );
  }
}

FavoriteMusic.propTypes = {
  data: PropType.objectOf(PropType.any),
  checked: PropType.boolean,
}.isRequired;

export default FavoriteMusic;

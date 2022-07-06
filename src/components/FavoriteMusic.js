import React from 'react';
import PropType from 'prop-types';
import { removeSong } from '../services/favoriteSongsAPI';
import svg from '../svg/suit-heart.svg';
import svg1 from '../svg/suit-heart-fill.svg';

class FavoriteMusic extends React.Component {
  remove = async () => {
    const { data, getFavorites, shouldLoading } = this.props;
    shouldLoading(true);
    await removeSong(data);
    await getFavorites();
    shouldLoading(false);
  }

  render() {
    const { data, checked } = this.props;
    const { trackName, previewUrl, trackId } = data;
    return (
      <div>

        <div className="music-card-container">
          <span>{trackName}</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>

          <label htmlFor="Favorita" className="checkbox-music">
            {checked ? (<img src={ svg1 } alt="teste" />) : (
              <img src={ svg } alt="teste" />
            )}
            <span className="visually-hidden">Favorita</span>
            <input
              name="Favorita"
              id="Favorita"
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              checked={ checked }
              onChange={ this.remove }
            />
          </label>
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

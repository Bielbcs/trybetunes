import React from 'react';
import PropType from 'prop-types';
import '../styles/MusicCard.css';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  handleCheckboxChange = async (e) => {
    const { data } = this.props;
    if (e.target.checked) {
      this.setState({ loading: true });
      await addSong(data);
      this.setState({ loading: false, checked: true });
    }
  }

  render() {
    const { data } = this.props;
    const { previewUrl, trackName, trackId } = data;
    const { loading, checked } = this.state;
    return (
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
    );
  }
}

MusicCard.propTypes = {
  data: PropType.objectOf(PropType.any).isRequired,
};

export default MusicCard;

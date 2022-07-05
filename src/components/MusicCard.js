import React from 'react';
import PropType from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { data } = this.props;
    const { previewUrl, trackName } = data;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  data: PropType.objectOf(PropType.any).isRequired,
};

export default MusicCard;

import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/AlbumCard.css';

class AlbumCard extends React.Component {
  render() {
    const { data } = this.props;
    const { artistName, collectionId,
      collectionName, artworkUrl100,
    } = data;
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
        className="album-card-container"
      >
        <img src={ artworkUrl100 } alt={ artistName } />
        <p className="name">{artistName}</p>
        <span className="album-name">{collectionName}</span>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  data: PropType.objectOf(PropType.any).isRequired,
};

export default AlbumCard;

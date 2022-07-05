import React from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../styles/Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumInfo: [],
      albumMusics: [],
    };
  }

  componentDidMount() {
    this.albumInformation();
  }

  albumInformation = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const result = await getMusics(id);
    const newArray = [...result];
    newArray.splice(0, 1);
    this.setState({
      albumInfo: result[0],
      albumMusics: newArray,
    });
  }

  render() {
    const { albumInfo, albumMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="general-container">
          <div className="container">
            <div className="album-info">
              <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.artistName } />
              <span
                data-testid="artist-name"
                className="artist-name"
              >
                {albumInfo.artistName}
              </span>
              <span
                data-testid="album-name"
                className="album-name"
              >
                {albumInfo.collectionName}
              </span>
            </div>
            <div className="musics">
              { albumMusics.map((music) => (<MusicCard
                key={ music.trackId }
                data={ music }
              />)) }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.objectOf(PropType.any).isRequired,
};

export default Album;

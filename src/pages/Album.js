import React from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

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
        <div>
          <span data-testid="artist-name">{albumInfo.artistName}</span>
          <span data-testid="album-name">{albumInfo.collectionName}</span>
        </div>
        <div>
          { albumMusics.map((music) => (<MusicCard
            key={ music.trackId }
            data={ music }
          />)) }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.objectOf(PropType.any).isRequired,
};

export default Album;

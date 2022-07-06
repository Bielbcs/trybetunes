import React from 'react';
import '../styles/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <div className="spinner-border text-success">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }
}

export default Loading;

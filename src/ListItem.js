import React, { Component } from 'react';
import './ListItem.css';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleFavClick = this.handleFavClick.bind(this);
    this.handleDelClick = this.handleDelClick.bind(this);
    this.handleDelFav = this.handleDelFav.bind(this);
  }

  handleDelClick(comicId) {
    this.props.onComicAction('delete', comicId);
  }

  handleDelFav(comicId) {
    this.props.onComicAction('delete', comicId);
  }

  handleFavClick(comicId) {
    this.props.onComicAction('favourite', comicId);
  }

  render() {
    const metaData = this.props.comic;
    const {thumbnail, issueNumber, pageCount, dates, prices} = metaData;
    return (
      <div className={`comic ${this.props.selected ? "selected" : ""}`} onClick={this.handleClick}>
        <div className="comic-thumbnail-container">
          <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`} alt={metaData.title} />
        </div>
        <div className="comic-data-container">
          <h2 style={{ width: '500px' }}>{metaData.title}</h2>
          <p>Numero: {issueNumber}</p>
          <p>Paginas: {pageCount}</p>
          <p>Fecha: {new Date(dates[0].date).toLocaleDateString()}</p>
          <p>Precio: ${prices[0].price}</p>
        </div>
        {this.props.listType === 'myComics' ? (
          <div style={{ float: 'right', display: 'inline-flex' }}>
            <div
              onClick={() => this.handleDelClick(metaData.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                width={25}
                height={25}
                title={metaData.id}
                src="https://img.icons8.com/fluency/48/000000/delete-forever.png"
              />
            </div>
            <div
              onClick={() => this.handleFavClick(metaData.id)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                width={25}
                height={25}
                title={metaData.id}
                src="https://img.icons8.com/fluency/48/000000/add-to-favorites.png"
              />
            </div>
          </div>
        ) : null}
        {this.props.listType === 'favComics' ? (
          <div style={{ float: 'right' }}>
            <div
              onClick={() => this.handleDelFav(metaData.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                width={25}
                height={25}
                title={metaData.id}
                src="https://img.icons8.com/fluency/48/000000/delete-forever.png"
              />
            </div>
          </div>
        ) : null}
        </div>       
    );
  }

  handleClick() {
    if(this.props.onSelect) { 
      this.props.onSelect(this.props.comic.id);
    }
  }

}

export default ListItem;
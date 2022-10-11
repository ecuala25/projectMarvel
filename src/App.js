import React, { Component } from 'react';
import './App.css';
import List from './List';
import axios from 'axios';
import { uniq } from 'lodash';
import { getKey, saveKeyValue } from './lib/session-storage';
import i18next from 'i18next';


export const mandatoryParameters= 'apikey=b6131331fc8737cff8555b9d618464ef&hash=e48c0db763ac12edf9ce85ac4980a563&ts=1&limit=100';
export const comicsRequestUrl = 'https://gateway.marvel.com:443/v1/public/comics';
export const characterRequestUrl = 'https://gateway.marvel.com:443/v1/public/characters';

const isValidDate = dateString => {
  return (new Date(dateString) !== "Fecha no valida") && !isNaN(new Date(dateString))
}

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      basicSearch: true,
      selected: [],
      comicBooks: [],
      characters: [],
      searchCharacterInput: '',
      selectedCharacter: '',
      selectedFormatType: '',
      selectedFormat: '',
      dateRangeFrom: '',
      dateRangeTo: '',
      titleStartsWith: '',
      hasDigitalIssue: false
    };

    //Binds
    this.changeSearcher = this.changeSearcher.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSearchComics = this.handleSearchComics.bind(this);
    this.handleInputCharacters = this.handleInputCharacters.bind(this);
    this.handleSelectCharacters = this.handleSelectCharacters.bind(this);
    this.handleSelectOptions = this.handleSelectOptions.bind(this);
    this.handleSelectType = this.handleSelectType.bind(this);
    this.handleSelectFormat = this.handleSelectFormat.bind(this);
    this.handleSearchCharacters = this.handleSearchCharacters.bind(this);
    this.handleDateRangeFrom = this.handleDateRangeFrom.bind(this);
    this.handleDateRangeTo = this.handleDateRangeTo.bind(this);
    this.handleTitleStartsWith = this. handleTitleStartsWith.bind(this);
    this.handleHasDigitalIssue = this.handleHasDigitalIssue.bind(this);
  }
  
  //Get comics
  componentDidMount() {
    const comicUrl = `${comicsRequestUrl}?${mandatoryParameters}&offset=0`;
    axios.get(comicUrl)
      .then(res => {
        const comicBooks = res.data.data.results;
        this.setState({comicBooks});
      })
  }

  //Gestionar el buscador
  handleInputCharacters(event) {
    this.setState({
      searchCharacterInput: event.target.value
    });
    console.log(getKey('appState').comicBooks.length);
  }

  //Gestionar el select
  handleSelectOptions(event) {
    this.setState({
      selectedCharacter: event.target.value
    })
  }
  
  handleSelectCharacters() {
    const comicIdCharacters = `https://gateway.marvel.com:443/v1/public/comics`;
    const characterId = this.state.searchCharacterInput.length > 0 ? 
    `characters=${this.state.selectedCharacter}` : '';
    var comicUrl = `${comicIdCharacters}?${mandatoryParameters}&offset=0&${characterId}`;
    
    axios.get(comicUrl)
      .then(res => {
        this.setState({
          characters: res.data.data.results
        });
      })
  }
  
  //Función boton cambio de buscador
  changeSearcher() {
    this.setState({
      basicSearch: !this.state.basicSearch
    });
    saveKeyValue('appState', this.state);
  }

  //Formato comic o colección
  handleSelectType(event) {
    this.setState({
      selectedFormatType: event.target.value
    })
  }

  //Formato
  handleSelectFormat(event) {
    this.setState({
      selectedFormat: event.target.value
    })
  }

  //Rango de fecha
  handleDateRangeFrom(event) {
    this.setState({
      dateRangeFrom: event.target.value
    })
  }

  handleDateRangeTo(event) {
    this.setState({
      dateRangeTo: event.target.value
    })
  }

  //Titulo empieza por:
  handleTitleStartsWith(event) {
    this.setState({
      titleStartsWith: event.target.value
    })
  }

  handleHasDigitalIssue(event) {
    this.setState({
      hasDigitalIssue: event.target.checked
    })
  }

  //Input
  handleSearchCharacters() {
    const nameStartsWith = this.handleInputCharacters.length > 0 ? 
    `&nameStartsWith=${this.state.searchCharacterInput}` : '';
    const characterUrl = `${characterRequestUrl}?${mandatoryParameters}&offset=0${nameStartsWith}`;

    axios.get(characterUrl)
      .then(res => {
        this.setState({
          characters: res.data.data.results
        });
      })
  }
  //Botón buscador de comics 
  handleSearchComics() { 
    const character = this.state.selectedCharacter.length > 0 ? 
    `&characters=${this.state.selectedCharacter}` : '';
    const formatType = this.state.selectedFormatType.length  > 0 ?
  `&formatType=${this.state.selectedFormatType}` : '';
    const format = this.state.selectedFormat.length  > 0 ?
    `&format=${this.state.selectedFormat}` : '';
    const dateRange = isValidDate(this.state.dateRangeFrom) && isValidDate(this.state.dateRangeTo) ?
    `&dateRange=${this.state.dateRangeFrom},${this.state.dateRangeTo}` : '';
    const titleStartsWith = this.state.titleStartsWith.length > 0 ? 
    `&titleStartsWith=${this.state.titleStartsWith}` : '';
    const hasDigitalIssue = this.state.hasDigitalIssue ?
    `&hasDigitalIssue=${this.state.hasDigitalIssue}` : '';
    const url =  
    `${comicsRequestUrl}?${mandatoryParameters}&offset=0${character}${formatType}${format}${dateRange}${titleStartsWith}${hasDigitalIssue}`;
    
    axios.get(url)
      .then(res => {
        this.setState({
          comicBooks: res.data.data.results,
          selectedCharacter: this.state.basicSearch ? res.data.data.results[0].id : this.state.selectedCharacter
        });
      })
  }
 

  render() {
    const comics = this.state.comicBooks;
    const selectedComics = comics.filter(comic => this.state.selected.indexOf(comic.id) !== -1);

    return ( 
      <div>
        <p className="comics-seleccionados">Comics seleccionados: {this.state.selected.length}</p>
        <div className="buscador">

          {/*Botón cambio buscador*/}
          <div className="class-row">
            <button 
              className="buttonSearcher" 
              onClick={this.changeSearcher}>{this.state.basicSearch ? 'Buscador avanzado' : 'Buscador basico'}</button>
          </div>

          {/*Buscador personajes*/}
          <div className="class-row">
            <span> Buscar por personajes que empiecen por: </span>
            <input 
              className="input"
              type="text" 
              value={this.state.handleSearchCharacters} 
              onChange={this.handleInputCharacters} 
            />
            <button 
              className="buttonSearcher" 
              type="submit" 
              onClick={this.handleSearchCharacters} >
                Buscar personaje
            </button>
          </div>
          <div>
            {this.state.basicSearch ? (

              //Buscador sencillo
              <div className='class-row'>
                <span> Elige un personaje: </span>
                <select 
                className="input"
                onChange={this.handleSelectOptions}>
                  <option value={null}>Ninguno</option>
                {this.state.characters.map((character,index) => 
                    <option 
                      value={character.id }
                      key={index}  
                    >
                      {character.name}
                    </option>
                )}   
                </select>
              <button 
                className="buttonSearcher" 
                type="submit" 
                onClick={this.handleSearchComics}>Buscar comics</button>
              </div> 
            ) : (

              //Buscador avanzado
              <div>
                <div className='class-row'>
                  {/*Personaje*/}
                  <span>Elige un personaje: </span>
                  <select 
                  className="input"
                  onChange={this.handleSelectOptions} 
                  style={{marginRight: '20px'}}>
                    <option value={-1}>{'Ninguno'}</option>
                  {this.state.characters.map((character,index) => 
                      <option 
                        value={character.id }
                        key={index}  
                      >
                        {character.name}
                      </option>
                  )}   
                  </select>             

                    {/*Tipos*/}
                    <span>Selecciona el tipo: </span>
                    <select 
                    className="input"
                    onChange={this.handleSelectType}>
                      <option value={''}>{'Selecciona uno'}</option>
                      <option value={'comic'}>{'Comic'}</option>
                      <option value={'collection'}>{'Colección'}</option>
                    </select>
                </div>
                <div className='class-row'>
                  <div>
                    <span>Selecciona el formato: </span>
                    <select 
                    className="input"
                    onChange={this.handleSelectFormat} style={{marginRight: '20px'}}>
                      <option value={''}>{'Ninguno'}</option>
                      <option value={'comic'}>{'Comic'}</option>
                      <option value={'magazine'}>{'Magazine'}</option>
                      <option value="trade paperback">{'Trade paperback'}</option>
                      <option value="hardcover">{'Hardcover'}</option>
                      <option value="digest">{'Digest'}</option>
                      <option value="graphic novel">{'Graphic novel'}</option>
                      <option value="digital comic">{'Digital comic'}</option>
                      <option value="infinite comic">{'Infinite comic'}</option>
                    </select>
                  </div>
                  <div>
                    <span>Intervalo de fecha: </span>
                    <input 
                      className="input"
                      type="text"
                      placeholder={'Desde'}
                      style={{ width: 70 }}
                      value={this.state.dateRangeFrom}
                      onChange={this.handleDateRangeFrom}
                    />
                    <input 
                      className="input"
                      type="text"
                      placeholder={'Hasta'}
                      style={{ width: 70 }}
                      value={this.state.dateRangeTo}
                      onChange={this.handleDateRangeTo}
                    />
                    <span style={{ color: '#333', fontSize: '12px' }}>Formato: YYYY-MM-DD</span>
                  </div>
                </div>
                <div className='class-row'>
                  <div>
                    <span>Titulo empezado por: </span>
                    <input 
                      className="input"
                      type='text' 
                      style={{marginRight: '20px'}}
                      onChange={this.handleTitleStartsWith}
                      value={this.state.titleStartsWith}
                    />
                  </div>
                  <div>
                    <span>Cómics diponibles digitalmente: </span>
                    <input 
                      className="input"
                      type='checkBox'
                      checked={this.state.hasDigitalIssue}
                      onChange={this.handleHasDigitalIssue}
                    />
                  </div>
                </div>
                <div>
                  <button 
                    className="buttonSearcher" 
                    type="submit" 
                    onClick={this.handleSearchComics} 
                    >
                    Buscar comics
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/*Comics disponibles*/}
        <div className="store-container">
          <h1>Todos los Comics: {this.state.comicBooks.length} comics disponibles</h1>
          <List result={comics} onSelect={this.handleSelection} selectedList={this.state.selected} />
        </div>
      </div>
    );
  }

  handleSelection(comicId) {
    if (this.state.selected.indexOf(comicId) === -1) {
      this.setState({
        selected: this.state.selected.concat(comicId)
      })

      //Guardar en la sesion "App:selected" los comics seleccionados y los anteriores
      const prevSelectedComics = getKey('App:selected');
      saveKeyValue(
        'App:selected', 
       uniq([...new Set(prevSelectedComics), ...new Set(this.state.selected.concat(comicId))])
      );
    } else {
      let selectedAuxArray = this.state.selected.slice();
      selectedAuxArray.splice(selectedAuxArray.indexOf(comicId), 1);
      this.setState({
        selected: selectedAuxArray
      })
    }
  }
}

export default App;

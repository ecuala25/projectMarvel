import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import List from '../List';
import { getKey, saveKeyValue } from '../lib/session-storage';
import {comicsRequestUrl, mandatoryParameters} from '../App';
import i18next from 'i18next';

class FavouriteComics extends Component {
    constructor(props) {
        super(props);
        this.state = {
          myFavComics: []
        };

        this.onComicAction = this.onComicAction.bind(this);
    }

    componentDidMount() {
        const myFavComics = getKey('App:favourite');

        if (myFavComics && myFavComics.length > 0) {
            myFavComics.forEach(comicId => {
                const urlSelectedComic = `${comicsRequestUrl}/${comicId}?${mandatoryParameters}`;
                axios.get(urlSelectedComic).then(res => {
                  const myFavComicsCopy = this.state.myFavComics.slice();
                  myFavComicsCopy.push(res.data.data.results[0]);
                  this.setState({
                    myFavComics: myFavComicsCopy
                  });
                });
            });
        }
        console.log(this.state.myFavComics);
    }
    
    onComicAction(action, comicId) {
        const myFavComicsCopy = this.state.myFavComics.slice();
        const foundIndex = myFavComicsCopy.findIndex((oneComic) => oneComic.id === comicId)
            
        myFavComicsCopy.splice(foundIndex, 1);
        this.setState({
            myFavComics: myFavComicsCopy
        });

        let updatedComicsId = [];
        myFavComicsCopy.forEach(comic => updatedComicsId.push(comic.id));
        saveKeyValue('App:favourite', updatedComicsId);
    }

    render() {
        const myFavComics = this.state.myFavComics;

        return (
            <div>
                <p className="comics-seleccionados">Comics seleccionados: {this.state.myFavComics.length}</p>
                <div className="owned-container">
                    <h1>Comics favoritos: {myFavComics.length}</h1>
                    <List  
                        result={myFavComics} 
                        listType={'favComics'}
                        onComicAction={this.onComicAction} 
                    />
                </div>
            </div>
        )
    };
};

export default FavouriteComics;
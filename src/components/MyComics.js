import React, { Component } from 'react';
import axios from 'axios';
import { uniq } from 'lodash';
import '../App.css';
import List from '../List';
import { getKey, saveKeyValue } from '../lib/session-storage';
import {comicsRequestUrl, mandatoryParameters} from '../App';
import i18next from 'i18next';

class MyComics extends Component {
    constructor(props) {
        super(props);
        this.state = {
          myComics: []
        };

        this.onComicAction = this.onComicAction.bind(this);
    }

    componentDidMount() {
        const selectedComics = getKey('App:selected');
        if(selectedComics && selectedComics.length > 0) {
            selectedComics.forEach(comicId => {
                const urlSelectedComic = `${comicsRequestUrl}/${comicId}?${mandatoryParameters}`;
                axios.get(urlSelectedComic).then(res => {
                  const myComicsCopy = this.state.myComics.slice();
                  myComicsCopy.push(res.data.data.results[0]);
                  this.setState({
                    myComics: myComicsCopy
                  });
                });
            });
        }
    }

    onComicAction(action, comicId) {
        console.log(`action --> ${action}`);
        console.log(`comicId --> ${comicId}`);

        if (action === 'delete') {
            const myComicsCopy = this.state.myComics.slice();
            const foundIndex = myComicsCopy.findIndex((oneComic) => oneComic.id === comicId)
            
            myComicsCopy.splice(foundIndex, 1);
            this.setState({
                myComics: myComicsCopy
            });

            let updatedComicsId = [];
            myComicsCopy.forEach(comic => updatedComicsId.push(comic.id));
            saveKeyValue('App:selected', updatedComicsId);
        }

        if (action === 'favourite') {
            const prevFavComics = getKey('App:favourite');
            saveKeyValue(
                'App:favourite',
                uniq([...new Set(prevFavComics), comicId])
            );
        }
    }

    render() {
        const myComics = this.state.myComics;

        return (
            <div>
                <p className="comics-seleccionados">Comics seleccionados: {this.state.myComics.length}</p>
                <div className="owned-container">
                    <h1>Mis Comics: {myComics.length}</h1>
                    <List  
                        result={myComics}
                        listType={'myComics'}
                        onComicAction={this.onComicAction} 
                    />
                </div>
            </div>
        )
    };
};

export default MyComics;
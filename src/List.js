import React, { Component } from 'react';
import App from './App';
import ListItem from './ListItem';
//import './List.css';

class List extends Component {

  render() {
    return (
        <div>
            {this.props.result.map((comic,index) =>
              <ListItem 
              comic={comic} 
              key={index}  
              onSelect={this.props.onSelect}
              selected={this.props.selectedList && this.props.selectedList.indexOf(comic.id) !== -1}
              listType={this.props.listType} 
              onComicAction={this.props.onComicAction}
            />)}
        </div>
    );
  }

}

export default List;
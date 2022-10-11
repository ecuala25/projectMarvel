import React, { Component } from 'react';
import './dashboard.css'
import axios from 'axios';
import KpiBox from './kpiBox';
import LineTotal from './LineTotal';
import {mandatoryParameters, comicsRequestUrl, characterRequestUrl} from '../App';
import i18next from 'i18next';

const comicYearsToSearch = [2018, 2019, 2020, 2021, 2022];

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          comics: '',
          characters: '',
          spiderMan: '',
          ironMan: '',
          thor: '',
          captainAmerica: '',
          hulk: '',
          totalComicsYears: []    
        };
    }

    componentDidMount() {
        const comicUrl = `${comicsRequestUrl}?${mandatoryParameters}&offset=0`;
        const characterUrl = `${characterRequestUrl}?${mandatoryParameters}&offset=0`;

        //Comics
        axios.get(comicUrl)
          .then(res => {
            const comics = res.data.data.total;
            this.setState({comics});
          });

        //Personajes
        axios.get(characterUrl)
          .then(res => {
            const characters = res.data.data.total;
            this.setState({characters});
          });
        
        const spiderUrl = `${comicUrl}&titleStartsWith=spider-man`;
        axios.get(spiderUrl)
          .then(res => {
            const spiderMan = res.data.data.total;
            this.setState({spiderMan});
          });

        const ironUrl = `${comicUrl}&titleStartsWith=iron%20man`;
        axios.get(ironUrl)
          .then(res => {
            const ironMan = res.data.data.total;
            this.setState({ironMan});
          });

        const thorUrl = `${comicUrl}&titleStartsWith=thor`;
        axios.get(thorUrl)
          .then(res => {
            const thor = res.data.data.total;
            this.setState({thor});
          });

        const capUrl = `${comicUrl}&titleStartsWith=captain%20america`;
        axios.get(capUrl)
          .then(res => {
            const captainAmerica = res.data.data.total;
            this.setState({captainAmerica});
          });

        const hulkUrl = `${comicUrl}&titleStartsWith=hulk`;
        axios.get(hulkUrl)
          .then(res => {
            const hulk = res.data.data.total;
            this.setState({hulk});
          });

        //Años
        comicYearsToSearch.forEach(year => {
          const dateRangeString = `${year}-01-01,${year}-12-31`;
          const urlComicsYears = `${comicsRequestUrl}?${mandatoryParameters}&dateRange=${dateRangeString}`;
          axios.get(urlComicsYears).then(res => {
            const copyOfTotalComicsYears = this.state.totalComicsYears.slice();
            copyOfTotalComicsYears.push({
              year, 
              totalComics: res.data.data.total
            });
            this.setState({
              totalComicsYears: copyOfTotalComicsYears
            });
          });
        });
    }


    render() {
        //Comics
        const comics = this.state.comics;

        //Personajes
        const characters = this.state.characters;
        const spiderMan = this.state.spiderMan;
        const ironMan = this.state.ironMan;
        const thor = this.state.thor;
        const captainAmerica = this.state.captainAmerica;
        const hulk = this.state.hulk;

        //Años
        const totalComicsYears = this.state.totalComicsYears;

        return (
            <div>
                <div className="card">
                    <div className="individual-card">
                        <h1><KpiBox text={'Total comics'} value={comics}/></h1>
                    </div>
                    <div className="individual-card">
                        <h1><KpiBox text={'Total personajes'} value={characters}/></h1>
                    </div>
                </div>
                <div className="card">
                    <div className="individual-card">
                        <h1>Comics por personajes</h1>
                        <LineTotal text={'Capitan América'} value={captainAmerica}/>
                        <LineTotal text={'Spider-Man'} value={spiderMan}/>
                        <LineTotal text={'Thor'} value={thor}/>
                        <LineTotal text={'Iron Man'} value={ironMan}/>                      
                        <LineTotal text={'Hulk'} value={hulk}/>                
                    </div>
                    <div className="individual-card">
                      <h1>Comics  por año</h1>
                      {totalComicsYears.sort((a, b) => a.year > b.year).map(totalComicsYear => {
                        return (
                          <LineTotal 
                            key={totalComicsYear.year}
                            text={totalComicsYear.year} 
                            value={totalComicsYear.totalComics}
                          />  
                        );
                      })}    
                    </div>
                </div>                
            </div>
        )
    }
}

export default Dashboard;
import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'

import {fireBasePlayers, firebase} from '../../firebase'
import {firebaseLooper} from '../ui/misc'
import Stripes from '../../Resources/images/stripes.png'
import PlayerCard from '../ui/PlayerCard'
import {Promise} from 'core-js'

export default class TheTeam extends Component {

    state={
        loading:true,
        players: []
    }

    componentDidMount(){
        fireBasePlayers.once('value').then(snapshot=>{
            const players = firebaseLooper(snapshot)
            let promises = []

            for(let key in players){
                promises.push(
                    new Promise((resolve, reject)=>{
                        firebase.storage().ref('players')
                        .child(players[key].image).getDownloadURL()
                        .then(url=>{
                            players[key].url =url
                            resolve()
                        })
                    })
                )
            }

            Promise.all(promises).then(()=>{
                this.setState({
                    loading:false,
                    players
                })
            })
        })
    }
    showPlayersByCategory =(category)=>(
        this.state.players ? 
            this.state.players.map((player, i)=>{
                return player.position === category ? 
                <Fade left delay={i*20} key={i}>
                    <div className='item'>
                        <PlayerCard
                            number={player.number}
                            name={player.name}
                            lastname={player.lastname}
                            bck={player.url}
                        />
                    </div>
                </Fade>
                : null
            })
        : null
    )


    render() {
        return (
            <div className='the_team_container'
                style={{
                    background: `url(${Stripes}) repeat`
                }}
            >
                {!this.state.loading ?
                    <div>
                        <div className='team_category_wrapper'>
                            <div className='title'>Keeper</div>
                            <div className='team_cards'>
                                {this.showPlayersByCategory('Keeper')}
                            </div>
                        </div>
                        <div className='team_category_wrapper'>
                            <div className='title'>Defence</div>
                            <div className='team_cards'>
                                {this.showPlayersByCategory('Defence')}
                            </div>
                        </div>
                        <div className='team_category_wrapper'>
                            <div className='title'>Midfields</div>
                            <div className='team_cards'>
                                {this.showPlayersByCategory('Midfield')}
                            </div>
                        </div>
                        <div className='team_category_wrapper'>
                            <div className='title'>Strikers</div>
                            <div className='team_cards'>
                                {this.showPlayersByCategory('Striker')}
                            </div>
                        </div>
                    </div> 
                    : null
                }
            </div>
        )
    }
}

import React, { Component } from 'react'
import style from './scss/slider.scss';

const Loader= () => {
    return (<div>Data is loading</div>)
}

const Note=(props)=>{
    let note=Math.round(props.val);
    let stars = new Array(note).fill(1);
    let max = new Array(10).fill(0);
    return(<div>
        {max.map((point,i)=>{
            let val=stars[i]?"\u2605":"\u2606";//code stars
                return (<span key={i}>{val}</span>)
            })
        }
    </div>);
}


const Resume=(props)=>{
    let{vote_average,title,overview,backdrop_path }=props.film;
    return (
            <div>
                <h1>{title}</h1>
                <p className="desc">{overview}</p>
                <p><Note val={vote_average} /></p>
            </div>
        )
}

class Slider extends Component {
    constructor(props){
        super(props);

        this.state={
            loaded:false,
            films:[],
            index:0,
            format:'backdrop_path',
        }
        this.init();
    }
    init(){

        fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    ...this.state,
                    loaded:true,
                    films:json.results
                })
            });

    }
    moveTo(index){
        console.log(index);
        this.setState({
            ...this.state,
            index:index
        })
    }
    render() {

        if (!this.state.loaded){
            return(<Loader />)
        }else{

            let index=this.state.index;
            let film =this.state.films[index];
            let link="https://image.tmdb.org/t/p/w500"+film[this.state.format];

            //buttons next /prev
            let prev=this.state.index==0?this.state.films.length-1:index-1;
            let next=this.state.index==(this.state.films.length-1)?0:index+1;

            return(
                <div className="imageBg" style={{"background": "url("+link+") no-repeat center / cover"}} >
                    <div className="action action-arrow action-arrow-left" onClick={()=>this.moveTo(prev)}>&#171;</div>
                    <div className="action action-arrow action-arrow-right" onClick={()=>this.moveTo(next)}>&#187;</div>
                    <div id="resume">
                        <div id="bullets">
                            {this.state.films.map((f,i)=>{
                                let classes=i==index?'bullet-active':'';
                                return(<div key={i} className={classes+" bullet action action-bullet"} onClick={()=>this.moveTo(i)} ></div>)
                                })
                            }
                        </div>
                        <Resume film={film} />
                    </div>
                </div>
            )
        }
    }
}
export default Slider;
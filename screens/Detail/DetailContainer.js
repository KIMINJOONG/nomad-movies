import React from "react";
import PropTypes from "prop-types";
import DetailPresenter from "./DetailPresenter";
import {moviesApi,tvApi } from "../../Api";
import { Linking } from "expo";

export default class ReactContainer extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("title")
        };
    };


    constructor(props) {
        super(props);
        const { navigation : {
            state: {
                params: { 
                    isMovie, 
                    id, 
                    posterPhoto, 
                    backgroundPhoto, 
                    title, 
                    voteAvg, 
                    overview,
                    date,
                    runtime,
                    languages,
                    videos,
                    lastAirDate,
                    totalEpisode,
                    totalSeason,
                    videoKey,
                    loading
                }
            }
        } 
    } = props;
        this.state = {
            isMovie,
            id,
            posterPhoto,
            backgroundPhoto,
            title,
            voteAvg,
            overview,
            date,
            runtime,
            languages,
            videos,
            lastAirDate,
            totalEpisode,
            totalSeason,
            videoKey : "",
            loading : true,
        };
    }

    async componentDidMount() {
        const {isMovie, id} = this.state;
        let error, genres, overview, status, date, backgroundPhoto, runtime, languages, videos, lastAirDate,totalEpisode,totalSeason;
        try{
            if(isMovie) {
                ({
                   data : { 
                       genres, 
                        overview, 
                        status, 
                        release_date: date, 
                        backdrop_path: backgroundPhoto,
                        runtime,
                        spoken_languages: languages,
                        videos
                    }
                } = await moviesApi.movieDetail(id));
            } else {
                ({
                    data: {
                        genres, 
                        overview, 
                        status, 
                        first_air_date: date, 
                        last_air_date: lastAirDate,
                        backdrop_path: backgroundPhoto,
                        number_of_episodes : totalEpisode,
                        number_of_seasons : totalSeason
                    }
                } = await tvApi.showDetail(id));
            }
        }catch(error){
            
        }finally{
            this.setState({
                loading: false,
                genres,
                overview,
                status,
                date,
                backgroundPhoto,
                runtime,
                languages,
                videos,
                lastAirDate,
                totalEpisode,
                totalSeason
            });
        }
    }

    _handleYoutube = (youtubeKey) => {
        //Linking.openURL(`https://www.youtube.com/embed/${youtubeKey}`);
        this.setState({
            videoKey: youtubeKey
        })
    };

    render() {
        const {
            isMovie,
            id, 
            posterPhoto, 
            backgroundPhoto, 
            title, 
            voteAvg, 
            overview, 
            loading, 
            date, 
            status, 
            genres, 
            runtime,
            languages,
            videos,
            lastAirDate,
            totalEpisode,
            totalSeason,
            videoKey
        } = this.state;
        const { _handleYoutube } = this;
        return(
            
            <DetailPresenter 
                isMovie={isMovie}
                id={id}
                posterPhoto={posterPhoto}
                backgroundPhoto={backgroundPhoto}
                title={title}
                voteAvg={voteAvg}
                overview={overview}
                loading={loading}
                date={date}
                status={status}
                genres={genres}
                runtime={runtime}
                languages={languages}
                videos={videos}
                lastAirDate={lastAirDate}
                totalEpisode={totalEpisode}
                totalSeason={totalSeason}
                handleYoutube={_handleYoutube}
                videoKey={videoKey}
            />
        )
    }
};

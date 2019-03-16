import React from "react";
import PropTypes from "prop-types";
import DetailPresenter from "./DetailPresenter";
import {moviesApi,tvApi } from "../../Api";

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
                    runtime,
                    languages, 
                    videos,
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
            loading : true,
            runtime,
            languages,
            videos
        };
    }

    async componentDidMount() {
        const {isMovie, id} = this.state;
        let error, genres, overview, status, date, backgroundPhoto, runtime, languages, videos;
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
                        languages,
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
                        backdrop_path: backgroundPhoto
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
                videos
            });
        }
    }

    render() {
        console.log(this.state);
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
            videos
        } = this.state;
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
            />
        )
    }
};

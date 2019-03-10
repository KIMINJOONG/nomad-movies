import React from "react";
import PropTypes from "prop-types";
import DetailPResenter from "./DetailPresenter";
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
                params: { isMovie, id, posterPhoto, backgroundPhoto, title, voteAvg, overview, loading
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
            loading : true
        };
    }

    async componentDidMount() {
        const {isMovie, id} = this.state;
        let error, genres, overview, status, date, backgroundPhoto;
        try{
            if(isMovie) {
                ({
                   data : { 
                       genres, 
                        overview, 
                        status, 
                        release_date: date, 
                        backdrop_path: backgroundPhoto
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
                backgroundPhoto
            });
        }
    }

    render() {
        const {isMovie,id, posterPhoto, backgroundPhoto, title, voteAvg, overview, loading, date, status, genres} = this.state;
        return(
            
            <DetailPResenter 
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
            />
        )
    }
};

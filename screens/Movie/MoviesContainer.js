import React from "react";
import MoviesPresenter from "./MoviesPresenter";
import { moviesApi } from "../../Api";

export default class MoviesContainer extends React.Component{
    state = {
        loading:true,
        upcoming: null,
        popular: null,
        nowPlaying: null,
        error: null
    };

    async componentDidMount() {
        let upcoming, popular, nowPlaying, error;
        try{
            ({
                // results를 nowPlaying으로 이름변경
                // 변수명 변경하는법
                data: {results : nowPlaying }
            } = await moviesApi.nowPlaying());
            ({
                data: { results: upcoming }
            } = await moviesApi.upcoming());

            ({
                data: { results: popular}
            } = await moviesApi.popular());

        }catch(error) {
            error= "Can't Get Movies."
        }finally{
            this.setState({
                loading: false,
                error,
                upcoming,
                popular,
                nowPlaying
            });
        }
    }

    render(){
        const { loading, upcoming, popular, nowPlaying } = this.state;
        return(
            <MoviesPresenter 
                loading= {loading} 
                upcoming={upcoming}
                popular={popular}
                nowPlaying={nowPlaying}
            />
        );
    }
}

import React from "react";
import SearchPresnter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../Api";


export default class SearchContainer extends React.Component {
    state = {
        loading: false,
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        error: null
    };

    handleSearchUpdate = (text) => {
        this.setState({
            searchTerm: text
        });
    };

    onSubmitEditing = async () => {
        const { searchTerm } = this.state;
        if (searchTerm !== "") {
            let loading, movieResults, tvResults, error;
            this.setState({
                loading: true
            });
            try{
                ({
                    data: {results: movieResults }
                } = await moviesApi.search(searchTerm));
                ({
                    data: {results: tvResults}
                } = await tvApi.search(searchTerm));
                
            }catch(error){
                error = "찾을수 없습니다.";
            }finally{
                this.setState({
                    loading: false,
                    movieResults,
                    tvResults,
                    error
                })
            }
        }
    }

    render() {
        const { loading, movieResults, tvResults, searchTerm } = this.state;
        const { handleSearchUpdate, onSubmitEditing } = this;
        return (
            <SearchPresnter
                loading={loading}
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                handleSearchUpdate={handleSearchUpdate}
                onSubmitEditing={onSubmitEditing}
            />
        );
    }
}
import React from "react";
import SearchPresnter from "./SearchPresenter";


export default class SearchContainer extends React.Component{
    state = {
        loading: false,
        movieResults: null,
        tvResults: null,
        searchTerm: ""
    };

    handleSearchUpdate = (text) => {
        this.setState({
            searchTerm: text
        });
    };

    render() {
        const {loading, movieResults, tvResults, searchTerm} = this.state;
        return(
            <SearchPresnter 
                loading={loading}
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                handleSearchUpdate={this.handleSearchUpdate}
            />
        );
    }
}
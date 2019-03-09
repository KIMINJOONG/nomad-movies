import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../Api";

export default class TVContainer extends React.Component{
    state = {
        topRated: null
        , popular: null
        , airingToday: null
        , loading: true
        , error: null
    }

    async componentDidMount() {
        let topRated,popular, airingToday, error;

        try{
            ({
                data: { results: topRated}
            } = await tvApi.topRated());
            ({
                data: {results : popular}
            } = await tvApi.popular());
            ({
                data: {results: airingToday}
            } = await tvApi.airingToday());
        }catch(error){
            error= "Can't find TV information."
        }finally{
            this.setState({
                loading: false,
                topRated,
                popular,
                airingToday,
                error
            })
        }
    }

    render() {
        const { loading, popular, topRated, airingToday } = this.state;
        console.log(this.state);
        return(
            <TVPresenter 
                loading={loading}
                popular={popular}
                topRated={topRated}
                airingToday={airingToday} 
            />
        );
    }
}
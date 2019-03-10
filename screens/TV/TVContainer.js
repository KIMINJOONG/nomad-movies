import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../Api";

export default class TVContainer extends React.Component{
    state = {
        airingThisWeek: null
        , popular: null
        , airingToday: null
        , loading: true
        , error: null
    }

    async componentDidMount() {
        let airingThisWeek,popular, airingToday, error;

        try{
            ({
                data: { results: airingThisWeek}
            } = await tvApi.airingThisWeek());
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
                airingThisWeek,
                popular,
                airingToday,
                error
            })
        }
    }

    render() {
        const { loading, popular, airingThisWeek, airingToday } = this.state;
        console.log(this.state);
        return(
            <TVPresenter 
                loading={loading}
                popular={popular}
                airingThisWeek={airingThisWeek}
                airingToday={airingToday} 
            />
        );
    }
}
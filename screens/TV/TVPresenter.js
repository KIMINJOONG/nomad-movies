import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { BG_COLOR } from "../../constants/Colors";
import Section from "../../components/Section";
import MovieItem from "../../components/MovieItem";

const Container = styled.ScrollView`
    background-color: ${BG_COLOR};
`;

const TVPresenter = ({ loading, popular, airingThisWeek, airingToday }) => (
    loading ? (
        <Loader />
    ) : (
    <Container>
        {airingToday ? (
            <Section title="Airing Today">
                {airingToday
                    .filter(tv => tv.poster_path !== null)
                    .map(tv => (
                        <MovieItem 
                            isMovie={false}
                            key={tv.id}
                            id={tv.id}
                            posterPhoto={tv.poster_path} 
                            title={tv.name} 
                            voteAvg={tv.vote_average}
                        />
                    ))}
            </Section>
            
        ) : null}
        {airingThisWeek ? (
            <Section title="Airing This week">
                {airingThisWeek
                    .filter(tv => tv.poster_path !== null)
                    .map(tv => (
                        <MovieItem 
                            isMovie={false}
                            key={tv.id}
                            id={tv.id}
                            posterPhoto={tv.poster_path} 
                            title={tv.name} 
                            voteAvg={tv.vote_average}
                            firstAirDate={first_air_date}
                        />
                    ))}
            </Section>
            
        ) : null}
        {popular ? (
            <Section title="인기 있는 드라마" horizontal={false}>
                {popular
                    .filter(tv => tv.poster_path !== null)
                    .map(tv => (
                        <MovieItem 
                            isMovie={false}
                            horizontal={true}
                            key={tv.id}
                            id={tv.id}
                            overview={tv.overview}
                            posterPhoto={tv.poster_path} 
                            title={tv.name} 
                            voteAvg={tv.vote_average}
                            firstAirDate={first_air_date}
                        />
                    ))}
            </Section>
            
        ) : null}
    </Container>)
);

TVPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    popular: PropTypes.array,
    airingThisWeek: PropTypes.array,
    airingToday: PropTypes.array
};

export default TVPresenter;
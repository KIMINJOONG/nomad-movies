import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import styled from "styled-components";
import MovieSlider from "../../components/MovieSlider";
import Section from "../../components/Section";
import MovieItem from "../../components/MovieItem";

const Container = styled.ScrollView`
    background-color: black;
`;



const MoviesPresenter = ({loading, upcoming, popular, nowPlaying})  => 
    loading ? (
        <Loader />
    ) : (
        <Container>
            {nowPlaying ? <MovieSlider movies={nowPlaying} /> : null}
            {upcoming ?( 
                <Section title={"Upcoming Movies"}>
                    {upcoming
                        .filter(movie => movie.poster_path !== null)
                        .map(movie => (
                            <MovieItem 
                                key={movie.id}
                                id={movie.id}
                                posterPhoto={movie.poster_path} 
                                title={movie.title}
                                overview={movie.overview} 
                                voteAvg={movie.vote_average}
                                runtime={movie.runtime}
                                languages={movie.spoken_languages}
                            />
                    ))}
                </Section>
            ) : null}
            {popular ?( 
                <Section horizontal={false} title={"Popular Movies"}>
                    {popular
                        .filter(movie => movie.poster_path !== null)
                        .map(movie => (
                            <MovieItem 
                                horizontal={true}
                                key={movie.id}
                                id={movie.id}
                                posterPhoto={movie.poster_path} 
                                title={movie.title} 
                                overview={movie.overview}
                                voteAvg={movie.vote_average}
                                runtime={movie.runtime}
                                languages={movie.spoken_languages}
                                videos={movie.videos}
                            />
                    ))}
                </Section>
            ) : null}

        </Container>
    );

MoviesPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    upcoming:PropTypes.array,
    popular:PropTypes.array,
    nowPlaying: PropTypes.array
};

export default MoviesPresenter;
import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import styled from "styled-components";
import MovieSlider from "../../components/MovieSlider";
import Section from "../../components/Section";

const Container = styled.ScrollView`
    background-color: black;
`;



const MoviesPresenter = ({loading, upcoming, popular, nowPlaying})  => 
    loading ? (
        <Loader />
    ) : (
        <Container>
            {nowPlaying ? <MovieSlider movies={nowPlaying} /> : null}
            {upcoming ? <Section movies={upcoming} title={"Upcoming Movies"} /> : null}
        </Container>
    );

MoviesPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    upcoming:PropTypes.array,
    popular:PropTypes.array,
    nowPlaying: PropTypes.array
};

export default MoviesPresenter;
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {BG_COLOR} from "../../constants/Colors";

const Container = styled.View`
    flex:1;
    background-color: ${BG_COLOR};
`;

const Input = styled.TextInput`

`;

const SearchPresenter = (loading, movieResults, tvResults, searchTerm, handleSearchUpdate) => (
    <Container>
        <Input 
            value={searchTerm}
            autoFocus
            returnKeyType={"search"} 
            onChangeText={handleSearchUpdate}
        />
    </Container>
)


SearchPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    tvResults: PropTypes.array,
    movieResults: PropTypes.array,
    searchTerm: PropTypes.string,
    handleSearchUpdate: PropTypes.func.isRequired
};
export default SearchPresenter;
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../components/Loader";

const TVPresenter = ({ loading }) => (
    loading ? <Loader /> : <Text>TV</Text>
);

TVPresenter.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default TVPresenter;
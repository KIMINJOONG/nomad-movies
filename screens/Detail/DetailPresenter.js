import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MoviePoster from "../../components/MoviePoster";
import { BG_COLOR, TINT_COLOR } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import makePhotoUrl from "../../utils/makePhotoUrl";

const Container = styled.ScrollView`
    background-color: ${BG_COLOR};
    flex:1;
    padding-top: 20px;
`;

const Header = styled.View`
    position:relative;
`;

const BgImage = styled.Image`
    width:${Layout.width};
    height:${Layout.height / 3};
    opacity: 0.3;
    position: absolute;
    top: 0;

`;

const Column = styled.View`
    margin-left: 30px;
`;

const Title = styled.Text`
    font-weight: 600;
    color: ${TINT_COLOR};
    font-size: 14px;
`;

const Content = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: flex-end;
    padding-top: 30px;
    padding-left: 30px;
    height: ${Layout.height / 3};
`;

const DeatailPresenter = ({id, posterPhoto, backgroundPhoto, title, voteAvg, overview}) => (
    <Container>
        <Header>
            <BgImage source={{uri: makePhotoUrl(backgroundPhoto)}}/>
            <Content>
                <MoviePoster path={posterPhoto} />
                <Column>
                    <Title>
                        {title}
                    </Title>
                </Column>
            </Content>
        </Header>
    </Container>
);
DeatailPresenter.propTypes = {
    id: PropTypes.number.isRequired,
    posterPhoto: PropTypes.string.isRequired,
    backgroundPhoto: PropTypes.string,
    title: PropTypes.string.isRequired,
    voteAvg: PropTypes.number,
    overview: PropTypes.string
}

export default DeatailPresenter;
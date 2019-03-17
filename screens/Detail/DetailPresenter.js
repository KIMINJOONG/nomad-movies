import React from "react";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";
import styled from "styled-components";
import MoviePoster from "../../components/MoviePoster";
import { BG_COLOR, TINT_COLOR } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import makePhotoUrl from "../../utils/makePhotoUrl";
import MovieRating from "../../components/MovieRating";
import { Platform, WebView } from "react-native";
import Loader from "../../components/Loader";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.ScrollView`
    background-color: ${BG_COLOR};
    padding-top: 20px;
`;

const Header = styled.View`
    position:relative;
`;

const BgImage = styled.Image`
    width:${Layout.width};
    height:${Layout.height / 3.5};
    position: absolute;
    top: 0;

`;

const Column = styled.View`
    margin-left: 30px;
`;

const Title = styled.Text`
    width: 80%;
    font-weight: 600;
    color: ${TINT_COLOR};
    font-size: 18px;
    margin-bottom: 10px;
`;

const Content = styled.View`
    flex-direction: row;
    align-items: flex-end;
    padding-top: 30px;
    padding-left: 30px;
    height: ${Layout.height / 3.5};
`;

const MainContent = styled.View`
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 25px;
`;

const ContentTitle = styled.Text`
    color: ${TINT_COLOR};
    font-weight: 600;
    margin-bottom: 10px;
`;

const ContentValue = styled.Text`
    width: 80%;
    color: ${TINT_COLOR};
    font-size: 12px;
    margin-bottom: 10px;
`;

const DataContainer = styled.View`
    margin-bottom: 10px;
`;

const Genres = styled.Text`
    width: 80%;
    color: ${TINT_COLOR};
    font-size: 12px;
    margin-top: 10px;
`;

const WebviewContainer = styled.View`
    height: 240px;
`;


const DeatailPresenter = ({
        isMovie, 
        posterPhoto, 
        backgroundPhoto, 
        title, 
        voteAvg, 
        overview, 
        loading, 
        date, 
        status,
        genres, 
        runtime,
        languages,
        videos,
        lastAirDate,
        totalEpisode,
        totalSeason,
        handleYoutube,
        videoKey
    }) => (
    <Container>
        <Header>
            <BgImage source={{uri: makePhotoUrl(backgroundPhoto)}}/>
            <LinearGradient
                colors={["transparent", "black"]}
                start={Platform.select({
                    ios: [0, 0]
                })}
                end={Platform.select({
                    ios: [0, 0.5],
                    android: [0, 0.9]
                })}
            >
                <Content>
                    <MoviePoster path={posterPhoto} />
                    <Column>
                        <Title>
                            {title}
                        </Title>
                        <MovieRating inSlide={true} votes={voteAvg} />
                        {genres ? (
                            <Genres>{genres.map((genre, index) => index === genres.length - 1 ? genre.name : `${genre.name} / `)}</Genres>
                        ) : null}
                    </Column>
                </Content>
            </LinearGradient>
        </Header>
        <MainContent>
            {overview ? (
                <DataContainer>
                    <ContentTitle>Overview</ContentTitle>
                    <ContentValue> 
                        {overview}
                    </ContentValue>
                </DataContainer>
                ) : null}
                {languages ? (
                <DataContainer>
                    <ContentTitle>언어</ContentTitle>
                    <ContentValue> 
                        {languages.map((language, index) => index === languages.length - 1 ? language.name : `${language.name} , `)}
                    </ContentValue>
                </DataContainer>
                ) : null}
                {date ? (
                <DataContainer>
                    <ContentTitle>{isMovie ? "최초 개봉 날짜" : "최초 방영 날짜"}</ContentTitle>
                    <ContentValue> 
                        {date}
                    </ContentValue>
                </DataContainer>
                ) : null}
                {lastAirDate ? (
                <DataContainer>
                    <ContentTitle>마지막 방영 날짜</ContentTitle>
                    <ContentValue> 
                        {lastAirDate}
                    </ContentValue>
                </DataContainer>
                ) : null}
                {totalEpisode ? (
                <DataContainer>
                    <ContentTitle>총 에피소드</ContentTitle>
                    <ContentValue> 
                        {totalEpisode}개
                    </ContentValue>
                </DataContainer>
                ) : null}
                {totalSeason ? (
                <DataContainer>
                    <ContentTitle>총 시즌</ContentTitle>
                    <ContentValue> 
                        {totalSeason}개
                    </ContentValue>
                </DataContainer>
                ) : null}
                {runtime ? (
                <DataContainer>
                    <ContentTitle>{isMovie ? "상영시간" : "방영시간"}</ContentTitle>
                    <ContentValue> 
                        {runtime}분
                    </ContentValue>
                </DataContainer>
                ) : null}
                {videos ? (
                <DataContainer>
                    {videoKey != "" &&
                        <WebviewContainer>
                            <WebView 
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: `https://www.youtube.com/embed/${videoKey}` }}
                            />
                        </WebviewContainer>
                    }
                    <ContentTitle>{isMovie ? "예고편" : "방영시간"}</ContentTitle>
                    {videos.results
                        .map(
                            video => 
                            <ContentValue key={video.id} onPress={() => handleYoutube(video.key)}>
                                <Ionicons name="logo-youtube" />
                                {video.name}
                            </ContentValue>
                            )}
                </DataContainer>
                ) : null}

                {status ? (
                <DataContainer>
                    <ContentTitle>Status</ContentTitle>
                    <ContentValue> 
                        {status}
                    </ContentValue>
                </DataContainer>
                ) : null}
            {loading ? <Loader /> : null}
        </MainContent>
    </Container>
);
DeatailPresenter.propTypes = {
    posterPhoto: PropTypes.string.isRequired,
    backgroundPhoto: PropTypes.string,
    title: PropTypes.string.isRequired,
    voteAvg: PropTypes.number,
    overview: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    isMovie:PropTypes.bool.isRequired,
    status: PropTypes.string,
    date: PropTypes.string,
    genres: PropTypes.array,
}

export default DeatailPresenter;
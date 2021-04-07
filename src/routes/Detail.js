import React from "react";
import { useParams } from "react-router-dom";
import {gql} from "apollo-boost";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

const GET_MOVIE = gql`
    query getMovie($id: Int!) {
        movie(id: $id){
            id
            title
            medium_cover_image
            description_intro
            rating
            language
            genres
            isLiked @client
        }
    }
    `;
    /* suggestions(id: $id){
        id
        medium_cover_image
    } */
    
export default () => {
    const {id} = useParams();
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { id: +id }
    });
    let genres = "";
    if (data?.movie) {
        for (let index = 0; index < data.movie.genres.length; index++) {
            const genre = data.movie.genres[index];
            if (index === 0) {
                genres += genre;
            } else {
                genres += " " + genre;
            }
        }
    }
    
    // if (loading) {
    //     return "loading"
    // }
    // if (data && data.movie) {
    //     return data.movie.title;
    // }
    return (
        <Container>
            <Column>
                <Title>
                    {loading ? "Loading..." : (
                        <>
                        data.movie.title
                        {/* <ToggleLike onClick={toggleLikeMovie}>{data?.movie?.isLiked ? "🙆‍♂️" : "🙎‍♂️"}</ToggleLike> */}
                        </>
                    )}
                </Title>
                <Subtitle>
                    {genres} {data?.movie ? "·" : ""} {data?.movie?.rating}
                </Subtitle>
                <Description>{data?.movie?.description_intro}</Description>
            </Column>
            <Poster bg={data?.movie?.medium_cover_image}></Poster>
            {/* {data?.suggestions?.map(s => {<Suggestions bg={s.medium_cover_image}></Suggestions>})} */}
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`;

const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`;

const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px; 
`;

const Description = styled.p`
    font-size: 28px;
`;

const Poster = styled.div`
    width: 25%;
    height: 60%;
    background-color: transparent;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center center;
`;

const Suggestions = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    width: 60%;
    position: relative;
    top: -50px;
`;

// const ToggleLike = styled.button`
//     margin-left: 10px;
//     font-size: 50px;
//     background-color: transparent;
//     background-image: none;
//     border-color: transparent;
//     border: none;
//     &:hover {
//         cursor: pointer;
//     }
//     &:focus {
//         outline: none;
//     }
// `;
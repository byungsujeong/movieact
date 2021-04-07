import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";
// import ToggleLike from "./ToggleLike";

const TOGGLE_LIKE_MOVIE = gql`
   mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
      toggleLikeMovie(id: $id, isLiked: $isLiked) @client
   }
`;

export default ({ id, bg, isLiked }) => {
   const [toggleLikeMovie] = useMutation(TOGGLE_LIKE_MOVIE, {variables: {id: parseInt(id), isLiked }});
   return (
   <Container>
      <Link to={`/${id}`}>
         <Poster bg={bg} />
      </Link>
      {/* <ToggleLike key={id} id={id} isLiked={isLiked}></ToggleLike> */}
      <ToggleLike onClick={toggleLikeMovie}>{isLiked ? "🙆‍♂️" : "🙎‍♂️"}</ToggleLike>
   </Container>
   );
}



const Container = styled.div`
   height: 400px;
   border-radius: 7px;
   width: 100%;
   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px, 6px rgba(0, 0, 0, 0.23);
   background-color: transparent;
`;

const Poster = styled.div`
   background-image: url(${props => props.bg});
   height: 100%;
   width: 100%;
   background-size: cover;
   background-position: center center;
   border-radius: 7px;
`;

const ToggleLike = styled.button`
  background-color: transparent;
  background-image: none;
  border-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
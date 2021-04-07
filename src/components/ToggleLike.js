import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

const TOGGLE_LIKE_MOVIE = gql`
   mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
      toggleLikeMovie(id: $id, isLiked: $isLiked) @client
   }
`;

export default ({ id, isLiked }) => {
    const [toggleLikeMovie] = useMutation(TOGGLE_LIKE_MOVIE, {variables: {id: parseInt(id), isLiked }});
    return (
       <ToggleLike onClick={toggleLikeMovie}>{isLiked ? "🙆‍♂️" : "🙎‍♂️"}</ToggleLike>
    );
 };

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
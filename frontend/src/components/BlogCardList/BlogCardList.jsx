import React, { useState, useEffect } from 'react';
import BlogCard from '../BlogCard';
// import cardInfo from './blogData';
import { Grid, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import theme from '../../styles/theme';
import { topics } from '../../utils/agent';

const StyledCategoryHeader = Styled.h2`
  font-family: ${theme.fonts.PTSerif};
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 48px;
  color: ${theme.colors.black};
`;

const StyledLink = Styled(Link)`
  font-family: ${theme.fonts.Poppins};
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  color: ${theme.colors.purple};
  & active {
    color: #341A93;
  }
`;

//function to remove html tags from
const removeHtmlTags = str => {
  if (str === null || str === '') {
    return false;
  } else {
    str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
  }
};

const limitWordDisplay = (str, wordLimit) => {
  let description = removeHtmlTags(str)
    .split(' ')
    .slice(0, wordLimit)
    .join(' ');
  return `${description}`;
};

const isVideoOrImage = str => {
  //have string
  //need to check end of string to see if contains jpeg, jpg, png,
};

const BlogCardList = ({ blogHeader, linkText, cardInfo }) => {
  const cards = !cardInfo
    ? null
    : cardInfo.slice(0, 3).map((card, index) => {
        return (
          <Grid.Column computer={5} mobile={16} tablet={7} key={card.id}>
            <BlogCard
              blogImgurl={removeHtmlTags(card.blogpost.media_url)}
              blogTitle={removeHtmlTags(card.title_content)}
              blogDescription={limitWordDisplay(card.body_content, 10)}
            />
          </Grid.Column>
        );
      });

  return (
    <>
      <Grid relaxed stackable columns="equal">
        {blogHeader ? (
          <Grid.Row>
            <Grid.Column>
              <List horizontal>
                <List.Item>
                  <StyledCategoryHeader>{blogHeader}</StyledCategoryHeader>
                </List.Item>
                <List.Item>
                  <StyledLink to={linkText}>view all</StyledLink>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        ) : null}
        <Grid.Row>{cards}</Grid.Row>
      </Grid>
    </>
  );
};

export default BlogCardList;

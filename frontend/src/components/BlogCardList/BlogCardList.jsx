import React from 'react';
import BlogCard from '../BlogCard';
import { Grid, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import theme from '../../styles/theme';

//INFO
//Props: blogHeader, linkText, cardInfo, wordCount, cardCount
//to use the component can nest it inside your section component else it takes up full width of page
//Can have it display the Topic header if you want or you could make your own if don't pass a blogHeader to your CardList
//wordCount and cardCount limit the number of cards displayed, by default it displays all the cards in cardInfo array that is passed
//card info is your array with your desired

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

//function removes the html tags if any
const removeHtmlTags = str => {
  if (str === null || str === '') {
    return false;
  } else {
    str = str.toString();
    //optimization could be done rather than using regex
    return str.replace(/(<([^>]+)>)/gi, '');
  }
};

//this function limits the amount of words that are displayed on the BlogCard
const limitWordDisplay = (str, wordLimit) => {
  let description = removeHtmlTags(str)
    .split(' ')
    .slice(0, wordLimit)
    .join(' ');
  return `${description}`;
};

//this function deterimines if media_url is an image or video
const isVideoOrImage = urlStr => {
  //need to check end of string to see if contains jpeg, jpg, png,
  // let  extensionsArr = [ "jpeg", "jpg", "gif", "png" ];
  //rather than using regex can try stripping off last part of url, and seeing if that bit contains any of the image extenstions
  let alteredImage = removeHtmlTags(urlStr);
  let isImage = urlStr.match(/\.(jpeg|jpg|gif|png)$/) != null;
  return isImage ? alteredImage : null;
};

const BlogCardList = ({
  blogHeader,
  linkText,
  cardInfo,
  wordCount,
  cardCount
}) => {
  const cards = !cardInfo
    ? null
    : cardInfo.slice(0, !cardCount ? cardInfo.length : cardCount).map(card => {
        return (
          <Grid.Column computer={5} mobile={16} tablet={7} key={card.id}>
            <BlogCard
              blogImgurl={isVideoOrImage(card.blogpost.media_url)}
              blogVideo={removeHtmlTags(card.blogpost.media_url)}
              blogTitle={removeHtmlTags(card.title_content)}
              blogDescription={limitWordDisplay(
                card.body_content,
                !wordCount ? 10 : wordCount
              )}
            />
          </Grid.Column>
        );
      });

  return (
    <Grid relaxed stackable>
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
  );
};

export default BlogCardList;

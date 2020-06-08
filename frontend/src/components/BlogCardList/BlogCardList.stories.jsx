import React from 'react';
import BlogCardList from './BlogCardList';

export default {
  component: BlogCardList,
  title: 'BlogCardList',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/
};

export const Default = () => <BlogCardList />;

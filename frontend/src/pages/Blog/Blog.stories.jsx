import React from 'react';

import Blog from './Blog';

export default {
  component: Blog,
  title: 'Landing Blog Page',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/
};

export const Default = () => <Blog />;

import React from 'react';
import { Grid, ResponsiveContext } from 'grommet';

export const ResponsiveGrid = ({ children }) => (
  <ResponsiveContext.Consumer>
    {size => (
      <Grid
        columns={size === 'small' ? ['full'] : ['1/4', '1/4', '1/4', '1/4']}
        justify="center"
        margin={{ horizontal: 'medium' }}>
        {children}
      </Grid>
    )}
  </ResponsiveContext.Consumer>
);

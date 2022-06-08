import React from 'react';
import { Grid, GridProps } from '@coop/myra/ui';

interface IGroupContainer extends GridProps {
  children: React.ReactNode;
}

export const InputGroupContainer = ({ children, ...rest }: IGroupContainer) => {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      rowGap="s32"
      columnGap="s20"
      {...rest}
    >
      {children}
    </Grid>
  );
};

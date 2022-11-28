import React from 'react';

import { Grid, GridProps } from '@myra-ui';

interface IGroupContainer extends GridProps {
  children: React.ReactNode;
}

export const InputGroupContainer = ({ children, ...rest }: IGroupContainer) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" rowGap="s16" columnGap="s20" {...rest}>
      {children}
    </Grid>
  );
};

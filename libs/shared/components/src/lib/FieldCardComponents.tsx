import React from 'react';

import { Grid } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface FieldCardComponentsProps {
  children: React.ReactNode;
  rows: string;
}

export function FieldCardComponents({
  children,
  rows,
}: FieldCardComponentsProps) {
  return (
    <Grid
      templateRows={rows}
      p="s16"
      bg="background.500"
      borderRadius="br2"
      gap="s10"
    >
      {children}
    </Grid>
  );
}

export default FieldCardComponents;

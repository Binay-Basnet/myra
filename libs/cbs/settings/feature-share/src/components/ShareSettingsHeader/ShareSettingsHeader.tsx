/* eslint-disable-next-line */
import { Text, Box } from '@coop/shared/ui';
import React from 'react';

export interface ShareSettingsHeaderProps {
  title: string;
}

export function ShareSettingsHeader(props: ShareSettingsHeaderProps) {
  return (
    <Box
      width="100%"
      height="s40"
      display="flex"
      alignItems="center"
      borderBottom="1px"
      borderBottomColor="border.layout"
    >
      <Text fontSize="r2" color="gray.800" fontWeight="600">
        {props.title}
      </Text>
    </Box>
  );
}

export default ShareSettingsHeader;

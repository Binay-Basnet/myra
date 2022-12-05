import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';

import { Button, Icon } from '@myra-ui/foundations';

/* eslint-disable-next-line */
export interface SettingsButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  buttonLabel?: string;
  icon?: IconType;
}

export const SettingsButton = (props: SettingsButtonProps) => {
  const { onClick, buttonLabel, icon } = props;
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      color="#37474F"
      height="s48"
      width="full"
      justifyContent="start"
      leftIcon={<Icon as={icon} size="md" color="primary.500" />}
      whiteSpace="break-spaces"
      lineHeight={1.5}
      textAlign="left"
    >
      {buttonLabel}
    </Button>
  );
};

export default SettingsButton;

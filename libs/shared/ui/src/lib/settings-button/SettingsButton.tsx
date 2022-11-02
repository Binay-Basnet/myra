import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';

import Button from '../button/Button';
import Icon from '../icon/Icon';

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
    >
      {buttonLabel}
    </Button>
  );
};

export default SettingsButton;

import React from 'react';
import { IoCloseOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Icon,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IAlertContainer {
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
}

export const AlertContainer = ({
  title,
  description,
  buttonLabel,
  onClick,
}: IAlertContainer) => {
  const { t } = useTranslation();
  return (
    <Alert display="flex" flexDirection="column" gap="s16" status="success">
      <Box width="100%">
        <AlertTitle display="flex" justifyContent="space-between">
          <Box display="flex" gap="s12">
            <Icon mt="s4" as={IoInformationCircleOutline} />
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r2"
            >
              {t[title]}
            </Text>
          </Box>
          <Icon cursor="pointer" size="lg" color="grey" as={IoCloseOutline} />
        </AlertTitle>
        <AlertDescription ml="s32">{description}</AlertDescription>
      </Box>
      <Button
        alignSelf="flex-end"
        position="relative"
        leftIcon={<AddIcon />}
        onClick={onClick}
      >
        {t[buttonLabel]}
      </Button>
    </Alert>
  );
};

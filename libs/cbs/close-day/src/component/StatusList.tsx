import { IoCheckmarkDone, IoClose } from 'react-icons/io5';
import { Spinner } from '@chakra-ui/react';

import { Alert, Box, Divider, Icon, Text } from '@myra-ui';

import { EodState } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

interface IStatusListProps {
  statusList: {
    title: string;
    subTitle: string;
    status: EodState | null | undefined;
    errors?: string[];
  }[];
}

export const StatusList = ({ statusList }: IStatusListProps) => {
  const { t } = useTranslation();

  const eodStatusIcon = (status: EodState | undefined | null) => {
    switch (status) {
      case EodState.Completed:
        return <Icon color="primary.500" as={IoCheckmarkDone} />;
      case EodState.CompletedWithErrors:
        return <Icon color="danger.500" as={IoClose} />;
      case EodState.Ongoing:
        return <Spinner size="sm" />;
      default:
        return <Icon color="danger.500" as={IoClose} />;
    }
  };

  const eodStatusText = (status: EodState | undefined | null) => {
    let statusText = '';
    switch (status) {
      case EodState.Completed:
        statusText = 'Completed';
        break;
      case EodState.CompletedWithErrors:
        statusText = 'Not completed';
        break;
      case EodState.Ongoing:
        statusText = 'Ongoing';
        break;
      default:
        statusText = 'Not completed';
    }

    return statusText;
  };

  return (
    <>
      {statusList.map(({ title, subTitle, status, errors }, index) => (
        <>
          <Box display="flex" gap="s16" py="s16" key={title}>
            <NumberStatus number={index + 1} active={status === EodState.Completed} />
            <Box display="flex" flexDirection="column" gap="s16">
              <Box>
                <Text
                  fontSize="r1"
                  fontWeight="SemiBold"
                  color="neutralColorLight.Gray-80"
                  lineHeight="150%"
                >
                  {t[title] ?? title}
                </Text>
                <Text
                  fontSize="r1"
                  fontWeight="Regular"
                  color="neutralColorLight.Gray-80"
                  lineHeight="150%"
                >
                  {t[subTitle] ?? subTitle}
                </Text>
              </Box>

              <Box display="flex" alignItems="center" gap="s8">
                {eodStatusIcon(status)}

                <Text
                  fontSize="s3"
                  fontWeight="SemiBold"
                  color="neutralColorLight.Gray-70"
                  lineHeight="150%"
                >
                  {eodStatusText(status)}
                </Text>
              </Box>

              {status === EodState.CompletedWithErrors &&
                errors?.length &&
                errors?.map((error) => (
                  <Alert status="error" hideCloseIcon>
                    <Text
                      fontSize="r1"
                      fontWeight="SemiBold"
                      color="neutralColorLight.Gray-80"
                      lineHeight="150%"
                    >
                      {error}
                    </Text>
                  </Alert>
                ))}
            </Box>
          </Box>
          <Divider />
        </>
      ))}
    </>
  );
};

interface INumberStatusProps {
  active: boolean;
  number: number | string;
}

export const NumberStatus = ({ number, active }: INumberStatusProps) => (
  <Box
    w="s20"
    h="s20"
    display="flex"
    alignItems="center"
    justifyContent="center"
    fontSize="s2"
    fontWeight="600"
    borderRadius="100%"
    bg={active ? 'primary.500' : 'gray.500'}
    color="white"
  >
    {number}
  </Box>
);

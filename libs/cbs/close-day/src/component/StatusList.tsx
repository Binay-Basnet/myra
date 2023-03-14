import { useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FiLoader } from 'react-icons/fi';
import { Spinner, useDisclosure } from '@chakra-ui/react';

import { Alert, Box, Icon, Modal, Text } from '@myra-ui';

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

const eodStatusIcon = (status: EodState | undefined | null) => {
  switch (status) {
    case EodState.Completed:
      return <Icon color="primary.500" as={BsCheckCircleFill} />;
    case EodState.CompletedWithErrors:
      return <Icon color="warning.500" as={BsCheckCircleFill} />;
    case EodState.Ongoing:
      return <Spinner size="sm" />;
    case EodState.NotStarted:
      return <Icon color="gray.600" as={FiLoader} />;
    default:
      return <Icon color="gray.600" as={FiLoader} />;
  }
};

export const StatusList = ({ statusList }: IStatusListProps) => {
  const { t } = useTranslation();

  const { isOpen, onClose, onToggle } = useDisclosure();

  const [selectedErrors, setSelectedErrors] = useState<string[]>([]);

  const [selectedTitle, setSelectedTitle] = useState<string>('');

  const eodStatusText = (status: EodState | undefined | null, title: string) => {
    let statusText = '';
    switch (status) {
      case EodState.Completed:
        statusText = `${t[title] ?? title} Completed Successfully`;
        break;
      case EodState.CompletedWithErrors:
        statusText = `${t[title] ?? title} Completed with Exception`;
        break;
      case EodState.Ongoing:
        statusText = `${t[title] ?? title} in Progress`;
        break;
      case EodState.NotStarted:
        statusText = `${t[title] ?? title} not Started`;
        break;
      default:
        statusText = '';
    }

    return statusText;
  };

  const handleShowErrors = (errors: string[], title: string) => {
    setSelectedErrors(errors);
    setSelectedTitle(title);
    onToggle();
  };

  return (
    <>
      {statusList.map(
        ({ title, status, errors }) =>
          status !== 'NOT_STARTED' && (
            <Box
              display="flex"
              flexDirection="column"
              key={title}
              border="1px"
              borderColor="border.layout"
              borderRadius="br2"
            >
              <Box bg="highlight.500" borderBottom="1px" borderColor="border.layout" p="s12">
                <Text fontSize="r1" color="gray.800" fontWeight={500}>
                  {t[title] ?? title}
                </Text>
              </Box>
              <Box display="flex" flexDirection="column" p="s16" gap="s16">
                {errors?.length ? (
                  <Text
                    fontSize="r1"
                    color="danger.500"
                    fontWeight={400}
                    cursor="pointer"
                    onClick={() => handleShowErrors(errors, t[title] ?? title)}
                  >{`${errors.length} Errors in ${t[title] ?? title}`}</Text>
                ) : null}
                <Box display="flex" gap="s8" alignItems="center">
                  {eodStatusIcon(status)}
                  <Text fontSize="r1" fontWeight={400} color="gray.700" lineHeight="150%">
                    {eodStatusText(status, title)}
                  </Text>
                </Box>
              </Box>
            </Box>
          )
      )}

      <DayEndErrorsModal
        isOpen={isOpen}
        onClose={onClose}
        errors={selectedErrors}
        title={selectedTitle}
      />
    </>
  );
};

// interface INumberStatusProps {
//   active: boolean;
//   number: number | string;
// }

// export const NumberStatus = ({ number, active }: INumberStatusProps) => (
//   <Box
//     w="s20"
//     h="s20"
//     display="flex"
//     alignItems="center"
//     justifyContent="center"
//     fontSize="s2"
//     fontWeight="600"
//     borderRadius="100%"
//     bg={active ? 'primary.500' : 'gray.500'}
//     color="white"
//   >
//     {number}
//   </Box>
// );

interface IDayEndErrorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  errors: string[];
  title: string;
}

const DayEndErrorsModal = ({ isOpen, onClose, errors, title }: IDayEndErrorsModalProps) => (
  <Modal open={isOpen} onClose={onClose} title={title}>
    <Box display="flex" flexDirection="column" gap="s16">
      <Text
        fontSize="r1"
        color="danger.500"
        fontWeight={400}
      >{`${errors.length} errors found during ${title}`}</Text>
      {errors?.map((error) => (
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
  </Modal>
);

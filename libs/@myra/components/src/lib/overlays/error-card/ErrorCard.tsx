/* eslint-disable-next-line */
import { Box } from '@chakra-ui/react';
import { Button, Text } from '@myra-ui/foundations';

export interface ErrorCardProps {
  title?: string;
  subTitle?: string;
  goBackHandler?: () => void;
}

export const ErrorCard = ({ title, subTitle, goBackHandler }: ErrorCardProps) => (
  <Box
    bg="white"
    p="s24"
    display="flex"
    flexDir="column"
    alignItems="center"
    gap="s32"
    maxW="500px"
    boxShadow="E2"
  >
    <Box display="flex" flexDir="column" alignItems="center" gap="s16">
      <ErrorCross />

      <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" gap="s8">
        <Text fontSize="l1" fontWeight="500" color="danger.500">
          {title}
        </Text>
        <Text fontSize="r1" fontWeight="400" textAlign="center" color="gray.600" maxW="420px">
          {subTitle}
        </Text>
      </Box>
    </Box>
    <Box>
      <Button shade="danger" onClick={goBackHandler}>
        Go Back
      </Button>
    </Box>
  </Box>
);

export default ErrorCard;

export const ErrorCross = () => (
  <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="76" height="76" rx="38" fill="#FFA9A3" />
    <rect x="8" y="8" width="60" height="60" rx="30" fill="#FF4538" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50.552 27.6109C51.1493 27.0136 51.1493 26.0452 50.552 25.448C49.9548 24.8507 48.9864 24.8507 48.3891 25.448L38 35.8371L27.6109 25.448C27.0136 24.8507 26.0452 24.8507 25.448 25.448C24.8507 26.0452 24.8507 27.0136 25.448 27.6109L35.8371 38L25.448 48.3891C24.8507 48.9864 24.8507 49.9548 25.448 50.552C26.0452 51.1493 27.0136 51.1493 27.6109 50.552L38 40.1629L48.3891 50.552C48.9864 51.1493 49.9548 51.1493 50.552 50.552C51.1493 49.9548 51.1493 48.9864 50.552 48.3891L40.1629 38L50.552 27.6109Z"
      fill="white"
    />
  </svg>
);

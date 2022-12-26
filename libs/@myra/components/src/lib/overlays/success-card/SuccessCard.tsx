import React, { useRef } from 'react';
import { AiOutlinePlus, AiOutlinePrinter } from 'react-icons/ai';
import ReactToPrint from 'react-to-print';
import dayjs from 'dayjs';

import { Avatar, Box, Button, Icon, Text } from '@myra-ui/foundations';

import { useAppSelector } from '@coop/cbs/data-access';
import { formatAddress } from '@coop/cbs/utils';

export interface SuccessCardProps {
  title: string;
  subTitle: string;
  details: Record<string, React.ReactNode>;
  total?: string;
  type: string;
  completeHandler?: () => void;
}

export const SuccessCard = ({
  title,
  subTitle,
  details,
  total,
  type,
  completeHandler,
}: SuccessCardProps) => {
  const componentRef = useRef<HTMLInputElement | null>(null);

  return (
    <Box bg="white" p="s24" display="flex" flexDir="column" gap="s32" maxW="500px" boxShadow="E2">
      <Box display="flex" flexDir="column" alignItems="center" gap="s16">
        <SuccessCheckmark />

        <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" gap="s8">
          <Text fontSize="l1" fontWeight="500" color="primary.500">
            {title}
          </Text>
          <Text fontSize="r1" fontWeight="400" textAlign="center" color="gray.600" maxW="420px">
            {subTitle}
          </Text>
        </Box>
      </Box>

      <Box bg="highlight.500" display="flex" flexDir="column" py="s8" px="s16">
        <Box
          borderBottom={total ? '1px' : 'none'}
          borderBottomColor="border.layout"
          display="flex"
          flexDir="column"
          gap="s10"
          py="s8"
        >
          {Object.entries(details).map((detail, index) => (
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box color="gray.600" fontSize="s3" fontWeight="500">
                {detail[0]}
              </Box>

              {index === 0 ? (
                detail[1]
              ) : (
                <Box color="gray.700" fontSize="s3" fontWeight="600" textTransform="capitalize">
                  {detail[1]?.toString()?.replace(/_/g, ' ')?.toLowerCase()}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {total && (
          <Box display="flex" py="s8" justifyContent="space-between">
            <Box />

            <Box display="flex" flexDir="column" gap="s4" alignItems="end" justifyContent="end">
              <Text fontSize="s3" color="gray.600" fontWeight="500" lineHeight="125%">
                Total Amount
              </Text>
              <Text fontSize="r2" color="primary.500" fontWeight="500" lineHeight="125%">
                Rs. {total}
              </Text>
            </Box>
          </Box>
        )}
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <ReactToPrint
          trigger={() => (
            <Button variant="ghost" leftIcon={<Icon as={AiOutlinePrinter} />}>
              Print
            </Button>
          )}
          content={() => componentRef.current}
        />

        <Box display="flex" gap="s8">
          <Button variant="outline" leftIcon={<Icon as={AiOutlinePlus} />}>
            New {type}
          </Button>
          <Button onClick={completeHandler}>Done</Button>
        </Box>
      </Box>

      <SuccessPrint total={total as string} details={details} ref={componentRef} />
    </Box>
  );
};

export default SuccessCard;

const SuccessCheckmark = () => (
  <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.285645" width="75.4286" height="75.4286" rx="37.7143" fill="#C2DBCA" />
    <rect x="8.28564" y="8" width="59.4286" height="59.4286" rx="29.7143" fill="white" />
    <path
      d="M37.9999 8C21.6156 8 8.28564 21.33 8.28564 37.7143C8.28564 54.0986 21.6156 67.4286 37.9999 67.4286C54.3842 67.4286 67.7142 54.0986 67.7142 37.7143C67.7142 21.33 54.3842 8 37.9999 8ZM32.5714 52.6257L21.0571 39.83L24.4556 36.7714L32.4556 45.66L51.4285 23.0657L54.9342 26L32.5714 52.6257Z"
      fill="#3D8F5F"
    />
  </svg>
);

interface SuccessPrintProps {
  details: Record<string, React.ReactNode>;
  total: string;
}

const SuccessPrint = React.forwardRef<HTMLInputElement, SuccessPrintProps>(
  ({ details, total }, ref) => {
    const user = useAppSelector((state) => state.auth.user);

    return (
      <Box
        ref={ref}
        display="none"
        bg="white"
        p="s32"
        flexDir="column"
        gap="s32"
        sx={{
          '@media print': {
            display: 'flex',
          },
        }}
      >
        <Box>
          <Box px="s16" py="s16" display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap="s16">
              <Box position="relative" w="s60" h="s60">
                <Avatar
                  w="s60"
                  h="s60"
                  name={user?.organization?.basicDetails?.name as string}
                  src={user?.organization?.basicDetails?.logo as string}
                />
              </Box>

              <Box display="flex" flexDir="column" gap="s4">
                <Text fontSize="r2" fontWeight="500" color="gray.800" lineHeight="0.8">
                  {user?.organization?.basicDetails?.name}
                </Text>
                <Text fontSize="s1" fontWeight="400" color="gray.700">
                  Contact: {user?.organization?.contactDetails?.phoneNumber} | Email:{' '}
                  {user?.organization?.contactDetails?.email ?? 'N/A'} | Website:{' '}
                  {user?.organization?.contactDetails?.website ?? 'N/A'}
                </Text>
              </Box>
            </Box>
            <Box>
              <Box display="flex" gap="s4">
                <Text fontSize="s1" color="gray.700">
                  Address:
                </Text>
                <Text fontSize="s1" color="gray.700" fontWeight="500" whiteSpace="nowrap">
                  {formatAddress(user?.organization?.address)}
                </Text>
              </Box>

              <Box display="flex" gap="s4">
                <Text fontSize="s1" color="gray.700">
                  Regd No:
                </Text>
                <Text fontSize="s1" color="gray.700" fontWeight="500">
                  {user?.organization?.registrationDetails?.regdNo ?? 'N/A'}
                </Text>
              </Box>

              <Box display="flex" gap="s4">
                <Text fontSize="s1" color="gray.700">
                  Pan:
                </Text>
                <Text fontSize="s1" color="gray.700" fontWeight="500">
                  {user?.organization?.registrationDetails?.panOrVat ?? 'N/A'}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box
            w="100%"
            textAlign="right"
            gap="s4"
            py="s16"
            borderBottom="2px"
            borderBottomColor="#000"
          >
            <Text fontSize="s1" color="gray.700" as="span">
              Printed Date: {dayjs(new Date()).format('YYYY-MM-DD')}
            </Text>
          </Box>
        </Box>

        <Box bg="highlight.500" display="flex" flexDir="column" py="s8" px="s16">
          <Box
            borderBottom={total ? '1px' : 'none'}
            borderBottomColor="border.layout"
            display="flex"
            flexDir="column"
            gap="s10"
            py="s8"
          >
            {Object.entries(details).map((detail) => (
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box color="gray.600" fontSize="s3" fontWeight="500">
                  {detail[0]}
                </Box>

                <Box color="gray.700" fontSize="s3" fontWeight="600" textTransform="capitalize">
                  {detail[1]?.toString()?.replace(/_/g, ' ')?.toLowerCase()}
                </Box>
              </Box>
            ))}
          </Box>

          {total && (
            <Box display="flex" py="s8" justifyContent="space-between">
              <Box />

              <Box display="flex" flexDir="column" gap="s4" alignItems="end" justifyContent="end">
                <Text fontSize="s3" color="gray.600" fontWeight="500" lineHeight="125%">
                  Total Amount
                </Text>
                <Text fontSize="r2" color="primary.500" fontWeight="500" lineHeight="125%">
                  Rs. {total}
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
);

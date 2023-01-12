import React, { useRef } from 'react';
import { AiOutlinePlus, AiOutlinePrinter } from 'react-icons/ai';
import ReactToPrint from 'react-to-print';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import { Avatar, Box, Button, Divider, Icon, Text } from '@myra-ui/foundations';

import { useAppSelector } from '@coop/cbs/data-access';
import { formatAddress } from '@coop/cbs/utils';

export interface SuccessCardProps {
  title: string;
  subTitle: string;
  details: Record<string, React.ReactNode>;
  total?: string;
  type: string;
  completeHandler?: () => void;
  newOpenHandler?: () => void;
  closeModal?: () => void;
  meta?: {
    member?: string | null;
    memberId?: string | null;
    accountName?: string | null;
    accountId?: string | null;
  };
  showSignatures?: boolean;
}

export const SuccessCard = ({
  title,
  subTitle,
  details,
  total,
  type,
  completeHandler,
  newOpenHandler,
  closeModal,
  meta,
  showSignatures,
}: SuccessCardProps) => {
  const router = useRouter();
  const componentRef = useRef<HTMLInputElement | null>(null);

  return (
    <Box
      bg="white"
      p="s24"
      display="flex"
      flexDir="column"
      gap="s32"
      maxW="500px"
      boxShadow="E2"
      overflowY="auto"
    >
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
          {Object.entries(details).map((detail) => (
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box color="gray.600" fontSize="s3" fontWeight="500">
                {detail[0]}
              </Box>

              {typeof detail[1] === 'string' ? (
                <Box color="gray.700" fontSize="s3" fontWeight="600" textTransform="capitalize">
                  {detail[1]?.toString()?.replace(/_/g, ' ')?.toLowerCase()}
                </Box>
              ) : (
                detail[1]
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
          <Button
            // TODO! WIP STATE
            display="none"
            variant="outline"
            isDisabled
            leftIcon={<Icon as={AiOutlinePlus} />}
            onClick={() => {
              if (newOpenHandler) {
                newOpenHandler();
              } else {
                router.push(router.asPath).then(() => {
                  if (closeModal) {
                    closeModal();
                  }
                });
              }
            }}
          >
            New {type}
          </Button>
          <Button onClick={completeHandler}>Done</Button>
        </Box>
      </Box>

      <SuccessPrint
        meta={meta}
        showSignatures={showSignatures}
        total={total as string}
        details={details}
        ref={componentRef}
      />
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
  meta?: {
    member?: string | null;
    memberId?: string | null;
    accountName?: string | null;
    accountId?: string | null;
  };
  details: Record<string, React.ReactNode>;
  total: string;
  showSignatures?: boolean;
}

const SuccessPrint = React.forwardRef<HTMLInputElement, SuccessPrintProps>(
  ({ details, total, meta, showSignatures }, ref) => {
    const user = useAppSelector((state) => state.auth.user);

    return (
      <Box
        ref={ref}
        display="none"
        bg="white"
        p="s32"
        flexDir="column"
        gap="s8"
        position="relative"
        sx={{
          '@media print': {
            display: 'flex',
          },
          '@page': {
            size: 'A4 portrait',
            margin: '0.1in',
          },
        }}
      >
        <Box w="100%" mb="s12">
          <Box display="flex" flexDir="column" gap="s12">
            <Box display="flex" alignItems="center" gap="s8">
              <Box position="relative">
                <Avatar
                  w="s48"
                  h="s48"
                  name={user?.organization?.basicDetails?.name as string}
                  src={user?.organization?.basicDetails?.logo as string}
                />
              </Box>

              <Box display="flex" flexDir="column" gap="s4">
                <Text fontSize="r2" fontWeight="500" color="gray.800" lineHeight="0.8">
                  {user?.organization?.basicDetails?.name}
                </Text>
                <Text fontSize="s2" fontWeight="400" color="gray.700">
                  Contact: {user?.organization?.contactDetails?.phoneNumber} | Email:{' '}
                  {user?.organization?.contactDetails?.email ?? 'N/A'} | Website:{' '}
                  {user?.organization?.contactDetails?.website ?? 'N/A'}
                </Text>
              </Box>
            </Box>

            <Box display="flex" alignItems="start" justifyContent="space-between">
              <Box display="flex" flexDir="column">
                <Text fontSize="s2" color="gray.700" as="span">
                  Branch: {user?.currentBranch?.name}
                </Text>
                <Text fontSize="s2" color="gray.700" as="span">
                  Printed Date: {dayjs(new Date()).format('YYYY-MM-DD')}
                </Text>
              </Box>

              <Box>
                <Box display="flex" gap="s4">
                  <Text fontSize="s2" color="gray.700">
                    Address:
                  </Text>
                  <Text fontSize="s2" color="gray.700" fontWeight="500" whiteSpace="nowrap">
                    {formatAddress(user?.organization?.address)}
                  </Text>
                </Box>

                <Box display="flex" gap="s4">
                  <Text fontSize="s2" color="gray.700">
                    Regd No:
                  </Text>
                  <Text fontSize="s2" color="gray.700" fontWeight="500">
                    {user?.organization?.registrationDetails?.regdNo ?? 'N/A'}
                  </Text>
                </Box>

                <Box display="flex" gap="s4">
                  <Text fontSize="s2" color="gray.700">
                    Pan:
                  </Text>
                  <Text fontSize="s2" color="gray.700" fontWeight="500">
                    {user?.organization?.registrationDetails?.panOrVat ?? 'N/A'}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider mb={0} borderTop="1px solid" borderTopColor="background.500" />
        {meta && Object.keys(meta).length !== 0 && (
          <Box
            w="100%"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            rowGap="s4"
            columnGap="s8"
          >
            {meta?.member && (
              <Text fontSize="s2" fontWeight="400" color="gray.700">
                Member: {meta?.member}
              </Text>
            )}

            {meta?.memberId && (
              <Text fontSize="s2" fontWeight="400" color="gray.700">
                Member Code: {meta?.memberId}
              </Text>
            )}

            {meta?.accountName && (
              <Text fontSize="s2" fontWeight="400" color="gray.700">
                Account Name: {meta?.accountName}
              </Text>
            )}

            {meta?.accountId && (
              <Text fontSize="s2" fontWeight="400" color="gray.700">
                Account Id: {meta?.accountId}
              </Text>
            )}
          </Box>
        )}

        <Box mt="s12" w="100%" bg="highlight.500" display="flex" flexDir="column" py="s8" px="s16">
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
                <Box color="gray.600" fontSize="s2" fontWeight="500">
                  {detail[0]}
                </Box>
                {typeof detail[1] === 'string' ? (
                  <Box color="gray.700" fontSize="s3" fontWeight="600" textTransform="capitalize">
                    {detail[1]?.toString()?.replace(/_/g, ' ')?.toLowerCase()}
                  </Box>
                ) : (
                  detail[1]
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

        {showSignatures && (
          <Box
            position="fixed"
            w="100%"
            bottom="100px"
            left={0}
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gap="s32"
            px="s32"
          >
            <Box display="flex" flexDir="column" alignItems="center" gap="s12">
              <Divider borderTop="1px dotted black" />
              <Text fontSize="s2" color="gray.800" fontWeight="500">
                Prepared By
              </Text>
            </Box>
            <Box display="flex" flexDir="column" alignItems="center" gap="s12">
              <Divider borderTop="1px dotted black" />
              <Text fontSize="s2" color="gray.800" fontWeight="500">
                Verified By
              </Text>
            </Box>
            <Box display="flex" flexDir="column" alignItems="center" gap="s12">
              <Divider borderTop="1px dotted black" />
              <Text fontSize="s2" color="gray.800" fontWeight="500">
                Approved By
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    );
  }
);

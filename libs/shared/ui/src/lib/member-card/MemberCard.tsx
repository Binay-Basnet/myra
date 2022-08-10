import { useState } from 'react';
import {
  Box,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';

import { Avatar } from '../avatar/Avatar';
import { Button } from '../button/Button';

/* eslint-disable-next-line */
export interface MemberCardProps {
  isInline?: boolean;
  memberDetails: {
    name: string;
    avatar: string;
    memberID: string;
    gender: string;
    age: string | number;
    maritalStatus: string;
    dateJoined?: string;
    branch?: string;
    phoneNo?: string;
    email?: string;
    address?: string;
  };
  notice?: string;
  signaturePath?: string;
  citizenshipPath?: string;
  accountInfo?:
    | {
        name: string;
        type: string;
        ID: string;
        currentBalance?: string | number;
        minimumBalance?: string | number;
        guaranteeBalance?: string | number;
        overdrawnBalance?: string | number;
        fine?: string | number;
        branch?: string;
        openDate?: string;
        expiryDate?: string;
        lastTransactionDate?: string;
      }
    | undefined
    | null;
  viewProfileHandler: () => void;
  viewAccountTransactionsHandler: () => void;
}

export function MemberCard({
  isInline = false,
  memberDetails,
  notice,
  signaturePath,
  citizenshipPath,
  accountInfo,
  viewProfileHandler,
  viewAccountTransactionsHandler,
}: MemberCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [modalImage, setModalImage] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');

  const handleModalOpen = (imgPath: string, title: string) => {
    setModalImage(imgPath);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalTitle('');
    setModalImage('');
  };

  return (
    <>
      <Box bg="white" w={isInline ? '960px' : '320px'}>
        {!isInline && (
          <Box px="s16" py="s8">
            <Text
              fontSize="s3"
              fontWeight="500"
              color="neutralColorLight.Gray-60"
            >
              Member Info
            </Text>
          </Box>
        )}

        <Box
          p="s16"
          display="flex"
          flexDirection={isInline ? 'row' : 'column'}
          justifyContent={isInline ? 'space-between' : 'center'}
          alignItems={isInline ? 'flex-start' : 'normal'}
          gap="s8"
          borderTop="1px"
          borderBottom="1px"
          borderColor="border.layout"
        >
          <Box display="flex" gap="s8">
            <Avatar
              name={memberDetails.name}
              size="lg"
              src={memberDetails.avatar}
              onClick={() =>
                handleModalOpen(memberDetails.avatar, memberDetails.name)
              }
              cursor="pointer"
            />
            <Box>
              <Popover placement="bottom-start" gutter={3} trigger="hover">
                <PopoverTrigger>
                  <Text
                    fontSize="r1"
                    fontWeight="500"
                    color="primary.500"
                    cursor="pointer"
                  >
                    {memberDetails.name}
                  </Text>
                </PopoverTrigger>
                <PopoverContent w="610px">
                  <PopoverBody p={0}>
                    <Box p="s16" display="flex" flexDirection="column" gap="s8">
                      <Box display="flex" gap="s8">
                        <Avatar
                          name={memberDetails.name}
                          size="lg"
                          src={memberDetails.avatar}
                          onClick={() =>
                            handleModalOpen(
                              memberDetails.avatar,
                              memberDetails.name
                            )
                          }
                          cursor="pointer"
                        />

                        <Box>
                          <Text
                            fontSize="r1"
                            fontWeight="500"
                            color="primary.500"
                          >
                            {memberDetails.name}
                          </Text>
                          <Text fontSize="s3" fontWeight="400" color="gray.800">
                            {memberDetails.memberID}
                          </Text>
                          <Text fontSize="s3" fontWeight="400" color="gray.800">
                            {`${memberDetails.gender} | ${memberDetails.age} | ${memberDetails.maritalStatus}`}
                          </Text>
                        </Box>
                      </Box>

                      {notice && (
                        <Box
                          border="1px"
                          borderColor="warning.900"
                          bg="warning.0"
                          px="s8"
                          py="s4"
                        >
                          <Text
                            fontSize="s3"
                            fontWeight={400}
                            color="neutralColorLight.Gray-80"
                          >
                            {notice}
                          </Text>
                        </Box>
                      )}
                    </Box>

                    <Box
                      borderTop="1px"
                      borderColor="border.layout"
                      p="s16"
                      display="flex"
                      flexDirection="column"
                      gap="s36"
                    >
                      <Grid
                        templateColumns="repeat(3, 1fr)"
                        rowGap="s16"
                        columnGap="s20"
                      >
                        {memberDetails.dateJoined && (
                          <Box display="flex" flexDirection="column">
                            <Text
                              fontSize="r1"
                              fontWeight={400}
                              color="neutralColorLight.Gray-70"
                            >
                              Date Joined
                            </Text>
                            <Text
                              fontSize="r1"
                              fontWeight={500}
                              color="neutralColorLight.Gray-80"
                            >
                              {memberDetails.dateJoined}
                            </Text>
                          </Box>
                        )}

                        {memberDetails.branch && (
                          <Box display="flex" flexDirection="column">
                            <Text
                              fontSize="r1"
                              fontWeight={400}
                              color="neutralColorLight.Gray-70"
                            >
                              Branch
                            </Text>
                            <Text
                              fontSize="r1"
                              fontWeight={500}
                              color="neutralColorLight.Gray-80"
                            >
                              {memberDetails.branch}
                            </Text>
                          </Box>
                        )}

                        {memberDetails.phoneNo && (
                          <Box display="flex" flexDirection="column">
                            <Text
                              fontSize="r1"
                              fontWeight={400}
                              color="neutralColorLight.Gray-70"
                            >
                              Phone No.
                            </Text>
                            <Text
                              fontSize="r1"
                              fontWeight={500}
                              color="neutralColorLight.Gray-80"
                            >
                              {memberDetails.phoneNo}
                            </Text>
                          </Box>
                        )}

                        {memberDetails.email && (
                          <Box display="flex" flexDirection="column">
                            <Text
                              fontSize="r1"
                              fontWeight={400}
                              color="neutralColorLight.Gray-70"
                            >
                              Email
                            </Text>
                            <Text
                              fontSize="r1"
                              fontWeight={500}
                              color="neutralColorLight.Gray-80"
                            >
                              {memberDetails.email}
                            </Text>
                          </Box>
                        )}

                        {memberDetails.address && (
                          <Box display="flex" flexDirection="column">
                            <Text
                              fontSize="r1"
                              fontWeight={400}
                              color="neutralColorLight.Gray-70"
                            >
                              Address
                            </Text>
                            <Text
                              fontSize="r1"
                              fontWeight={500}
                              color="neutralColorLight.Gray-80"
                            >
                              {memberDetails.address}
                            </Text>
                          </Box>
                        )}
                      </Grid>

                      <Box display="flex" gap="s8">
                        <Button onClick={viewProfileHandler}>
                          View Profile
                        </Button>

                        {signaturePath && (
                          <Button
                            variant="outline"
                            onClick={() =>
                              handleModalOpen(
                                signaturePath,
                                `${memberDetails.name} - Signature`
                              )
                            }
                          >
                            View Signature
                          </Button>
                        )}

                        {citizenshipPath && (
                          <Button
                            variant="outline"
                            onClick={() =>
                              handleModalOpen(
                                citizenshipPath,
                                `${memberDetails.name} - Citizenship`
                              )
                            }
                          >
                            View Citizenship
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <Text fontSize="s3" fontWeight="400" color="gray.800">
                {memberDetails.memberID}
              </Text>
              <Text fontSize="s3" fontWeight="400" color="gray.800">
                {`${memberDetails.gender} | ${memberDetails.age}`}
              </Text>
            </Box>
          </Box>

          {notice && (
            <Box
              border="1px"
              borderColor="warning.900"
              bg="warning.0"
              px="s8"
              py="s4"
            >
              <Text
                fontSize="s3"
                fontWeight={400}
                color="neutralColorLight.Gray-80"
              >
                {notice}
              </Text>
            </Box>
          )}

          {!isInline && signaturePath && (
            <Box
              p="s10"
              border="1px"
              borderColor="border.layout"
              borderRadius="br2"
            >
              <Image
                width="auto"
                height="147px"
                src={signaturePath}
                onClick={() =>
                  handleModalOpen(
                    signaturePath,
                    `${memberDetails.name} - Signature`
                  )
                }
                cursor="pointer"
              />
            </Box>
          )}

          {!isInline && accountInfo && (
            <Box
              border="1px"
              borderColor="border.layout"
              display="flex"
              flexDirection="column"
            >
              <Box
                bg="neutralColorLight.Gray-10"
                p="s16"
                display="flex"
                flexDirection="column"
                gap="s4"
              >
                <Text fontSize="r1" fontWeight={500} color="primary.500">
                  {accountInfo.name}
                </Text>
                <Text fontSize="s3" fontWeight={400} color="gray.800">
                  {accountInfo.type}
                </Text>
                <Text fontSize="s3" fontWeight={400} color="gray.800">
                  {accountInfo.ID}
                </Text>
              </Box>

              {(accountInfo.currentBalance ||
                accountInfo.minimumBalance ||
                accountInfo.guaranteeBalance ||
                accountInfo.overdrawnBalance ||
                accountInfo.fine) && (
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="s4"
                  px="s16"
                  py="s8"
                  borderBottom="1px"
                  borderColor="border.layout"
                >
                  {accountInfo.currentBalance && (
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight={400} color="gray.500">
                        Current Balance
                      </Text>
                      <Text fontSize="s3" fontWeight={500} color="gray.800">
                        {accountInfo.currentBalance}
                      </Text>
                    </Box>
                  )}
                  {accountInfo.minimumBalance && (
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight={400} color="gray.500">
                        Minimum Balance
                      </Text>
                      <Text fontSize="s3" fontWeight={500} color="gray.800">
                        {accountInfo.minimumBalance}
                      </Text>
                    </Box>
                  )}
                  {accountInfo.guaranteeBalance && (
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight={400} color="gray.500">
                        Guarantee Balance
                      </Text>
                      <Text fontSize="s3" fontWeight={500} color="gray.800">
                        {accountInfo.guaranteeBalance}
                      </Text>
                    </Box>
                  )}
                  {accountInfo.overdrawnBalance && (
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight={400} color="gray.500">
                        Overdrawn Balance
                      </Text>
                      <Text fontSize="s3" fontWeight={500} color="gray.800">
                        {accountInfo.overdrawnBalance}
                      </Text>
                    </Box>
                  )}
                  {accountInfo.fine && (
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight={400} color="gray.500">
                        Fine
                      </Text>
                      <Text fontSize="s3" fontWeight={500} color="danger.500">
                        {accountInfo.fine}
                      </Text>
                    </Box>
                  )}
                </Box>
              )}

              {(accountInfo.branch ||
                accountInfo.openDate ||
                accountInfo.expiryDate ||
                accountInfo.lastTransactionDate) && (
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="s4"
                  px="s16"
                  py="s8"
                  borderBottom="1px"
                  borderColor="border.layout"
                >
                  {accountInfo.branch && (
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight={400} color="gray.500">
                        Account Branch
                      </Text>
                      <Text fontSize="s3" fontWeight={500} color="gray.800">
                        {accountInfo.branch}
                      </Text>
                    </Box>
                  )}
                  {accountInfo.openDate && (
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight={400} color="gray.500">
                        Account Open Date
                      </Text>
                      <Text fontSize="s3" fontWeight={500} color="gray.800">
                        {accountInfo.openDate}
                      </Text>
                    </Box>
                  )}
                  {accountInfo.expiryDate && (
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight={400} color="gray.500">
                        Account Expiry Date
                      </Text>
                      <Text fontSize="s3" fontWeight={500} color="gray.800">
                        {accountInfo.expiryDate}
                      </Text>
                    </Box>
                  )}
                  {accountInfo.lastTransactionDate && (
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight={400} color="gray.500">
                        Last Transcation Date
                      </Text>
                      <Text fontSize="s3" fontWeight={500} color="gray.800">
                        {accountInfo.lastTransactionDate}
                      </Text>
                    </Box>
                  )}
                </Box>
              )}

              <Box px="s16" py="s8">
                <Button
                  variant="ghost"
                  onClick={viewAccountTransactionsHandler}
                >
                  View Account Transactions
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              fontSize="r2"
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
            >
              {modalTitle}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" alignItems="center">
            <Image
              height="100%"
              width="auto"
              src={modalImage}
              alt={modalTitle}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MemberCard;

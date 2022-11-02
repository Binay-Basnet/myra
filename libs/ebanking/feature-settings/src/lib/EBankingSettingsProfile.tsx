import { AiOutlineDownload } from 'react-icons/ai';
import Image from 'next/image';
import dayjs from 'dayjs';

import { formatAddress } from '@coop/cbs/utils';
import { useGetMemberProfileQuery } from '@coop/ebanking/data-access';
import { SettingsButton } from '@coop/ebanking/settings';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  DefaultFileIcon,
  DetailCardContent,
  Divider,
  Icon,
  Text,
} from '@coop/shared/ui';

import { SettingsHeader } from '../components/SettingsHeader';

export const EBankingSettingsProfile = () => {
  const { data } = useGetMemberProfileQuery();

  const profile = data?.eBanking?.profile?.data;

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <SettingsHeader />
      <Divider />
      <Box display="flex" flexDir="column" gap="s16">
        <Box borderRadius="br2" overflow="hidden">
          <Accordion allowMultiple allowToggle defaultIndex={0}>
            <AccordionItem border="none">
              {({ isExpanded }) => (
                <>
                  <SettingsButton title="Basic Information" isExpanded={isExpanded} />
                  <AccordionPanel
                    p="s16"
                    borderTop="1px"
                    borderColor="border.layout"
                    borderBottomRadius="br2"
                    display="flex"
                    flexDir="column"
                    gap="s16"
                  >
                    <DetailCardContent title="Full Name" subtitle={profile?.name?.local} />
                    <DetailCardContent
                      title="Date of birth"
                      subtitle={
                        <>
                          {dayjs(profile?.dobBS).format('YYYY-MM-DD')} (BS) <br />
                          {dayjs(profile?.dobAD).format('YYYY-MM-DD')} (AD)
                        </>
                      }
                    />
                    <DetailCardContent title="Gender" subtitle={profile?.gender?.local} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Box>
        <Box borderRadius="br2" overflow="hidden">
          <Accordion allowMultiple allowToggle defaultIndex={0}>
            <AccordionItem border="none">
              {({ isExpanded }) => (
                <>
                  <SettingsButton title="Contact Details" isExpanded={isExpanded} />
                  <AccordionPanel
                    p="s16"
                    borderTop="1px"
                    borderColor="border.layout"
                    borderBottomRadius="br2"
                    display="flex"
                    flexDir="column"
                    gap="s16"
                  >
                    <DetailCardContent title="Mobile Number" subtitle={profile?.mobileNumber} />
                    <DetailCardContent title="Email Address">
                      <Text fontWeight="600" fontSize="r1" color="gray.900">
                        {profile?.email}{' '}
                      </Text>
                    </DetailCardContent>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>{' '}
        </Box>
        <Box borderRadius="br2" overflow="hidden">
          <Accordion allowMultiple allowToggle defaultIndex={0}>
            <AccordionItem border="none">
              {({ isExpanded }) => (
                <>
                  <SettingsButton title="Address" isExpanded={isExpanded} />
                  <AccordionPanel
                    p="s16"
                    borderTop="1px"
                    borderColor="border.layout"
                    borderBottomRadius="br2"
                    display="flex"
                    flexDir="column"
                    gap="s16"
                  >
                    <DetailCardContent
                      title="Current Address"
                      subtitle={formatAddress(profile?.temporaryAddress)}
                    />
                    <DetailCardContent
                      title="Permanent Address"
                      subtitle={formatAddress(profile?.permanentAddress)}
                    />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>{' '}
        </Box>
        <Box borderRadius="br2" overflow="hidden">
          <Accordion allowMultiple allowToggle defaultIndex={0}>
            <AccordionItem border="none">
              {({ isExpanded }) => (
                <>
                  <SettingsButton title="Family Details" isExpanded={isExpanded} />
                  <AccordionPanel
                    p="s16"
                    borderTop="1px"
                    borderColor="border.layout"
                    borderBottomRadius="br2"
                    display="flex"
                    flexDir="column"
                    gap="s16"
                  >
                    <DetailCardContent
                      title="Marital Status"
                      subtitle={profile?.maritalStatus?.local}
                    />
                    {profile?.familyMembers?.map((member) => (
                      <DetailCardContent
                        title={`${member?.relationship?.local}'s Name`}
                        subtitle={member?.name?.local}
                      />
                    ))}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Box>

        <Box borderRadius="br2" overflow="hidden">
          <Accordion allowMultiple allowToggle defaultIndex={0}>
            <AccordionItem border="none">
              {({ isExpanded }) => (
                <>
                  <SettingsButton title="Documents" isExpanded={isExpanded} />
                  <AccordionPanel
                    p="s16"
                    borderTop="1px"
                    borderColor="border.layout"
                    borderBottomRadius="br2"
                    display="flex"
                    flexDir="column"
                    gap="s16"
                  >
                    <Text fontWeight="500" fontSize="s2" color="gray.600">
                      Passport Size Photo
                    </Text>
                    {profile?.photo?.map((photo) => (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        p="s16"
                        borderRadius="br2"
                        border="1px"
                        borderColor="border.layout"
                      >
                        <Box display="flex" alignItems="center" gap="s16">
                          <Box
                            w="s48"
                            h="s48"
                            display="flex"
                            // onClick={() => file?.type.includes('image') && onOpen()}
                            alignItems="center"
                            justifyContent="center"
                            position="relative"
                            borderRadius="br2"
                            overflow="hidden"
                            cursor="pointer"
                          >
                            {photo?.url ? (
                              <Image src={photo?.url} layout="fill" objectFit="contain" />
                            ) : (
                              <Icon as={DefaultFileIcon} size="lg" />
                            )}
                          </Box>
                          <Text fontSize="r1" color="gray.900">
                            {photo?.id}
                          </Text>
                        </Box>

                        <Icon as={AiOutlineDownload} color="primary.500" size="lg" />
                      </Box>
                    ))}
                  </AccordionPanel>
                  <AccordionPanel px="s16" display="flex" flexDir="column" gap="s16">
                    <Text fontWeight="500" fontSize="s2" color="gray.600">
                      Citizenship Photo
                    </Text>
                    {profile?.citizenship?.map((photo) => (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        p="s16"
                        borderRadius="br2"
                        border="1px"
                        borderColor="border.layout"
                      >
                        <Box display="flex" alignItems="center" gap="s16">
                          <Box
                            w="s48"
                            h="s48"
                            display="flex"
                            // onClick={() => file?.type.includes('image') && onOpen()}
                            alignItems="center"
                            justifyContent="center"
                            position="relative"
                            borderRadius="br2"
                            overflow="hidden"
                            cursor="pointer"
                          >
                            {photo?.url ? (
                              <Image src={photo?.url} layout="fill" objectFit="contain" />
                            ) : (
                              <Icon as={DefaultFileIcon} size="lg" />
                            )}
                          </Box>
                          <Text fontSize="r1" color="gray.900">
                            {photo?.id}
                          </Text>
                        </Box>

                        <Icon as={AiOutlineDownload} color="primary.500" size="lg" />
                      </Box>
                    ))}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

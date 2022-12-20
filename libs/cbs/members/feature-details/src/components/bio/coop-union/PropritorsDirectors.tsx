import { useRouter } from 'next/router';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  DetailsCard,
  Divider,
  Grid,
  Text,
} from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

import { AccordianMemberDetailsCardComponent } from '../components/AccordianCard';
import { DocumentComponent } from '../components/Documents';

export const PropritersDirectors = () => {
  const router = useRouter();

  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopUnionOperator =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.partnerDirectorDetails
      : null;

  return (
    <DetailsCard title="Account Operator Details" bg="white" hasTable>
      <Accordion defaultIndex={[0]} display="flex" flexDirection="column" gap="s16" allowToggle>
        {bioDataCoopUnionOperator?.map((item) => (
          <AccordionItem>
            <AccordionButton>
              <Box
                flex="1"
                display="flex"
                p="s16"
                justifyContent="flex-start"
                gap="s8"
                alignItems="center"
              >
                <Avatar
                  name={item?.name as string}
                  size="sm"
                  src={item?.docs?.find((option) => option?.key === 'photograph')?.value as string}
                />
                <Box display="flex" flexDirection="column" gap="s4" textAlign="left">
                  <Text fontSize="r1" fontWeight="600">
                    {item?.name}
                  </Text>
                  <Text fontSize="s3" fontWeight="400">
                    Director{' '}
                  </Text>
                </Box>
              </Box>
            </AccordionButton>
            <AccordionPanel>
              {' '}
              <AccordianMemberDetailsCardComponent
                permanentAddress={{
                  province: item?.permAddress?.state?.local as string,
                  district: item?.permAddress?.district?.local as string,
                  houseNo: item?.permAddress?.houseNo as string,
                  localGovernment: item?.permAddress?.localGovernment?.local as string,
                  locality: item?.permAddress?.locality?.local as string,
                  wardNo: item?.permAddress?.wardNo as string,
                }}
                mainDetails={{
                  contactNo: item?.mobileNo as string,
                  email: item?.email as string,
                  pan: item?.email as string,
                }}
                temporaryAddress={{
                  province: item?.tempAddress?.state?.local as string,

                  district: item?.tempAddress?.district?.local as string,
                  houseNo: item?.tempAddress?.houseNo as string,
                  localGovernment: item?.tempAddress?.localGovernment?.local as string,
                  locality: item?.tempAddress?.locality?.local as string,
                  wardNo: item?.tempAddress?.wardNo as string,
                }}
              />
              <Box display="flex" flexDir="column" gap="s16" p="s16">
                <Divider />
                <Grid templateColumns="repeat(2,1fr)" gap="s20">
                  {item?.docs?.map((docs) => (
                    <DocumentComponent
                      keyText={docs?.key as string}
                      value={docs?.value as string}
                    />
                  ))}
                </Grid>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </DetailsCard>
  );
};

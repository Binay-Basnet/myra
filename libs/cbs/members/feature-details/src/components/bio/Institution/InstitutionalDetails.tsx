import { useRouter } from 'next/router';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
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

import { AccountHolderDecleration } from './AccountHoldersDecleration';
import { AccountOperationInstruction } from './AccountOperationInstruction';
import { AddressDetails } from './AddressDetails';
import { MemberInstitutionBasicInfo } from './BasicDetailsInstitution';
import { ContactDetailsInstitution } from './ContactDetailsIntitution';
import { OperatingOfficeAddress } from './OperatingOfficeAddressInstitution';
import { RegisteredDetails } from './RegisteredInstitution';
import { SisterConcernComponent } from './SisterConcernCard';
import { TransactionProfileDetails } from './TransactionProfileDetails';
import { AccordianMemberDetailsCardComponent } from '../components/AccordianCard';
import { DocumentComponent } from '../components/Documents';

export const BioInstitution = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataInstitutionSisterConcern =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'InstitutionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.sisterConcernDetails
      : null;
  const bioDataInstitutionAccountOPerator =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'InstitutionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.operatorDetails
      : null;
  const bioDataInstitutionDirector =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'InstitutionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.partnerDirectorDetails
      : null;
  const bioDataInstitutionDocs =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'InstitutionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.docs
      : null;

  return (
    <>
      <MemberInstitutionBasicInfo />
      <AddressDetails />
      <RegisteredDetails />
      <OperatingOfficeAddress />
      <ContactDetailsInstitution />
      <DetailsCard title="Sister Concern Details" bg="white">
        {bioDataInstitutionSisterConcern?.map((item) => (
          <SisterConcernComponent
            address={item?.address as string}
            name={item?.name?.local}
            phoneNo={item?.phone as string}
            type={item?.natureOfBusiness as string}
          />
        ))}
      </DetailsCard>
      <TransactionProfileDetails />
      <DetailsCard title="Proprietor, Partners, Director Details" bg="white" hasTable>
        <Accordion defaultIndex={[0]} display="flex" flexDirection="column" gap="s16" allowToggle>
          {bioDataInstitutionDirector?.map((item) => (
            <AccordionItem key={item?.email}>
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
                    src={
                      item?.docs?.find((option) => option?.key === 'photograph')?.value as string
                    }
                  />
                  <Box display="flex" flexDirection="column" gap="s4" textAlign="left">
                    <Text fontSize="r1" fontWeight="600">
                      {item?.name}
                    </Text>
                    <Text fontSize="s3" fontWeight="400">
                      Director
                    </Text>
                  </Box>
                </Box>
                <AccordionIcon />
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
      <DetailsCard title="Account Operator Details" bg="white" hasTable>
        <Accordion defaultIndex={[0]} display="flex" flexDirection="column" gap="s16" allowToggle>
          {bioDataInstitutionAccountOPerator?.map((item) => (
            <AccordionItem key={item?.email}>
              <AccordionButton>
                <Box flex="1" display="flex" p="s16" justifyContent="flex-start" gap="s8">
                  <Box display="flex" flexDirection="column" gap="s4" textAlign="left">
                    <Text fontSize="r1" fontWeight="600">
                      {item?.name}
                    </Text>
                    <Text fontSize="s3" fontWeight="400">
                      Operator
                    </Text>
                  </Box>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                {' '}
                <AccordianMemberDetailsCardComponent
                  permanentAddress={{
                    province: item?.pemAddress?.state?.local as string,
                    district: item?.pemAddress?.district?.local as string,
                    houseNo: item?.pemAddress?.houseNo as string,
                    localGovernment: item?.pemAddress?.localGovernment?.local as string,
                    locality: item?.pemAddress?.locality?.local as string,
                    wardNo: item?.pemAddress?.wardNo as string,
                  }}
                  mainDetails={{
                    contactNo: item?.contactNo as string,
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
      <AccountOperationInstruction />
      <AccountHolderDecleration />
      <DetailsCard title="Documents" bg="white">
        {bioDataInstitutionDocs?.map((docs) => (
          <DocumentComponent
            keyText={docs?.key as string}
            value={docs?.value as string}
            key={docs?.value}
          />
        ))}
      </DetailsCard>
    </>
  );
};

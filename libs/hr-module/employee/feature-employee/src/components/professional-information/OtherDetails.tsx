import { useFormContext } from 'react-hook-form';

import { Box, FormSection, GridItem } from '@myra-ui';

import { FormCheckboxGroup } from '@coop/shared/form';

import AwardCashAndCertificates from './sub-components/AwardCashAndCertificates';
import InternationalTour from './sub-components/InternationTour';
import ResearchAndPublications from './sub-components/ResearchAndPublications';
import TrainingDetails from './sub-components/TrainingDetails';

export const OtherDetails = () => {
  const { watch } = useFormContext();
  const otherDetailsOptions = [
    { value: 'trainingDetails', label: 'Training Details' },
    { value: 'researchAndPublications', label: 'Research and Publications' },
    { value: 'awardsCashCertificates', label: 'Awards, Cash and Certificates' },
    { value: 'internationalTour', label: 'International Tour' },
  ];
  const otherDetailsWatch = watch('otherDetails');

  return (
    <>
      <FormSection
        header="Other Details"
        subHeader="Check to enable and add details accordingly"
        id="Other Details"
      >
        <GridItem colSpan={3} mt="none">
          <Box display="flex">
            <FormCheckboxGroup name="otherDetails" showOther={false} list={otherDetailsOptions} />
          </Box>
        </GridItem>
      </FormSection>
      {otherDetailsWatch?.includes('trainingDetails') && <TrainingDetails />}
      {otherDetailsWatch?.includes('researchAndPublications') && <ResearchAndPublications />}
      {otherDetailsWatch?.includes('awardsCashCertificates') && <AwardCashAndCertificates />}
      {otherDetailsWatch?.includes('internationalTour') && <InternationalTour />}
    </>
  );
};

export default OtherDetails;

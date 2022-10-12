import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { GridItem } from '@chakra-ui/react';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { FormInput } from '@coop/shared/form';
import { Box, FormSection } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymAccountHolderDeclaration = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  useCooperative({ methods });

  return (
    <Box>
      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymCoopSection(e.target.id);
            setSection(kymSection);
          }}
        >
          <FormSection
            id="kymCoopAccAccountHolderDeclaration"
            header="kymCoopAccountHolderDeclaration"
          >
            <FormInput
              type="text"
              name="accountHoldersName"
              label={t['kymCoopAccountHolderName']}
              __placeholder={t['kymCoopEnterAccountHolderName']}
            />
          </FormSection>
        </form>
      </FormProvider>
      <Documents setSection={setSection} />
    </Box>
  );
};

interface IDocProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

const Documents = ({ setSection }: IDocProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  return (
    <FormSection header="kymCoopDOCUMENTDECLARATION" templateColumns={2}>
      <GridItem>
        <Box w="124px">
          <KYMDocumentField
            mutationId={id}
            size="md"
            label={t['kymCoopSignature']}
            name="accountHolderSignature"
            getKymSection={getKymCoopSection}
            setKymCurrentSection={setSection}
          />
        </Box>
      </GridItem>
      <GridItem>
        <Box w="124px">
          <KYMDocumentField
            mutationId={id}
            size="md"
            label={t['kymCoopStamp']}
            name="accountHolderStamp"
            getKymSection={getKymCoopSection}
            setKymCurrentSection={setSection}
          />
        </Box>
      </GridItem>
    </FormSection>
    // <Grid
    //   borderBottom={'1px solid'}
    //   borderBottomColor="border.layout"
    //   p="s20"
    //   templateColumns="repeat(2, 1fr)"
    //   rowGap="s16"
    //   columnGap="s20"
    // >
    //   <GridItem>
    //     <Box w="124px">
    //       <KYMDocumentField
    //         mutationId={id}
    //         size="md"
    //         label={t['kymCoopSignature']}
    //         name="accountHolderSignature"
    //         getKymSection={getKymCoopSection}
    //         setKymCurrentSection={setSection}
    //       />
    //     </Box>
    //   </GridItem>
    //   <GridItem>
    //     <Box w="124px">
    //       <KYMDocumentField
    //         mutationId={id}
    //         size="md"
    //         label={t['kymCoopStamp']}
    //         name="accountHolderStamp"
    //         getKymSection={getKymCoopSection}
    //         setKymCurrentSection={setSection}
    //       />
    //     </Box>
    //   </GridItem>
    // </Grid>
  );
};

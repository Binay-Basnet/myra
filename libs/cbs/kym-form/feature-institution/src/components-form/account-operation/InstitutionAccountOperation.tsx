import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { KymInsInput } from '@coop/shared/data-access';
import {
  useGetKymFormStatusInstitutionQuery,
  useSetInstitutionDataMutation,
} from '@coop/shared/data-access';
import { FormFileInput, FormSwitchTab, FormTextArea } from '@coop/shared/form';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Checkbox } from '@coop/shared/ui';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { KymInsAccountOperationType } from '../../types';

const booleanList = [
  {
    label: 'Single',
    value: KymInsAccountOperationType.Single,
  },
  {
    label: 'Joint',
    value: KymInsAccountOperationType.Joint,
  },
];
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const AccountOperationInstitution = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const router = useRouter();

  const { control, handleSubmit, getValues, watch, setError } = methods;
  const { mutate } = useSetInstitutionDataMutation({
    onSuccess: (res) => {
      setError('institutionName', {
        type: 'custom',
        message:
          res?.members?.institution?.add?.error?.error?.['institutionName'][0],
      });
    },
    onError: () => {
      setError('institutionName', {
        type: 'custom',
        message: 'it is what it is',
      });
    },
  });
  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        // console.log(editValues);
        // if (editValues && data) {
        mutate({ id: router.query['id'] as string, data });
        //   refetch();
        // }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  const [activeTab, setActiveTab] = useState(0);
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        {' '}
        <GroupContainer
          id="kymInsAccountOperationInstruction"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymInsAccountOperationInstruction']}
          </Text>
          <Box display={'flex'} flexDirection="column" gap="s32" mt="-16px">
            <FormSwitchTab options={booleanList} name="accountType" />
            {/* <Checkbox
              name="isCompanyStampCompulsory"
              id="isCompanyStampCompulsory"
            >
              {' '}
              {t['kymInsCompanyStampCompulsory']}
            </Checkbox>
            <InputGroupContainer>
              <FormTextArea
                name="specialInstruction"
                label={t['kymInsEnterInstruction']}
              />
            </InputGroupContainer> */}
            {/* <Box w="124px">
              <FormFileInput
                name="companyStamp"
                label={t['kymInsCompanyStamp']}
                size="md"
              />
            </Box> */}
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};

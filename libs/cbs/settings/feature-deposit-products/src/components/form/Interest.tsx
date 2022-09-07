import { useFormContext } from 'react-hook-form';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { FormSection, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const Interest = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const depositNature = watch('nature');

  return (
    <FormSection header="depositProductInterest">
      <FormInput
        name="interest.minRate"
        type="number"
        label={t['depositProductMinimumRate']}
        textAlign={'right'}
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />
      <FormInput
        name="interest.maxRate"
        type="number"
        label={t['depositProductMaximumRate']}
        textAlign={'right'}
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />
      <FormInput
        name="interest.defaultRate"
        type="number"
        label={t['depositProductDefaultRate']}
        textAlign={'right'}
        __placeholder="0.00"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />
      {depositNature !== NatureOfDepositProduct.RecurringSaving && (
        <FormInput
          type="number"
          name="interest.additionalRate"
          label={t['depositProductAdditionalBaseRate']}
          textAlign={'right'}
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
        />
      )}
      <FormInput
        name="interest.ceoAuthority"
        type="number"
        label={t['depositProductCEOAuthority']}
        textAlign={'right'}
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />
      <FormInput
        name="interest.boardAuthority"
        type="number"
        label={t['depositProductBoardAuthority']}
        textAlign={'right'}
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />
    </FormSection>
  );
};

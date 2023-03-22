import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormSection, Text } from '@myra-ui';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const Interest = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const depositNature = watch('nature');
  const minRate = watch('interest.minRate');

  const router = useRouter();

  return (
    <>
      {!router?.asPath?.includes('/edit') && (
        <FormSection header="Product Premium">
          <FormInput
            name="productPremiumInterest"
            type="number"
            label="Product Premium Rate"
            textAlign="right"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
        </FormSection>
      )}
      <FormSection header="Account Premium">
        <FormInput
          name="interest.minRate"
          type="number"
          label={t['depositProductMinimumRate']}
          textAlign="right"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          isDisabled={router?.asPath?.includes('/edit')}
        />
        <FormInput
          name="interest.maxRate"
          type="number"
          label={t['depositProductMaximumRate']}
          textAlign="right"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          rules={{
            min: {
              value: minRate,
              message: 'Maximum rate should be greater than minimum rate',
            },
          }}
          isDisabled={router?.asPath?.includes('/edit')}
        />
        <FormInput
          isRequired
          name="interest.defaultRate"
          type="number"
          label={t['depositProductDefaultRate']}
          textAlign="right"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          isDisabled={router?.asPath?.includes('/edit')}
        />
        {depositNature !== NatureOfDepositProduct.RecurringSaving && (
          <FormInput
            type="number"
            name="interest.additionalRate"
            label={t['depositProductAdditionalBaseRate']}
            textAlign="right"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
            isDisabled={router?.asPath?.includes('/edit')}
          />
        )}
        <FormInput
          name="interest.ceoAuthority"
          type="number"
          label={t['depositProductCEOAuthority']}
          textAlign="right"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          isDisabled={router?.asPath?.includes('/edit')}
        />
        <FormInput
          name="interest.boardAuthority"
          type="number"
          label={t['depositProductBoardAuthority']}
          textAlign="right"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          isDisabled={router?.asPath?.includes('/edit')}
        />
      </FormSection>

      {!router?.asPath?.includes('/edit') && (
        <FormSection header="Allowable Change in Interest Rate">
          <FormInput
            name="interest.changeMin"
            type="number"
            label={t['depositProductMinimumRate']}
            textAlign="right"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          <FormInput
            name="interest.changeMax"
            type="number"
            label={t['depositProductMaximumRate']}
            textAlign="right"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
        </FormSection>
      )}
    </>
  );
};

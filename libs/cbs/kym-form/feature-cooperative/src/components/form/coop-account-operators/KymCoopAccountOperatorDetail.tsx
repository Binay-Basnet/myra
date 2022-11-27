import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';

import {
  RootState,
  useAppSelector,
  useDeleteCoopAccOperatorDataMutation,
  useGetCoOperativeAccountOperatorEditDataQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { Button, FormSection, GridItem, Icon } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { AddOperator } from '../../accordion-component/KymCoopAccountOperator';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopAccountOperatorDetail = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const [accOperatorIds, setAccOperatorIds] = useState<string[]>([]);

  const { data: editValues, refetch } = useGetCoOperativeAccountOperatorEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.cooperative?.listAccountOperators?.data;

      setAccOperatorIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id as string] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [editValues]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetch();
  }, [preference?.date]);

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setAccOperatorIds([...accOperatorIds, res.newId]);
    },
  });
  const { mutate: deleteMutate } = useDeleteCoopAccOperatorDataMutation({
    onSuccess: (res) => {
      const deletedId = String(res?.members?.cooperative?.accountOperatorDetail?.Delete?.recordId);

      const tempAccountOperatorIds = [...accOperatorIds];

      tempAccountOperatorIds.splice(tempAccountOperatorIds.indexOf(deletedId), 1);

      setAccOperatorIds([...tempAccountOperatorIds]);
    },
  });
  const addAccountOperator = () => {
    newIdMutate({});
  };

  const removeAccountOperator = (accOperatorId: string) => {
    deleteMutate({ accOperatorId, id });
  };

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  return (
    <FormSection id="kymCoopAccAccountOperatorDetail" header="kymCoopDetailsofAccountOperators">
      {accOperatorIds.map((accountId) => (
        <GridItem key={accountId} colSpan={3}>
          <AddOperator
            setKymCurrentSection={setSection}
            removeDirector={removeAccountOperator}
            accountId={accountId}
          />
        </GridItem>
      ))}
      <GridItem colSpan={2}>
        <Button
          id="accountOperatorButton"
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            addAccountOperator();
          }}
        >
          {t['kymCoopAddOperator']}
        </Button>
      </GridItem>
    </FormSection>
  );
};

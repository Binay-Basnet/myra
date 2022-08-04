import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';

import {
  useDeleteCoopAccOperatorDataMutation,
  useGetCoOperativeAccountOperatorEditDataQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
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

  const { data: editValues, refetch } =
    useGetCoOperativeAccountOperatorEditDataQuery(
      {
        id: String(id),
      },
      { enabled: !!id }
    );

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.cooperative?.listAccountOperators?.data;

      setAccOperatorIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [editValues]);
  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setAccOperatorIds([...accOperatorIds, res.newId]);
    },
  });
  const { mutate: deleteMutate } = useDeleteCoopAccOperatorDataMutation({
    onSuccess: (res) => {
      const deletedId = String(
        res?.members?.cooperative?.accountOperatorDetail?.Delete?.recordId
      );

      const tempAccountOperatorIds = [...accOperatorIds];

      tempAccountOperatorIds.splice(
        tempAccountOperatorIds.indexOf(deletedId),
        1
      );

      setAccOperatorIds([...tempAccountOperatorIds]);
    },
  });
  const addAccountOperator = () => {
    newIdMutate({});
  };

  const removeAccountOperator = (accOperatorId: string) => {
    deleteMutate({ accOperatorId: accOperatorId, id: id });
  };

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  return (
    <GroupContainer
      id="kymCoopAccAccountOperatorDetail"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymCoopDetailsofAccountOperators']}
      </Text>
      {accOperatorIds.map((id) => {
        return (
          <Box key={id} display="flex" flexDirection={'column'}>
            <AddOperator
              setKymCurrentSection={setSection}
              removeDirector={removeAccountOperator}
              accountId={id}
            />
          </Box>
        );
      })}
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
    </GroupContainer>
  );
};

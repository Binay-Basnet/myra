import React from 'react';
import { IoClose } from 'react-icons/io5';

import { useDeleteKymFieldMutation } from '@coop/shared/data-access';
import { Icon } from '@coop/shared/ui';

import { KymOption } from '../../types';

interface KYMRemoveIconProps {
  setFieldOptions: React.Dispatch<React.SetStateAction<Partial<KymOption>[]>>;
  optionId: string | undefined;
}

export const KYMRemoveIcon = ({
  setFieldOptions,
  optionId,
}: KYMRemoveIconProps) => {
  const { mutateAsync: kymOptionDelete } = useDeleteKymFieldMutation();

  return (
    <Icon
      onClick={async () => {
        setFieldOptions((prev) =>
          prev.filter((fieldItem) => fieldItem.id !== optionId)
        );
        if (optionId) {
          await kymOptionDelete({
            optionId: optionId,
          });
        }
      }}
      as={IoClose}
      size="md"
      color="gray.500"
      cursor="pointer"
      _hover={{ color: 'gray.800' }}
    />
  );
};

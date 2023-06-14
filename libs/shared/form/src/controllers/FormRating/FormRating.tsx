import { Controller, useFormContext } from 'react-hook-form';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Box } from '@chakra-ui/react';

import { Icon, Text } from '@myra-ui';

interface FormRatingProps {
  name: string;
  label?: string;
  isRequired?: boolean;
}

export const FormRating = (props: FormRatingProps) => {
  const { name, label, isRequired } = props;
  const methods = useFormContext();
  const { control } = methods;
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={0}
      render={({ field }) => (
        <Box w="auto" display="flex" flexDirection="column" flexGrow={1} gap="s4">
          {label && (
            <Text variant="formLabel" color="gray.700">
              {isRequired ? `${label} *` : label}
            </Text>
          )}
          <Box display="flex" gap="s8">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Icon
                color="primary"
                key={rating}
                as={rating <= field.value ? AiFillStar : AiOutlineStar}
                onClick={() => field.onChange(rating)}
              />
            ))}
          </Box>
        </Box>
      )}
    />
  );
};

export default FormRating;

import { Controller, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';
import { Mention, MentionsInput } from 'react-mentions';
import { Flex } from '@chakra-ui/react';

import { Text } from '@myra-ui';

interface IFormTextAreaWithMentionsProps {
  name: string;
  label?: string;
  rules?: UseControllerProps['rules'];
  helperText?: string;
  errorText?: string;
  list: { id: string; display: string }[];
}

export const FormTextAreaWithMentions = ({
  name,
  label,
  rules,
  errorText,
  helperText,
  list,
}: //   ...rest
IFormTextAreaWithMentionsProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Flex direction="column" gap="s4">
          <Text variant="formLabel" color="gray.700">
            {label}
          </Text>

          <MentionsInput
            id="name"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            style={{
              border: '1px solid',
              borderColor: '#CBD0D6',

              control: {
                backgroundColor: '#fff',
              },

              '&multiLine': {
                highlighter: {
                  padding: 9,
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  height: 70,
                },
                input: {
                  padding: 9,
                  overflow: 'auto',
                  height: 70,
                },
              },

              suggestions: {
                list: {
                  backgroundColor: 'white',
                  border: '1px solid rgba(0,0,0,0.15)',
                  fontSize: 16,
                },
                item: {
                  padding: '5px 15px',
                  borderBottom: '1px solid rgba(0,0,0,0.15)',
                  '&focused': {
                    backgroundColor: '#cee4e5',
                  },
                },
              },
            }}
            placeholder=""
          >
            <Mention
              markup="[__display__]"
              trigger="@"
              data={list}
              style={{ background: '#E0E5EB' }}
              displayTransform={(id, display) => `[${display}]`}
            />
          </MentionsInput>

          {errorText ? (
            <Text variant="formHelper" color="danger.500">
              {errorText}
            </Text>
          ) : helperText ? (
            <Text variant="formHelper" color="gray.700">
              {helperText}
            </Text>
          ) : null}
        </Flex>
      )}
    />
  );
};

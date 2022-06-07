import {
  Input,
  InputLeftAddon,
  InputRightAddon,
  InputProps,
  InputGroup,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { TextFields } from '@coop/myra/ui';
export interface SlugInputProps extends InputProps {
  label?: string;
  labelColor?: string;
  placeholder?: string;
  leftAddon?: string;
  leftAddonColor?: string;
  leftAddonBg?: string;
  rightAddonColor?: string;
  rightAddonBg?: string;
  rightAddon?: string;
}

export const SlugInput = forwardRef<HTMLInputElement, SlugInputProps>(
  (props, ref) => {
    const {
      labelColor,
      label,
      placeholder,
      leftAddon,
      rightAddon,
      leftAddonBg,
      rightAddonBg,
      rightAddonColor,
      leftAddonColor,
      ...rest
    } = props;
    return (
      <>
        <TextFields variant="formLabel" color={labelColor}>
          {' '}
          {label ?? 'Name'}
        </TextFields>
        <InputGroup>
          {leftAddon && (
            <InputLeftAddon color={leftAddonColor} bg={leftAddonBg}>
              {leftAddon}
            </InputLeftAddon>
          )}

          <Input
            variant={'outline'}
            type="text"
            fontSize={'s2'}
            placeholder={placeholder ?? 'Enter your Name'}
            ref={ref}
            mr={'0'}
            {...rest}
          />

          {rightAddon && (
            <InputRightAddon color={rightAddonColor} bg={rightAddonBg}>
              {rightAddon}
            </InputRightAddon>
          )}
        </InputGroup>
      </>
    );
  }
);

export default SlugInput;

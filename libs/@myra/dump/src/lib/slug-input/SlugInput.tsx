import { forwardRef } from 'react';
import { Input, InputGroup, InputLeftAddon, InputProps, InputRightAddon } from '@chakra-ui/react';
import { TextFields } from '@myra/dump';

export interface SlugInputProps extends InputProps {
  label?: string;
  labelColor?: string;
  leftAddon?: string;
  leftAddonColor?: string;
  leftAddonBg?: string;
  rightAddonColor?: string;
  rightAddonBg?: string;
  rightAddon?: string;
}

export const SlugInput = forwardRef<HTMLInputElement, SlugInputProps>((props, ref) => {
  const {
    labelColor,
    label,
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

        <Input variant="outline" type="text" ref={ref} {...rest} />

        {rightAddon && (
          <InputRightAddon
            fontSize="r1"
            fontWeight="regular"
            color={rightAddonColor ?? 'neutralColorLight.Gray-80'}
            bg={rightAddonBg ?? 'background.500'}
          >
            {rightAddon}
          </InputRightAddon>
        )}
      </InputGroup>
    </>
  );
});

export default SlugInput;

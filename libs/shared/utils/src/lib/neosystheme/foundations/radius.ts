const radii = {
  none: '0',
  br1: '2px',
  br2: '4px',
  br3: '8px',
  br4: '16px',
  br5: '20px',
};

/**
 * @deprecated
 * You can derive the Radii type from the DefaultChakraTheme
 *
 * type Radii = DefaultChakraTheme['radii']
 */
export type Radii = typeof radii;

export default radii;

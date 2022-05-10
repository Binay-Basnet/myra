const shadows = {
 E0: '0 0 4px rgba(52, 60, 70, 0.1)',
 E1: '0px 4px 10px rgba(52, 60, 70, 0.1)',
 E2: '0px 4px 20px rgba(52, 60, 70, 0.2)',
 E3: '0px 4px 60px rgba(52, 60, 70, 0.2)', 
};

/**
 * @deprecated
 * You can derive the Shadows type from the DefaultChakraTheme
 *
 * type Shadows = DefaultChakraTheme['shadows']
 */
export type Shadows = typeof shadows;

export default shadows;

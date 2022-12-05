import colors from './colors';
import defaultFoundations from '../../theme/foundations';

const foundations = {
  ...defaultFoundations,
  colors,
};

type FoundationsType = typeof foundations;

/**
 * @deprecated
 * You can derive the Foundations type from the DefaultChakraTheme
 *
 * type Foundations = Pick<
 *   DefaultChakraTheme,
 *   | "breakpoints"
 *   | "zIndices"
 *   | "radii"
 *   | "colors"
 *   | "letterSpacings"
 *   | "lineHeights"
 *   | "fontWeights"
 *   | "fonts"
 *   | "fontSizes"
 *   | "sizes"
 *   | "shadows"
 *   | "space"
 *   | "borders"
 *   | "transition"
 *  >
 */
export type Foundations = FoundationsType;

export default foundations;

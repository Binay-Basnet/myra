import blur from './blur';
import borders from './borders';
import breakpoints from './breakpoints';
import colors from './colors';
import radii from './radius';
import shadows from './shadows';
import sizes from './sizes';
import space from './spacing';
import transition from './transition';
import typography from './typography';
import zIndices from './z-index';

const foundations = {
  breakpoints,
  zIndices,
  radii,
  blur,
  colors,
  ...typography,
  sizes,
  shadows,
  space,
  borders,
  transition,
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

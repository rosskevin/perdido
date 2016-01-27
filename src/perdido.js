import align from './align';
import center from './center';
import column from './column';
import flexContainer from './flex-container';
import {masonryColumn, masonryWrap} from './masonry';
import move from './move';
import offset from './offset';
import row from './row';
import * as utils from './utils';
import waffle from './waffle';
import {GUTTER, FLEX, CYCLE, OFFSET_DIR} from './defaults';


/**
 * Main Perdido class.
 *
 * @api public
 */
export default class Perdido {
  constructor(
      gutter = GUTTER,
      flex = FLEX,
      cycle = CYCLE,
      offsetDir = OFFSET_DIR) {
    // Set the default values.
    this.gutter = gutter;
    this.flex = flex;
    this.cycle = cycle;
    this.offsetDir = offsetDir;

    // Simple properties/methods.
    this.flexContainer = flexContainer;
    this.utils = utils;
  }

  /**
   * Creates a new instance of Perdido.
   *
   * @see Perdido
   * @api public
   */
  create(
      gutter = GUTTER,
      flex = FLEX,
      cycle = CYCLE,
      offsetDir = OFFSET_DIR) {
    return new Perdido(gutter, flex, cycle, offsetDir);
  }

  /**
   * Aligns nested elements.
   *
   * @see align
   * @api public
   */
  align(alignment, flex = FLEX) {
    return align(alignment, flex);
  }

  /**
   * Centers a containing element.
   *
   * @see center
   * @api public
   */
  center(maxWidth, padding, flex = FLEX) {
    return center(maxWidth, padding, flex);
  }

  /**
   * Creates a column that is a fraction of its containing element's size.
   *
   * @see column
   * @api public
   */
  column(columnVal, cycle = CYCLE, gutter = GUTTER, flex = FLEX) {
    return column(columnVal, cycle, gutter, flex);
  }

  /**
   * Create a column for working with JS Masonry libraries like Isotope.
   *
   * @see masonry.masonryColumn
   * @api public
   */
  masonryColumn(columnVal, gutter = GUTTER, flex = FLEX) {
    return masonryColumn(columnVal, gutter, flex);
  }

  /**
   * Create a wrapping element for working with JS Masonry libraries
   * like Isotope.
   *
   * @see masonry.masonryWrap
   * @api public
   */
  masonryWrap(flex = FLEX, gutter = GUTTER) {
    return masonryWrap(flex, gutter);
  }

  /**
   * Source ordering. Shift elements left, right, up, or down.
   *
   * @see move
   * @api public
   */
  move(moveVal, direction = OFFSET_DIR, gutter = GUTTER) {
    return move(moveVal, direction, gutter);
  }

  /**
   * Margin to the left, right, bottom, or top, of an element.
   *
   * @see offset
   * @api public
   */
  offset(offsetVal, direction = OFFSET_DIR, gutter = GUTTER) {
    return offset(offsetVal, direction, gutter);
  }

  /**
   * Creates a row that is a fraction of its containing element's size.
   *
   * @see row
   * @api public
   */
  row(rowVal, gutter = GUTTER, flex = FLEX) {
    return row(rowVal, gutter, flex);
  }

  /**
   * Creates a block that is a fraction of the size of its containing element.
   *
   * @see waffle
   * @api public
   */
  waffle(waffleVal, cycle = CYCLE, gutter = GUTTER, flex = FLEX) {
    return waffle(waffleVal, cycle, gutter, flex);
  }
}

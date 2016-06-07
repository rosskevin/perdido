import expect from 'expect.js';
import jss from 'jss';
import jssExtend from 'jss-extend';
import jssNested from 'jss-nested';
import jssCamelCase from 'jss-camel-case';
import jssDefaultUnit from 'jss-default-unit';
import jssVendorPrefixer from 'jss-vendor-prefixer';
import Perdido from '../src/perdido'; // eslint-disable-line import/no-unresolved
import perdido from 'perdido'; // eslint-disable-line import/no-unresolved

describe('Perdido', () => {
  afterEach(() => {
    jss.plugins.registry = [];
    jss.sheets.registry = [];
    jss.uid.reset();
  });

  /* eslint-disable max-len */
  describe('Perdido Creation', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());
    });

    it('should export a Perdido instance', () => {
      expect(perdido).to.be.a(Perdido)
      expect(perdido).not.to.be.null
    })

    it('create bare default Perdido', () => {
      expect(perdido).not.to.be.null
      expect(perdido).to.be.a(Perdido)

      const testPerdido = perdido.create();
      expect(testPerdido.gutter).to.be('30px');
      expect(testPerdido.flex).to.be(false);
      expect(testPerdido.cycle).to.be(-1);
      expect(testPerdido.offsetDir).to.be('row');
    });

    it('create Perdido with one override', () => {
      const testPerdido = perdido.create({gutter: '60px'});
      expect(testPerdido.gutter).to.be('60px');
      expect(testPerdido.flex).to.be(false);
      expect(testPerdido.cycle).to.be(-1);
      expect(testPerdido.offsetDir).to.be('row');
    });

    it('create Perdido with two overrides', () => {
      const testPerdido = perdido.create({gutter: '40em', flex: true});
      expect(testPerdido.gutter).to.be('40em');
      expect(testPerdido.flex).to.be(true);
      expect(testPerdido.cycle).to.be(-1);
      expect(testPerdido.offsetDir).to.be('row');
    });

    it('create Perdido with two out of order overrides', () => {
      const testPerdido = perdido.create({gutter: '40em', cycle: 6});
      expect(testPerdido.gutter).to.be('40em');
      expect(testPerdido.flex).to.be(false);
      expect(testPerdido.cycle).to.be(6);
      expect(testPerdido.offsetDir).to.be('row');
    });

    it('create Perdido with three overrides', () => {
      const testPerdido = perdido.create({gutter: '80em', flex: true, cycle: 3});
      expect(testPerdido.gutter).to.be('80em');
      expect(testPerdido.flex).to.be(true);
      expect(testPerdido.cycle).to.be(3);
      expect(testPerdido.offsetDir).to.be('row');
    });

    it('create Perdido with four overrides', () => {
      const testPerdido = perdido.create({gutter: '75rem', flex: true, cycle: 3,
        offsetDir: 'column'});
      expect(testPerdido.gutter).to.be('75rem');
      expect(testPerdido.flex).to.be(true);
      expect(testPerdido.cycle).to.be(3);
      expect(testPerdido.offsetDir).to.be('column');
    });
  });


  function testMethod(testName, method, testStrs) {
    return it(testName, () => {
      const sheet = jss.createStyleSheet({
        a: {
          extend: method,
        },
      }, {named: false});
      expect(sheet.toString()).to.be(testStrs.join('\n'));
    });
  }

  // Align
  describe('Perdido Align', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());

      perdido.gutter = '30px';
      perdido.flex = false;
      perdido.cycle = -1;
      perdido.offsetDir = 'row';
    });

    testMethod('can support resetting alignment', perdido.align('reset'), [
      'a {\n  position: static;\n}',
      'a > * {\n  position: static;\n  top: auto;\n  right: auto;\n  bottom: auto;',
      '  left: auto;\n  transform: translate(0, 0);\n}'
    ]);

    testMethod('can support aligning horizontally', perdido.align('horizontal'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: auto;\n  right: auto;\n  bottom: auto;',
      '  left: 50%;\n  transform: translate(-50%, 0);\n}'
    ]);

    testMethod('can support aligning verticaly', perdido.align('vertical'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: 50%;\n  right: auto;\n  bottom: auto;',
      '  left: auto;\n  transform: translate(0, -50%);\n}'
    ]);

    testMethod('can support aligning top left', perdido.align('top-left'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: 0;\n  right: auto;\n  bottom: auto;',
      '  left: 0;\n  transform: translate(0, 0);\n}'
    ]);

    testMethod('can support aligning top center', perdido.align('top-center'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: 0;\n  right: auto;\n  bottom: auto;',
      '  left: 50%;\n  transform: translate(-50%, 0);\n}'
    ]);

    testMethod('can support aligning top', perdido.align('top'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: 0;\n  right: auto;\n  bottom: auto;',
      '  left: 50%;\n  transform: translate(-50%, 0);\n}'
    ]);

    testMethod('can support aligning top right', perdido.align('top-right'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: auto;',
      '  left: auto;\n  transform: translate(0, 0);\n}'
    ]);

    testMethod('can support aligning middle left', perdido.align('middle-left'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: 50%;\n  right: auto;\n  bottom: auto;',
      '  left: 0;\n  transform: translate(0, -50%);\n}'
    ]);

    testMethod('can support aligning left', perdido.align('left'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: 50%;\n  right: auto;\n  bottom: auto;',
      '  left: 0;\n  transform: translate(0, -50%);\n}'
    ]);

    testMethod('can support aligning middle center', perdido.align('middle-center'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: 50%;\n  right: auto;\n  bottom: auto;',
      '  left: 50%;\n  transform: translate(-50%, -50%);\n}'
    ]);

    testMethod('can support aligning center', perdido.align('center'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: 50%;\n  right: auto;\n  bottom: auto;',
      '  left: 50%;\n  transform: translate(-50%, -50%);\n}'
    ]);

    testMethod('can support aligning middle right', perdido.align('middle-right'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: 50%;\n  right: 0;\n  bottom: auto;',
      '  left: auto;\n  transform: translate(0, -50%);\n}'
    ]);

    testMethod('can support aligning right', perdido.align('right'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: 50%;\n  right: 0;\n  bottom: auto;',
      '  left: auto;\n  transform: translate(0, -50%);\n}'
    ]);

    testMethod('can support aligning bottom left', perdido.align('bottom-left'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: auto;\n  right: auto;\n  bottom: 0;',
      '  left: 0;\n  transform: translate(0, 0);\n}'
    ]);

    testMethod('can support aligning bottom center', perdido.align('bottom-center'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: auto;\n  right: auto;\n  bottom: 0;',
      '  left: 50%;\n  transform: translate(-50%, 0);\n}'
    ]);

    testMethod('can support aligning bottom', perdido.align('bottom'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: auto;\n  right: auto;\n  bottom: 0;',
      '  left: 50%;\n  transform: translate(-50%, 0);\n}'
    ]);

    testMethod('can support aligning bottom right', perdido.align('bottom-right'), [
      'a {\n  position: relative;\n}',
      'a > * {\n  position: absolute;\n  top: auto;\n  right: 0;\n  bottom: 0;',
      '  left: auto;\n  transform: translate(0, 0);\n}'
    ]);
  });

  // Flex Align
  describe('Perdido Align Flex', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());

      perdido.gutter = '30px';
      perdido.flex = false;
      perdido.cycle = -1;
      perdido.offsetDir = 'row';
    });

    testMethod('can support resetting alignment', perdido.align('reset', {flex: true}), [
      'a {\n  display: initial;\n}',
      'a > * {\n  justify-content: inherit;\n  align-items: inherit;\n}',
    ]);

    testMethod('can support aligning horizontally', perdido.align('horizontal', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: center;\n  align-items: inherit;\n}',
    ]);

    testMethod('can support aligning verticaly', perdido.align('vertical', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: inherit;\n  align-items: center;\n}',
    ]);

    testMethod('can support aligning top left', perdido.align('top-left', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: flex-start;\n  align-items: flex-start;\n}'
    ]);

    testMethod('can support aligning top center', perdido.align('top-center', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: center;\n  align-items: flex-start;\n}'
    ]);

    testMethod('can support aligning top', perdido.align('top', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: center;\n  align-items: flex-start;\n}'
    ]);

    testMethod('can support aligning top right', perdido.align('top-right', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: flex-end;\n  align-items: flex-start;\n}'
    ]);

    testMethod('can support aligning middle left', perdido.align('middle-left', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: flex-start;\n  align-items: center;\n}'
    ]);

    testMethod('can support aligning left', perdido.align('left', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: flex-start;\n  align-items: center;\n}'
    ]);

    testMethod('can support aligning middle center', perdido.align('middle-center', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: center;\n  align-items: center;\n}'
    ]);

    testMethod('can support aligning center', perdido.align('center', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: center;\n  align-items: center;\n}'
    ]);

    testMethod('can support aligning middle right', perdido.align('middle-right', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: flex-end;\n  align-items: center;\n}'
    ]);

    testMethod('can support aligning right', perdido.align('right', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: flex-end;\n  align-items: center;\n}'
    ]);

    testMethod('can support aligning bottom left', perdido.align('bottom-left', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: flex-start;\n  align-items: flex-end;\n}'
    ]);

    testMethod('can support aligning bottom center', perdido.align('bottom-center', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: center;\n  align-items: flex-end;\n}'
    ]);

    testMethod('can support aligning bottom', perdido.align('bottom', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: center;\n  align-items: flex-end;\n}'
    ]);

    testMethod('can support aligning bottom right', perdido.align('bottom-right', {flex: true}), [
      'a {\n  display: flex;\n}',
      'a > * {\n  justify-content: flex-end;\n  align-items: flex-end;\n}'
    ]);
  });

  // Center
  describe('Perdido Center', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());

      perdido.gutter = '30px';
      perdido.flex = false;
      perdido.cycle = -1;
      perdido.offsetDir = 'row';
    });

    testMethod('can support horizontal centering containers', perdido.center('980px'), [
      'a {\n  max-width: 980px;\n  margin-left: auto;\n  margin-right: auto;\n}',
      'a:before {\n  content: \'\';\n  display: table;\n}',
      'a:after {\n  content: \'\';\n  display: table;\n  clear: both;\n}'
    ]);

    testMethod('can support adding 30px padding', perdido.center('980px', {padding: '30px'}), [
      'a {\n  max-width: 980px;\n  margin-left: auto;\n  margin-right: auto;',
      '  padding-left: 30px;\n  padding-right: 30px;\n}',
      'a:before {\n  content: \'\';\n  display: table;\n}',
      'a:after {\n  content: \'\';\n  display: table;\n  clear: both;\n}'
    ]);

    testMethod('can support flexbox', perdido.center('1140px', {padding: '30px', flex: true}), [
      'a {\n  max-width: 1140px;\n  margin-left: auto;\n  margin-right: auto;',
      '  padding-left: 30px;\n  padding-right: 30px;\n  display: flex;',
      '  flex-flow: row wrap;\n}'
    ]);
  });


  // Column
  describe('Perdido Column', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());
    });

    testMethod('can support 3 column layout', perdido.column('1/3'), [
      'a {\n  width: calc(99.99% * 1/3 - (30px - 30px * 1/3));\n}',
      'a:nth-child(n) {\n  float: left;\n  margin-right: 30px;\n  clear: none;\n}',
      'a:last-child {\n  margin-right: 0;\n}',
      'a:nth-child(3n) {\n  float: right;\n  margin-right: 0;\n}',
      'a:nth-child(3n + 1) {\n  clear: left;\n}'
    ]);

    testMethod('can support 2/5 column layout', perdido.column('2/5'), [
      'a {\n  width: calc(99.99% * 2/5 - (30px - 30px * 2/5));\n}',
      'a:nth-child(n) {\n  float: left;\n  margin-right: 30px;\n  clear: none;\n}',
      'a:last-child {\n  margin-right: 0;\n}',
      'a:nth-child(5n) {\n  float: right;\n  margin-right: 0;\n}',
      'a:nth-child(5n + 1) {\n  clear: left;\n}'
    ]);

    testMethod('can support custom cycle', perdido.column('2/4', {cycle: 2}), [
      'a {\n  width: calc(99.99% * 2/4 - (30px - 30px * 2/4));\n}',
      'a:nth-child(n) {\n  float: left;\n  margin-right: 30px;\n  clear: none;\n}',
      'a:last-child {\n  margin-right: 0;\n}',
      'a:nth-child(2n) {\n  float: right;\n  margin-right: 0;\n}',
      'a:nth-child(2n + 1) {\n  clear: left;\n}'
    ]);

    testMethod('can support no gutter', perdido.column('2/5', {cycle: 3, gutter: '0'}), [
      'a {\n  width: calc(99.999999% * 2/5);\n}',
      'a:nth-child(n) {\n  float: left;\n  margin-right: 0;\n  clear: none;\n}',
      'a:last-child {\n  margin-right: 0;\n}',
      'a:nth-child(3n) {\n  float: right;\n  margin-right: 0;\n}',
      'a:nth-child(3n + 1) {\n  clear: left;\n}'
    ]);

    testMethod('can support flexbox', perdido.column('2/6', {cycle: 3, gutter: '60px', flex: true}), [
      'a {\n  width: calc(99.99% * 2/6 - (60px - 60px * 2/6));\n  flex: 0 0 auto;\n}',
      'a:nth-child(n) {\n  margin-right: 60px;\n}',
      'a:last-child {\n  margin-right: 0;\n}',
      'a:nth-child(3n) {\n  float: right;\n  margin-right: 0;\n}'
    ]);

    testMethod('can support none rule', perdido.column('none'), [
      'a {\n  width: auto;\n}',
      'a:last-child {\n  float: none;\n  clear: none;\n  margin-right: 0;\n  width: auto;\n}',
      'a:nth-child(n) {\n  float: none;\n  clear: none;\n  margin-right: 0;\n  width: auto;\n}',
      'a:nth-child(1n + 1) {\n  float: none;\n  clear: none;\n  margin-right: 0;\n  width: auto;\n}',
      'a:nth-child(1n) {\n  float: none;\n  clear: none;\n  margin-right: 0;\n  width: auto;\n}'
    ]);
  });


  // Flex Container
  describe('Perdido FlexContainer', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());
    });

    testMethod('can support flex for row', perdido.flexContainer('row'), [
      'a {\n  display: flex;\n  flex-flow: row wrap;\n}'
    ]);

    testMethod('can support flex for column', perdido.flexContainer('column'), [
      'a {\n  display: flex;\n  flex-flow: column nowrap;\n}'
    ]);
  });


  // Masonry Column
  describe('Perdido Masonry Column', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());
    });

    testMethod('can support masonry grid custom column', perdido.masonryColumn('60px'), [
      'a {\n  float: left;\n  width: calc(99.99% * 60px - 30px);\n  margin-left: 15px;',
      '  margin-right: 15px;\n}'
    ]);

    testMethod('can support masonry grid custom column no gutter', perdido.masonryColumn('60px', {gutter: '0'}), [
      'a {\n  float: left;\n  width: calc(99.99% * 60px);\n}'
    ]);

    testMethod('can support masonry grid no column', perdido.masonryColumn('0'), [
      'a {\n  float: left;\n  width: calc(99.99% * 0 - 30px);\n  margin-left: 15px;',
      '  margin-right: 15px;\n}'
    ]);

    testMethod('can support masonry flexbox grid custom column', perdido.masonryColumn('60px', {gutter: '30px', flex: true}), [
      'a {\n  flex: 0 0 auto;\n  width: calc(99.99% * 60px - 30px);',
      '  margin-left: 15px;\n  margin-right: 15px;\n}'
    ]);

    testMethod('can support masonry flexbox grid no column', perdido.masonryColumn('0', {gutter: '30px', flex: true}), [
      'a {\n  flex: 0 0 auto;\n  width: calc(99.99% * 0 - 30px);',
      '  margin-left: 15px;\n  margin-right: 15px;\n}'
    ]);
  });


  // Masonry Wrap
  describe('Perdido Masonry Wrap', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());
    });

    testMethod('can support creating a flexbox wrapper', perdido.masonryWrap({flex: true}), [
      'a {\n  display: flex;\n  flex-flow: row wrap;\n  margin-left: -15px;',
      '  margin-right: -15px;\n}'
    ]);

    testMethod('can support creating a non-flexbox wrapper', perdido.masonryWrap(false), [
      'a {\n  margin-left: -15px;\n  margin-right: -15px;\n}',
      'a:before {\n  content: \'\';\n  display: table;\n}',
      'a:after {\n  content: \'\';\n  display: table;\n  clear: both;\n}'
    ]);

    testMethod('can support a custom gutter.', perdido.masonryWrap({flex: true, gutter: '60px'}), [
      'a {\n  display: flex;\n  flex-flow: row wrap;\n  margin-left: -30px;',
      '  margin-right: -30px;\n}'
    ]);
  });


  // Move
  describe('Perdido Move', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());
    });

    testMethod('can support moving elements left', perdido.move('1/3'), [
      'a {\n  position: relative;',
      '  left: calc(99.99% * 1/3 - (30px - 30px * 1/3) + 30px);\n}'
    ]);

    testMethod('can support moving elements right', perdido.move('-1/3'), [
      'a {\n  position: relative;',
      '  left: calc(99.99% * -1/3 - (30px - 30px * -1/3) + 30px);\n}'
    ]);

    testMethod('can support moving elements up', perdido.move('1/3', {direction: 'column'}), [
      'a {\n  position: relative;',
      '  top: calc(99.99% * 1/3 - (30px - 30px * 1/3) + 30px);\n}'
    ]);

    testMethod('can support moving elements down', perdido.move('-1/3', {direction: 'column'}), [
      'a {\n  position: relative;',
      '  top: calc(99.99% * -1/3 - (30px - 30px * -1/3) + 30px);\n}'
    ]);

    testMethod('can support custom gutter', perdido.move('1/2', {gutter: '60px'}), [
      'a {\n  position: relative;',
      '  left: calc(99.99% * 1/2 - (60px - 60px * 1/2) + 60px);\n}'
    ]);

    testMethod('can support no gutter', perdido.move('1/2', {gutter: '0'}), [
      'a {\n  position: relative;',
      '  left: calc(99.999999% * 1/2);\n}'
    ]);

    testMethod('can support no gutter column', perdido.move('1/2', {gutter: '0', direction: 'column'}), [
      'a {\n  position: relative;',
      '  top: calc(99.999999% * 1/2);\n}'
    ]);
  });


  // Offset
  describe('Perdido Offset', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());
    });

    testMethod('can support moving elements to the left', perdido.offset('1/3'), [
      'a {\n  margin-right: calc(99.99% * 1/3 - (30px - 30px * 1/3) + (30px * 2)) !important;\n}'
    ]);

    testMethod('can support moving elements to the right', perdido.offset('-1/3'), [
      'a {\n  margin-left: calc(99.99% * (-1/3 * -1) - (30px - 30px * (-1/3 * -1)) + 30px) !important;\n}'
    ]);

    testMethod('can support moving elements up', perdido.offset('1/3', {direction: 'column'}), [
      'a {\n  margin-bottom: calc(99.99% * 1/3 - (30px - 30px * 1/3) + (30px * 2)) !important;\n}'
    ]);

    testMethod('can support moving elements down', perdido.offset('-1/3', {direction: 'column'}), [
      'a {\n  margin-top: calc(99.99% * (-1/3 * -1) - (30px - 30px * (-1/3 * -1)) + 30px) !important;\n}'
    ]);

    testMethod('can support custom gutter', perdido.offset('1/2', {gutter: '60px'}), [
      'a {\n  margin-right: calc(99.99% * 1/2 - (60px - 60px * 1/2) + (60px * 2)) !important;\n}'
    ]);

    testMethod('can support no gutter', perdido.offset('1/2', {gutter: '0'}), [
      'a {\n  margin-right: calc(99.999999% * 1/2) !important;\n}'
    ]);

    testMethod('can support no gutter negative offset', perdido.offset('-1/2', {gutter: '0'}), [
      'a {\n  margin-left: calc(99.999999% * -1/2) !important;\n}'
    ]);

    testMethod('can support no gutter column offset',
      perdido.offset('1/2', {gutter: '0', direction: 'column'}), [
        'a {\n  margin-bottom: calc(99.999999% * 1/2) !important;\n}'
      ]);

    testMethod('can support no gutter column negative offset',
      perdido.offset('-1/2', {gutter: '0', direction: 'column'}), [
        'a {\n  margin-top: calc(99.999999% * -1/2) !important;\n}'
      ]);

    testMethod('can support zero offset', perdido.offset('0'), [
      'a {\n  margin-left: 0 !important;\n  margin-right: 30px !important;\n}'
    ]);

    testMethod('can support zero offset column', perdido.offset('0', {direction: 'column'}), [
      'a {\n  margin-top: 0 !important;\n  margin-bottom: 30px !important;\n}'
    ]);
  });


  // Row

  describe('Perdido Row', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());
    });

    testMethod('can support 3 row layout', perdido.row('1/3'), [
      'a {\n  width: 100%;\n  height: calc(99.99% * 1/3 - (30px - 30px * 1/3));',
      '  margin-bottom: 30px;\n}',
      'a:last-child {\n  margin-bottom: 0;\n}'
    ]);

    testMethod('can support 2/5 row layout', perdido.row('2/5'), [
      'a {\n  width: 100%;\n  height: calc(99.99% * 2/5 - (30px - 30px * 2/5));',
      '  margin-bottom: 30px;\n}\na:last-child {\n  margin-bottom: 0;\n}'
    ]);

    testMethod('can support no gutter', perdido.row('2/5', {gutter: '0'}), [
      'a {\n  width: 100%;\n  height: calc(99.999999% * 2/5);\n  margin-bottom: 0;\n}',
      'a:last-child {\n  margin-bottom: 0;\n}'
    ]);

    testMethod('can support flexbox', perdido.row('2/6', {gutter: '60px', flex: true}), [
      'a {\n  width: 100%;\n  flex: 0 0 auto;',
      '  height: calc(99.99% * 2/6 - (60px - 60px * 2/6));\n  margin-bottom: 60px;\n}',
      'a:last-child {\n  margin-bottom: 0;\n}'
    ]);
  });


  // Utils
  describe('Perdido Utilities', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());
    });

    testMethod('can support applying edit indicator', perdido.utils.edit, [
      'a {\n}',
      'a *:not(input):not(textarea):not(select) {',
      '  background-color: rgba(0, 0, 255, 0.1);\n}'
    ]);

    testMethod('can support applying clearfix', perdido.utils.clearFix, [
      'a {\n  *zoom: 1;\n}',
      'a:before {\n  content: \'\';\n  display: table;\n}',
      'a:after {\n  content: \'\';\n  display: table;\n  clear: both;\n}'
    ]);
  });


  // Waffle
  describe('Perdido Waffle', () => {
    beforeEach(() => {
      
      jss.use(jssExtend());
      jss.use(jssNested());
      jss.use(jssCamelCase());
      jss.use(jssDefaultUnit());
      jss.use(jssVendorPrefixer());
    });

    testMethod('can support a 3 column layout', perdido.waffle('1/3'), [
      'a {\n  width: calc(99.99% * 1/3 - (30px - 30px * 1/3));',
      '  height: calc(99.99% * 1/3 - (30px - 30px * 1/3));\n}',
      'a:nth-child(n) {\n  float: left;\n  margin-right: 30px;',
      '  margin-bottom: 30px;\n  clear: none;\n}',
      'a:last-child {\n  margin-right: 0;\n  margin-bottom: 0;\n}',
      'a:nth-child(3n) {\n  margin-right: 0;\n  float: right;\n}',
      'a:nth-child(3n + 1) {\n  clear: left;\n}',
      'a:nth-last-child(-n + 3) {\n  margin-bottom: 0;\n}'
    ]);

    testMethod('can support a custom cycle', perdido.waffle('2/4', {cycle: 2}), [
      'a {\n  width: calc(99.99% * 2/4 - (30px - 30px * 2/4));',
      '  height: calc(99.99% * 2/4 - (30px - 30px * 2/4));\n}',
      'a:nth-child(n) {\n  float: left;\n  margin-right: 30px;',
      '  margin-bottom: 30px;\n  clear: none;\n}',
      'a:last-child {\n  margin-right: 0;\n  margin-bottom: 0;\n}',
      'a:nth-child(2n) {\n  margin-right: 0;\n  float: right;\n}',
      'a:nth-child(2n + 1) {\n  clear: left;\n}',
      'a:nth-last-child(-n + 2) {\n  margin-bottom: 0;\n}'
    ]);

    testMethod('can support a custom gutter', perdido.waffle('3/6', {cycle: 2, gutter: '60px'}), [
      'a {\n  width: calc(99.99% * 3/6 - (60px - 60px * 3/6));',
      '  height: calc(99.99% * 3/6 - (60px - 60px * 3/6));\n}',
      'a:nth-child(n) {\n  float: left;\n  margin-right: 60px;',
      '  margin-bottom: 60px;\n  clear: none;\n}',
      'a:last-child {\n  margin-right: 0;\n  margin-bottom: 0;\n}',
      'a:nth-child(2n) {\n  margin-right: 0;\n  float: right;\n}',
      'a:nth-child(2n + 1) {\n  clear: left;\n}',
      'a:nth-last-child(-n + 2) {\n  margin-bottom: 0;\n}'
    ]);

    testMethod('can support flexbox', perdido.waffle('2/5', {cycle: 3, gutter: '0', flex: true}), [
      'a {\n  flex: 0 0 auto;\n  width: calc(99.999999% * 2/5);',
      '  height: calc(99.999999% * 2/5);\n}',
      'a:nth-child(n) {\n  margin-right: 0;\n  margin-bottom: 0;\n}',
      'a:last-child {\n  margin-right: 0;\n  margin-bottom: 0;\n}',
      'a:nth-child(3n) {\n  margin-right: 0;\n  float: right;\n}',
      'a:nth-last-child(-n + 3) {\n  margin-bottom: 0;\n}'
    ]);
  });
});
/* eslint-enable max-len */

import { mergeClasses } from './classes';

// ----------------------------------------------------------------------

describe('mergeClasses', () => {
  it(`1. Should merge class names with state-based class names`, () => {
    const result = mergeClasses(null, {
      ['active_class']: true,
      ['open__class']: true,
      ['disabled__class']: false,
      ['hover__class']: false,
    });
    expect(result).toBe('active_class open__class');
  });

  it(`2. Should merge class names with state-based class names and base class name`, () => {
    const result = mergeClasses('class__base', {
      ['active_class']: true,
      ['open__class']: true,
      ['disabled__class']: false,
      ['hover__class']: undefined,
    });
    expect(result).toBe('class__base active_class open__class');
  });

  it(`3. Should return only the base class name if no state is provided`, () => {
    const result = mergeClasses('class__base');
    expect(result).toBe('class__base');
  });

  it(`4. Should merge multiple base class names with no state`, () => {
    const result = mergeClasses(['class__base', 'class__secondary']);
    expect(result).toBe('class__base class__secondary');
  });

  it(`5. Should handle null className and empty state`, () => {
    const result = mergeClasses(null, {});
    expect(result).toBe('');
  });

  it(`6. Should handle null className and undefined state`, () => {
    const result = mergeClasses(null, undefined);
    expect(result).toBe('');
  });

  it(`7. Should handle array values in state`, () => {
    const result = mergeClasses(null, {
      ['active_class']: [true, 'custom_class_1'],
      ['open__class']: [false, 'custom_class_2'],
    });
    expect(result).toBe('custom_class_1');
  });
});

import { mergeRefs } from './refs';

// ----------------------------------------------------------------------

describe('mergeRefs()', () => {
  it(`1. Should call all function refs with the value`, () => {
    const ref1 = vi.fn();
    const ref2 = vi.fn();
    const mergedRef = mergeRefs([ref1, ref2]);

    const value = 'test';
    mergedRef(value);

    expect(ref1).toHaveBeenCalledWith(value);
    expect(ref2).toHaveBeenCalledWith(value);
  });

  it(`2. Should handle null and undefined refs gracefully`, () => {
    const ref1 = vi.fn();
    const ref2 = { current: null };
    const mergedRef = mergeRefs([ref1, null, ref2, undefined]);

    const value = 'test';
    mergedRef(value);

    expect(ref1).toHaveBeenCalledWith(value);
    expect(ref2.current).toBe(value);
  });

  it(`3. Should handle an empty array of refs`, () => {
    const mergedRef = mergeRefs([]);

    const value = 'test';
    mergedRef(value);

    // No refs to call, so no expectations
  });

  it(`4. Should handle an array with only null or undefined refs`, () => {
    const mergedRef = mergeRefs([null, undefined]);

    const value = 'test';
    mergedRef(value);

    // No refs to call, so no expectations
  });

  it(`5. Should handle an array with mixed function and object refs`, () => {
    const ref1 = vi.fn();
    const ref2 = { current: null };
    const mergedRef = mergeRefs([ref1, ref2]);

    const value = 'test';
    mergedRef(value);

    expect(ref1).toHaveBeenCalledWith(value);
    expect(ref2.current).toBe(value);
  });
});

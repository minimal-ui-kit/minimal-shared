import { uuidv4 } from './uuidv4';

// ----------------------------------------------------------------------

describe('uuidv4()', () => {
  it(`1. Should generate a valid UUID v4`, () => {
    const uuid = uuidv4();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuid).toMatch(uuidRegex);
  });

  it(`2. Should generate unique UUIDs`, () => {
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();
    expect(uuid1).not.toBe(uuid2);
  });

  it(`3. Should generate a string of length 36`, () => {
    const uuid = uuidv4();
    expect(uuid.length).toBe(36);
  });

  it(`4. Should have the correct version number`, () => {
    const uuid = uuidv4();
    expect(uuid[14]).toBe('4');
  });

  it(`5. Should have the correct variant`, () => {
    const uuid = uuidv4();
    const variant = parseInt(uuid[19], 16);
    expect(variant).toBeGreaterThanOrEqual(8);
    expect(variant).toBeLessThanOrEqual(11);
  });
});

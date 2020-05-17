import validateAnnotations from './validate-annotations';

describe('validateAnnotations', () => {
  it('should return the same empty array', () => {
    expect(validateAnnotations([])).toEqual([]);
  });

  it('should not return same array for annotations that are already sorted', () => {
    expect(
      validateAnnotations([{ id: 'a', startOffset: 0, endOffset: 40 }]),
    ).toEqual([{ id: 'a', startOffset: 0, endOffset: 40 }]);
    expect(
      validateAnnotations([
        { id: 'a', startOffset: 0, endOffset: 40 },
        { id: 'b', startOffset: 20, endOffset: 50 },
        { id: 'c', startOffset: 40, endOffset: 120 },
        { id: 'd', startOffset: 40, endOffset: 80 },
      ]),
    ).toEqual([
      { id: 'a', startOffset: 0, endOffset: 40 },
      { id: 'b', startOffset: 20, endOffset: 50 },
      { id: 'c', startOffset: 40, endOffset: 120 },
      { id: 'd', startOffset: 40, endOffset: 80 },
    ]);
  });

  it('should sort by startOffset (asc) then endOffset (desc)', () => {
    expect(
      validateAnnotations([
        { id: 'a', startOffset: 60, endOffset: 80 },
        { id: 'b', startOffset: 40, endOffset: 120 },
        { id: 'c', startOffset: 120, endOffset: 140 },
        { id: 'd', startOffset: 0, endOffset: 40 },
        { id: 'e', startOffset: 20, endOffset: 50 },
        { id: 'f', startOffset: 40, endOffset: 80 },
      ]),
    ).toEqual([
      { id: 'd', startOffset: 0, endOffset: 40 },
      { id: 'e', startOffset: 20, endOffset: 50 },
      { id: 'b', startOffset: 40, endOffset: 120 },
      { id: 'f', startOffset: 40, endOffset: 80 },
      { id: 'a', startOffset: 60, endOffset: 80 },
      { id: 'c', startOffset: 120, endOffset: 140 },
    ]);
  });
});

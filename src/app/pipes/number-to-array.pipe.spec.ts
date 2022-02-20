import { NumberToArrayPipe } from './number-to-array.pipe';

describe('NumberToArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberToArrayPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms 5 to an array with 5 elements', () => {
    const pipe = new NumberToArrayPipe();
    const resultArray: number[] = pipe.transform(5);
    expect(resultArray).toBeTruthy();
    expect(resultArray).toHaveSize(5);
  });
});

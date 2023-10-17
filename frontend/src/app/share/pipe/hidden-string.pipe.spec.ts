import { HiddenStringPipe } from './hidden-string.pipe';

describe('HiddenStringPipe', () => {
  it('create an instance', () => {
    const pipe = new HiddenStringPipe();
    expect(pipe).toBeTruthy();
  });
});

import shuffle from "../src";
import { expect } from "chai";

describe('shuffle function', () => {
  const randArray = (n: number) => {
    const array: string[][]= []
    for (var i = 0; i < n; i++) {
      const _array: string[] = []
      const frequency = Math.floor(Math.random() * 10) + 1
      for (var _i = 0; i < frequency; _i++) {
        _array.push(Math.random().toString(36).substr(2, 5))
      }
      array.push(_array)
    }
  }

  it(`should three arg will success`, () => {
    const arr1 = ['a1', 'a2', 'a3', 'a4', 'a5']
    const arr2 = ['b1', 'b2']
    const arr3 = ['c1', 'c2']
    const flattenArry = [ 'a1', 'b1', 'a2', 'b2', 'a3', 'c1', 'a4', 'c2', 'a5' ]
    const result = shuffle(arr1, arr2, arr3);
    expect(result).to.eql(flattenArry)
  });

  it(`should will success with one empty array`, () => {
    const arr1 = ['a1', 'a2', 'a3', 'a4']
    const arr2: string[]= []
    const arr3 = ['b1', 'b2']
    const flattenArry = ['a1', 'b1', 'a2', 'b2', 'a3', 'a4']
    const result = shuffle(arr1, arr2, arr3);
    expect(result).to.eql(flattenArry)
  });
});

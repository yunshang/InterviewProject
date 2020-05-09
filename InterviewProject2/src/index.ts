const shuffle = function (...arrArgs: string[][]) {
  const arrLength: number[] = []
  let flattenArray: string[] = []
  let maxArray: string[] = []
  let minArray: string[] = []
  const mergeArray = (base: string[], target: string[]) => {
    const result: string[] = []
    for (var i = 0; i < base.length; i++) {
      if (base.length > i) result.push(base[i])
      if (target.length > i) result.push(target[i])
    }
    return result
  }
  // array sort oder desc
  arrArgs.sort(function(a, b){return b.length - a.length});
  if (arrArgs.length == 1) return arrArgs[0]
  if (arrArgs.length == 2) return mergeArray(arrArgs[0], arrArgs[1])
  maxArray = arrArgs[0]
  minArray = arrArgs[1]
  for (var i = 2; i < arrArgs.length; i++) {
    if ((maxArray.length - minArray.length) <= arrArgs.length) {
      minArray.push(...arrArgs[i])
    } else {
      const len = arrArgs[i].length
      minArray.push(...(arrArgs[i].slice(0, len % 2)))
      maxArray.push(...(arrArgs[i].slice(len % 2, len)))
    }
  }
  flattenArray = mergeArray(maxArray, minArray)

  return flattenArray
}

// const arr1 = ['a1', 'a2', 'a3', 'a4', 'a5']
// const arr2 = ['b1', 'b2']
// const arr3 = ['c1', 'c2' ]
// const arr4 = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7']
// const result = shuffle(arr1, arr2, arr3)
// console.log(result, 'flattenArray')

export default shuffle;
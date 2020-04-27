const shuffle = function (...arrArgs: string[][]) {
  const arrLength: number[] = []
  const flattenArry: string[] = []
  // Get arrArgs maximum length
  arrArgs.map((arr) => {
    arrLength.push(arr.length)
  })
  const max = Math.max( ...arrLength);

  for (var i = 0; i < max; i++) {
    // Map args to flatten to a new array
    arrArgs.map((arr) => {
      if (arr.length <= i) return
      flattenArry.push(arr[i])
    })
  }

  console.log(flattenArry, 'flattenArry')
  return flattenArry
}

// const arr1 = ['a1', 'a2', 'a3', 'a4']
// const arr2 = ['b1', 'b2']
// const arr3: string[] = []
// const arr4 = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7']
// shuffle(arr1, arr2, arr3, arr4)

export default shuffle;
const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([7, 4, 1])
    reject('Things went wrong!')
  }, 2000)
})

doWorkPromise
  .then((result) => {
    console.log('Success', result)
  })
  .catch((err) => console.log('Error', err))

//
//                               fulfilled
//                              /
// Promise      -- pending -->
//                              \
//                               rejected
//

/* Promise chaining */

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}

add(1, 1)
  .then((sum) => {
    console.log(sum)
    return add(sum, 4) // return next promise
  })
  .then((sum2) => {
    console.log(sum2)
  })
  .catch((e) => {
    console.log(e)
  })

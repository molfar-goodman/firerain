import { red, blue } from 'colorette'
import fetch from 'node-fetch'

// Count errors & successful requests
let errors = 0,
  success = 0,
  errorMessages = []

function worker(host, amount, interval) {
  // Send requests with interval
  let rCount = 0
  setInterval(() => {
    for (let i = 0; i < amount; i++) {
      let isFailedRequest = false
      rCount++
      if(rCount<2000)
      fetch(host)
        .catch((err) => {
          if (err) {
            if (!errorMessages.includes(err.code)) {
              errorMessages.push(err.code)
              // console.log(`${host} Error: ${red(err)}`)
            }
            rCount--
            isFailedRequest = true
            errors++
          }
        })
        .then(() => {
          if (!isFailedRequest) {
            success++
            rCount--
            // console.log(resp.text())
          }
          isFailedRequest = false
        })
    }

    console.log(`${host} ${rCount} Errors: ${red(errors)} Success: ${blue(success)}`)
  }, interval)
}

try {
worker(process.argv[2], process.argv[3], process.argv[4])
} catch (e) {
  worker(process.argv[2], process.argv[3], process.argv[4])  
}


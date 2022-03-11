import { red, blue } from 'colorette'
import fetch from 'node-fetch'

// Count errors & successful requests
let errors = 0,
  success = 0,
  errorMessages = []

function worker(host, amount, interval) {
  // Send requests with interval
  setInterval(() => {
    for (let i = 0; i < amount; i++) {
      let isFailedRequest = false

      fetch(host)
        .catch((err) => {
          if (err) {
            if (!errorMessages.includes(err.code)) {
              errorMessages.push(err.code)
              console.log(`${host} Error: ${red(err)}`)
            }
            isFailedRequest = true
            errors++
          }
        })
        .then((resp) => {
          if (!isFailedRequest) {
            success++
            console.log(resp.text())
          }
          isFailedRequest = false
        })
    }
    console.log(`${host} Errors: ${red(errors)} Success: ${blue(success)}`)
  }, interval)
}

worker(process.argv[2], process.argv[3], process.argv[4])

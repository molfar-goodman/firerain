import { simpleDDoS } from 'simple-ddos'

let url = process.env.FACKED_URL || "http://localhost:3000" 
let threads = process.env.THREADS || 10
let requests = process.env.REQUESTS || 100
let interval = process.env.INTERVAL || 1500

console.log(`Start for ${FACKED_URL}`)


// Launches 10 threads of sending 100 requests every 1.5s
simpleDDoS(threads, url, requests, interval)
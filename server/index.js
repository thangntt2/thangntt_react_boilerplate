const express = require('express')
const net = require('net')
const addSocket = require('express-ws')
const Queue = require('./lib/Queue.src')

const URL = 'bn02.ddns.net'
const STATS_COMMAND = JSON.stringify({
  command: 'stats',
})
const INTERVAL = 5000
const DATA_CACHE_MAX_LENGTH = 10

const app = express()
addSocket(app)

const dataCache = new Queue()

// Hack fix json
const fixJson = (jsonStr) => {
  for (let i = 0; i < jsonStr.length - 1; i += 1) {
    if (jsonStr[i] === '}') {
      const nextStr = jsonStr.substring(i + 1).trim()[0]
      if (nextStr === '{') {
        return `${jsonStr.substring(0, i + 1)},${jsonStr.substring(i + 1)}`
      }
    }
  }
  return jsonStr
}

// Todo: Write timeout
const updateStats = () =>
  new Promise((resolve) => {
    console.log('update stats')
    let socket = net.connect({ port: 3345, host: URL })
    socket.on('connect', async () => {
      socket.write(STATS_COMMAND)
      socket.on('data', (res) => {
        const data = res.toString()
        resolve(JSON.parse(fixJson(data.replace('\x00', ''))))
      })
    })
    socket.on('error', (error) => {
      console.log(error)
      socket = net.connect({ port: 3345, host: URL })
    })
  })

const sleep = ms => new Promise((resolve) => {
  setTimeout(resolve, ms)
})

app.ws('/', async (client) => {
  console.log('websocket connection')
  // first cleanup dataCache
  const lastData = dataCache.getLast()
  dataCache.dequeueAll()
  dataCache.enqueue(lastData)
  // then every call data, push all dataCache data
  client.on('message', async () => {
    console.log('On request')
    const data = dataCache.dequeueAll()
    client.send(JSON.stringify(data.length > 0 ? data : []))
  })
})

module.exports = async () => {
  await app.listen(3001)
  console.log('Application started at port 3001')
  let timestamp = Date.now()
  while (true) {
    const stats = await updateStats()
    dataCache.enqueue(stats)
    if (dataCache.getLength() >= DATA_CACHE_MAX_LENGTH) {
      for (let i = 0; i < (dataCache.getLength() - DATA_CACHE_MAX_LENGTH); i += 1) {
        dataCache.dequeue()
      }
    }
    const timeRemain = INTERVAL + timestamp + -Date.now()
    await sleep(timeRemain)
    timestamp = Date.now()
  }
}

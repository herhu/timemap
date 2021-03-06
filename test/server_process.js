import test from 'ava'
const childProcess = require('child_process')
const http = require('http')

const SERVER_LAUNCH_WAIT_TIME = 10 * 1000

let serverProc = null
let serverExited = false

test.before.cb((t) => {
  console.log('launching server...')
  serverProc = childProcess.spawn('yarn', ['dev'], {
    cwd: '.',
    stdio: 'ignore'
  })

  serverProc.on('exit', function (code, signal) {
    serverExited = true
  })

  setTimeout(t.end, SERVER_LAUNCH_WAIT_TIME)
})

test.after(function () {
  console.log('killing server...')
  serverProc.kill('SIGKILL')
})

test('should launch', (t) => {
  t.false(serverExited)
})

const urls = ['/', 'js/index.bundle.js']

urls.forEach(function (url) {
  test.cb('should respond to request for "' + url + '"', (t) => {
    http.get(
      {
        hostname: 'localhost',
        port: 8080,
        path: '/',
        agent: false
      },
      function (res) {
        let resultData = ''

        if (res.statusCode !== 200) {
          t.fail('Server response was not 200.')
        } else {
          res.on('data', function (data) {
            resultData += data
          })

          res.on('end', function () {
            if (resultData.length > 0) {
              t.pass()
            } else {
              t.fail('Server returned no data.')
            }
          })
        }

        t.end()
      }
    )
  })
})

const request = require('supertest')

const server = require('./server')

test('GET / returns correct response', (done) => {
  request(server)
    .get('/') // get home page
    .expect(200) // response code
    .end((err, res) => {
      expect(err).toBeNull() // expect no error
      expect(res.text).toMatch('Message Of The Day') // to match whatever content is written on the home page
      done()
    })
})

// test('GET /tips returns the tips page', (done) => {
//     request(server)
//     .get('/tips') // get tips page
//     .expect(200) //response code
//     .end((err, res) => {
//         expect(err).toBeNull() //expect no error
//         expect(res.text).toMatch() // to match whatever content is written on the tips page
//         done()
// })
// })

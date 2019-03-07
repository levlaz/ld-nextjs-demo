
const express = require('express')
const next = require('next')
const Featureflow = require('featureflow-node-sdk');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const featureflow = new Featureflow.Client({apiKey: 'srv-env-685e066dea464f88be14effbf65cf69c'});
app.prepare()
.then(() => {
  const server = express()
    server.use((req, res, next) => {

        let user = new Featureflow.UserBuilder("user1")
            .withAttribute('country', 'US')
            .withAttribute('page', 'index')
            .withAttributes('roles', ['USER_ADMIN', 'BETA_CUSTOMER'])
            .build();

        req.features = featureflow.evaluateAll(user);
        return next();
    })

    server.get('/api/features', (req, res) => {
        let user = new Featureflow.UserBuilder("user2")
            .withAttribute('country', 'US')
            .withAttribute('page', 'post')
            .withAttributes('roles', ['USER_ADMIN', 'BETA_CUSTOMER'])
            .build();
        res.json(featureflow.evaluateAll(user));
    })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

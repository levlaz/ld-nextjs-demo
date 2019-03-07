
const express = require('express')
const next = require('next')
//const Featureflow = require('featureflow-node-sdk');
const LaunchDarkly = require('ldclient-node');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
//const featureflow = new Featureflow.Client({ apiKey: 'srv-env-685e066dea464f88be14effbf65cf69c' });

app
  .prepare()
  .then(() => {
    const ldclient = LaunchDarkly.init(process.env.LD_SDK_KEY);
    const server = express()
    server.use(async (req, res, next) => {

      // let user = new Featureflow.UserBuilder("user1")
      //   .withAttribute('country', 'US')
      //   .withAttribute('page', 'index')
      //   .withAttributes('roles', ['USER_ADMIN', 'BETA_CUSTOMER'])
      //   .build();

      let user = {
        "key": 'any',
        "country": 'AU',
        "custom": {
          "page": 'index',
          "roles": ['USER_ADMIN', 'BETA_CUSTOMER']
        }
      }

      allFlags = await ldclient.allFlagsState(user).then(allFlags => {
        req.features = allFlags.allValues();
      });

      //req.features = featureflow.evaluateAll(user);
      return next();
    })

    server.get('/api/features', (req, res) => {
      // let user = new Featureflow.UserBuilder("user2")
      //   .withAttribute('country', 'US')
      //   .withAttribute('page', 'post')
      //   .withAttributes('roles', ['USER_ADMIN', 'BETA_CUSTOMER'])
      //   .build();
      let user = {
        "key": 'any',
        "country": 'AU',
        "custom": {
          "page": 'index',
          "roles": ['USER_ADMIN', 'BETA_CUSTOMER']
        }
      }

      allFlags = ldclient.allFlagsState(user).then(allFlags => {
        res.json(allFlags.allValues());
      })
      //res.json(featureflow.evaluateAll(user));
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

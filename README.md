# ld-nextjs-demo
An example of using LaunchDarkly in a nextjs server-side react application

Based off an example from this repo:
https://github.com/featureflow/featureflow-example-nextjs

## QuickStart

1. Clone this repo
2. Run `npm install` to install all dependencies
3. Export your LaunchDarkly SDK Key with `export LD_SDK_KEY=$YOUR_SDK_KEY`
4. Start up the application with `npm run dev`

If you navigate to `http://locahost:3000` you will see a listing of all of your
feature flags.

If you make changes to a flag within LaunchDarkly and then
click on the `client side refresh` link you will see any changes that were made.





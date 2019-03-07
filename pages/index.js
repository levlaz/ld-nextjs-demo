import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <h1>Features</h1>
    <ul>
      {props.featureKeys.map((key, index) => (
        <li key={key}>
            {key} is {props.features[key]}
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function({req}) {
    let features= {};
    let featureKeys = [];
    if( req ){
        features = req.features;
        for (let p in features) {
            if(  features.hasOwnProperty(p) ) {
                featureKeys.push(p);
            }
        }
    }else{
        const res = await fetch('/api/features')
        features = await res.json()
        for (let p in features) {
            if(  features.hasOwnProperty(p) ) {
                featureKeys.push(p);
            }
        }
    }

  return {
    features: features,
    featureKeys: featureKeys
  }
};



export default Index

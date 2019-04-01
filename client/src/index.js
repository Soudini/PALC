import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-bubble';

const Demo = ({ loading }) => (
  <Container>
    <Content>PALC</Content>

    <Loader loading={loading} />
  </Container>
)

ReactDOM.render(<Demo loading={true} />, document.getElementById('container'))

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))




/*ReactDOM.render(<Banner />, document.getElementById('banner'))
ReactDOM.render(<Body />, document.getElementById('root'));
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

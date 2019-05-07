import react from 'react'
import reactDom from 'react-dom'

import App from './containers/App/App'
import { store } from './store'

import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

reactDom.render(<AppWithStore />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

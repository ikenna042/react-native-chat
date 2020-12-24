import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Login from './screens/Login'
import Chat from './screens/Chat'

const AppNavigator = createStackNavigator(
  {
    Chat,
    Login

  },
  {
    headerMode: 'none'
  }


);

export default createAppContainer(AppNavigator);

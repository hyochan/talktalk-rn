import { observable } from 'mobx';
import { NavigationActions } from 'react-navigation';

import User from '../models/User';

class ObservableListStore {
  @observable user: User = new User();
}

const observableListStore = new ObservableListStore();
export default observableListStore;

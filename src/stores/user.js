// 存储的是用户的信息
import { observable, action, makeObservable } from 'mobx';
import { Auth } from '../models';

class UserStore {
  constructor() {
    makeObservable(this)
  }
  @observable currentUser = null;
  // 拿起用户的信息
  @action pullUser() {
    this.currentUser = Auth.getCurrentUser()
  }
  //  注销后清空用户信息
  @action resetUser() {
    this.currentUser = null;
  }
}


export default new UserStore();

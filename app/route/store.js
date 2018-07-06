import { observable, action } from 'mobx';

class Store {
  @observable name = 'test';

  @action.bound
  handleChangeName() {
    this.name = 'changed';
    this.create().next();
  }

  @action
  async test() {
    console.log('异步');
    this.name = 'async';
  }

  *create() {
    console.log('Generator');
    const result = yield this.test();
    console.log(result, '----');
  }
}
const store = new Store();
export default store;

import { observable, toJS, computed, action } from 'mobx';

class Store {
  @observable name = 'test';

  @computed get getPrintList() {
    return toJS(this.tableList);
  }

  @action.bound
  handleChangeName() {
    this.name = 'changed';
    this.create().next();
  }

  @action
  async test() {
    console.log('异步');
    return 100;
  }

  *create() {
    console.log('Generator');
    const result = yield this.test();
    console.log(result, '----');
  }
}
const store = new Store();
export default store;

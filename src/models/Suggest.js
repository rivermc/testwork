export default class Suggest {
  _id = null;
  _type = 'user';
  _alias = '';
  _name = '';
  _avatar = '';

  constructor(data) {
    if (data) {
      this.parse(data)
    }
  }

  parse(data) {
    this._type = data.type;
    this._alias = data.alias;
    this._name = this.validateName(data.name) ? data.name : '';
    this._avatar = data.avatar;
  }

  validateName(name) {
    const regexp = /^[a-zA-Z0-9]*$/i;
    return regexp.test(name)
  }

  get type() { return this._type }
  get alias() { return this._alias }
  get name() { return this._name }
  get avatar() { return this._avatar }
}

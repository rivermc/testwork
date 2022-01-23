export default class Suggest {
  _type = ''
  _alias = ''
  _name = ''
  _avatar = ''
  _caption = ''
  _selected = false

  constructor(data) {
    if (data) {
      this.parse(data)
    }
  }

  parse(data) {
    this._type = data.type
    this._alias = `@${data.alias}`
    this._name = data.name || `@${data.alias}`
    this._avatar = data.avatar || '/logo.png'
    this._caption = data.type === 'company' ? 'Компания' : ''
  }

  get type() { return this._type }
  get alias() { return this._alias }
  get name() { return this._name }
  get avatar() { return this._avatar }
  get caption() { return this._caption }
  get selected() { return this._selected }
  set selected(value) { this._selected = value }
}

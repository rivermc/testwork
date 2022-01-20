import Suggest from "@/models/Suggest";

export default class SuggestsCollection {
  _collection = [];

  constructor(data) {
    this.set(data)
  }

  set(data) {
    if (Array.isArray(data) && data.length) {
      this._collection = data.map((item) => new Suggest(item))
    }
  }

  asArray() {
    return this._collection.map((item) => item);
  }

  get length() {
    return this._collection.length;
  }
}

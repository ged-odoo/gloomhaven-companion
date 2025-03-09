import { shuffle } from "./utils";

export class Deck {
  constructor(cards = []) {
    this._cards = cards.slice();
    this._discardPile = [];
  }

  shuffle() {
    shuffle(this._cards);
  }

  take(n) {
    const result = this._cards.slice(0, n);
    this._cards = this._cards.slice(n);
    return result;
  }

  deal(n) {
    let result = [];
    if (this._cards.length < n) {
      while (this._discardPile.length) {
        this._cards.push(this._discardPile.pop());
      }
    }
    shuffle(this._cards);
    for (let i = 0; i < n; i++) {
      const card = this._cards.pop();
      result.push(card);
      this._discardPile.unshift(card);
    }
    return result;
  }

  length() {
    return this._cards.length;
  }

  addCard(card) {
    this._cards.push(card);
  }

  count(predicate) {
    let result = 0;
    for (let c of this._cards) {
      if (predicate(c)) {
        result++;
      }
    }
    return result;
  }

  filterDiscardPile(predicate) {
    this._discardPile = this._discardPile.filter(predicate);
  }

  hasInDiscardPile(predicate) {
    return this._discardPile.some(predicate);
  }

  moveDiscarPileToDeck() {
    this._cards = this._cards.concat(this._discardPile);
    this._discardPile = [];
    this.shuffle();
  }
}

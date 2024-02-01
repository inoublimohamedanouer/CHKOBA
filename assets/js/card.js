class card {
  constructor(type, number) {
    this.type = type;
    this.number = number;
  }
  src() {
    return `${this.type}${this.number}`;
  }
}

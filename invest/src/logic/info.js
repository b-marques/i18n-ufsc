const exchange_rate = 3.8;

export default class Info {
  constructor() {
    this.stocks = [
      {
        ticker: "BIDI4",
        quantity: 100,
        usd: 10,
        brl: 38,
        name: "Banco Inter",
        updated_time: {
          day: 26,
          month: 10,
          year: 2018,
          hours: 10,
          minutes: 58,
          seconds: 32
        },
        totalbrl: 3800,
        totalusd: 1000
      },
      {
        ticker: "PETR4",
        quantity: 50,
        usd: 32.55,
        brl: 123.69,
        name: "Petrobras",
        updated_time: {
          day: 21,
          month: 7,
          year: 2016,
          hours: 1,
          minutes: 42,
          seconds: 32
        },
        totalbrl: 6184.5,
        totalusd: 1627.25
      },
      {
        ticker: "MGLU3",
        quantity: 254,
        usd: 94.65,
        brl: 359.67,
        name: "Magazine Luiza",
        updated_time: {
          day: 21,
          month: 9,
          year: 2017,
          hours: 22,
          minutes: 35,
          seconds: 32
        },
        totalbrl: 6184.5,
        totalusd: 24041.1
      }
    ];
    this.wallet = { brl: 0, usd: 0 };
    this.compute_wallet_value();
  }

  add_stock(ticker) {
    if (ticker === "") return;
    let date = new Date();
    this.stocks.push({
      ticker: ticker,
      quantity: 0,
      usd: 0,
      brl: 0,
      name: "",
      updated_time: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
      },
      totalbrl: 0,
      totalusd: 0
    });
  }
  update_stock(id, value, quantity, name, idiom) {
    let date = new Date();
    this.stocks[id].quantity = Number(quantity);
    this.stocks[id].usd =
      idiom === "pt-br" ? Number(value) / exchange_rate : Number(value);
    this.stocks[id].brl =
      idiom === "pt-br" ? Number(value) : Number(value) * exchange_rate;
    this.stocks[id].name = name;
    this.stocks[id].updated_time.day = date.getDate() + 1;
    this.stocks[id].updated_time.month = date.getMonth() + 1;
    this.stocks[id].updated_time.year = date.getFullYear();
    this.stocks[id].updated_time.hours = date.getHours();
    this.stocks[id].updated_time.minutes = date.getMinutes();
    this.stocks[id].updated_time.seconds = date.getSeconds();
    this.stocks[id].totalbrl = Number(quantity) * this.stocks[id].brl;
    this.stocks[id].totalusd = Number(quantity) * this.stocks[id].usd;
    this.compute_wallet_value();
  }

  compute_wallet_value() {
    this.wallet.brl = 0;
    this.wallet.usd = 0;
    for (let stock of this.stocks) {
      this.wallet.brl += stock.totalbrl;
      this.wallet.usd += stock.totalusd;
    }
  }

  remove_stock(id) {
    this.stocks.splice(id, 1);
    this.compute_wallet_value();
  }
}

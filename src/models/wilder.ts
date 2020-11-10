import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface Wilder {
  name: string;
  city: string;
}

interface WnSWilder extends Wilder {
  companyName: string;
}

// const printType = (wilder: Wilder | WnSWilder) => {
//   if ("companyName" in wilder) {
//     console.log(`I'm wns Wilder, i work in ${wilder.companyName}`)
//   } else {
//     console.log("I'm a classic one")
//   }
// }

class WilderClass implements Wilder {
  name: string;
  city: string;

  constructor(name: string, city: string) {
    this.name = name;
    this.city = city;
  }

  sayHello() {
    console.log(`Ì'm ${name}`);
  }
}

class WnS extends WilderClass {
  companyName = '';

  sayWhereYouWork() {
    console.log(`I work at ${this.companyName}`);
  }
}

const WilderSchema = new Schema({
  name: { type: String, unique: true },
  city: { type: String },
  skills: [{ title: String, count: Number }],
});

export = mongoose.model('Wilder', WilderSchema);

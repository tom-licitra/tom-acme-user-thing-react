const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme', {
  logging: false
});

const User = db.define('user', {
  name: Sequelize.STRING
})

const Thing = db.define('thing', {
  name: Sequelize.STRING
})

const UserThing = db.define('user_thing', {});

// User.hasMany(UserThing);
// Thing.hasMany(UserThing);
UserThing.belongsTo(User);
UserThing.belongsTo(Thing);
User.belongsToMany(Thing, {through: 'user_thing'});
Thing.belongsToMany(User, {through: 'user_thing'});

const sync = () => db.sync({force: true});

const seedUsers = ['Magic', 'Michael', 'Shaq', 'LeBron', 'Kobe'];
const seedThings = ['Sneakers', 'Rings', 'Basketballs', 'Baseballs', 'Footballs'];

const seed = async () => {
  const [ Magic, Michael, Shaq, LeBron, Kobe ] = await Promise.all(seedUsers.map( user => User.create({name: user})));
  const [ Sneakers, Rings, Basketballs, Baseballs, Footballs ] = await Promise.all(seedThings.map( thing => Thing.create({name: thing})));
  UserThing.create({userId: Magic.id, thingId: Sneakers.id});
  UserThing.create({userId: Magic.id, thingId: Basketballs.id});
  UserThing.create({userId: Michael.id, thingId: Sneakers.id});
  UserThing.create({userId: Michael.id, thingId: Rings.id});
  UserThing.create({userId: Shaq.id, thingId: Basketballs.id});
  UserThing.create({userId: Michael.id, thingId: Baseballs.id});
}

module.exports = {
  sync,
  seed,
  models: {
    User,
    Thing
  }
}

var user=require('./config/user');
var Bot=require('./app/bot');

var version=process.env.npm_package_version;

console.log("Maelström Bot - "+user.username);
console.log("version "+version);
Bot();

var user=require('./config/user');
var Bot=require('./app/bot');

var version=process.env.npm_package_version;

console.log("Maelström Bot - "+user.username);
console.log("version "+version);
Bot();

/*Map.refresh(function() {
    console.log(Map.list);
    Map.getCity(Map.list[0],function(err,res){
        if(err) console.log(err);
    ShipModels.refresh(function() {
        console.log(ShipModels.list);
        Login.refresh(function() {
            console.log(Login.token);
            Ships.refresh(function() {
                console.log(Ships.list);
                if(Ships.list.length===0){
                    Ships.buildShip(ShipModels.list[0],Map.list[0],"Golden Heart",function(err,res){
                        if(err) console.log(err);
                        console.log(res);
                        Ships.refresh(function(){
                            console.log(Ship.list);
                        });
                    });
                }
            });
            });
        });
    });
});*/

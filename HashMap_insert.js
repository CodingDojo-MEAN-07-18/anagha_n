var hashMap = [];
hashMap.length = 30;  
String.prototype.hashCode = function(){
    var hash = 0;
    if(this.length == 0){
        return hash;
    }
    for(i=0; i<this.length; i++){
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash) + char;
        hash &= hash;
    }
    return hash;
}
    var hashedKey = "role".hashCode();

function mod(input, div){
    return (input % div + div) % div;
    }
    var idx = mod(hashedKey, hashMap.length);

function insert(key,value,hashMap){
    var hashedKey = key.hashCode();
    var index = mod(hashedKey, hashMap.length);
    if (hashMap[index] == undefined){
        hashMap[index]=[[key,value]];
    }
    else{
        for (var i=0;i<hashMap[index].length;i++){
            if(hashMap[index][i][0]==key){
                hashMap[index][i][1]=value;
                return hashMap;
            }
        hashMap[index].push[key,value];
        }
    }
    return hashMap;
}

insert('role','pet',hashMap);
insert('role','micah',hashMap);
insert("species", "Snorkasaurus",hashMap);
insert("type", "dinosaur",hashMap);
insert("owner", "Fred Flintstone",hashMap);
insert("creator", "Hanna-Barbera",hashMap);
console.log(hashMap);
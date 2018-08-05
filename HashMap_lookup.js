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
function hashLookUp(hashMap,key){
    if(key.length < 1 || hashMap.length < 1){
        return undefined;
    }
    var hashedKey = key.hashCode();
    var index = mod(hashedKey, hashMap.length);
    if(hashMap[index] != undefined){
        for(var i = 0;i<hashMap[index].length;i++){
            if(key == hashMap[index][i][0]){
                return hashMap[index][i][1];
            }
        }
    }
    return null;
}
    console.log(hashLookUp(hashMap,'role'))
    console.log(hashLookUp(hashMap,'owner'))
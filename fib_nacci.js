function fib(){
    var first = 0;
    var second = 1;
    function nacci() {
        var last = first;
        first = second;
        second += last;
        console.log(second);
    }
    return nacci;
}

var fibCounter = fib();

fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
var assert = require('assert');

describe('#error()',function () {
    it('should return throw an error with the information as input', function() {
        try
        {
            error(123);
            error(456);
        }
        catch (exception)
        {
            assert.equal(123,exception);
        }
        try
        {
            error();
        }
        catch (exception)
        {
            assert.equal(undefined,exception);
        }
    });
})

describe('#isNum()',function () {
    it('should return true if the input is number', function() {
        assert.equal(true, isNum("0"));
        assert.equal(true, isNum("1"));
        assert.equal(true, isNum("2"));
        assert.equal(true, isNum("3"));
        assert.equal(true, isNum("4"));
        assert.equal(true, isNum("5"));
        assert.equal(true, isNum("6"));
        assert.equal(true, isNum("7"));
        assert.equal(true, isNum("8"));
        assert.equal(true, isNum("9"));
        assert.equal(true, isNum(0));
        assert.equal(true, isNum(1));
        assert.equal(true, isNum(2));
        assert.equal(true, isNum(3));
        assert.equal(true, isNum(4));
        assert.equal(true, isNum(5));
        assert.equal(true, isNum(6));
        assert.equal(true, isNum(7));
        assert.equal(true, isNum(8));
        assert.equal(true, isNum(9));
        assert.equal(false, isNum("10"));
        assert.equal(false, isNum(10));
        assert.equal(false, isNum(-1));
        assert.equal(false, isNum("-1"));
        assert.equal(false, isNum("a"));
        assert.equal(false, isNum("b"));
        assert.equal(false, isNum(" "));
        assert.equal(false, isNum());
        assert.equal(false, isNum(""));
        assert.equal(false, isNum("?"));
        assert.equal(false, isNum());
    });
})

describe('stream',function(){
    tempStream=new stream();
    assert.equal("", tempStream.str);
    assert.equal(0, tempStream.index);
    describe('#Set()',function () {
        it('should set the streams\'s string as input and set index as 0', function(){
            tempStream=new stream();
            tempStream.Set("string");
            assert.equal("string", tempStream.str);
            assert.equal(0, tempStream.index);
            tempStream.Set("");
            assert.equal("", tempStream.str);
            assert.equal(0, tempStream.index);
            tempStream.Set(12345);
            assert.equal(12345, tempStream.str);
            assert.equal(0, tempStream.index);
        })
    })
    describe('#getCh()',function () {
        it('should get a char  in the stream,if the stream is empty or has been read through it should return an empty string ', function() {
            tempStream=new stream();
            tempStream.Set("string");
            assert.equal("s", tempStream.getCh());
            assert.equal("t", tempStream.getCh());
            assert.equal("r", tempStream.getCh());
            assert.equal("i", tempStream.getCh());
            assert.equal("n", tempStream.getCh());
            assert.equal("g", tempStream.getCh());
            assert.equal("", tempStream.getCh());
            assert.equal("", tempStream.getCh());
            tempStream.Set("+?# 456");
            assert.equal("+", tempStream.getCh());
            assert.equal("?", tempStream.getCh());
            assert.equal("#", tempStream.getCh());
            assert.equal(" ", tempStream.getCh());
            assert.equal(4, tempStream.getCh());
            assert.equal(5, tempStream.getCh());
            assert.equal(6, tempStream.getCh());
            assert.equal("", tempStream.getCh());
        })
    })
    describe('#getDouble()',function () {
        it('if the first element in the stream is double it should get the double,else return NaN ', function() {
            tempStream=new stream();
            tempStream.Set("1.3+0.6+.3+0.5");
            assert.equal(1.3, tempStream.getDouble());
            assert.equal("", tempStream.getDouble());
            tempStream.getCh();
            assert.equal("0.6", tempStream.getDouble());
            tempStream.getCh();
            assert.equal("0.3", tempStream.getDouble());
            tempStream.getCh();
            assert.equal(0.5, tempStream.getDouble());
            tempStream.Set("1.7.5");
            assert.equal(1.7, tempStream.getDouble());
            tempStream.Set(".5.5");
            assert.equal("0.5", tempStream.getDouble());
            tempStream.Set("a0.5+0.5");
            assert.equal("", tempStream.getDouble());
            tempStream.Set("+5.5");
            assert.equal("", tempStream.getDouble());
            tempStream.Set("00.5");
            assert.equal("0.5", tempStream.getDouble());
        })
    })
    describe('#putBackCh()',function () {
        it('should put back an char(by reduce index for 1),if the index is 0 than return without operation', function() {
            tempStream=new stream();
            assert.equal(0, tempStream.index);
            tempStream.putBackCh();
            assert.equal(0, tempStream.index);
            tempStream.Set("string");
            assert.equal(0, tempStream.index);
            tempStream.getCh();
            tempStream.getCh();
            tempStream.getCh();
            assert.equal(3, tempStream.index);
            tempStream.putBackCh();
            assert.equal(2, tempStream.index);
            tempStream.putBackCh();
            assert.equal(1, tempStream.index);
            tempStream.putBackCh();
            assert.equal(0, tempStream.index);
            tempStream.putBackCh();
            assert.equal(0, tempStream.index);
        })
    })
    describe('#clear()',function () {
        it('should clear the stream\'s string and set the stream\'s index to 0', function() {
            tempStream=new stream();
            tempStream.Set("string");
            tempStream.getCh();
            tempStream.getCh();
            tempStream.getCh();
            tempStream.getCh();
            tempStream.putBackCh();
            tempStream.clear();
            assert.equal("",tempStream.str);
            assert.equal(0,tempStream.index);
        })
    })
})

describe('#factorial()',function () {
    it('should return the factorial result of input, if the input is illegal than throw an error', function() {
        try
        {
            factorial(-1)
        }
        catch (exception)
        {
            assert.equal("'!' is limited to positive int",exception);
        }
        try
        {
            factorial(1.2)
        }
        catch (exception)
        {
            assert.equal("'!' is limited to positive int", exception);
        }
        assert.equal(1,factorial(0));
        assert.equal(1,factorial(1));
        assert.equal(24,factorial(4));
        assert.equal(3628800,factorial(10));
        assert.equal(9.33262154439441e+157,factorial(100));
    });
})

describe('MR',function(){
    mr = new MR();
    assert.equal(false, mr.full);
    assert.equal(0, mr.buffer);
    describe('#In()',function () {
        it('should save the input into the memory', function(){
            mr = new MR();
            assert.equal(false, mr.full);
            assert.equal(0, mr.buffer);
            mr.In(1);
            assert.equal(true, mr.full);
            assert.equal(1, mr.buffer);
            mr.In("test");
            assert.equal(true, mr.full);
            assert.equal("test", mr.buffer);
        })
    })
    describe('#Out()',function () {
        it('should throw an error if the buffer is empty, return buffer\'s value if it\'s not empty', function(){
            mr = new MR();
            try
            {
                mr.Out();
            }
            catch (exception)
            {
                assert.equal("Memory doesn\'t exist.",exception);
            }
            mr.In(1);
            var output = mr.Out();
            assert.equal(1, output);
            assert.equal(1, mr.buffer);
            mr.In(-2.4);
            var output = mr.Out();
            assert.equal(-2.4, output);
            assert.equal(-2.4, mr.buffer);
        })
    })
})

describe('Token',function(){
    it('should set the token\'s kind as input and set its value as input(the value could be omitted)', function()
    {
        testToken = new Token("+");
        assert.equal("+",testToken.kind);
        assert.equal(undefined,testToken.value);
        testToken = new Token("!");
        assert.equal("!",testToken.kind);
        assert.equal(undefined,testToken.value);
        testToken = new Token(number,1);
        assert.equal(number,testToken.kind);
        assert.equal(1,testToken.value);
        testToken = new Token(number,-21.3);
        assert.equal(number,testToken.kind);
    })
})

describe('Token_stream',function(){
    testTs = new Token_stream();
    assert.equal(false, testTs.full);
    assert.equal(0, testTs.buffer);
    describe('#putBack()',function () {
        it('should set full as true and set buffer as input', function(){
            testTs = new Token_stream();
            testTs.putBack(1);
            assert.equal(true, testTs.full);
            assert.equal(1, testTs.buffer);
            testTs.putBack('1');
            assert.equal(true, testTs.full);
            assert.equal(1, testTs.buffer);
            testTs.putBack('+');
            assert.equal(true, testTs.full);
            assert.equal('+', testTs.buffer);
            testTs.putBack(31.3);
            assert.equal(true, testTs.full);
            assert.equal(31.3, testTs.buffer);
        })
    })
    describe('#get()',function () {
        it('should get next element in inputStream', function(){
            testTs = new Token_stream();
            inputStream.clear();
            inputStream.Set("2+3.5;");
            token =testTs.get();
            assert.equal(2,token.value);
            assert.equal(number,token.kind);
            token =testTs.get();
            assert.equal(undefined,token.value);
            assert.equal('+',token.kind);
            token =testTs.get();
            assert.equal(3.5,token.value);
            assert.equal(number,token.kind);
            token =testTs.get();
            assert.equal(undefined,token.value);
            assert.equal(';',token.kind);
            try
            {
                token =testTs.get();
            }
            catch (exception)
            {
                assert.equal('Bad token',exception);
            }
            inputStream.Set("?");
            try
            {
                token =testTs.get();
            }
            catch (exception)
            {
                assert.equal('Bad token',exception);
            }
            inputStream.Set("3.3.4");
            try
            {
                token =testTs.get();
            }
            catch (exception)
            {
                assert.equal('Too much \'.\'',exception);
            }
            inputStream.Set("2;;");
            try
            {
                token =testTs.get();
                token =testTs.get();
            }
            catch (exception)
            {
                assert.equal('Bad token',exception);
            }
        })
    })
    describe('#clear()',function () {
        it('should clear the Token_streams, which means set full as false and set buffer as 0', function(){
            testTs = new Token_stream();
            testTs.putBack(1);
            testTs.clear();
            assert.equal(false, testTs.full);
            assert.equal(0, testTs.buffer);
        })
    })
})

describe('#primary()',function () {
    it('should return the primary element of input', function() {
        inputStream.clear();
        ts.clear();
        inputStream.Set("2;");
        assert.equal(2,primary());
        inputStream.clear();
        ts.clear();
        inputStream.Set("-1.4;");
        assert.equal(-1.4,primary());
        inputStream.clear();
        ts.clear();
        inputStream.Set("(2+3);");
        assert.equal(5,primary());
        inputStream.clear();
        ts.clear();
        inputStream.Set("3!;");
        assert.equal(6,primary());
        inputStream.clear();
        ts.clear();
        inputStream.Set("(2+2)!;");
        assert.equal(24,primary());
        try
        {
            inputStream.clear();
            ts.clear();
            inputStream.Set("2!!;");
        }
        catch (exception)
        {
            assert.equal("Too much '!'",exception);
        }
        try
        {
            inputStream.clear();
            ts.clear();
            inputStream.Set("(2+3)!!;");
        }
        catch (exception)
        {
            assert.equal("Too much '!'",exception);
        }
        try
        {
            inputStream.clear();
            ts.clear();
            inputStream.Set(")123;");
        }
        catch (exception)
        {
            assert.equal("primary expected",exception);
        }
    })
})

describe('#term()',function () {
    it('should return the term element of input', function() {
        inputStream.clear();
        ts.clear();
        inputStream.Set("2.5*3;");
        assert.equal(7.5,term());
        inputStream.clear();
        ts.clear();
        inputStream.Set("-4/2;");
        assert.equal(-2,term());
        inputStream.clear();
        ts.clear();
        inputStream.Set("(2+3)%2;");
        assert.equal(1,term());
        inputStream.clear();
        ts.clear();
        inputStream.Set("-1%2;");
        assert.equal(-1,term());
        try
        {
            inputStream.clear();
            ts.clear();
            inputStream.Set("3/0;");
        }
        catch (exception)
        {
            assert.equal("divide by zero",exception);
        }
        try
        {
            inputStream.clear();
            ts.clear();
            inputStream.Set("2.3%2");
        }
        catch (exception)
        {
            assert.equal("left-hand operand of % not int",exception);
        }
        try
        {
            inputStream.clear();
            ts.clear();
            inputStream.Set("5%1.2");
        }
        catch (exception)
        {
            assert.equal("right-hand operand of % not int",exception);
        }
        try
        {
            inputStream.clear();
            ts.clear();
            inputStream.Set("5%0");
        }
        catch (exception)
        {
            assert.equal("%:divided by zero",exception);
        }
    })
})

describe('#expression()',function () {
    it('should return the term element of input', function() {
        inputStream.clear();
        ts.clear();
        inputStream.Set("2+3;");
        assert.equal(5,expression());
        inputStream.clear();
        ts.clear();
        inputStream.Set("-4-2;");
        assert.equal(-6,expression());
        inputStream.clear();
        ts.clear();
        inputStream.Set("(2+3)M;");
        expression();
        ts.clear();
        inputStream.Set("R+2;");
        assert.equal(7,expression());
    })
})


const print = ';';
const number = '8';

function error(s)
{
    throw s;
}

function isNum(i) {
    if(i=="0"||i=="1"||i=="2"||i=="3"||i=="4"||i=="5"||i=="6"||i=="7"||i=="8"||i=="9")return true;
    return false;
}

function stream()
{
    this.str="";
    this.index=0;
    this.Set=Set;
    this.getCh=getCh;
    this.getDouble=getDouble;
    this.putBackCh=putBackCh;
    this.clear=clear;
    function Set(str)
    {
        this.str=str;
        this.index=0;
    }
    function getCh()
    {
        this.index++;
        if (this.index<=this.str.length) {
            return this.str.substring(this.index - 1, this.index);
        }
        else return "";
    }
    function getDouble()
    {
        var counter=0;
        var numStr="";
        var firstCh=this.str.substring(this.index,this.index+1);
        var secondCh=this.str.substring(this.index+1,this.index+2);
        if(firstCh!="."&&!isNum(firstCh))return "";
        if(firstCh=="."&&!isNum(secondCh))error("Too much '.'");
        var tempStr
        if(firstCh=="."&&isNum(secondCh)) {
            this.index--;
            numStr += "0";
            tempStr=this.str.substring(this.index+1,this.str.length);
        }
        else tempStr=this.str.substring(this.index,this.str.length);
        for(var i in tempStr)
        {
            var tempCh=tempStr[i];
            if(tempCh==".")
            {
                if (counter==1)
                {
                    counter=0;
                    break;
                }
                numStr+=tempCh;
                counter++;
            }
            else if(isNum(tempCh))
            {
                numStr+=tempCh;
            }
            else break;
        }
        this.index+=numStr.length;
        return parseFloat(numStr);
    }
    function putBackCh() {
        if(this.index==0)return;
        this.index--;
    }
    function clear()
    {
        this.str="";
        this.index=0;
    }
}

inputStream=new stream();

function factorial(a) {
    var result = 1;
    if (a != parseInt(a))
    {
        error("'!' is limited to positive int");
    }
    if (a<0)
    {
        error("'!' is limited to positive int");
    }
    for (var i = 1;i < a + 1;i++)
    {
        result *= i;
    }
    if (a == 0)result = 1;
    return result;
}

function MR()
{
    this.full=false;
    this.buffer=0;
    this.In=In;
    this.Out=Out;
    function In(m)
    {
        this.buffer = m;
        this.full = true;
    }
    function Out()
    {
        if(this.full)return this.buffer;
        else error("Memory doesn't exist.");
    }
}

mr=new MR();

function Token(ch,val)
{
    this.kind=ch;
    this.value=val;
}

function Token_stream()
{
    this.full=false;
    this.buffer=0;
    this.putBack=putBack;
    this.get=get;
    this.clear=clear;
    function clear()
    {
        this.full=false;
        this.buffer=0;
    }
    function putBack(t)
    {
        this.buffer=t;
        this.full=true;
    }
    function get()
    {
        if (this.full)
        {
            this.full = false;
            return this.buffer;
        }
        var ch=inputStream.getCh();
        switch (ch)
        {
            case'R':
                return new Token(number, mr.Out());
            case';': {
                var nextCh = inputStream.getCh();
                if (nextCh != '') error("Bad token");
                else return new Token(';');
            }
            case'(':case')':case'+':case'-':case'*':case'/':case'%':case'!':case'M':
            return new Token(ch);
            case'.':case'0':case'1':case'2':case'3':case'4':case'5':case'6':case'7':case'8':case'9':
        {
            inputStream.putBackCh();
            var val=inputStream.getDouble();
            token = new Token(number, val);
            var ch=inputStream.getCh();
            if(ch=='.')error("Too much '.'");
            else inputStream.putBackCh();
            return token;
        }
            default:
                error("Bad token");
        }
    }
}

ts=new Token_stream();

function primary()
{
    var t = ts.get();
    switch (t.kind) {
        case '(':
        {
            var d = expression();
            var T = ts.get();
            if (T.kind != ')') {
                ts.putBack(T);
                error("')'expected");
            }
            var nextT = ts.get();
            if (nextT.kind != '!') {
                ts.putBack(nextT);
                return d;
            }
            else {
                var nextNextT = ts.get();
                if(nextNextT.kind == '!')throw("Too much '!'");
                else ts.putBack(nextNextT);
                return factorial(d);
            }
        }
        case number:
        {
            var T = ts.get();
            if (T.kind != '!') {
                ts.putBack(T);
                return t.value;
            }
            else {
                var nextNextT = ts.get();
                if(nextNextT.kind == '!')throw("Too much '!'");
                else ts.putBack(nextNextT);
                return factorial(t.value);
            }
        }
        case'-':
            return -primary();
        case'+':
            return primary();
        default:
            ts.putBack(t);
            error("primary expected");
    }
}

function term()
{
    var left = primary();
    var t = ts.get();
    while (true) {
        switch (t.kind) {
            case '*':
                left *= primary();
                t = ts.get();
                break;
            case '/':
            {
                var d = primary();
                if (d == 0)error("divide by zero");
                left /= d;
                t = ts.get();
                break;
            }
            case'%':
            {
                var d = primary();
                var i1 =  parseInt(left);
                if (i1 != left)error("left-hand operand of % not int");
                var i2 =  parseInt(d);
                if (i2 != d)error("right-hand operand of % not int");
                if (i2 == 0)error("%:divided by zero");
                left = i1%i2;
                t = ts.get();
                break;
            }
            default:
                ts.putBack(t);
                return left;
        }
    }
}

function expression()
{
    var left = term();
    var t = ts.get();
    while (true) {
        switch (t.kind) {
            case '+':
                left += term();
                t = ts.get();
                break;
            case '-':
                left -= term();
                t = ts.get();
                break;
            case'M':
                mr.In(left);
                t = ts.get();
                break;
            default:
                ts.putBack(t);
                return left;
        }
    }
}

function  calculate()
{
    try {
        var Result;
        var input = document.getElementById("input").value;
        if(input == "") {
            Result="结果：";
            document.getElementById("output").innerHTML=Result;
            return;
        }
        input+=";";
        ts.clear();
        inputStream.clear();
        inputStream.Set(input);
        var t = ts.get();
        while (t.kind == print)t = ts.get();
        ts.putBack(t);
        Result="结果："+expression();
        document.getElementById("output").innerHTML=Result;
    }
    catch (exception)
    {
        Result="结果：输入不合法，请修改后重试，错误类型："+exception;
        document.getElementById("output").innerHTML=Result;
    }
}

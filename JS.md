## JS

* [基本数据类型和引用数据类型](#anchor1)
* [`JavaScript` 中的作用域与变量声明提升](#anchor2)
* [`let`、`const` 与 `var` 的区别](#anchor3)
* [`defer` 和 `async` 的区别](#anchor4)
* [对象浅拷贝和深拷贝有什么区别](#anchor5)
* [怎么实现对象深拷贝](#anchor6)
* [函数防抖和函数节流](#anchor7)
* [`call`、`apply` 和 `bind` 的区别](#anchor8)
* [`new` 运算符做了什么](#anchor9)
* [函数柯里化](#anchor10)
* [判断js对象为空](#anchor11)
* [`Promise` 实现](#anchor12)
* [如何准确判断一个变量的类型](#anchor13)
* [`bind`函数实现](#anchor14)
* [发布订阅模式原理实现](#anchor15)
* [如何将对象数组映射为对象](#anchor16)

<span id="anchor1"></span>

### 基本数据类型和引用数据类型

* 基本数据类型： `undefined` 、 `null` 、 `boolean` 、 `number` 、 `symbol` 、 `string` 。
* 引用数据类型： `object` 、 `array` 、 `function` 。

<span id="anchor2"></span>

### `JavaScript` 中的作用域与变量声明提升

* 在 `JavaScript` 中，作用域为 `function(){}` 内的区域，称为函数作用域。
* `JavaScript` 变量声明提升
  + 在 `JavaScript` 中，函数声明与变量声明经常被 `JavaScript` 引擎隐式地提升到当前作用域的顶部。
  + 声明语句中的赋值部分并不会被提升，只有名称被提升。
  + 函数声明的优先级高于变量，如果变量名跟函数名相同且未赋值，则函数声明会覆盖变量声明。
  + 如果函数有多个同名参数，那么最后一个参数（即使没有定义）会覆盖前面的同名参数。

<span id="anchor3"></span>

### `let`、`const` 与 `var` 的区别

* 变量提升
* 块级作用域 

<span id="anchor4"></span>

### `defer` 和 `async` 的区别

* defer：浏览器指示脚本在文档被解析后执行，script被异步加载后并不会立刻执行，而是等待文档被解析完毕后执行。
* async：同样是异步加载脚本，区别是脚本加载完毕后立即执行，这导致async属性下的脚本是乱序的，对于script有先后依赖关系的情况，并不适用。

<span id="anchor5"></span>

### 对象浅拷贝和深拷贝有什么区别

在 `JS` 中，除了基本数据类型，还存在对象、数组这种引用类型。 基本数据类型，拷贝是直接拷贝变量的值，而引用类型拷贝的其实是变量的地址。

``` js
let o1 = {
    a: 1
}
let o2 = o1
```

在这种情况下，如果改变 `o1` 或 `o2` 其中一个值的话，另一个也会变，因为它们都指向同一个地址。

``` js
o2.a = 3
console.log(o1.a) // 3
```

而浅拷贝和深拷贝就是在这个基础之上做的区分，如果在拷贝这个对象的时候，只对基本数据类型进行了拷贝，而对引用数据类型只是进行了引用的传递，而没有重新创建一个新的对象，则认为是浅拷贝。反之，在对引用数据类型进行拷贝的时候，创建了一个新的对象，并且复制其内的成员变量，则认为是深拷贝。

<span id="anchor6"></span>

### 怎么实现对象深拷贝

``` js
let o1 = {
    a: {
        b: 1
    }
}
let o2 = JSON.parse(JSON.stringify(o1))
```

另一种方法

``` js
function deepCopy(s) {
    const d = {}
    for (let k in s) {
        if (typeof s[k] == 'object') {
            d[k] = deepCopy(s[k])
        } else {
            d[k] = s[k]
        }
    }

    return d
}
```
<span id="anchor7"></span>

### 函数防抖和函数节流

* 函数防抖

> 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

``` js
//模拟一段ajax请求
function ajax(content) {
    console.log('ajax request ' + content)
}

function debounce(fun, delay) {
    let timer;
    return function(...args) {
        let that = this
        clearTimeout(timer)
        timer = setTimeout(function() {
            fun.call(that, args)
        }, delay)
    }
}

let inputb = document.getElementById('debounce')

let debounceAjax = debounce(ajax, 500)

inputb.addEventListener('keyup', function(e) {
    debounceAjax(e.target.value)
})
```

* 函数节流

> 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

``` js
function throttle(fun, delay) {
    let last, deferTimer
    return function(...args) {
        let that = this
        let now = Date.now()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function() {
                last = now
                fun.call(that, args)
            }, delay)
        } else {
            last = now
            fun.call(that, args)
        }
    }
}

let throttleAjax = throttle(ajax, 1000)

let inputc = document.getElementById('throttle')
inputc.addEventListener('keyup', function(e) {
    throttleAjax(e.target.value)
})
```
<span id="anchor8"></span>

### `call`、`apply` 和 `bind` 的区别

这三个函数的作用都是改变函数执行时的上下文，再具体一点就是改变函数运行时的this指向。

``` js
  let obj = {
      name: 'tony'
  };

  function Say(name) {
      this.name = name;
  }

  Say.prototype.sayName = function() {
      console.log(this.name);
  }

  var say = new Say('thomas');
  say.sayName(); // thomas

  //  call,apply,bind使用
  say.sayName.call(obj);
  say.sayName.apply(obj);
  let bind = say.sayName.bind(obj); // 返回一个函数
  bind(); // tony
```

`call` 、 `apply` 与 `bind` 的差别：

> `call` 和 `apply` 改变了函数的 `this` 上下文后便执行该函数, 而bind则是返回改变了上下文后的一个函数。

`call` 、 `apply` 的区别：

> 他们俩之间的差别在于参数的区别， `call` 和 `apply` 的第一个参数都是要改变上下文的对象，而 `call` 从第二个参数开始以参数列表的形式展现， `apply` 则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。

<span id="anchor9"></span>

### `new` 运算符做了什么

* 创建一个空的简单 `JavaScript` 对象（即{}）；
* 链接该对象（即设置该对象的构造函数）到另一个对象 ；
* 将步骤1新创建的对象作为 `this` 的上下文 ；
* 如果该函数没有返回对象，则返回 `this` 。

<span id="anchor10"></span>

### 函数柯里化

``` js
var curring = function(fn) {
    var _args = [];
    return function cb() {

        if (arguments.length === 0) {
            return fn.apply(this, _args);
        }

        Array.prototype.push.apply(_args, [].slice.call(arguments));

        return cb;
    }
}

var multi = function() {

    var total = 0;
    var argsArray = Array.prototype.slice.call(arguments);
    argsArray.forEach(function(item) {
        total += item;
    })

    return total
};

var calc = curring(multi);

calc(1, 2)(3)(4, 5, 6);

console.log(calc()); //空白调用时才真正计算
```

<span id="anchor11"></span>

### 判断js对象为空

``` js
function isEmpty(obj) {
    if (Object.keys(obj).length) {
        return false
    } else {
        return true
    }
}

function isEmpty(obj) {
    for (let i in obj) {
        return false
    }
    return true
}

function isEmpty(obj) {
    if (JSON.stringify(obj) === '{}') {
        return true
    } else {
        return false
    }
}

```
<span id="anchor12"></span>

### `Promise` 实现
<a href='https://github.com/linxner/front-end-basics/blob/master/test/promise.js'>点击跳转查看</a>

<span id="anchor13"></span>

### 如何准确判断一个变量的类型

1. typeof: 当`typeof` 运算符用于判断变量的类型，但是对于一些创建的对象，它们都会返回`object`，判断基本类型时可用。
2. instanceof: `instanceof`判断的前提条件是需要知道变量的类型，

```js
    const myDate=new Date(); 
    console.log(myDate instanceof Date) // true
```

3. Object.prototype.toString.call: 可精确得到变量的类型

<span id="anchor14"></span>

### `bind`函数实现
<a href='https://github.com/linxner/front-end-basics/blob/master/test/bind.js'>点击跳转查看</a>

<span id="anchor15"></span>

### 发布订阅模式原理实现

<a href='https://github.com/linxner/front-end-basics/blob/master/test/EventBus.js'>点击跳转查看</a>

<span id="anchor16"></span>

### 如何将对象数组映射为对象
<a href='https://github.com/linxner/front-end-basics/blob/master/test/transform.js'>点击跳转查看</a>



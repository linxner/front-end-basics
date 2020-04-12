## JS

### 基本数据类型和引用数据类型

* 基本数据类型： `undefined` 、 `null` 、 `boolean` 、 `number` 、 `symbol` 、 `string` 。
* 引用数据类型： `object` 、 `array` 、 `function` 。

### JavaScript 中的作用域与变量声明提升

* 在 `JavaScript` 中，作用域为 `function(){}` 内的区域，称为函数作用域。
* `JavaScript` 变量声明提升
  + 在 `JavaScript` 中，函数声明与变量声明经常被 `JavaScript` 引擎隐式地提升到当前作用域的顶部。
  + 声明语句中的赋值部分并不会被提升，只有名称被提升。
  + 函数声明的优先级高于变量，如果变量名跟函数名相同且未赋值，则函数声明会覆盖变量声明。
  + 如果函数有多个同名参数，那么最后一个参数（即使没有定义）会覆盖前面的同名参数。

### let、const 与 var 的区别

* 变量提升
* 块级作用域 

### defer 和 async 的区别

* defer：浏览器指示脚本在文档被解析后执行，script被异步加载后并不会立刻执行，而是等待文档被解析完毕后执行。
* async：同样是异步加载脚本，区别是脚本加载完毕后立即执行，这导致async属性下的脚本是乱序的，对于script有先后依赖关系的情况，并不适用。

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

### 函数防抖和函数节流

* 函数防抖

>> 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

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

>> 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

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

### call、apply 和 bind 的区别

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

>> `call` 和 `apply` 改变了函数的 `this` 上下文后便执行该函数, 而bind则是返回改变了上下文后的一个函数。

`call` 、 `apply` 的区别

>> 他们俩之间的差别在于参数的区别， `call` 和 `apply` 的第一个参数都是要改变上下文的对象，而 `call` 从第二个参数开始以参数列表的形式展现， `apply` 则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。


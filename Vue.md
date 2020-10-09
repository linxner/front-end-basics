## Vue

* [虚拟 `DOM` 的实现原理](#anchor1)
* [组件中 `data` 为什么是一个函数](#anchor2)
* [ `Vue` 组件间通信有哪几种方式？](#anchor3)
* [ `Vuex` ](#anchor4)

<span id="anchor1"></span>

### 虚拟 `DOM` 的实现原理

* 用 `JavaScript` 对象模拟真实的 `DOM` 树，对真实 `DOM` 进行抽象；
* `diff` 算法 - 比较两颗虚拟 `DOM` 树的差异；
* `Pach` 算法 - 将两个虚拟 `DOM` 对象的差异应用到真正的 `DOM` 树。

<span id="anchor2"></span>

### 组件中 `data` 为什么是一个函数

因为组件是用来复用的，且 `JS` 里对象是引用关系，如果组件中 `data` 是一个对象，那么这样作用域没有隔离，子组件中的 `data` 属性值会相互影响，如果组件中 `data` 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 `data` 属性值不会互相影响；而 `new Vue` 的实例，是不会被复用的，因此不存在引用对象的问题。

<span id="anchor3"></span>

### `Vue` 组件间通信有哪几种方式？

1. `props / $emit` 适用父子组件通信：

    这种方法是 `Vue` 组件的基础，相信大部分同学耳闻能详，所以此处就不举例展开介绍。

2. `ref` 与 `$parent / $children` ：适用父子组件通信

   + `ref` ：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
   + `$parent / $children` ：访问父 / 子实例

3. `EventBus（$emit / $on）` ：适用于父子、隔代、兄弟组件通信

    这种方法通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件。

4. `$attrs/$listeners` ：适用于隔代组件通信

   + `$attrs` ：包含了父作用域中不被 `prop` 所识别 (且获取) 的特性绑定 ( `class` 和 `style` 除外 )。当一个组件没有声明任何 `prop` 时，这里会包含所有父作用域的绑定 ( `class` 和 `style` 除外 )，并且可以通过 `v-bind="$attrs"` 传入内部组件。通常配合 `inheritAttrs` 选项一起使用。
   + `$listeners` ：包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件

5. `provide / inject` ：适用于隔代组件通信

    祖先组件中通过 provider 来提供变量，然后在子孙组件中通过 inject 来注入变量。 provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。

6. `Vuex` ：适用于父子、隔代、兄弟组件通信。

<span id="anchor4"></span>

### `Vuex` 

> `Vuex` 是一个专为 `Vue.js` 应用程序开发的状态管理模式。每一个 `Vuex` 应用的核心就是 `store` （仓库）。 `store` 基本上就是一个容器，它包含着你的应用中大部分的状态 ( `state` )。

1. `Vuex` 的状态存储是响应式的。当 `Vue` 组件从 `store` 中读取状态的时候，若 `store` 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

2. 改变 `store` 中的状态的唯一途径就是显式地提交 ( `commit` ) `mutation` 。这样使得我们可以方便地跟踪每一个状态的变化。
3. 主要包括以下几个模块：

   + `State` ：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
   + `Getter` ：允许组件从 `Store` 中获取数据， `mapGetters` 辅助函数仅仅是将 `store` 中的 `getter` 映射到局部计算属性。
   + `Mutation` ：是唯一更改 `store` 中状态的方法，且必须是同步函数。
   + `Action` ：用于提交 `mutation` ，而不是直接变更状态，可以包含任意异步操作。
   + `Module` ：允许将单一的 `Store` 拆分为多个 `store` 且同时保存在单一的状态树中。

### Vue原理阐述

vue是采用数据劫持配合发布-订阅者模式的方式，通过Object.defineProperty来劫持各个属性的getter和setter，在数据变动时，发布消息给依赖收集器并通知观察者Watcher，调用对应的回调去更新视图。

MVVM做为绑定的入口，整合Observer，Compiler和Watcher三者，通过Observer监听model数据变化表，通过Compiler来解析编译模版指令，最终利用Watcher搭起Observer以及Compiler之间的通信桥梁，达到数据变化=>视图更新；视图交互变化=>数据model变更的双向绑定效果。
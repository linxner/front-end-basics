## HTML

---

### doctype的作用

`DOCTYPE` 是 `html5` 标准网页声明，且必须声明在HTML文档的第一行。来告知浏览器的解析器用什么文档标准解析这个文档，不同的渲染模式会影响到浏览器对于 `CSS` 代码甚至 `JavaScript` 脚本的解析

* 怪异模式，浏览器使用自己的怪异模式解析渲染页面。（如果没有声明 `DOCTYPE` ，默认就是这个模式）
* 标准模式，浏览器使用W3C的标准解析渲染页面。
* IE8还有一种介乎于上述两者之间的近乎标准的模式，但是基本淘汰了。
* 区别：
  + 标准模式(standards mode)：页面按照 `HTML` 与 `CSS` 的定义渲染
  + 怪异模式(quirks mode)模式： 会模拟更旧的浏览器的行为
  + 近乎标准(almost standards)模式： 会实施了一种表单元格尺寸的怪异行为（与IE7之前的单元格布局方式一致），除此之外符合标准定义

### 行内元素与块级元素与空元素

* 行内元素： `a b span img input select strong` 
* 块级元素： `div ul ol li dt dd h1... p` 
* 空元素（常见）： `br hr img input link meta` 

### 导入样式 link 与 @import 的区别

* 类型不同： `link` 属于 `XHTML` 标签，处理加载 `CSS` 外，还能用于定义 `RSS` ，定义 `rel` 连接属性等作用；而 `@import` 是 `CSS` 提供的，只能用于加载 `CSS` 。
* 加载方式不同： 页面加载时， `link` 会同时异步加载，不会阻塞页面的构建；而 `@import` 引用的 `CSS` 会等到页面被加载完再加载。
* 兼容性不同： `import` 是 `CSS2.1` 提出的，只有在 `IE5` 以上才能被识别，而 `link` 是 `XHTML` 标签，无兼容问题。

### HTML5 新特性

* **新增特性**
  + 拖放（ `drag` 和 `drop` ）
  + 地理位置 `Geolocation` 
  + 多任务 `Webworker` 
  + 全双工通信 `WebSoket` 
  + 本地存储 `LocalStorage` 、 `SessionStorage` 
  + 媒体播放 `Video` 、 `Audio` 
  + 语义化标签 `article` 、 `footer` 、 `header` 、 `nav` 、 `section` 
  + 跨资源共享（CORS） `Access-Control-Allow-Origin` 
  + 绘画 `Canvas` 
  + Form Data 对象
  + 新增选择器 `document.querySelector` 、 `document.querySelectorAll` 
  + 离线应用 `Manifest` 
  + 桌面通知 `Notification` 
  + 表单增强控件 `calendar` 、 `date` 、 `time` 、 `email` 、 `url` 、 `search` 
  + 页面可见性改变事件 `Visibilitychange` 
  + 跨窗口通信 `postmessage` 
  + 历史管理 `history` 

* **删除特性**
  + 纯表现元素： `basefont` 、 `big` 、 `center` 、 `font` 、 `s` 、 `strike` 、 `tt` 、 `u` 
  + 对可用性产生负面影响的元素： `frame` 、 `frameset` 、 `noframes` 

### src 与 href 的区别

* `src` 是指向外部资源的位置，指向的内容会嵌入到文档中当前标签所在的位置，在请求src资源时会将其指向的资源下载并应用到文档内，如 `js` 脚本， `img` 图片和 `frame` 等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，知道将该资源加载、编译、执行完毕，所以一般 `js` 脚本会放在底部而不是头部。

* `href` 是指向网络资源所在位置（的超链接），用来建立和当前元素或文档之间的连接，当浏览器识别到它他指向的文件时，就会并行下载资源，不会停止对当前文档的处理，这 `css` 资源一般放在头部的原因。

### 什么是data-属性

`HTML` 的数据属性，用于将数据储存于标准的 `HTML` 元素中作为额外信息, 我们可以通过 `js` 访问并操作它，来达到操作数据的目的。

``` html
<article id="electriccars" data-columns="3" data-index-number="12314" data-parent="cars">
    ...
</article>
```

### 对HTML语义化的理解

语义化是指使用恰当语义的html标签，让页面具有良好的结构与含义，比如 `<p>` 标签就代表段落， `<article>` 代表正文内容等等。

语义化的好处主要有两点：

* 开发者友好：使用语义类标签增强了可读性，开发者也能够清晰地看出网页的结构，也更为便于团队的开发和维护
* 机器友好：带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，语义类还可以支持读屏软件，根据文章可以自动生成目录。

### img 的 srcset 和 sizes 的作用

srcset 是一个包含一个或多个源图的源图容器，不同源图用逗号分隔，每一个源图由下面两部分组成：

* 图片 URL
* `x` （像素比描述）或 `w` （图片像素宽度描述）描述符（与图片 `URL` 相隔一个空格）， `w` 描述符的加载策略是通过 `sizes` 属性里的声明来计算选择的。

``` html
<img srcset="
        http://placehold.it/2500 5x,
        http://placehold.it/1500 3x,
        http://placehold.it/1000 2x,
        http://placehold.it/500 1x" src="http://placehold.it/500/abc" />
```

上面代码的意思是多少像素比对应对大的图片，比如5像素比对应2500*2500。

`sizes` 写法与 `srcset` 差不多，也是用逗号分隔的一个或多个 `string` ，每个 `string` 由下面两部分组成：

* 媒体查询。最后一个 `string` 不能有这个，作为 `fallback` 
* 图片 `size` （大小）信息。需要注意的是这里不能使用 `%` 来描述图片大小，如果要用百分比来表示，要使用类似于 `vw` （100vw = 100%设备宽度(viewport)）这样的单位来描述，其它的像是 `px` 、 `em` 等可以正常使用。

``` html
<img srcset="
        http://placehold.it/2000 2000w,
        http://placehold.it/1500 1500w,
        http://placehold.it/1000 1000w,
        http://placehold.it/500 500w" sizes="
        (max-width: 500px) 500px,
        (max-width: 1000px) 1000px,
        (max-width: 1500px) 1500px,
        2000px" src="http://placehold.it/500/abc" />
```

上述例子的意思是：对于 `viewport` 在 `500px` 及以下的使用 `500w` 的图片，以此类推，最后一个是前面的媒体查询都不符合的情况下使用 `2000w` 的图片。

`<picture>` 元素通过包含零或多个 `<source>` 元素和一个 `<img>` 元素来为不同的显示/设备场景提供图像版本。浏览器会选择最匹配的子 `<source>` 元素，如果没有匹配的，就选择 `<img>` 元素的 `src` 属性中的 `URL` 。然后，所选图像呈现在 `<img>` 元素占据的空间中。

``` html
<picture>
    <source srcset="/media/examples/surfer-240-200.jpg" media="(min-width: 800px)">
    <img src="/media/examples/painted-hand-298-332.jpg" />
</picture>
```


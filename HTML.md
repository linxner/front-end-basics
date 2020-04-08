## HTML

---

### 行内元素与块级元素与空元素

* 行内元素： `a b span img input select strong`
* 块级元素： `div ul ol li dt dd h1... p`
* 空元素（常见）： `br hr img input link meta`

### 导入样式 link 与 @import 的区别

* 类型不同： `link`属于`XHTML`标签，处理加载`CSS`外，还能用于定义`RSS`，定义`rel`连接属性等作用；而`@import`是 `CSS`提供的，只能用于加载`CSS`。
* 加载方式不同： 页面加载时，`link`会同时异步加载，不会阻塞页面的构建；而`@import`引用的`CSS`会等到页面被加载完再加载。
* 兼容性不同： `import`是`CSS2.1`提出的，只有在`IE5`以上才能被识别，而`link`是`XHTML`标签，无兼容问题。

### HTML5 新特性

* **新增特性**
  * 拖放（drag 和 drop）
  * 地理位置 Geolocation
  * 多任务 Webworker
  * 全双工通信 WebSoket
  * 本地存储 LocalStorage、SessionStorage
  * 媒体播放 Video、Audio
  * 语义化标签 article、footer、header、nav、section
  * 跨资源共享（CORS）Access-Control-Allow-Origin
  * 绘画 Canvas
  * Form Data 对象
  * 新增选择器 document.querySelector、document.querySelectorAll
  * 离线应用 Manifest
  * 桌面通知 Notification
  * 表单增强控件 calendar、date、time、email、url、search
  * 页面可见性改变事件 Visibilitychange
  * 跨窗口通信 postmessage
  * 历史管理 history

* **删除特性**
  * 纯表现元素： basefont、big、center、font、s、strike、tt、u
  * 对可用性产生负面影响的元素： frame、frameset、noframes

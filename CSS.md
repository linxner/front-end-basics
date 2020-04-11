## CSS

### float 是怎么工作的

* `float` 是 `CSS` 定位属性，指定一个元素应沿其容器的左侧或右侧放置，与 `position: absolute;` 从页面流中删除元素不同，浮动元素仍然是页面流的一部分，并且会影响其他元素的位置（例如，文本将在浮动元素周围流动）。

### 块级格式化上下文

* 是 `Web` 页面的可视化 `CSS` 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。
* 块格式化上下文（BFC）有下面几个特点：
  + BFC是就像一道屏障，隔离出了BFC内部和外部，内部和外部区域的渲染相互之间不影响。BFC有自己的一套内部子元素渲染的规则，不影响外部渲染，也不受外部渲染影响。
  + BFC的区域不会和外部浮动盒子的外边距区域发生叠加。也就是说，外部任何浮动元素区域和BFC区域是泾渭分明的，不可能重叠。
  + BFC在计算高度的时候，内部浮动元素的高度也要计算在内。也就是说，即使BFC区域内只有一个浮动元素，BFC的高度也不会发生塌缩，高度是大于等于浮动元素的高度的。
  + HTML结构中，当构建BFC区域的元素紧接着一个浮动盒子时，即，是该浮动盒子的兄弟节点，BFC区域会首先尝试在浮动盒子的旁边渲染，但若宽度不够，就在浮动元素的下方渲染。
* 设置方式：
  + `display:inline-block|table-cell|table-caption|flex|inline-flex。` 
  + `overflow` 除 `visible` 以为的其他属性

### 清除浮动

* `clear` 属性

指定一个元素是否必须移动(清除浮动后)到在它之前的浮动元素下面。 `clear` 属性适用于浮动和非浮动元素。 `both` 、 `left` 、 `right` 分别清除左、右、两边的浮动元素。具体方法：

  + 在需要清除浮动的元素添加

    

``` css
    .clearfix {
        clear: both;
    }
```

  + 利用伪元素

    

``` css
    .clearfix:after {
        content: '.';
        height: 0;
        display: block;
        clear: both;
    }
```

  + 利用空元素, 在需要清除浮动的后面添加空元素

    

``` css
    .clearfix {
        clear: both;
    }
```

### flex（伸缩盒）属性用法

`flex` 容器中存在两条轴， 横轴和纵轴， 容器中的每个单元称为 `flex item` 
在容器上可以设置6个属性：

* flex-direction
* flex-wrap
* flex-flow
* justify-content
* align-items
* align-content

注意：当设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。

有六种属性可运用在子元素上:

* order
* flex-basis
* flex-grow
* flex-shrink
* flex
* align-self

### position 各个定位属性有什么区别？

* `static` ：默认定位属性值。该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 `top` , `right` , `bottom` , `left` 和 `z-index` 属性无效。
* `relative` ：该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。
* `absolute` ：不为元素预留空间，通过指定元素相对于最近的非 `static` 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（ `margins` ），且不会与其他边距合并。
* `fixed` ：不为元素预留空间，而是通过指定元素相对于屏幕视口（ `viewport` ）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。 `fixed` 属性会创建新的层叠上下文。当元素祖先的 `transform` 属性非 `none` 时，容器由视口改为该祖先。
* `sticky` ：盒位置根据正常流计算(这称为正常流动中的位置)，然后相对于该元素在流中的 `flow root（BFC）` 和 `containing block` （最近的块级祖先元素）定位。在所有情况下（即便被定位元素为 `table` 时），该元素定位均不对后续元素造成影响。当元素 `B` 被粘性定位时，后续元素的位置仍按照 `B` 未定位时的位置来确定。 `position: sticky` 对 `table` 元素的效果与 `position: relative` 相同。

### 利用伪元素画三角

``` css
.info-tab {
    position: relative;
}

.info-tab::after {
    content: '';
    border: 4px solid transparent;
    border-top-color: #2c8ac2;
    position: absolute;
    top: 0;
}
```


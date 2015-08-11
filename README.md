# ysy
You Said Youtube, detector and ultra simple player

Find all anchors within an element, and then display the youtube embed player just after said element.


### Standard Instantiation
```js
//no options
(new YSY(htmlElement))
	.build();

//options
(new YSY(htmlElement, {
	width: 560,
	height: 315,
	classes: ''
}))
	.build();
```

### jQuery Instantiation
```js
//no options
$('selector').ysy();

//options
$('selector').ysy({
	width: 560,
	height: 315,
	classes: ''
});
```

### Defaults
```js
YSY.defaults = {
	width: 560,
	height: 315,
	classes: ''
};
```
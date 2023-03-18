# EzSmoothScroll
Lightweight library to add smooth scrolling to your website.
Fixes problems with appearing/disappearing browsers UI (ex. url section on Chrome/Safari).

## Features

- Lightweight
- No dependencies
- **Works on mobile browsers. No more problems with appearing/disappearing browser UI!**
- Use your own external RAF loop if needed
- Auto resize
## Demo 
[EzSmoothScroll demo](https://ez-smooth-scroll.netlify.app/).
## Installation
### npm
```sh
npm i @toon.rombaut/EzSmoothScroll
```
### yarn
```sh
yarn add @toon.rombaut/EzSmoothScroll
```

## Usage

1. Add the class scroll-content to the element that will contain your content.
2. Add the class scroll-container to the parent element of the above
```html
<body>
    <div class="scroll-container">
        <div class="scroll-content">
            <!--Your content here -->
        </div>
    </div>
</body>
```

3. Import and initiaze in javascript
```javascript
//import
import {EzSmoothScroll} from "@toon.rombaut/EzSmoothScroll";

//Get your html elements
const container = document.querySelector(".scroll-container");
const scrollContent = document.querySelector(".scroll-content");

//Initialize
const ezSmoothScroll = new EzSmoothScroll({
    container: container,
    scrollContent: scrollContent,
    ease: 0.75,
    disableRaf: false
});
```
4. If you don't need the smooth scrolling anymore, or you want to re-initialize, don't forget to use the destroy method on the current instance
```javascript
ezSmoothScroll.destroy();
```
## Options

| Parameter | Type | Required| Default | Description |
| ------ | ------ | ------ | ------ | ------ |
| container | HTMLElement | Yes | / | The scroll container HTML element. Parent of the scrollContent HTML element. |
| scrollContent | HTMLElement | Yes | / | The HTML element that contains your HTML. |
| ease | Number | No | 0.75 | The ease amount for the transform lerp. |
| disableRaf | Boolean | No | false | Disable the internal RAF loop to use your own external RAF loop. Can be used to increase performance.

## Properties

Properties that can be read from the EzSmoothScroll instance.
Setting these properties is possible but not recommended.

| Property | Type | Description |
| ------ | ------ | ------ |
| container | HTMLElement | The current scroll container HTML element. |
| scrollContent | HTMLElement | The current HTML element that contains your HTML. |
| ease | Number | The current ease amount for the transform lerp. |
| scrollToRender | Number | The currently rendered scroll position in px. |
| scrollTarget | Number | The target scroll position in px. |
| speed | Number | The current scrollspeed. Can be used for animations. |
| speedTarget | Number | The speedtarget. Can be used for animations. |

## Methods

Methods that can be executed on the EzSmoothScroll instance.

| Method | Parameters | Description |
| ------ | ------ | ------ |
| setSize() | / | Manually resize the smooth scroll. |
| update() | / | Manually update the scroll render. Useful if you use your own external RAF. |
| scrollTo(target) | target - Number | Triggers scroll to the passed target scroll position. |
| destroy | / | Destroy the eventlisteners inside the instance. Important to execute if you want to re-initialize or to increase performance when you don't need the instance anymore. |

## External RAF
You can use your own external RAF loop.

```javascript
//import
import {EzSmoothScroll} from "@toon.rombaut/EzSmoothScroll";

//Get your html elements
const container = document.querySelector(".scroll-container");
const scrollContent = document.querySelector(".scroll-content");

//Initialize
const ezSmoothScroll = new EzSmoothScroll({
    container: container,
    scrollContent: scrollContent,
    ease: 0.75,
    disableRaf: true
});

//render function,
render = () => {
    ezSmoothScroll.update();
    //do you other stuff here

    requestAnimationFrame(render);
}
//kickstart your own external RAF loop
render();
```

## Support
I appreciate all feedback and comments.
<a href="https://www.buymeacoffee.com/toonrombaut" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
### Socials
Instagram: @toon.rombaut
Email: toon.rombaut@hotmail.com

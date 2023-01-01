import "./ezsmoothscroll.css"
export default class EzSmoothScroll{
    /**
     * @param {Object} options
     * @param {HTMLElement} options.container The scroll container html element.
     * @param {HTMLElement} options.scrollContent The scroll content html element.
     * @param {Number|undefined} [options.ease] Optional easing override. Default is 0.1.
     * @param {Boolean|undefined} [options.disableRaf] Optional disable of the intern requestanimationframe loop.
     */
    constructor(options){
        //check options
        if(!(options.container instanceof HTMLElement)) return console.error("The 'container' property must be a HTML element.");
        if(!(options.scrollContent instanceof HTMLElement)) return console.error("The 'scrollContent' property must be a HTML element.");
        if(options.ease && (typeof options.ease !== 'number')) return console.error("The 'ease' property must be a number.");
        if(options.disableRaf && (typeof options.disableRaf !== 'boolean')) return console.error("The 'disableRaf' property must be a boolean.");
        //get dom elements
        this.container = options.container;
        this.scrollContent = options.scrollContent;
        //placeholder
        this.placholder = undefined;
        this.createPlaceholder();
        this.setSize();
        //vars
        this.scrollToRender = 0;
        this.scrollTarget = 0;
        this.ease = options.ease ?? 0.1;
        this.speed = 0;
        this.speedTarget = 0;
        this.isMoving = false;
        //events
        this.initEvents();
        if(!options.disableRaf) requestAnimationFrame(this.render);
    }
    render = () => {
        this.update();
        requestAnimationFrame(this.render);
    }
    createPlaceholder = () => {
        const placeholder = document.createElement('div');
        placeholder.id = "scroll-placeholder"
        this.container.appendChild(placeholder);
        this.placeholder = document.querySelector("#scroll-placeholder");
    }

    setSize = () => {
        this.placeholder.style.height = `${this.scrollContent.scrollHeight}px`;
    }
    getScrollTarget = () => {
        return this.container.scrollTop;
    }
    getSpeedTarget = () => {
        return this.speedTarget;
    }
    initEvents = () => {
        this.initResizeEvent();
        this.initWheelEvent();
        this.initTouchEvents();
        //remove events on unload
        window.addEventListener("unload", () => {
            window.removeEventListener("resize", this.setSize);
            window.removeEventListener("wheel", this.onWheel);
            window.removeEventListener("touchmove", this.onTouchmove);
            window.removeEventListener("touchend", this.onTouchend);
        })
    }
    initResizeEvent = () => {
        window.addEventListener("resize", this.setSize);
    }
    initWheelEvent = () => {
        this.scrollContent.addEventListener("wheel", this.onWheel);
    }
    initTouchEvents = () => {
        this.scrollContent.addEventListener("touchmove", this.onTouchmove);
        this.scrollContent.addEventListener("touchend", this.onTouchend);
    }
    onTouchmove = () => {
        if(this.isMoving) return;
        this.isMoving = true;
        this.scrollContent.style.pointerEvents = "none";
    }
    onTouchend = () => {
        this.isMoving = false;
        this.scrollContent.style.pointerEvents = "auto";
    }
    onWheel = e => {
        this.container.scrollTop += -e.wheelDeltaY;
    }
    lerp = (a,b,n) =>{
        return (1 - n ) * a+n*b;
    }
    update = () => {
        this.speed = Math.min(Math.abs(this.scrollTarget-this.scrollToRender),200)/200;
        this.speedTarget += (this.speed - this.speedTarget) * .2;      
        this.scrollTarget = this.getScrollTarget();
        this.scrollToRender = this.lerp(this.scrollToRender, this.scrollTarget, this.ease);
        this.setPosition();
    }
    setPosition = () => {
        if(Math.round(this.scrollToRender) !== Math.round(this.scrollTarget) ){
          if(this.scrollToRender > 0 && this.scrollToRender < 1) this.scrollToRender = 0;
          this.scrollContent.style.transform = `translate3d(0,${-1 * this.scrollToRender}px,0)`;
        }
    }
    scrollTo = (target) => {
        this.container.scrollTop = target;
    }
}
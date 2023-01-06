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
        //css
        this.addStyles();
        if(!options.disableRaf) requestAnimationFrame(this.render);
    }
    addStyles = () => {
        const styles= 
        `
        *{
            overscroll-behavior: none!important;
            -webkit-overscroll-behavior: none!important;
          }
          html{
            width:100%!important;
            height:100%!important;
            overflow:hidden!important;
          }
          body{
            height:100%!important;
            width:100%!important;
            position:fixed!important;
            overflow: hidden!important;
            -webkit-overflow-scrolling: touch!important;
          }
          .scroll-container{
            position:absolute!important;
            left:0!important;
            top:0.5px!important;
            right:0!important;
            bottom:0.5px!important;
            width:100%!important;
            height:100%!important;
            overflow-y:scroll!important;
            overscroll-behavior: contain!important;
          }
          .scroll-container .scroll-content{
            position:fixed!important;
            top:0!important;
            left:0!important;
            width:100%!important;
            will-change: transform!important;
          }
        `;
        const css = document.createElement('style');
        if(css.styleSheet) css.styleSheet.cssText = styles;
        else css.appendChild(document.createTextNode(styles))
        document.getElementsByTagName("head")[0].appendChild(css);
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
    destroy = () => {
        window.removeEventListener("resize", this.setSize);
        this.scrollContent.removeEventListener("wheel", this.onWheel);
        this.scrollContent.removeEventListener("touchmove", this.onTouchmove);
        this.scrollContent.removeEventListener("touchend", this.onTouchend);
    }
    initEvents = () => {
        this.initResizeEvent();
        this.initWheelEvent();
        this.initTouchEvents();
        //remove events on unload
        window.addEventListener("unload", () => {
            this.destroy();
        })
    }
    initResizeEvent = () => {
        window.addEventListener("resize", this.setSize, {passive:true});
        const resizeObserver = new ResizeObserver(() => {
            this.setSize();
        });
        resizeObserver.observe(this.container);
        resizeObserver.observe(this.scrollContent);
    }
    initWheelEvent = () => {
        this.scrollContent.addEventListener("wheel", this.onWheel,{passive:true});
    }
    initTouchEvents = () => {
        this.scrollContent.addEventListener("touchmove", this.onTouchmove,{passive:true});
        this.scrollContent.addEventListener("touchend", this.onTouchend,{passive:true});
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
        console.log("wheel event")
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
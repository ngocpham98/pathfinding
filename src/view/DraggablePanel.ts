/**
 * Represents a draggable UI set
 */
export interface DraggableUI
{
    readonly openButton: HTMLElement;
    readonly closeButton: HTMLElement;

    readonly draggable: HTMLElement;
    readonly draggableContent: HTMLElement;
    readonly draggableContainer: HTMLElement;
}

/**
 * A class to enable the UI element to be draggable
 */
class DraggablePanel
{
    private draggableUI: DraggableUI;

    private dragging = false;
    private active = false;
    private prevX = 0;
    private prevY = 0;

    constructor(draggable: DraggableUI) {
        this.draggableUI = draggable;
    }

    /**
     * Bind and enable element drag
     */
    bindDrag() {
        //button to toggle toolbar
        this.draggableUI.openButton.onclick = () => {
            if(!this.active) {
                this.draggableUI.draggable.style.display = 'block';
                this.draggableUI.draggableContent.style.display = 'block';
            } else {
                this.draggableUI.draggable.style.display = 'none';
                this.draggableUI.draggableContent.style.display = 'none';
            }
            this.active = !this.active;
        }
        //close toolbar
        this.draggableUI.closeButton.onclick = () => {
            this.active = false;
            this.draggableUI.draggable.style.display = 'none';
            this.draggableUI.draggableContent.style.display = 'none';
        }
        //make the toolbar draggable
        let draggable = this.draggableUI.draggable;
        draggable.addEventListener('mousedown', e => {
            e.preventDefault();
            this.prevY = e.clientY;
            this.prevX = e.clientX;
            this.dragging = true;
        });
        document.addEventListener('mousemove', e => {
            //e.preventDefault();
            if(this.dragging) {
                let container = this.draggableUI.draggableContainer;
                container.style.top = (container.offsetTop - (this.prevY - e.clientY)) + 'px';
                container.style.left = (container.offsetLeft - (this.prevX - e.clientX)) + 'px';
                this.prevY = e.clientY;
                this.prevX = e.clientX;
            }
        });
        draggable.addEventListener('mouseup', e => {
            e.preventDefault();
            this.dragging = false;
        });
    }
}

export default DraggablePanel;
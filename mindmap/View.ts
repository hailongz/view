import { Outlet } from "./Outlet";
import { Element } from "./Element";
import { DocumentView } from "./DocumentView";
import { addRoundedRect } from "./draw";

export class View {

    x: number
    y: number
    width: number
    height: number
    visible: boolean

    constructor() {
        this.x = 0;
        this.y = 0;
        this.visible = false;
        this.width = 0;
        this.height = 0;
    }

    calculate(doc: DocumentView, e: Element, ctx: CanvasRenderingContext2D): void {
        let title = e.data.title || '';
        ctx.font = doc.theme.font;
        let width = ctx.measureText(title).width;
        this.width = width + doc.theme.padding.left + doc.theme.padding.right;
        this.height = doc.theme.fontSize + doc.theme.padding.top + doc.theme.padding.bottom;
    }

    draw(doc: DocumentView, e: Element, ctx: CanvasRenderingContext2D) {

        ctx.save();

        ctx.translate(this.x, this.y);

        let title = e.data.title || '';

        let view = doc.getView(e);

        let backgroundColor = doc.theme.backgroundColor;
        let borderColor = doc.theme.borderColor;

        if (doc.isFocus(e)) {
            backgroundColor = doc.theme.focus.backgroundColor;
            borderColor = doc.theme.focus.borderColor;
        }

        if (backgroundColor) {

            ctx.beginPath();

            if (doc.theme.borderRadius > 0) {
                addRoundedRect(ctx, 0, 0, view.width, view.height, doc.theme.borderRadius);
            } else {
                ctx.rect(0, 0, view.width, view.height)
            }

            ctx.fillStyle = backgroundColor;

            ctx.fill();

        }

        if (doc.theme.borderWidth > 0 && borderColor) {

            ctx.beginPath();

            if (doc.theme.borderRadius > 0) {
                addRoundedRect(ctx, 0, 0, view.width, view.height, doc.theme.borderRadius);
            } else {
                ctx.rect(0, 0, view.width, view.height)
            }

            ctx.strokeStyle = borderColor;
            ctx.lineWidth = doc.theme.borderWidth;

            ctx.stroke();

        }

        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = doc.theme.fontColor;
        ctx.font = doc.theme.font;
        ctx.textBaseline = 'middle';
        ctx.fillText(title, doc.theme.padding.left, doc.theme.padding.top + doc.theme.fontSize * 0.5);

        ctx.restore();
    }

}

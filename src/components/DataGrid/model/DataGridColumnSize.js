export default class DataGridColumnSize {

    constructor(preferredWidth, percentWidth, minWidth, maxWidth, resizable) {

        this.preferredWidth = preferredWidth;
        this.percentWidth = percentWidth;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.resizable = resizable;
        this.width = 0;
    }
}
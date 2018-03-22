export default class DataGridColumnSize {

    constructor(preferredWidth = NaN, percentWidth = NaN, minWidth = 0, resizable = true) {

        // min width cannot be less than zero
        if (minWidth < 0)
            minWidth = 0;

        // we make sure preferred width is not smaller than min width
        if (preferredWidth && preferredWidth < minWidth)
            preferredWidth = minWidth;

        // if column has both preferred width and percent width, percent width has precedence
        if (preferredWidth && preferredWidth > 0 && percentWidth && percentWidth > 0)
            preferredWidth = NaN;

        // if column size is percent based, it's resizable
        if (percentWidth && percentWidth > 0)
            resizable = true;

        this.preferredWidth = preferredWidth;
        this.percentWidth = percentWidth;
        this.minWidth = minWidth;
        this.resizable = resizable;
        this.width = 0;
    }

    getPreferredOrMinWidth() {
        return this.preferredWidth || this.minWidth;
    }
}
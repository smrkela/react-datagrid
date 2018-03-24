export default class DataGridColumnSize {

    constructor(width = NaN, percentWidth = NaN, minWidth = 0) {

        // min width cannot be less than zero
        if (minWidth < 0)
            minWidth = 0;

        // we make sure width is not smaller than min width
        if (width && width < minWidth)
            width = minWidth;

        // if column has both width and percent width, percent width has precedence
        if (width && width > 0 && percentWidth && percentWidth > 0)
            width = NaN;

        this.width = width;
        this.percentWidth = percentWidth;
        this.minWidth = minWidth;
    }

}
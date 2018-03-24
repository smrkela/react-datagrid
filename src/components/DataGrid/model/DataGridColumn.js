import comparator from "../utils/comparator";
import DataGridColumnSize from "./DataGridColumnSize";
import DataGridColumnStyle from "./DataGridColumnStyle";
import DataGridColumnSort from "./DataGridColumnSort";
import classNames from "classnames";

class DataGridColumn {

    static dataTypes = ["string", "number", "date", "boolean"];

    constructor(id) {

        if (!id)
            throw new Error("Column id must be defined.");

        this.id = id;
        this.field = id;
        this.title = id.toUpperCase();
        this.sortObject = null;
        this.dataType = null;
        this.hideable = false;
        this.visible = true;
        this.sizeObject = null;
        this.styleObject = null;
    }

    /**
     * Set the column header value for this column.
     * @param {String} value 
     */
    setTitle(value) {
        this.title = value;
        return this;
    }

    /**
     * Set the sort object for this column.
     * @param {DataGridColumnSort} value 
     */
    setSortObject(value) {
        this.sortObject = value;
        return this;
    }

    /**
     * Set the function used to get value for this column.
     * It takes data and column as parameters.
     * @param {Function} value 
     */
    setValueFunction(value) {
        this.valueFunction = value;
        return this;
    }

    /**
     * Get the display value for this column.
     * @param {Object} data 
     */
    getCellValue(data) {

        let value;

        if (this.valueFunction)
            value = this.valueFunction(data, this);
        else
            value = data[this.field];

        return value;
    }

    /**
     * Set the style object for this column.
     * @param {DataGridColumnStyle} value 
     */
    setStyleObject(value) {
        this.styleObject = value;
        return this;
    }

    setRenderer(value) {
        this.renderer = value;
        return this;
    }

    /**
     * Function that will render cell content.
     * It takes the data and the column as parameters.
     * @param {Function} value 
     */
    setRendererFunction(value) {
        this.rendererFunction = value;
        return this;
    }

    /**
     * Set the size object for this column.
     * @param {DataGridColumnSize} value 
     */
    setSizeObject(value) {
        this.sizeObject = value;
        return this;
    }

    /**
     * Can this column be hidden using the column selector.
     * @param {boolean} value 
     */
    setHideable(value) {
        this.hideable = value;
        return this;
    }

    /**
     * Field whose value will be displayed in this column.
     * @param {String} value 
     */
    setField(value) {
        this.field = value;
        return this;
    }

    /**
     * Type of data this column uses for display. 
     * Depending on the data some setup might be autoconfigured
     * like sorting and data alignment.
     * @param {String} value 
     */
    setDataType(value) {

        if (DataGridColumn.dataTypes.indexOf(value) == -1)
            throw new Error("Invalid data type " + value + ". Value values are " + DataGridColumn.dataTypes);

        this.dataType = value;
        return this;
    }

    /**
     * Update sorting of the column depending on it's current 
     * sort state and mouse event that triggered the sort.
     * If ctrl key was pressed then this column is added to the sort
     * else it is put as the first and only sort column.
     * @param {MouseEvent} mouseEvent 
     */
    updateSort(columns, mouseEvent) {

        if (this.sortObject)
            this.sortObject.updateSort(this, columns, mouseEvent);
    }

    sortCompare(item1, item2) {

        if (this.sortObject)
            return this.sortObject.compare(this, item1, item2);
    }

    /**
     * Get all the styles for a particular cell.
     * @param {Object} data 
     */
    getCellStyle(data) {

        const autoStyle = this.getAutoStyle();
        const explicitStyle = this.styleObject ? this.styleObject.getStyle(data, this) : {};

        const style = { ...autoStyle, ...explicitStyle };

        return style;
    }

    getCellClasses(data) {

        const autoClasses = this.getAutoClasses();
        const explicitClasses = this.styleObject ? this.styleObject.getClassNames(data, this) : null;

        const classes = classNames(autoClasses, explicitClasses);

        return classes;
    }

    /**
     * Get classes strings depending on the column setup.
     */
    getAutoStyle() {

        return null;
    }

    getAutoClasses() {

        let classes = null;

        if (this.dataType === "string") {
            classes = "dataTypeString";
        } else if (this.dataType === "number") {
            classes = "dataTypeNumber";
        } else if (this.dataType === "boolean") {
            classes = "dataTypeBoolean";
        } else if (this.dataType === "date") {
            classes = "dataTypeDate";
        }

        return classes;
    }


    getWidthString() {

        let width;

        if (this.sizeObject && this.sizeObject.percentWidth)
            width = this.sizeObject.percentWidth + "%";
        else if (this.sizeObject && this.sizeObject.width)
            width = this.sizeObject.width + "px";

        return width;
    }

}

export default DataGridColumn;
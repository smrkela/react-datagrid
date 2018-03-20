import comparator from "../utils/comparator";

class DataGridColumn {

    constructor(id, title, field, sort, valueFunction, classNameFunction, styleFunction, rendererFunction, size) {

        this.id = id;
        this.title = title;
        this.field = field;
        this.sort = sort;
        this.dataType = null;
        /**
         * Function for custom display values for this column.
         */
        this.valueFunction = valueFunction;
        /**
         * Function for custom class names for this column.
         */
        this.classNameFunction = classNameFunction;
        /**
         * Function for custom inline styles for this column.
         */
        this.styleFunction = styleFunction;
        /**
         * Function for drawing custom renderers for this column.
         */
        this.rendererFunction = rendererFunction;
        /**
         * Is this column visible/hideable
         */
        this.locked = false;
        /**
         * Is this column visible.
         */
        this.visible = true;
    }

    getCellValue(data) {

        let value;

        if (this.valueFunction)
            value = this.valueFunction(data);
        else
            value = data[this.field];

        return value;
    }

    /**
     * Update sorting of the column depending on it's current 
     * sort state and mouse event that triggered the sort.
     * If ctrl key was pressed then this column is added to the sort
     * else it is put as the first and only sort column.
     * @param {MouseEvent} mouseEvent 
     */
    updateSort(columns, mouseEvent) {

        if (this.sort)
            this.sort.updateSort(this, columns, mouseEvent);
    }

    sortCompare(item1, item2) {

        if (this.sort)
            return this.sort.compare(this, item1, item2);
    }

}

export default DataGridColumn;
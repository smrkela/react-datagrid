import classNames from "classnames";

export default class DataGridColumnStyle {

    constructor(style, className, styleFunction, classNameFunction) {

        this.style = style;
        this.className = className;
        this.styleFunction = styleFunction;
        this.classNameFunction = classNameFunction;
    }

    getStyle(data, column) {

        let style = this.style || {};

        if (this.styleFunction) {
            const functionStyle = this.styleFunction(data, column) || {};
            style = Object.assign(style, functionStyle);
        }

        return style;
    }

    getClassNames(data, column) {

        let classes = this.className;

        if (this.classNameFunction) {
            const functionClasses = this.classNameFunction(data, column);
            classes = classNames(classes, functionClasses);
        }

        return classes;
    }
}
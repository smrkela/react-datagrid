import calculator from "./columnWidthCalculator";
import DataGridColumn from "../model/DataGridColumn";
import DataGridColumnSize from "../model/DataGridColumnSize";

const createColumn = size => {
  return new DataGridColumn(null, null, null, null, null, null, null, null, size);
}

it("calculates single column width correctly", () => {

  const columns = [createColumn(new DataGridColumnSize(100))];

  calculator(columns, 500);

  expect(columns[0].width).toBe(500);
});

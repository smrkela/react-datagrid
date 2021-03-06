import React, { Component } from 'react';
import './App.css';
import DataGridColumn from "./components/DataGrid/model/DataGridColumn";
import DataGrid from "./components/DataGrid/DataGrid";
import DataGridColumnSort from './components/DataGrid/model/DataGridColumnSort';
import getData from "./demoData";
import Dropdown, { DropdownTrigger, DropdownContent } from './components/Dropdown/Dropdown';
import DataGridColumnSize from './components/DataGrid/model/DataGridColumnSize';
import DataGridColumnStyle from './components/DataGrid/model/DataGridColumnStyle';

const balanceComparator = (item1, item2) => {
  const balance1 = item1.balance ? Number(item1.balance.substr(1).split(",").join("")) : 0;
  const balance2 = item2.balance ? Number(item2.balance.substr(1).split(",").join("")) : 0;

  return balance1 - balance2;
}

const columns = [
  new DataGridColumn("picture").setTitle("Photo").setRendererFunction((data, column) => {
    return <img src={data.picture} />;
  }).setSizeObject(new DataGridColumnSize(100, 0, 0, false)),
  new DataGridColumn("name").setSortObject(new DataGridColumnSort()).setValueFunction(data => {
    return data.name.first + " - " + data.name.last;
  }).setSizeObject(new DataGridColumnSize(0, 20)),
  new DataGridColumn("address").setSortObject(new DataGridColumnSort(true)),
  new DataGridColumn("phone").setSortObject(new DataGridColumnSort()),
  new DataGridColumn("company"),
  new DataGridColumn("email").setSortObject(new DataGridColumnSort()),
  new DataGridColumn("balance").setSortObject(new DataGridColumnSort(false, true, 1, balanceComparator)).setDataType("number"),
  new DataGridColumn("isActive").setTitle("Active").setSortObject(new DataGridColumnSort()).setValueFunction(data => {
    return data.isActive ? "Yes" : "No"
  }).setStyleObject(new DataGridColumnStyle(null, null, null, data => {
    return data.isActive ? "active" : "inactive";
  })),
  new DataGridColumn("age").setSortObject(new DataGridColumnSort()).setStyleObject(new DataGridColumnStyle(null, null, data => {

    let styles;

    if (data.age > 35) {
      styles = {
        width: "100px",
        backgroundColor: "green",
        color: "#FFF",
        padding: "2px 3px"
      }
    } else
      if (data.age > 30) {
        styles = {
          width: "120px",
          backgroundColor: "blue",
          color: "#FFF",
          padding: "2px 3px"
        }
      }

    return styles;
  }))
]

const dataProvider = [
  { id: 1, name: "Serbia", city: "Belgrade", population: 2200000 },
  { id: 2, name: "Croatia", city: "Zagreb", population: 1200000 },
  { id: 3, name: "Croatia", city: "Rijeka", population: 600000 },
  { id: 4, name: "Croatia", city: "Split", population: 450000 },
  { id: 5, name: "Serbia", city: "Novi Sad", population: 650000 }
]



class App extends Component {

  state = {
    text: "smrkela",
    dataProvider: []
  }

  onLoadDataClick = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        const data = getData()
        this.setState({ dataProvider: data })
      });
  }

  onClearDataClick = () => {
    this.setState({ dataProvider: [] });
  }

  render() {

    return (
      <div className="App">
        <header>
          <button onClick={this.onLoadDataClick}>Load data</button>
          <button onClick={this.onClearDataClick}>Clear data</button>
        </header>

        <div className="grid-section">
          <DataGrid columns={columns} dataProvider={this.state.dataProvider} dataKey="_id" emptyMessage="No data yet."></DataGrid>
        </div>
      </div>
    );
  }
}

export default App;

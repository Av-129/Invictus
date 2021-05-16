import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
	const [userInput, setUserInput] = useState(0);
	const [showTable, setShowTable] = useState(false);
	const [tableData, setTableData] = useState();

	const inputChangeHandler = (e) => {
		setUserInput(e.target.value);
		if(e.target.value > 0) document.querySelector('button').disabled = false;
		else document.querySelector('button').disabled = true;
	}

	const submitHandler = () => {
		setShowTable(false);
		axios.get('https://raw.githubusercontent.com/invictustech/test/main/README.md')
		.then(res => {
			let obj = {};
			let temp = res.data.replace(/(\r\n|\n|\r|,|:|\.|-)/gm, "");
			temp = temp.split(" ");
			temp = temp.map(item => {return item.toLowerCase()})
			temp.forEach((element, i, arr) => {
				obj[element] = obj[element] ? ++obj[element] : 1;
			});

			let arr = Object.entries(obj).sort((a,b) => b[1]-a[1]);
			let dataArray = [];

			for(let i=0; i<userInput; i++){
				dataArray[i] = arr[i];
			}

			setShowTable(true);

			let table = dataArray.map((item, index) => {
				return ( 
					<tr>
						<td>{item[0]}</td>
						<td>{item[1]}</td>
					</tr>
				)
			})

			setTableData(table);
		})
	}

	

	return (
		<>
			<div className="main">
				<h1>Input Number</h1>
				<input type="tel" onChange={inputChangeHandler}/>
				<button onClick={submitHandler}>Submit</button>
			</div>

			{ showTable && <div className="table">
				<table>
					<thead>
						<tr>
							<th>Word</th>
							<th>Occurrence</th>
						</tr>
					</thead>
					<tbody>
						{tableData}
					</tbody>
				</table>
			</div> }
		</>
	);
}

export default App;

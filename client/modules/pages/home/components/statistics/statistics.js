import React from 'react';
import { Doughnut as DoughnutChart } from 'react-chartjs-2';
import randomColor from 'random-color';



function stripHtml(e) {
	if (e) {
		let to_return = e.replace(/<\/?[^>]+(>|$)/g, '');
		return to_return;
	}
}

function countLetters(message) {
	var description = message.description;
	var chartData = {
		labels: ['Loading'],
		datasets: [{
			data: [200],
			backgroundColor: [
				'#FF6384'
			]
		}]
	};
	if (description) {
		let lower_mess = stripHtml(description).toLowerCase();
		let array_of_let = lower_mess.match(/[a-z]/ig);
		if (array_of_let) {
			let output = {};
			for (let i = 0; i < array_of_let.length; i++) {
				if (!output.hasOwnProperty(array_of_let[i])) {
					output[array_of_let[i]] = 1;
				} else {
					output[array_of_let[i]] = output[array_of_let[i]] + 1;
				}
			}
			chartData = {
				labels: [],
				datasets: [{
					data: [],
					backgroundColor: []
				}]
			};

			for (let prop in output) {
				let color = randomColor();
				chartData.labels.push(prop);
				chartData.datasets[0].data.push(output[prop]);
				chartData.datasets[0].backgroundColor.push(color.hexString());
			}
		}
	}
	if(description === null){
		chartData = {
			labels: ['No description in current message'],
			datasets: [{
				data: [200],
				backgroundColor: [
					'blue'
				]
			}]
		};
	}
	return chartData;
}

function statistics(props) {
	return (
        <div>
          <h4>Statistics</h4>
          <DoughnutChart data={ countLetters(props.current_message)} options={ {
	'rotation': 0
}} />
        </div>
	);
}

export default statistics;
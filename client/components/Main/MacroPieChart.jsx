import {Pie} from 'react-chartjs';
import React from 'react';

const MacroPieChart = ({macroPercents, options}) => {
	let pieChartData = [
		{ 
			value: macroPercents['nf_protein'],
			color: '#F7464A',
			highlight: '#FF545E',
			label: 'Protein'
		}, {
			value: macroPercents['nf_total_carbohydrate'],
			color: '#46BFBD',
			highlight: '#5Ad3D1',
			label: 'Carbs'
		}, {
			value: macroPercents['nf_total_fat'],
			color: '#FDB45C',
			highlight: '#FFC870',
			label: 'Fat'
	}];

	let pieChartDefaults = {
			segmentShowStroke: true,
			segmentStrokeColor: '#fff',
			segmentStrokeWidth: 2,
			animationSteps: 100,
			animationEasing: 'easeOutBounce',
	};
	let pieChartOptions = Object.assign({}, pieChartDefaults, options);


	return (
		<div className='macro-pie-chart'>
			<div className='pie-chart-title'>Today's Macronutrient Profile </div>
			<Pie data={pieChartData} options={pieChartOptions} width='500' height='250'/>
			<div className='pie-chart-legend'>
				<ul>
					{pieChartData.map((data, i) => <li key={i}><div className='chart-key' style={{backgroundColor: data.color}}></div>{data.label + ' ' + Math.round(data.value) + '%'}</li>)}
			  </ul>
			</div>
		</div>
	);
}

export default MacroPieChart;
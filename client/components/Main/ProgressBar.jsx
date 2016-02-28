import React from 'react';
import {Line} from 'react-chartjs';


const ProgressBar = ({datedNutr, timeWindow, setTime, setFilter, filter}) => {
	let filters = [filter];
	let RGBfillColors = ['rgba(220,220,220,0.2)', 'rgba(151,187,205,0.2)', 
											'rgba(120,100,145,0.2)', 'rgba(170,220,190,0.2)'];
	let RGBstrokeColors = ['rgba(220,220,220,1)', 'rgba(151,187,205,1)', 
											'rgba(120,100,145,1)', 'rgba(170,220,190,1)'];

	let mealsInTime =	_.pickBy(datedNutr, (nutr, date) => {
			let currDate = new Date();
			let mealDateChars = date.split('-');
			let mealDate = new Date(mealDateChars[2], mealDateChars[1], mealDateChars[0]);
			return (Math.floor((currDate - mealDate)/(1000*60*60*24)) < timeWindow);
	});	

	let lineChartData = _.transform(filters, (prev, filter, i) => {
		prev.datasets.push({
			label: filter,
			fillColor: RGBfillColors[i],
			strokeColor: RGBstrokeColors[i],
			pointColor: RGBstrokeColors[i],
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: RGBstrokeColors[i],
			data: _.values(mealsInTime).map(obj => obj[filter])
		});
	}, {labels: _.range(Object.keys(mealsInTime).length), datasets: []});

	let chartOptions = {
    scaleShowGridLines : true,
    scaleGridLineColor : "rgba(0,0,0,.05)",
    scaleGridLineWidth : 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve : true,
    bezierCurveTension : 0.4,
    pointDot : true,
    pointDotRadius : 4,
    pointDotStrokeWidth : 1,
    pointHitDetectionRadius : 20,
    datasetStroke : true,
    datasetStrokeWidth : 2,
    datasetFill : true,
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};


	return (
		<div>
			<Line data={lineChartData} options={chartOptions}/>
			<div className ='filters'>
				<div className ='time-filters'>
					<button onClick={setTime.bind(this,7)}>7-days</button>
					<button onClick={setTime.bind(this,14)}>14-days</button>
					<button onClick={setTime.bind(this,30)}>30-days</button>
					<button onClick={setTime.bind(this,60)}>60-days</button>
					<button onClick={setTime.bind(this,90)}>90-days</button>
				</div>
				<div className ='nutr-filters'>
					<button onClick={setFilter.bind(this,'nf_calories')}>Calories/day</button>
					<button onClick={setFilter.bind(this,'nf_protein')}>Protein g/day</button>
					<button onClick={setFilter.bind(this,'nf_total_carbohydrate')}>Carbs g/day</button>
					<button onClick={setFilter.bind(this,'nf_total_fat')}>Fat g/day</button>
				</div>
			</div>
		</div>
		)

}


export default ProgressBar;
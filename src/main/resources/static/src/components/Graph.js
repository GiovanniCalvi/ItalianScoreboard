import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
import './Graph.css'

Chart.register(ArcElement);

const Graph = (props) => {
    
    const pieData = {
    labels: ['Vinte', 'Perse'],
    datasets: [
        {
            label: 'Vittorie totali',
            backgroundColor: [
                '#2FDE00',
                '#B21F00'
            ],
            hoverBackgroundColor: [
                '#175000',
                '#501800'
            ],
            data: [props.win, props.lose]
        }
    ]
    }
    
    return (
        <div className="wins-graph">
            <Pie
                data={pieData}
                options={{
                    title: {
                        display:true,
                        text:'Vittorie',
                        fontSize:1
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                }}
                height={1}
                width={2}
            />
        </div>
    );
}

export default Graph;

import React from 'react';
import Chart from "@/pages/home/components/chart";

function Home(props) {
    return (
        <>
            <Chart option={{
                title: {
                    text: '三大框架使用度'
                },
                xAxis: {
                    type: 'category',
                    data: ['Vue', 'React', 'Angular']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [10, 40, 20],
                        type: 'bar'
                    }
                ]
            }}></Chart>
            <Chart option={{
                title: {
                    text: '三大框架满意度'
                },
                xAxis: {
                    type: 'category',
                    data: ['Vue', 'React', 'Angular']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [10, 40, 20],
                        type: 'bar'
                    }
                ]
            }}></Chart>
        </>
    );
}

export default Home;
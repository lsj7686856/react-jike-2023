import React, {useEffect, useRef} from 'react';
import * as echarts from "echarts";

function Chart({option, width = 600, height = 600}) {
    const main = useRef(null)
    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(main.current, null, {
            width,
            height
        });
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }, [option, width, height]);
    return (
        <div ref={main}></div>
    );
}

export default Chart;
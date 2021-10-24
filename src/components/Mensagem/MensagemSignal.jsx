import { Box } from '@material-ui/core';
import React from 'react';
import { LineChart, Line } from 'recharts';
const MensagemSignal = ({
  data,
  codedLineColor,
  binLineColor,
  chartHeight,
  chartLengthMultiplier,
  ...props
}) => {
  return (
    <Box width="100%" overflow="scroll" {...props}>
      <LineChart
        width={data.length * chartLengthMultiplier}
        height={chartHeight}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <Line
          animationDuration={250}
          type="step"
          dataKey="bin"
          stroke={binLineColor}
          dot={false}
          strokeWidth={2}
        />
        <Line
          animationDuration={250}
          type="step"
          dataKey="coded"
          stroke={codedLineColor}
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </Box>
  );
};

MensagemSignal.defaultProps = {
  data: [],
  chartHeight: 50,
  chartLengthMultiplier: 10,
  codedLineColor: '#0078ff',
  binLineColor: '#ff9a00',
};

export default MensagemSignal;

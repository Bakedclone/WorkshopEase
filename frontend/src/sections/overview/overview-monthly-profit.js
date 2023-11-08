import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'src/services/helper';

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}g` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const OverviewMonthlyProfit = (props) => {
  // const { chartSeries, sx } = props;
  const { sx } = props;
  const [reload, setreload] = useState(false);
  const chartOptions = useChartOptions();

  // var chartSeries=[
  //   {
  //     name: 'This year',
  //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //   }
  // ];
  const [ chartSeries, setchartSeries] = useState([{
        name: 'This year',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }]);

  useEffect(()=>{
    axios.get(BASE_URL + '/fetch_monthly_profit')
    .then(res=> {
      let fetch = res.data
      fetch.map((monthly_profit)=>{
        const month = Number(monthly_profit['Month'])

        const updatedList = [...chartSeries];
        updatedList[0]['data'][month] = Number(monthly_profit['TotalProfit']);
        setchartSeries(updatedList);
      })
    })
    .catch(error=> console.log(error)); 
  },[reload])

  return (
    <Card sx={sx}>
      <CardHeader
        action={(
          <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            )}
            onClick={()=>{
              setreload(!reload);
              console.log(reload);
            }}
          >
            Sync
          </Button>
        )}
        title="Monthly Profit"
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
      {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          Overview
        </Button>
      </CardActions> */}
    </Card>
  );
};

OverviewMonthlyProfit.PropTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};

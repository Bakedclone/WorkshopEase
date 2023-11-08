import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'src/services/helper';

export const OverviewTotalProfit = (props) => {
  const { sx } = props;
  const [value, setvalue] = useState(0);

  useEffect(()=>{
    axios.get(BASE_URL + '/fetch_total_profit')
    .then(res=> {
      console.log(res.data);
      setvalue(res.data[0]['SUM(Profit)'].toFixed(2));
    })  
    .catch(error=> console.log(error));
  })

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Total Profit - This Month
            </Typography>
            <Typography variant="h4">
              {value} g
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};

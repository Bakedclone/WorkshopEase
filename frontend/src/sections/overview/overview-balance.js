import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const OverviewBalance = (props) => {
  const { difference, positive = false, sx } = props;
  const [value, setvalue] = useState();

  useEffect(()=>{
    axios.get('http://localhost:3001/fetch_total_balance')
    .then(res=> {
      console.log(res.data);
      setvalue(res.data[0]['SUM(Gold_wgt)'].toFixed(2));
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
              Balance
            </Typography>
            <Typography variant="h4">
              {value} g
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
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

OverviewBalance.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};

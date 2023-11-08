import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'src/services/helper';

export const OverviewTasksProgress = (props) => {
  const { sx } = props;
  const [ value, setvalue] = useState();

  useEffect(()=>{
    axios.get(BASE_URL + '/fetch_task_progress')
    .then(res=> {
      // console.log(res.data);
      setvalue(res.data);
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
              gutterBottom
              variant="overline"
            >
              Orders Completed
            </Typography>
            <Typography variant="h4">
              {value}%
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress
            value={value}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

OverviewTasksProgress.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};

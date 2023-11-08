import { useEffect, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import axios from 'axios'
import Insert from 'src/sections/customer/Insert';
import { BASE_URL } from 'src/services/helper';

const Page = () => {
  const [data, setdata] = useState([]);
  const [reload, setreload] = useState(false);

  useEffect(()=>{
    axios.get(BASE_URL + '/fetch_customers')
    .then(res=> {
      // console.log(res.data);
      setdata(res.data);
    })
    .catch(error=> console.log(error));
  },[reload])

  const [addOpen, setaddOpen] = useState(false);

  return (
    <>
      <Head>
        <title>
          Customers | WorkshopEase
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >

        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Customers
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={()=>{
                    setaddOpen(true);
                  }}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  >
                  Add
                </Button>
              </div>
            </Stack>

            {addOpen && <Insert addClose={()=>
              setaddOpen(false)} 
              reload={()=>
              setreload(!reload)}/>}

            <CustomersTable
              items={data}
              reload={()=>{setreload(!reload)
              console.log("reloadcalled")}}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

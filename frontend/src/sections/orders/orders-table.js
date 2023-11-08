import PropTypes from "prop-types";
// import { format } from "date-fns";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
// import { sendValue } from "./orders-search";
import {
  // Avatar,
  Box,
  Card,
  // Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import TableStyle from "../../theme/TableStyle.module.css";
import Update from "./Update";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
// import { getInitials } from "src/utils/get-initials";
import { BASE_URL } from 'src/services/helper';

export const OrdersTable = (props) => {
  const {
    // count = 0,
    items = [],
    // onDeselectAll,
    // onDeselectOne,
    // onPageChange = () => {},
    // onRowsPerPageChange,
    // onSelectAll,
    // onSelectOne,
    // page = 0,
    // rowsPerPage = 0,
    // selected = [],
    reload,
  } = props;
  console.log(items);
  const handleDelete = async (id) => {
    try {
      await axios.delete(BASE_URL + "/orders/" + id);
    } catch (error) {
      console.log(error);
    }
  };
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };
  const filterData = items.filter((orders) => {
    if (orders.C_ID === searchValue || searchValue.length == 0) return true;
    else return false;
  });

  const [updateOpen, setupdateOpen] = useState(false);
  const [id, setid] = useState();

  // const selectedSome = selected.length > 0 && selected.length < items.length;
  // const selectedAll = items.length > 0 && selected.length === items.length;
  // console.log(reverseItems);
  return (
    <Card>
      <Card sx={{ pt: 2, pb: 5, pl: 1 }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search Customer ID"
          onChange={handleInputChange}
          startAdornment={
            <InputAdornment 
            position="start">
              <SvgIcon color="action" 
              fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />
      </Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          {/* <h1>{count}</h1> */}
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                <TableCell>Date</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Piece</TableCell>
                <TableCell>Approx wgt.</TableCell>
                <TableCell>Wastage</TableCell>
                <TableCell>Extra Ghut</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData
                .slice(0)
                .reverse()
                .map((orders) => {
                  // const isSelected = selected.includes(orders.C_ID);
                  // const createdAt = format(orders.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow
                      hover
                      key={orders.C_ID}
                      // selected={isSelected}
                    >
                      {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(orders.C_ID);
                          } else {
                            onDeselectOne?.(orders.C_ID);
                          }
                        }}
                      />
                    </TableCell> */}
                      <TableCell>
                        <Stack alignItems="center" 
                        direction="row" 
                        spacing={2}>
                          {/* <Avatar src={orders.avatar}>
                          {getInitials(orders.name)}
                        </Avatar> */}
                          <Typography variant="subtitle2">
                            {orders.DT.split("-").reverse().join("-")}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{orders.O_ID}</TableCell>
                      <TableCell>{orders.C_ID}</TableCell>
                      <TableCell>{orders.Category}</TableCell>
                      <TableCell>{orders.Size}</TableCell>
                      <TableCell>{orders.Piece}</TableCell>
                      <TableCell>{orders.Approx_wgt}</TableCell>
                      <TableCell>{orders.Wastage}</TableCell>
                      <TableCell>{orders.Extra_ghut}</TableCell>
                      <TableCell>
                        <span className={TableStyle.actions}>
                          <BsFillTrashFill
                            className={TableStyle.delete}
                            onClick={() => {
                              handleDelete(orders.O_ID);
                              reload();
                            }}
                          />
                          <BsFillPencilFill
                            onClick={() => {
                              setid(orders.O_ID);
                              setupdateOpen(true);
                            }}
                          />
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {updateOpen && (
        <Update updateClose={() => setupdateOpen(false)} 
        data={items} 
        row={id} 
        reload={reload} />
      )}
      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

OrdersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

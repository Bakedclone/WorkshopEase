import PropTypes from "prop-types";
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';  
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import {
  Box,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TableStyle from "../../theme/TableStyle.module.css";
import Update from "./Update";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

export const BalanceTable = (props) => {
  const {
    items = [],
    reload,
  } = props;

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3001/balance/" + id);
    } catch (error) {
      console.log(error);
    }
  };
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    // console.log(searchValue);
  };
  const filterData = items.filter((balance) => {
    if (balance.C_ID === searchValue || searchValue.length == 0) return true;
    else return false;
  });

  const [updateOpen, setupdateOpen] = useState(false);
  const [id, setid] = useState();

  return (
    <Card>
      <Card sx={{ pt: 2, pb: 5, pl: 1 }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search Customer ID"
          onChange={handleInputChange}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />
      <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            )}
          >
            Sync
          </Button>
      </Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>C_ID</TableCell>
                <TableCell>Gold Wgt.</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData
                .slice(0)
                .reverse()
                .map((balance) => {
                  return (
                    <TableRow
                      hover
                      key={balance.C_ID}
                    >
                      <TableCell>{balance.Name}</TableCell>
                      <TableCell>{balance.C_ID}</TableCell>
                      <TableCell>{balance.Gold_wgt}</TableCell>
                      <TableCell>
                        <span className={TableStyle.actions}>
                          <BsFillTrashFill
                            className={TableStyle.delete}
                            onClick={() => {
                              handleDelete(balance.C_ID);
                              reload();
                            }}
                          />
                          <BsFillPencilFill
                            onClick={() => {
                              setid(balance.C_ID);
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
        <Update updateClose={() => setupdateOpen(false)} data={items} row={id} reload={reload} />
      )}
    </Card>
  );
};

BalanceTable.propTypes = {
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

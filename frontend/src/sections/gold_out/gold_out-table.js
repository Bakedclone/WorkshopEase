import PropTypes from "prop-types";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableStyle from "../../theme/TableStyle.module.css";
import Update from "./Update";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { BASE_URL } from 'src/services/helper';

export const GoldOutTable = (props) => {
  const {
    items = [],
    reload,
  } = props;

  const handleDelete = async (id) => {
    try {
      await axios.delete(BASE_URL + "/gold_out/" + id);
    } catch (error) {
      console.log(error);
    }
  };
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };
  const filterData = items.filter((gold_out) => {
    if (gold_out.C_ID === searchValue || searchValue.length == 0) return true;
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>O_ID</TableCell>
                <TableCell>C_ID</TableCell>
                <TableCell>Gold Wgt.</TableCell>
                <TableCell>Profit Wgt.</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData
                .slice(0)
                .reverse()
                .map((gold_out) => {
                  return (
                    <TableRow
                      hover
                      key={gold_out.C_ID}
                    >
                      <TableCell>
                        <Stack alignItems="center"
                          direction="row"
                          spacing={2}>
                          <Typography variant="subtitle2">
                            {gold_out.DT.split("-").reverse().join("-")}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{gold_out.O_ID}</TableCell>
                      <TableCell>{gold_out.C_ID}</TableCell>
                      <TableCell>{gold_out.Gold_wgt}</TableCell>
                      <TableCell>{gold_out.Profit}</TableCell>
                      <TableCell>
                        <span className={TableStyle.actions}>
                          <BsFillTrashFill
                            className={TableStyle.delete}
                            onClick={() => {
                              handleDelete(gold_out.O_ID);
                              reload();
                            }}
                          />
                          <BsFillPencilFill
                            onClick={() => {
                              setid(gold_out.O_ID);
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
    </Card>
  );
};

GoldOutTable.propTypes = {
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

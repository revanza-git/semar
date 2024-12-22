import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import PICTableRow from "./PICTableRow";

interface PICTableProps {
  title: string;
  fetchData: (dataLimit?: number) => void;
  totalCount: number;
  router: any;
  PICData: any[];
  departments: any[];
  users: any[];
  handleDeletePIC: (ID: any) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  dataLimit?: number;
}

const TemplateTable: React.FC<PICTableProps> = ({
  title,
  fetchData,
  totalCount,
  router,
  PICData,
  departments,
  users,
  handleDeletePIC,
  currentPage,
  setCurrentPage,
  pageSize,
  dataLimit,
}) => {
  const sortedData = Array.isArray(PICData)
    ? PICData.sort(
        (a, b) =>
          new Date(b.updated_timestamp).getTime() -
          new Date(a.updated_timestamp).getTime()
      )
    : [];

  const currentItems = sortedData;

  const handleNextPage = () => {
    const nextPage = Math.min(
      currentPage + 1,
      Math.ceil(totalCount / pageSize)
    );
    setCurrentPage(nextPage);
    fetchData();
  };

  const handlePreviousPage = () => {
    const previousPage = Math.max(currentPage - 1, 1);
    setCurrentPage(previousPage);
    fetchData();
  };

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ backgroundColor: "red", color: "white", padding: "8px" }}
      >
        {title} {dataLimit ? `TOP ${dataLimit}` : ""}
      </Typography>

      <TableContainer component={Paper} sx={{ border: "2px solid red" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                <Typography color="textSecondary" variant="h6">
                  ID
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                <Typography color="textSecondary" variant="h6">
                  Nama PIC
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                <Typography color="textSecondary" variant="h6">
                  Email
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                <Typography color="textSecondary" variant="h6">
                  Fungsi PIC
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                <Typography color="textSecondary" variant="h6">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((pic, index) => (
              <PICTableRow
                key={pic.id}
                pic={pic}
                index={index}
                router={router}
                departments={departments}
                users={users}
                handleDeletePIC={handleDeletePIC}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pageSize && (
        <Box display="flex" justifyContent="center" m={2}>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={currentPage * pageSize >= totalCount}
          >
            Next
          </Button>
        </Box>
      )}
    </>
  );
};

export default TemplateTable;

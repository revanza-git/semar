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
import TypeTableRow from "./TypeTableRow";

interface TypeTableProps {
  title: string;
  fetchData: (dataLimit?: number) => void;
  totalCount: number;
  router: any;
  typeData: any[];
  handleDeleteType: (ID: any) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  dataLimit?: number;
}

const TypeTable: React.FC<TypeTableProps> = ({
  title,
  fetchData,
  totalCount,
  router,
  typeData,
  handleDeleteType,
  currentPage,
  setCurrentPage,
  pageSize,
  dataLimit,
}) => {

  const currentItems = typeData;
  
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
                  Type 
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                <Typography color="textSecondary" variant="h6">
                  Category
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
            {currentItems.map((t, index) => (
              <TypeTableRow
                key={t.semarTypeID || index}
                rowKey={t.semarTypeID}
                type={t}
                index={index}
                router={router}
                handleDeleteType={handleDeleteType}
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

export default TypeTable;

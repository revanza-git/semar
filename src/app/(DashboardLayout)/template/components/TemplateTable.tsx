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
import TemplateTableRow from "./TemplateTableRow";

interface TemplateTableProps {
  title: string;
  fetchData: (dataLimit?: number) => void;
  semarTypes: any[];
  router: any;
  handleDeleteSemarTemplate: (semarTemplateCode: any) => void;
  templateData: any[];
  totalCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  dataLimit?: number;
  tipeDokumen?: number;
}

const TemplateTable: React.FC<TemplateTableProps> = ({
  title,
  fetchData,
  semarTypes,
  router,
  handleDeleteSemarTemplate,
  templateData,
  totalCount,
  currentPage,
  setCurrentPage,
  pageSize,
  dataLimit,
}) => {
  const sortedData = Array.isArray(templateData)
    ? templateData.sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
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
                  Template Code
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                <Typography color="textSecondary" variant="h6">
                  Tipe
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                <Typography color="textSecondary" variant="h6">
                  Nama Template
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                <Typography color="textSecondary" variant="h6">
                  Tahun
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                <Typography color="textSecondary" variant="h6">
                  Revisi
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                <Typography color="textSecondary" variant="h6">
                  Status
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
            {currentItems.map((template, index) => (
              <TemplateTableRow
                key={template.semarTemplateCode}
                template={template}
                semarTypes={semarTypes}
                index={index}
                router={router}
                handleDeleteSemarTemplate={handleDeleteSemarTemplate}
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

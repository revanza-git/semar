import React, { useState } from "react";
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
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const sortedData = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...templateData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return templateData;
  }, [templateData, sortConfig]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortDirection = (key: string) => {
    if (!sortConfig) return;
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
  };

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
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('semarTemplateCode')}>
                <Typography color="textSecondary" variant="h6">
                  Template Code {getSortDirection('semarTemplateCode')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('tipe')}>
                <Typography color="textSecondary" variant="h6">
                  Tipe {getSortDirection('tipe')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('namaTemplate')}>
                <Typography color="textSecondary" variant="h6">
                  Nama Template {getSortDirection('namaTemplate')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('tahun')}>
                <Typography color="textSecondary" variant="h6">
                  Tahun {getSortDirection('tahun')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('revisi')}>
                <Typography color="textSecondary" variant="h6">
                  Revisi 
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('status')}>
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
            {sortedData.map((template, index) => (
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
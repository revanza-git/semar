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
import ActivityTableRow from "./ActivityTableRow";

interface ActivityTableProps {
  title: string;
  semarData: any[];
  router: any;
  handleDeleteSemarActivity: (id: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  semarTypes: any[];
  departments: any[];
  pageSize: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalCount: number;
  fetchData: (dataLimit?: number) => void;
  dataLimit?: number;
}

const ActivityTable: React.FC<ActivityTableProps> = ({
  title,
  semarData,
  router,
  handleDeleteSemarActivity,
  semarTypes,
  departments,
  pageSize,
  currentPage,
  setCurrentPage,
  totalCount,
  fetchData,
  dataLimit,
}) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const sortedData = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...semarData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return semarData;
  }, [semarData, sortConfig]);

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
        {title}
      </Typography>

      <TableContainer component={Paper} sx={{ border: "2px solid red" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('semarID')}>
                <Typography color="textSecondary" variant="h6">
                  ID {getSortDirection('semarID')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('jenis')}>
                <Typography color="textSecondary" variant="h6">
                  Jenis {getSortDirection('jenis')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('fungsi')}>
                <Typography color="textSecondary" variant="h6">
                  Fungsi {getSortDirection('fungsi')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('nomor')}>
                <Typography color="textSecondary" variant="h6">
                  Nomor {getSortDirection('nomor')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('revisi')}>
                <Typography color="textSecondary" variant="h6">
                  Revisi {getSortDirection('revisi')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('perihal')}>
                <Typography color="textSecondary" variant="h6">
                  Perihal {getSortDirection('perihal')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('tmtBerlaku')}>
                <Typography color="textSecondary" variant="h6">
                  TMT Berlaku {getSortDirection('tmtBerlaku')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('tmtBerakhir')}>
                <Typography color="textSecondary" variant="h6">
                  TMT Berakhir {getSortDirection('tmtBerakhir')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('deskripsi')}>
                <Typography color="textSecondary" variant="h6">
                  Deskripsi {getSortDirection('deskripsi')}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('status')}>
                <Typography color="textSecondary" variant="h6">
                  Jatuh Tempo
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }} onClick={() => requestSort('status')}>
                <Typography color="textSecondary" variant="h6">
                  Status 
                </Typography>
              </TableCell>
              
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                <Typography color="textSecondary" variant="h6">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((activity, index) => (
              <ActivityTableRow
                key={activity.semarID}
                activity={activity}
                index={index}
                router={router}
                handleDeleteSemarActivity={handleDeleteSemarActivity}
                semarTypes={semarTypes}
                departments={departments}
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

export default ActivityTable;
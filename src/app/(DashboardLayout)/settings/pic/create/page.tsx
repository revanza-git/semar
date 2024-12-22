"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Alert,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Box,
  CircularProgress,
  Breadcrumbs,
  Link,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { fetchUsers, createPICData } from "../api/pic";
import { fetchDepartments } from "../../../components/dashboard/Report/api/semar";

const Details = () => {
  const router = useRouter();
  const currentDateTime = new Date().toISOString();

  const [picData, setPICData] = useState<any>({
    usernamePIC: "",
    departmentPIC: "",
    module: "semar",
    created_timestamp: currentDateTime,
    updated_timestamp: currentDateTime,
  });

  const [departments, setDepartments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDepartmentsData = async () => {
      try {
        const departments = await fetchDepartments();
        setDepartments(departments);
      } catch (error) {
        setError("Failed to fetch departments");
      }
    };
    fetchDepartmentsData();
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        setError("Failed to fetch Users");
      }
    };
    fetchUsersData();
  }, []);

  const handleSelectChange = (e: SelectChangeEvent<any>) => {
    const { name, value } = e.target;
    setPICData({ ...picData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    //Validation
    if (!picData.usernamePIC || !picData.departmentPIC) {
      setError(
        "Please fill in all required fields, including uploading a file."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const newData = {
        ...picData,
      };

      await createPICData(newData);

      setSuccess("Data Successfully Saved");
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        router.back();
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={() => router.push("/")}>
              Home
            </Link>
            <Typography color="textPrimary">Settings</Typography>
            <Link color="inherit" onClick={() => router.push("/settings/pic")}>
              PIC
            </Link>
            <Typography color="textPrimary">Create</Typography>
          </Breadcrumbs>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} lg={12}>
              <Button onClick={() => router.back()}>
                <ArrowBackIcon />
              </Button>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            {success && (
              <Grid item xs={12}>
                <Alert severity="success">{success}</Alert>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <FormLabel htmlFor="usernamePIC">User PIC</FormLabel>
                <Select
                  id="usernamePIC"
                  name="usernamePIC"
                  value={picData.usernamePIC}
                  onChange={handleSelectChange}
                  fullWidth
                  variant="outlined"
                >
                  {users.map((user) => (
                    <MenuItem key={user.userName} value={user.userName}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <FormLabel htmlFor="departmentPIC">Fungsi</FormLabel>
                <Select
                  id="departmentPIC"
                  name="departmentPIC"
                  value={picData.departmentPIC}
                  onChange={handleSelectChange}
                  fullWidth
                  variant="outlined"
                >
                  {departments.map((department) => (
                    <MenuItem
                      key={department.departmentID}
                      value={department.departmentID}
                    >
                      {department.deskripsi}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="right" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  color={isSubmitting ? "warning" : "primary"}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : "Save"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

export default Details;

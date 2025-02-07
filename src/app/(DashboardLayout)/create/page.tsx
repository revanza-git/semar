"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
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
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  createSemarData,
  uploadSemarFile,
  fetchSemarTypes,
  fetchDepartments,
  fetchSemarLevels,
} from "../components/dashboard/Report/api/semar";

const Create = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [semarData, setSemarData] = useState<any>({
    type: "",
    noDocument: "",
    title: "",
    semarLevel: "",
    owner: "",
    description: "",
    publishDate: "",
    expiredDate: "",
    revision: "",
    status: 1,
  });
  const [semarTypes, setSemarTypes] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [semarLevels, setSemarLevels] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Fetch Semar Types
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const types = await fetchSemarTypes();
        setSemarTypes(types);
      } catch (error) {
        setError("Failed to fetch semar types");
      }
    };
    fetchTypes();
  }, []);

  // Fetch Departments
  useEffect(() => {
    const fetchDepartmentsData = async () => {
      try {
        const departmentsData = await fetchDepartments();
        setDepartments(departmentsData);
      } catch (error) {
        setError("Failed to fetch departments");
      }
    };
    fetchDepartmentsData();
  }, []);

  // Fetch Semar Levels
  useEffect(() => {
    const fetchSemarLevelsData = async () => {
      try {
        const semarLevelsData = await fetchSemarLevels();
        setSemarLevels(semarLevelsData);
      } catch (error) {
        setError("Failed to fetch semar levels");
      }
    };
    fetchSemarLevelsData();
  }, []);

  // Handle Semar Level based on Type
  useEffect(() => {
    if (semarData && semarData.type !== 5) {
      setSemarData((prevData: any) => ({ ...prevData, semarLevel: 0 }));
    }
  }, [semarData?.type]);

  // Handle Text Field Change
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSemarData({ ...semarData, [name]: value });
  };

  // Handle Select Change
  const handleSelectChange = (e: SelectChangeEvent<any>) => {
    const { name, value } = e.target;
    setSemarData({ ...semarData, [name]: value });
  };

  // Handle File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handle Form Submit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (
      !semarData.type ||
      !semarData.noDocument ||
      !semarData.title ||
      !semarData.owner ||
      !semarData.description ||
      !semarData.publishDate ||
      !semarData.expiredDate ||
      !semarData.revision ||
      !file
    ) {
      setError(
        "Please fill in all required fields, including uploading a file."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const newData = {
        ...semarData,
        expiredNotification: 0,
        classification: 2,
        fileName: semarData.fileName,
        contentType: semarData.contentType,
        creator: semarData.creator,
      };
      const createdData = await createSemarData(newData);

      try {
        await uploadSemarFile(createdData.semarID, file);
        setSuccess("Data and File Successfully Saved");
      } catch (uploadError) {
        setError("Data saved, but file upload failed.");
      }

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

  const isEditable = semarData.type?.toString() === "5";

  return (
    <Box p={3}>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" onClick={() => router.push("/")}>
                Home
              </Link>
              <Typography color="textPrimary">Create</Typography>
            </Breadcrumbs>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12} lg={12}>
                <Button onClick={() => router.back()} startIcon={<ArrowBackIcon />}>
                  Back
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
              {/* Type Field */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <FormLabel htmlFor="type">Type</FormLabel>
                  <Select
                    id="type"
                    name="type"
                    value={semarData.type}
                    onChange={handleSelectChange}
                    fullWidth
                    variant="outlined"
                    required
                  >
                    {semarTypes
                      .filter((type) => session?.role === "AdminQM" || type.type !== "STK")
                      .map((type) => (
                        <MenuItem key={type.semarTypeID} value={type.semarTypeID}>
                          {type.deskripsi}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Semar Level Field */}
              {semarData.type === 5 && (
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <FormLabel htmlFor="semarLevel">Semar Level</FormLabel>
                    <Select
                      id="semarLevel"
                      name="semarLevel"
                      value={semarData.semarLevel}
                      onChange={handleSelectChange}
                      fullWidth
                      variant="outlined"
                      disabled={!isEditable}
                    >
                      {semarLevels.map((level) => (
                        <MenuItem
                          key={level.semarLevelID}
                          value={level.semarLevelID}
                        >
                          {level.deskripsi}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {/* No Document Field */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <FormLabel htmlFor="noDocument">No Document</FormLabel>
                  <TextField
                    id="noDocument"
                    name="noDocument"
                    value={semarData.noDocument}
                    onChange={handleTextFieldChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </FormControl>
              </Grid>
              {/* Title Field */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <TextField
                    id="title"
                    name="title"
                    value={semarData.title}
                    onChange={handleTextFieldChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </FormControl>
              </Grid>
              {/* Owner Field */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <FormLabel htmlFor="owner">Fungsi</FormLabel>
                  <Select
                    id="owner"
                    name="owner"
                    value={semarData.owner}
                    onChange={handleSelectChange}
                    fullWidth
                    variant="outlined"
                    required
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
              {/* Description Field */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <TextField
                    id="description"
                    name="description"
                    value={semarData.description}
                    onChange={handleTextFieldChange}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4} // You can adjust the number of rows as needed
                    required
                  />
                </FormControl>
              </Grid>
              {/* Publish Date Field */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <FormLabel htmlFor="publishDate">Publish Date</FormLabel>
                  <TextField
                    id="publishDate"
                    name="publishDate"
                    type="datetime-local"
                    value={semarData.publishDate}
                    onChange={handleTextFieldChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </FormControl>
              </Grid>
              {/* Expired Date Field */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <FormLabel htmlFor="expiredDate">Expired Date</FormLabel>
                  <TextField
                    id="expiredDate"
                    name="expiredDate"
                    type="datetime-local"
                    value={semarData.expiredDate}
                    onChange={handleTextFieldChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </FormControl>
              </Grid>
              {/* Revision Field */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <FormLabel htmlFor="revision">Revision</FormLabel>
                  <TextField
                    id="revision"
                    name="revision"
                    value={semarData.revision}
                    onChange={handleTextFieldChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
                </FormControl>
              </Grid>
              {/* File Upload Field */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <FormLabel htmlFor="file">Upload File</FormLabel>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ accept: "application/pdf" }}
                        required
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {/* Status Field */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <RadioGroup
                    id="status"
                    name="status"
                    value={semarData.status}
                    onChange={handleSelectChange}
                    row // This makes the radio buttons appear in a row
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Aktif"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Tidak Aktif"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* Submit Button */}
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
    </Box>
  );
};

export default Create;
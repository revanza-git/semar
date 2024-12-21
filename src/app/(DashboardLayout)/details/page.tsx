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
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  fetchSemarDataById,
  updateSemarData,
  downloadSemarFile,
  uploadSemarFile,
  fetchSemarTypes,
  fetchDepartments,
  fetchSemarLevels,
} from "../components/dashboard/Report/api/semar";

const Details = () => {
  const router = useRouter();
  const params: any = useSearchParams();
  const id = params.get("id");
  const { data: session } = useSession();

  const [semarData, setSemarData] = useState<any>(null);
  const [semarTypes, setSemarTypes] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [semarLevels, setSemarLevels] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSemarDataById(id);
        setSemarData(data);
      } catch (error) {
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, [id]);

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

  useEffect(() => {
    if (semarData && semarData.type !== 5) {
      setSemarData((prevData: any) => ({ ...prevData, semarLevel: 0 }));
    }
  }, [semarData?.type]);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSemarData({ ...semarData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<any>) => {
    const { name, value } = e.target;
    setSemarData({ ...semarData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedData = {
        ...semarData,
        expiredNotification: 0,
        classification: 2,
        fileName: semarData.fileName,
        contentType: semarData.contentType,
        creator: semarData.creator,
      };
      await updateSemarData(id, updatedData);

      if (file) {
        await uploadSemarFile(id, file);
        setSuccess("Data and File Successfully Saved");
      } else {
        setSuccess("Data Successfully Saved");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        router.back();
      }, 2000);
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

  const handleDownload = async () => {
    try {
      const blob = await downloadSemarFile(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = semarData.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError("Failed to download file");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!semarData) return <div>Loading...</div>;

  const fileNameDisplay = semarData.fileName
    ? `File: ${semarData.fileName}`
    : "File: none";

  const isEditable =
    session?.role === "AdminQM" || session?.department === semarData.owner;

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={() => router.push("/")}>
              Home
            </Link>
            <Typography color="textPrimary">Detail</Typography>
            <Typography color="textPrimary">{id}</Typography>
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
                <FormLabel htmlFor="type">Type</FormLabel>
                <Select
                  id="type"
                  name="type"
                  value={semarData.type}
                  onChange={handleSelectChange}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                >
                  {semarTypes.map((type) => (
                    <MenuItem key={type.semarTypeID} value={type.semarTypeID}>
                      {type.deskripsi}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
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
                  disabled={!isEditable}
                />
              </FormControl>
            </Grid>
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
                  disabled={!isEditable}
                />
              </FormControl>
            </Grid>
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
                />
              </FormControl>
            </Grid>
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
                  disabled={!isEditable}
                />
              </FormControl>
            </Grid>
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
                  disabled={!isEditable}
                />
              </FormControl>
            </Grid>
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
                  disabled={!isEditable}
                />
              </FormControl>
            </Grid>
            {isEditable && (
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
                        disabled={!isEditable}
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
            )}
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
                    disabled={!isEditable}
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="Tidak Aktif"
                    disabled={!isEditable}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">{fileNameDisplay}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box textAlign="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDownload}
                    >
                      Download
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            {isEditable && (
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
            )}
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

export default Details;

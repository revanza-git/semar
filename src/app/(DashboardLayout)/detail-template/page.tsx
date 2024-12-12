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
import {
  fetchSemarTemplateDataById,
  updateSemarTemplateData,
  downloadTemplateFile,
  uploadSemarTemplateFile,
  fetchSemarTypes,
} from "../template/api/template";
import { template } from "lodash";

const Details = () => {
  const router = useRouter();
  const params: any = useSearchParams();
  const id = params.get("id");
  const [templateData, setTemplateData] = useState<any>(null);
  const [semarTypes, setSemarTypes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSemarTemplateDataById(id);
        setTemplateData(data);
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

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTemplateData({ ...templateData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<any>) => {
    const { name, value } = e.target;
    setTemplateData({ ...templateData, [name]: value });
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
        ...templateData,
        modifiedDate: new Date().toISOString(), // Set modifiedDate to current time
      };
      await updateSemarTemplateData(id, updatedData);

      if (file) {
        await uploadSemarTemplateFile(id, file);
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
      const blob = await downloadTemplateFile(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = templateData.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError("Failed to download file");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!templateData) return <div>Loading...</div>;

  const fileNameDisplay = templateData.fileName
    ? `File: ${templateData.fileName}`
    : "File: none";

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={() => router.push("/")}>
              Home
            </Link>
            <Typography color="textPrimary">Edit</Typography>
            <Typography color="textPrimary">
              {templateData.semarTemplateCode}
            </Typography>
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
                <FormLabel htmlFor="namaTemplate">Template Name</FormLabel>
                <TextField
                  id="namaTemplate"
                  name="namaTemplate"
                  value={templateData.namaTemplate}
                  onChange={handleTextFieldChange}
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <FormLabel htmlFor="tipeDokumen">Document Type</FormLabel>
                <Select
                  id="tipeDokumen"
                  name="tipeDokumen"
                  value={templateData.tipeDokumen}
                  onChange={handleSelectChange}
                  fullWidth
                  variant="outlined"
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
                <FormLabel htmlFor="tahun">Year</FormLabel>
                <TextField
                  id="tahun"
                  name="tahun"
                  type="number"
                  value={templateData.tahun}
                  onChange={handleTextFieldChange}
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <FormLabel htmlFor="revisi">Revision</FormLabel>
                <TextField
                  id="revisi"
                  name="revisi"
                  type="number"
                  value={templateData.revisi}
                  onChange={handleTextFieldChange}
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
            </Grid>
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
                    />
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <FormLabel htmlFor="status">Status</FormLabel>
                <RadioGroup
                  id="status"
                  name="status"
                  value={templateData.status}
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

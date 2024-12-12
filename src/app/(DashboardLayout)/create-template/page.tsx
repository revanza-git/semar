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
import {
  createSemarTemplateData,
  uploadSemarTemplateFile,
  fetchSemarTypes,
} from "../template/api/template";

const CreateTemplate = () => {
  const router = useRouter();
  const [templateData, setTemplateData] = useState<any>({
    semarTemplateCode: "",
    namaTemplate: "",
    fileName: "",
    contentType: "application/pdf",
    tipeDokumen: "",
    pengunggah: "admin",
    status: 1,
    tahun: new Date().getFullYear(),
    revisi: 0,
    entryDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString(),
  });
  const [semarTypes, setSemarTypes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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
      setTemplateData({ ...templateData, fileName: e.target.files[0].name });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!templateData.namaTemplate || !templateData.tipeDokumen || !file) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const newTemplateData = {
        ...templateData,
        modifiedDate: new Date().toISOString(), // Set modifiedDate to current time
      };
      const createdTemplate = await createSemarTemplateData(newTemplateData);

      if (file) {
        await uploadSemarTemplateFile(createdTemplate.semarTemplateCode, file);
        setSuccess("Data and File Successfully Saved");
      } else {
        setSuccess("Data Successfully Saved");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        router.push("/template");
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
                <FormLabel htmlFor="namaTemplate">Template Name</FormLabel>
                <TextField
                  id="namaTemplate"
                  name="namaTemplate"
                  value={templateData.namaTemplate}
                  onChange={handleTextFieldChange}
                  fullWidth
                  variant="outlined"
                  required
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
                  required
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
                  required
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
                  required
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

export default CreateTemplate;

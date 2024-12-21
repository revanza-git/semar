import { useState, useEffect, useCallback } from "react";
import {
  fetchTemplateData,
  fetchSemarTypes,
  deleteSemarTemplate,
} from "../api/template"; // Adjust the import path as needed

interface SemarTypes {
  semarTypeID: string;
  deskripsi: string;
}

const useTemplateData = () => {
  const [templateData, setTemplateData] = useState([]);
  const [year, setYear] = useState<number | undefined>();
  const [docStatus, setDocStatus] = useState(""); // Rename status to docStatus
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [namaTemplate, setNamaTemplate] = useState("");
  const [tipeDokumen, setTipeDokumen] = useState<number | undefined>();
  const [dataLimit, setDataLimit] = useState();
  const [pageSize, setPageSize] = useState(5);
  const [semarTypes, setSemarTypes] = useState<SemarTypes[]>([]);

  const fetchData = useCallback(async () => {
    const { data: templateDataResult, totalCount: totalCount } =
      await fetchTemplateData(
        currentPage,
        pageSize,
        dataLimit,
        namaTemplate,
        year,
        tipeDokumen,
        docStatus
      );

    setTemplateData(templateDataResult);
    setTotalCount(totalCount);
  }, [
    currentPage,
    pageSize,
    dataLimit,
    namaTemplate,
    year,
    tipeDokumen,
    docStatus,
  ]);

  useEffect(() => {
    fetchData();
    fetchSemarTypes().then(setSemarTypes);
  }, [fetchData]);

  const handleDeleteSemarTemplate = async (semarTemplateCode: any) => {
    try {
      await deleteSemarTemplate(semarTemplateCode);
      fetchData();
      console.log("Semar Template deleted successfully");
    } catch (error) {
      console.error("Error deleting semar template:", error);
    }
  };

  const resetPageAndFetchData =
    (setter: (value: any) => void, fetchData: () => void) => (value: any) => {
      setter(value);
      fetchData();
    };

  return {
    templateData,
    tipeDokumen,
    setTipeDokumen: resetPageAndFetchData(setTipeDokumen, fetchData),
    year,
    setYear: resetPageAndFetchData(setYear, fetchData),
    fetchData,
    docStatus,
    setDocStatus: resetPageAndFetchData(setDocStatus, fetchData),
    currentPage,
    setCurrentPage,
    totalCount,
    dataLimit,
    setDataLimit,
    pageSize,
    setPageSize,
    namaTemplate,
    setNamaTemplate,
    semarTypes,
    setSemarTypes,
    handleDeleteSemarTemplate,
  };
};

export default useTemplateData;

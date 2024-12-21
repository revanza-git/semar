import { useState, useEffect, useCallback } from "react";
import {
  fetchSemarData,
  deleteSemarActivity,
  fetchSemarTypes,
  fetchDepartments,
  fetchSemarLevels,
} from "../api/semar";

interface Department {
  departmentID: string;
  deskripsi: string;
  induk: string;
  isDepartment: string;
}

interface SemarLevels {
  semarLevelID: string;
  deskripsi: string;
}

const useSemarData = () => {
  const [searchInput, setSearchInput] = useState("");
  const [skData, setSkData] = useState([]);
  const [stkData, setStkData] = useState([]);
  const [skNewData, setSkNewData] = useState([]);
  const [stkNewData, setStkNewData] = useState([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [semarTypes, setSemarTypes] = useState([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [noDocument, setNoDocument] = useState("");
  const [title, setTitle] = useState("");
  const [semarLevels, setSemarLevels] = useState<SemarLevels[]>([]);
  const [semarLevel, setSemarLevel] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("");
  const [currentPageSK, setCurrentPageSK] = useState(1);
  const [currentPageSTK, setCurrentPageSTK] = useState(1);
  const [totalCountSK, setTotalCountSK] = useState(0);
  const [totalCountSTK, setTotalCountSTK] = useState(0);
  const [totalCountNewSK, setTotalCountNewSK] = useState(0);
  const [totalCountNewSTK, setTotalCountNewSTK] = useState(0);
  const [dataLimit, setDataLimit] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [selectedSemarType, setSelectedSemarType] = useState<number | null>(
    null
  ); // New state for semarType filter

  const fetchDataSK = useCallback(async () => {
    const { data: skDataResult, totalCount: totalCount } = await fetchSemarData(
      currentPageSK,
      5,
      startDate,
      endDate,
      searchInput,
      [5],
      noDocument,
      title,
      semarLevel,
      owner,
      status
    );
    const { data: skNewDataResult, totalCount: totalCountNew } =
      await fetchSemarData(
        currentPageSK,
        3,
        startDate,
        endDate,
        searchInput,
        [5],
        noDocument,
        title,
        semarLevel,
        owner,
        status,
        10
      );
    setSkData(skDataResult);
    setSkNewData(skNewDataResult);
    setTotalCountSK(totalCount);
    setTotalCountNewSK(totalCountNew);
  }, [
    currentPageSK,
    startDate,
    endDate,
    searchInput,
    noDocument,
    title,
    semarLevel,
    owner,
    status,
  ]);

  const fetchDataSTK = useCallback(async () => {
    const { data: stkDataResult, totalCount: totalCount } =
      await fetchSemarData(
        currentPageSTK,
        5,
        startDate,
        endDate,
        searchInput,
        selectedSemarType ? [selectedSemarType] : [2, 3, 4], // Use selectedSemarType filter
        noDocument,
        title,
        semarLevel,
        owner,
        status
      );
    const { data: stkNewDataResult, totalCount: totalCountNew } =
      await fetchSemarData(
        currentPageSTK,
        3,
        startDate,
        endDate,
        searchInput,
        [2, 3, 4],
        noDocument,
        title,
        semarLevel,
        owner,
        status,
        10
      );
    setStkData(stkDataResult);
    setStkNewData(stkNewDataResult);
    setTotalCountSTK(totalCount);
    setTotalCountNewSTK(totalCountNew);
  }, [
    currentPageSTK,
    startDate,
    endDate,
    searchInput,
    noDocument,
    title,
    semarLevel,
    owner,
    status,
    selectedSemarType, // Add selectedSemarType to dependencies
  ]);

  useEffect(() => {
    fetchDataSK();
    fetchDataSTK();
    fetchSemarTypes().then(setSemarTypes);
    fetchDepartments().then(setDepartments);
    fetchSemarLevels().then(setSemarLevels);
  }, [fetchDataSK, fetchDataSTK]);

  const handleSetSelectedSemarType = (value: number | null) => {
    setSelectedSemarType(value);
    setCurrentPageSTK(1); // Reset the page to 1
    fetchDataSTK(); // Fetch data based on the new filter
  };

  const handleDeleteSemarActivity = async (idSemarActivity: any) => {
    try {
      await deleteSemarActivity(idSemarActivity);
      fetchDataSK();
      fetchDataSTK();
      console.log("Semar activity deleted successfully");
    } catch (error) {
      console.error("Error deleting semar activity:", error);
    }
  };

  const resetPageAndFetchData =
    (setter: (value: any) => void, fetchData: () => void) => (value: any) => {
      setter(value);
      fetchData();
    };

  return {
    skData,
    stkData,
    skNewData,
    stkNewData,
    searchInput,
    setSearchInput: resetPageAndFetchData(setSearchInput, fetchDataSTK),
    startDate,
    setStartDate: resetPageAndFetchData(setStartDate, fetchDataSTK),
    endDate,
    setEndDate: resetPageAndFetchData(setEndDate, fetchDataSTK),
    fetchDataSK,
    fetchDataSTK,
    handleDeleteSemarActivity,
    semarTypes,
    departments,
    noDocument,
    setNoDocument: resetPageAndFetchData(setNoDocument, fetchDataSTK),
    title,
    setTitle: resetPageAndFetchData(setTitle, fetchDataSTK),
    semarLevel,
    setSemarLevel: resetPageAndFetchData(setSemarLevel, fetchDataSTK),
    owner,
    setOwner: resetPageAndFetchData(setOwner, fetchDataSTK),
    status,
    setStatus: resetPageAndFetchData(setStatus, fetchDataSTK),
    currentPageSK,
    setCurrentPageSK,
    currentPageSTK,
    setCurrentPageSTK,
    semarLevels,
    totalCountSK,
    totalCountSTK,
    dataLimit,
    setDataLimit,
    pageSize,
    setPageSize,
    totalCountNewSK,
    totalCountNewSTK,
    selectedSemarType, // Export selectedSemarType
    handleSetSelectedSemarType, // Export handleSetSelectedSemarType
  };
};

export default useSemarData;

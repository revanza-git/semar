import { useState, useEffect, useCallback } from "react";
import {
  fetchSemarData,
  deleteSemarActivity,
  fetchSemarTypes,
  fetchDepartments,
  fetchSemarLevels,
} from "../api/semar";

// Interfaces
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

// Custom Hook
const useSemarData = () => {
  // State Variables
  const [searchInput, setSearchInput] = useState("");
  const [skData, setSkData] = useState([]);
  const [stkData, setStkData] = useState([]);
  const [engineeringData, setEngineeringData] = useState([]);
  const [lainlainData, setLainlainData] = useState([]);
  const [skNewData, setSkNewData] = useState([]);
  const [stkNewData, setStkNewData] = useState([]);
  const [engineeringNewData, setEngineeringNewData] = useState([]);
  const [lainlainNewData, setLainlainNewData] = useState([]);
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
  const [currentPageEngineering, setCurrentPageEngineering] = useState(1);
  const [currentPageLainlain, setCurrentPageLainlain] = useState(1);
  const [totalCountSK, setTotalCountSK] = useState(0);
  const [totalCountSTK, setTotalCountSTK] = useState(0);
  const [totalCountEngineering, setTotalCountEngineering] = useState(0);
  const [totalCountLainlain, setTotalCountLainlain] = useState(0);
  const [totalCountNewSK, setTotalCountNewSK] = useState(0);
  const [totalCountNewSTK, setTotalCountNewSTK] = useState(0);
  const [totalCountNewEngineering, setTotalCountNewEngineering] = useState(0);
  const [totalCountNewLainlain, setTotalCountNewLainlain] = useState(0);
  const [dataLimit, setDataLimit] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [selectedSemarType, setSelectedSemarType] = useState<number | null>(null);

  // Fetch Data Functions
  const fetchDataSK = useCallback(async () => {
    const { data: skDataResult, totalCount: totalCount } = await fetchSemarData(
      currentPageSK,
      5,
      startDate,
      endDate,
      searchInput,
      "SK",
      undefined,
      noDocument,
      title,
      semarLevel,
      owner,
      status
    );
    const { data: skNewDataResult, totalCount: totalCountNew } = await fetchSemarData(
      currentPageSK,
      3,
      startDate,
      endDate,
      searchInput,
      "SK",
      undefined,
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

  const fetchDataEngineering = useCallback(async () => {
    const { data: engineeringDataResult, totalCount: totalCount } = await fetchSemarData(
      currentPageEngineering,
      5,
      startDate,
      endDate,
      searchInput,
      "ENGINEERING",
      undefined,
      noDocument,
      title,
      semarLevel,
      owner,
      status
    );
    const { data: engineeringNewDataResult, totalCount: totalCountNew } = await fetchSemarData(
      currentPageEngineering,
      3,
      startDate,
      endDate,
      searchInput,
      "ENGINEERING",
      undefined,
      noDocument,
      title,
      semarLevel,
      owner,
      status,
      10
    );
    setEngineeringData(engineeringDataResult);
    setEngineeringNewData(engineeringNewDataResult);
    setTotalCountEngineering(totalCount);
    setTotalCountNewEngineering(totalCountNew);
  }, [
    currentPageEngineering,
    startDate,
    endDate,
    searchInput,
    noDocument,
    title,
    semarLevel,
    owner,
    status,
  ]);

  const fetchDataLainlain = useCallback(async () => {
    const { data: lainlainDataResult, totalCount: totalCount } = await fetchSemarData(
      currentPageLainlain,
      5,
      startDate,
      endDate,
      searchInput,
      "LAINLAIN",
      undefined,
      noDocument,
      title,
      semarLevel,
      owner,
      status
    );
    const { data: lainlainNewDataResult, totalCount: totalCountNew } = await fetchSemarData(
      currentPageLainlain,
      3,
      startDate,
      endDate,
      searchInput,
      "LAINLAIN",
      undefined,
      noDocument,
      title,
      semarLevel,
      owner,
      status,
      10
    );
    setLainlainData(lainlainDataResult);
    setLainlainNewData(lainlainNewDataResult);
    setTotalCountLainlain(totalCount);
    setTotalCountNewLainlain(totalCountNew);
  }, [
    currentPageLainlain,
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
    const { data: stkDataResult, totalCount: totalCount } = await fetchSemarData(
      currentPageSTK,
      5,
      startDate,
      endDate,
      searchInput,
      "STK",
      selectedSemarType ? [selectedSemarType] : undefined,
      noDocument,
      title,
      semarLevel,
      owner,
      status
    );
    const { data: stkNewDataResult, totalCount: totalCountNew } = await fetchSemarData(
      currentPageSTK,
      3,
      startDate,
      endDate,
      searchInput,
      "STK",
      undefined,
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
    selectedSemarType,
  ]);

  // Effect Hooks
  useEffect(() => {
    fetchDataSK();
    fetchDataSTK();
    fetchDataEngineering();
    fetchDataLainlain();
    fetchSemarTypes().then(setSemarTypes);
    fetchDepartments().then(setDepartments);
    fetchSemarLevels().then(setSemarLevels);
  }, [fetchDataSK, fetchDataSTK]);

  // Handlers
  const handleSetSelectedSemarType = (value: number | null) => {
    setSelectedSemarType(value);
    setCurrentPageSTK(1);
    fetchDataSTK();
  };

  const handleDeleteSemarActivity = async (idSemarActivity: any) => {
    try {
      await deleteSemarActivity(idSemarActivity);
      fetchDataSK();
      fetchDataSTK();
    } catch (error) {
      console.error("Error deleting semar activity:", error);
    }
  };

  const resetPageAndFetchData = (setter: (value: any) => void, fetchData: () => void) => (value: any) => {
    setter(value);
    fetchData();
  };

  // Return Values
  return {
    // State Variables
    skData,
    stkData,
    engineeringData,
    lainlainData,
    skNewData,
    stkNewData,
    engineeringNewData,
    lainlainNewData,
    searchInput,
    setSearchInput: resetPageAndFetchData(setSearchInput, fetchDataSTK),
    startDate,
    setStartDate: resetPageAndFetchData(setStartDate, fetchDataSTK),
    endDate,
    setEndDate: resetPageAndFetchData(setEndDate, fetchDataSTK),
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
    currentPageEngineering,
    setCurrentPageEngineering,
    currentPageLainlain,
    setCurrentPageLainlain,
    semarLevels,
    totalCountSK,
    totalCountSTK,
    totalCountEngineering,
    totalCountLainlain,
    dataLimit,
    setDataLimit,
    pageSize,
    setPageSize,
    totalCountNewSK,
    totalCountNewSTK,
    totalCountNewEngineering,
    totalCountNewLainlain,
    selectedSemarType,
    handleSetSelectedSemarType,
    // Fetch Data Functions
    fetchDataSK,
    fetchDataSTK,
    fetchDataEngineering,
    fetchDataLainlain,
    // Handlers
    handleDeleteSemarActivity,
    // Fetch Metadata
    semarTypes,
    departments,
  };
};

export default useSemarData;
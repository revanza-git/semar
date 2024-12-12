// api/semar.ts
export const fetchSemarData = async (
  pageNumber?: number,
  pageSize?: number,
  startDate: Date | null = null,
  endDate: Date | null = null,
  searchInput = "",
  types?: number[],
  noDocument?: string,
  title?: string,
  semarLevel?: string,
  owner?: string,
  status?: string,
  dataLimit?: number
) => {
  const queryParams: { [key: string]: string } = {};

  if (pageNumber !== undefined) {
    queryParams.pageNumber = pageNumber.toString();
  }

  if (pageSize !== undefined) {
    queryParams.pageSize = pageSize.toString();
  }

  if (startDate) {
    queryParams.startDate = startDate.toISOString();
  }

  if (endDate) {
    queryParams.endDate = endDate.toISOString();
  }

  if (searchInput) {
    queryParams.searchInput = searchInput;
  }

  if (noDocument) {
    queryParams.noDocument = noDocument;
  }

  if (title) {
    queryParams.title = title;
  }

  if (semarLevel) {
    queryParams.semarLevel = semarLevel;
  }

  if (owner) {
    queryParams.owner = owner;
  }

  if (status) {
    queryParams.status = status;
  }

  if (dataLimit !== undefined) {
    queryParams.dataLimit = dataLimit.toString();
  }

  const urlSearchParams = new URLSearchParams(queryParams);

  if (types && types.length > 0) {
    types.forEach((type) => {
      urlSearchParams.append("types", type.toString());
    });
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/Semar?${urlSearchParams.toString()}`
  );
  const result = await response.json();
  return {
    data: result.data,
    totalCount: result.totalCount,
  };
};

export const fetchSemarDataById = async (semarID: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Semar/${semarID}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch semar data");
  }
  return await response.json();
};

export const deleteSemarActivity = async (idSemarActivity: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Semar/${idSemarActivity}`;
  try {
    const response = await fetch(url, {
      method: "DELETE", // Specify the method
    });
    if (!response.ok) {
      throw new Error("Failed to delete the semar activity");
    }
    console.log("Semar activity deleted successfully");
    // Handle success response
  } catch (error) {
    console.error("Error deleting semar activity:", error);
    // Handle errors
  }
};

export const fetchSemarTypes = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/Common/semar-type`
  );
  return await response.json();
};

export const fetchDepartments = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/Common/fungsi`
  );
  return await response.json();
};

export const downloadSemarFile = async (semarID: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Semar/download-file/${semarID}`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return await response.blob();
};

export const createSemarData = async (semarData: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Semar`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(semarData),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating semar data:", error);
    throw error;
  }
};

export const updateSemarData = async (semarID: string, semarData: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Semar/${semarID}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(semarData),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating semar data:", error);
    throw error;
  }
};

export const uploadSemarFile = async (semarID: string, file: File) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Semar/upload-document/${semarID}`;
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const responseText = await response.text();
    if (!responseText) {
      return {}; // Return an empty object if the response body is empty
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error uploading semar file:", error);
    throw error;
  }
};

export const fetchSemarLevels = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/Common/semar-level`
  );
  return await response.json();
};

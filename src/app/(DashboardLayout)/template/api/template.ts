export const fetchTemplateData = async (
  pageNumber?: number,
  pageSize?: number,
  dataLimit?: number,
  namaTemplate?: string,
  year?: number,
  tipeDokumen?: number,
  status?: string
) => {
  const queryParams: { [key: string]: string } = {};

  if (pageNumber !== undefined) {
    queryParams.pageNumber = pageNumber.toString();
  }

  if (pageSize !== undefined) {
    queryParams.pageSize = pageSize.toString();
  }

  if (dataLimit !== undefined) {
    queryParams.dataLimit = dataLimit.toString();
  }

  if (namaTemplate) {
    queryParams.namaTemplate = namaTemplate;
  }

  if (year !== undefined) {
    queryParams.year = year.toString();
  }

  if (tipeDokumen !== undefined) {
    queryParams.tipeDokumen = tipeDokumen.toString();
  }

  if (status !== undefined) {
    queryParams.status = status.toString();
  }

  const urlSearchParams = new URLSearchParams(queryParams);

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/Semar/template?${urlSearchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return {
      data: result.data,
      totalCount: result.totalCount,
    };
  } catch (error) {
    console.error("Error fetching template data:", error);
    return {
      data: [],
      totalCount: 0,
    };
  }
};

export const fetchSemarTypes = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/Common/semar-type`
  );
  return await response.json();
};

export const downloadTemplateFile = async (semarTemplateCode: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Semar/download-template/${semarTemplateCode}`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return await response.blob();
};

export const deleteSemarTemplate = async (semarTemplateCode: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Semar/template/${semarTemplateCode}`;
  try {
    const response = await fetch(url, {
      method: "DELETE", // Specify the method
    });
    if (!response.ok) {
      throw new Error("Failed to delete template");
    }
    console.log("Template deleted successfully");
    // Handle success response
  } catch (error) {
    console.error("Error deleting template:", error);
    // Handle errors
  }
};

export const updateSemarTemplateData = async (
  semarTemplateCode: string,
  semarTemplateData: any
) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Semar/template/${semarTemplateCode}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(semarTemplateData),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating semar template data:", error);
    throw error;
  }
};

export const fetchSemarTemplateDataById = async (semarTemplateCode: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Semar/template/${semarTemplateCode}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch semar template data");
  }
  return await response.json();
};

export const uploadSemarTemplateFile = async (
  semarTemplateCode: string,
  file: File
) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Semar/upload-template-document/${semarTemplateCode}`;
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
    console.error("Error uploading semar template file:", error);
    throw error;
  }
};

export const createSemarTemplateData = async (templateData: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Semar/template`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templateData),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating semar template data:", error);
    throw error;
  }
};

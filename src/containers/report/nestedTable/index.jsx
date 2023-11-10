import React, { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@mui/material";
import { countryCodeConversion } from "../../../utils/helpers/report";

const NestedTable = ({ tableTitle, tableData, columns, isCountry = true }) => {
  const elRef = useRef();
  let tabulator = null;

  useEffect(() => {
    // Instantiate Tabulator when the component is mounted
    tabulator = new Tabulator(elRef.current, {
      data: JSON.parse(
        JSON.stringify(
          isCountry ? countryCodeConversion(tableData) : tableData,
        ),
      ),
      dataTree: true,
      dataTreeStartExpanded: true,
      // columns: JSON.parse(JSON.stringify(columns)),
      columns: columns,
    });

    // Cleanup Tabulator instance when the component unmounts
    return () => {
      if (tabulator) {
        tabulator.destroy();
        tabulator = null;
      }
    };
  }, [tableData,tableTitle, columns]); // eslint-disable-line

  const handleExportPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define the columns for the PDF table
    const columns = tabulator.getColumnDefinitions().map((col) => ({
      title: col.title,
      dataKey: col.field,
    }));

    // Get the table data
    const tableData = tabulator.getData();

    // AutoTable configuration
    const autoTableConfig = {
      startY: 10,
      head: [columns.map((col) => col.title)],
      body: tableData.map((row) => columns.map((col) => row[col.dataKey])),
      theme: "striped",
      styles: { cellPadding: 1.5, fontSize: 10 },
      margin: { top: 15 },
      didDrawPage: (data) => {
        // Add page numbers
        doc.text("Page " + data.pageNumber, 190, 285);
      },
    };

    // Add the table to the PDF
    doc.autoTable(autoTableConfig);

    // Save the PDF
    doc.save("table.pdf");
  };

  return (
    <div>
      <h4>
        {tableTitle} &nbsp;
        <Button variant="contained" color="success" onClick={handleExportPDF}>
          Export the table as PDF
        </Button>
      </h4>

      <div ref={elRef} style={{ width: "fit-content" }}></div>
    </div>
  );
};

export default NestedTable;

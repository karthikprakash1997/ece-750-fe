// import React, { useEffect, useRef } from "react";
// // import { TabulatorFull as Tabulator } from "tabulator-tables";
// import "tabulator-tables/dist/css/tabulator.min.css";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { Button } from "@mui/material";
// import { ReactTabulator } from "react-tabulator";
// // import MaterialTable from "material-table";
// // import { SaveAlt, ArrowDownward } from "@material-ui/icons";
// import { AiOutlineDownload, AiOutlineArrowDown } from 'react-icons/ai';

// const NestedTable = ({ tableTitle, tableData, columns }) => {
//   const elRef = useRef();

//   const tableIcons = {
//     //   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//     //   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//     //   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//     //   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//     //   DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//     //   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//     //   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//     //   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//     //   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//     //   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//     //   PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
//     //   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//     //   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//     SortArrow: React.forwardRef((props, ref) => (
//       <AiOutlineArrowDown {...props} ref={ref} />
//     )),
//     Export: React.forwardRef((props, ref) => <AiOutlineDownload {...props}  ref={ref} />),
//     // ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//     // ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
//   };

//   const handleExportPDF = () => {
//     if(elRef.current){
//       // elRef.current.current.download("pdf", "data.pdf");
//       console.log(elRef.current,elRef.current.current )
//     }
//   };

//   return (
//     <div>
//       <h4>
//         {tableTitle} &nbsp;
//         <Button variant="contained" color="success" onClick={handleExportPDF}>
//           Export the table as PDF
//         </Button>
//       </h4>
//       <ReactTabulator
//         onRef={(ref) => (elRef.current = ref)}
//         options={{
//           downloadDataFormatter: (data) => data,
//           downloadEncoder: (fileContents, blob) => blob,
//           // layout: "fitData",
//         }}
//         columns={columns}
//         data={JSON.parse(JSON.stringify(tableData))}
//         layout={"fitDataTable"}
//         id={tableTitle}
//       />
//       {/* <MaterialTable
//       style={{
//         // width:'800px',
//         fontSize:'medium'
//       }}
//         icons={tableIcons}
//         title={tableTitle}
//         columns={columns}
//         data={JSON.parse(JSON.stringify(tableData))}
//         paging={false}
//         options={{
//           exportButton: true,
//           search: false,
//           paging: false,
//           fixedColumns:true,
//         }}
//       /> */}
//     </div>
//   );
// };

// export default NestedTable;

import React, { useEffect, useRef } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';
import { countryCodeConversion } from '../../../utils/helpers/report';

const NestedTable = ({ tableTitle, tableData, columns }) => {
  const elRef = useRef();
  let tabulator = null;
  console.log(JSON.parse(JSON.stringify(countryCodeConversion(tableData))), "tableData")

  useEffect(() => {
    // Instantiate Tabulator when the component is mounted
    tabulator = new Tabulator(elRef.current, {
      data: JSON.parse(JSON.stringify(countryCodeConversion(tableData))),
      dataTree: true,
      dataTreeStartExpanded: true,
      columns: JSON.parse(JSON.stringify(columns)),
    });

    // Cleanup Tabulator instance when the component unmounts
    return () => {
      if (tabulator) {
        tabulator.destroy();
        tabulator = null;
      }
    };
  }, [tableData, columns]);

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
      theme: 'striped',
      styles: { cellPadding: 1.5, fontSize: 10 },
      margin: { top: 15 },
      didDrawPage: (data) => {
        // Add page numbers
        doc.text('Page ' + data.pageNumber, 190, 285);
      },
    };

    // Add the table to the PDF
    doc.autoTable(autoTableConfig);

    // Save the PDF
    doc.save('table.pdf');
  };

  return (
    <div>
      <h4>
        {tableTitle} &nbsp;
        <Button variant="contained" color="success" onClick={handleExportPDF}>
          Export the table as PDF
        </Button>
      </h4>

      <div ref={elRef} style={{ width: 'fit-content' }}></div>
    </div>
  );
}

export default NestedTable;


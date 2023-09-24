import React, { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

function NestedTable({tableData, columns}) {
  const elRef = useRef(null);
  let tabulator = null;

  useEffect(() => {
    // Instantiate Tabulator when the component is mounted
    tabulator = new Tabulator(elRef.current, {
      data: tableData,
      dataTree: true,
      dataTreeStartExpanded: true,
      columns: columns,
    });

    // Cleanup Tabulator instance when the component unmounts
    return () => {
      if (tabulator) {
        tabulator.destroy();
        tabulator = null;
      }
    };
  }, []);

  return <div ref={elRef} style={{width: 'fit-content'}}></div>;
}

export default NestedTable;

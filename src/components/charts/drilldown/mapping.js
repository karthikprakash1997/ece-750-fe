export const drillDownMap = (data) => {
  // Function to recursively map data to Highcharts format
  function getSubData(obj, parentKey) {
    const result = [];
    for (const key in obj) {
      if (key !== "total") {
        if (Object.keys(obj[key]).length > 1) {
          result.push({
            name: key,
            y: obj[key]["total"],
            drilldown: parentKey === "" ? key : `${parentKey}.${key}`,
          });
        } else {
          result.push({
            name: key,
            y: obj[key]["total"],
          });
        }
      }
    }
    return result;
  }

  function mapToHighchartsData(data, id = "") {
    const result = [];

    for (const key in data) {
      const item = data[key];
      const name = key;
      const drilldownId = id === "" ? key : `${id}.${key}`;

      if (typeof item === "object" && Object.keys(item).length > 0) {
        const subData = getSubData(item);
        if (subData.length > 0) {
          result.push({
            name,
            id: drilldownId,
            data: getSubData(item, drilldownId),
          });
        }

        for (const i in item) {
          result.push(...mapToHighchartsData(item, drilldownId));
        }
      }
    }

    return result;
  }

  // Mapping the data to Highcharts format
  const highchartsData = mapToHighchartsData(data);
  const ddChartsData = getSubData(data, "");

  return [ddChartsData, highchartsData];
};

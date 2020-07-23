import React, {useEffect, useMemo, useState} from "react";
import Select from "../common/forms/Select";
import Sidebar from "../common/layout/Sidebar";
import Page from "../common/layout/Page";
import Content from "../common/layout/Content";
import { includes, groupBy, sumBy, map } from "lodash";
import styles from "./Dashboard.module.css";
import api from "../../api";
import { Chart } from "./Chart";

const Dashboard = () => {
  const [dataSourceOptions, setDataSourceOptions] = useState([]);
  const [campaignOptions, setCampaignOptions] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sourceData, setSourceData] = useState({});

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      setLoading(true);
      const data = await api.getData();
      if (!isCancelled) {
        setCampaignOptions([...new Set(data.map(dataEntry => dataEntry.Campaign))]);
        setDataSourceOptions([...new Set(data.map(dataEntry => dataEntry.Datasource))]);
        setSourceData(groupBy(data, "Date"));
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      isCancelled = true;
    }
  }, []);

  const aggregatedData = useMemo(() => map(sourceData, (dataEntriesForDate, Date) => {
    const filteredDataEntriesForDate = dataEntriesForDate.filter(dataEntry => {
      const isDataEntryFromSelectedCampaign = !campaigns.length || includes(campaigns, dataEntry.Campaign);
      const isDataEntryFromSelectedDataSource = !dataSources.length || includes(dataSources, dataEntry.Datasource);
      return isDataEntryFromSelectedCampaign && isDataEntryFromSelectedDataSource;
    });
    return {
      Date,
      Clicks: sumBy(filteredDataEntriesForDate, dataEntry => Number(dataEntry.Clicks)),
      Impressions: sumBy(filteredDataEntriesForDate, dataEntry => Number(dataEntry.Impressions)),
    }
  }), [dataSources, campaigns, sourceData]);

  return loading ? "loading..." : (
    <Page>
      <Sidebar>
        <h2>Filter dimension values</h2>
        Use Ctrl/Shift to select multiple options.
        <Select
          label="Data Source"
          options={dataSourceOptions}
          value={dataSources}
          onChange={setDataSources}
        />
        <Select
          label="Campaign"
          options={campaignOptions}
          value={campaigns}
          onChange={setCampaigns}
        />
      </Sidebar>
      <Content>
        <h1>
          Data Sources: {dataSources.map(dataSource => `"${dataSource}"`).join(", ") || "All"} and
          Campaigns: {campaigns.map(campaigns => `"${campaigns}"`).join(", ") || "All"}
        </h1>
        <div className={styles.chart}>
          <Chart data={aggregatedData} />
        </div>
      </Content>
    </Page>
  );
};

export default Dashboard;
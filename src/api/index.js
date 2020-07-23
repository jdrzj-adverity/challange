import parse from "csv-parse/lib/sync";
import { DATA_SOURCE_URL } from "../constants";

export const getData = async () => {
  const fetchedData = await fetch(DATA_SOURCE_URL).then(response => response.text());
  const parsedData = parse(fetchedData, { columns: true });
  return parsedData;
};

export default {
  getData
};
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, CircularProgress, Card, CardContent, Typography, List, ListItem, ListItemButton } from "@mui/material";
import FinancialTable from "./FinancialTable";

const App = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [financialData, setFinancialData] = useState(null);

  useEffect(() => {
    if (query.length > 1) {
      fetch("/tickers.json") // Adjust path if needed
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((company) =>
            company.title.toLowerCase().includes(query.toLowerCase())
          );
          setSuggestions(filtered);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelectCompany = (company) => {
    setQuery(company.title);
    setSuggestions([]);
    fetchCompanyData(company.cik_str);
  };

  const fetchCompanyData = async (cik) => {
    setLoading(true);
    try {
      const response = await axios.post("https://intrinsic-value-backend.vercel.app/api/select_company", {
        cik_str: cik,
      });
      setFinancialData(response.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <p class="text-gray-500 dark:text-gray-400 mt-1 text-md mb-4">
        The Facts displayed below are fetched from <a href="https://www.sec.gov/search-filings/edgar-application-programming-interfaces"><u>SEC.gov API</u></a>
      </p>
      <p class="text-gray-500 dark:text-gray-400 mt-1 text-md mb-4">
      This website provides financial data since the year 2010. This has the required data to calculate FCF.
      </p>
      <p class="text-gray-500 dark:text-gray-400 mt-1 text-md mb-4">
      Please submit your suggestions or what other financial data you would like to see in the following <a href="https://www.facebook.com/share/g/16CngqDa4d/"><u>FaceBook group</u></a>
      </p>
      <h1 className="text-3xl font-bold mb-4">Company Financials</h1>
      <div className="w-full max-w-md">
        <TextField
          fullWidth
          label="Search for a company"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {suggestions.length > 0 && (
          <List className="bg-white shadow-md rounded-md mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((company) => (
              <ListItem key={company.cik_str} disablePadding>
                <ListItemButton onClick={() => handleSelectCompany(company)}>
                  {company.title}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </div>
      {loading && <CircularProgress className="mt-4" />}
      {financialData && (
        <Card className="mt-6 w-full max-w-6xl p-4 shadow-lg">
          <CardContent>
            <Typography variant="h5" className="font-bold mb-2">
              Financial Data
            </Typography>
            <FinancialTable data={financialData} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default App;
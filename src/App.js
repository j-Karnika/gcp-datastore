
import React, { useState } from 'react';
import Results from './Results';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const token = process.env.REACT_APP_AUTH_TOKEN;

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const url = 'https://discoveryengine.googleapis.com/v1alpha/projects/700470856861/locations/global/collections/default_collection/dataStores/jk-data-store-new_1710913057488/servingConfigs/default_search:search';

      const body = JSON.stringify({
        query: query,
        pageSize: 10,
        queryExpansionSpec: {
          condition: 'AUTO',
        },
        spellCorrectionSpec: {
          mode: 'AUTO',
        },
        contentSearchSpec: {
          summarySpec: {
            summaryResultCount: 5,
            modelSpec: {
              version: 'stable',
            },
            ignoreAdversarialQuery: true,
            includeCitations: true,
          },
          snippetSpec: {
            maxSnippetCount: 1,
            returnSnippet: true,
          },
          extractiveContentSpec: {
            maxExtractiveAnswerCount: 1,
          },
        },
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        throw new Error('Error fetching results. Please try again.');
      }

      const data = await response.json();
      setResults(data);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1 className="heading">Google Cloud Datastore Search</h1>
      <div className="input-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter your query..."
        className="input"
      />
      <button onClick={handleSubmit} className="button">
        Send
      </button>
      </div>
      {error && <p className="error">{error}</p>}
      <Results documents={results.results} summary={results.summary}/>
    </div>
  );
}

export default App;

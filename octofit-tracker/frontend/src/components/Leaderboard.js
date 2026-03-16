import { useEffect, useState } from 'react';

const endpointName = 'leaderboard';

function getApiUrl() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${endpointName}/`;
  }

  if (typeof window !== 'undefined') {
    const { hostname } = window.location;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `http://localhost:8000/api/${endpointName}/`;
    }

    if (hostname.endsWith('.app.github.dev')) {
      const backendHost = hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev');
      return `https://${backendHost}/api/${endpointName}/`;
    }
  }

  return `http://localhost:8000/api/${endpointName}/`;
}

function getItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const endpointUrl = getApiUrl();

    async function fetchLeaderboard() {
      try {
        const response = await fetch(endpointUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        setEntries(getItems(payload));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <section className="data-panel">
      <div className="panel-heading d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="section-kicker">API Resource</p>
          <h2 className="h4 fw-bold">Leaderboard</h2>
        </div>
        <span className="item-count badge bg-info text-dark">{entries.length} loaded</span>
      </div>

      {loading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Hero</th>
                <th>Team</th>
                <th>Email</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.rank}</td>
                  <td>{entry.hero_alias}</td>
                  <td>{entry.team_name}</td>
                  <td>{entry.user_email}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
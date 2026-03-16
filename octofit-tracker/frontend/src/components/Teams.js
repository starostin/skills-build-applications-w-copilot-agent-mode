import { useEffect, useState } from 'react';

const endpointName = 'teams';

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

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const endpointUrl = getApiUrl();

    async function fetchTeams() {
      try {
        const response = await fetch(endpointUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        setTeams(getItems(payload));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, []);

  return (
    <section className="data-panel">
      <div className="panel-heading d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="section-kicker">API Resource</p>
          <h2 className="h4 fw-bold">Teams</h2>
        </div>
        <span className="item-count badge bg-info text-dark">{teams.length} loaded</span>
      </div>

      {loading && <div className="alert alert-info">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-12 col-md-6 col-xl-4" key={team.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <p className="section-kicker mb-1">{team.universe}</p>
                  <h3 className="card-title h5 fw-bold mb-2">{team.name}</h3>
                  <p className="mb-1"><strong>Captain:</strong> {team.captain_name}</p>
                  <p className="card-text text-muted">{team.motto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Teams;
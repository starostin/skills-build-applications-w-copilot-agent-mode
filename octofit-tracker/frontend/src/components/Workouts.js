import { useEffect, useState } from 'react';

const endpointName = 'workouts';

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

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const endpointUrl = getApiUrl();

    async function fetchWorkouts() {
      try {
        const response = await fetch(endpointUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        setWorkouts(getItems(payload));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <section className="data-panel">
      <div className="panel-heading d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="section-kicker">API Resource</p>
          <h2 className="h4 fw-bold">Workouts</h2>
        </div>
        <span className="item-count badge bg-info text-dark">{workouts.length} loaded</span>
      </div>

      {loading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-12 col-lg-6" key={workout.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="section-kicker mb-0">{workout.target_team}</p>
                    <span className="badge bg-warning text-dark">{workout.difficulty}</span>
                  </div>
                  <h3 className="card-title h5 fw-bold mb-2">{workout.title}</h3>
                  <p className="card-text mb-1">{workout.description}</p>
                  <div className="meta-grid d-flex gap-2">
                    <span className="badge bg-primary">{workout.duration_minutes} min</span>
                    <span className="badge bg-secondary">{workout.focus_area}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Workouts;
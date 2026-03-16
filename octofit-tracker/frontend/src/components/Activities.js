import { useEffect, useState } from 'react';

const endpointName = 'activities';

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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const endpointUrl = getApiUrl();

    async function fetchActivities() {
      try {
        const response = await fetch(endpointUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        setActivities(getItems(payload));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  return (
    <section className="data-panel">
      <div className="panel-heading d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="section-kicker">API Resource</p>
          <h2 className="h4 fw-bold">Activities</h2>
        </div>
        <span className="item-count badge bg-info text-dark">{activities.length} loaded</span>
      </div>

      {loading && <div className="alert alert-info">Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Team</th>
                <th>Activity</th>
                <th>Minutes</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.user_email}</td>
                  <td>{activity.team_name}</td>
                  <td>{activity.activity_type}</td>
                  <td>{activity.duration_minutes}</td>
                  <td>{activity.calories_burned}</td>
                  <td>{activity.workout_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;
import { useEffect, useState } from 'react';

const endpointName = 'users';

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

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const endpointUrl = getApiUrl();

    async function fetchUsers() {
      try {
        const response = await fetch(endpointUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        setUsers(getItems(payload));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <section className="data-panel">
      <div className="panel-heading d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="section-kicker">API Resource</p>
          <h2 className="h4 fw-bold">Users</h2>
        </div>
        <span className="item-count badge bg-info text-dark">{users.length} loaded</span>
      </div>

      {loading && <div className="alert alert-info">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Alias</th>
                <th>Favorite Team</th>
                <th>Weekly Goal</th>
                <th>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.hero_alias}</td>
                  <td>{user.favorite_team}</td>
                  <td>{user.weekly_goal}</td>
                  <td>{user.total_points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Users;
import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navigationItems = [
  { label: 'Users', path: '/users' },
  { label: 'Teams', path: '/teams' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
];

function App() {
  return (
    <div className="app-shell">
      <header className="hero-banner mb-4 d-flex align-items-center">
        <img src="/octofitapp-small.png" alt="OctoFit Logo" className="octofit-logo" />
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold mb-2">Track squads, workouts, and leaderboard momentum.</h1>
          <p className="hero-copy lead mb-0">
            The frontend now reads live data from the Django REST API and routes each data view through a single navigation bar.
          </p>
        </div>
      </header>

      <nav className="main-nav mb-4" aria-label="Primary">
        <a className="navbar-brand octofit-logo" href="/">
          <img src="/octofitapp-small.png" alt="OctoFit Logo" className="octofit-logo" />
        </a>
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? 'nav-link active fw-bold' : 'nav-link'
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className="content-shell container-fluid">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

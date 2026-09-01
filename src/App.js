import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/tokens.css';
import { FileText, CheckSquare, LayoutGrid, Sidebar as SidebarIcon } from 'lucide-react';

// Implementations
import NativeScrollbar from './implementations/NativeScrollbar';
import CustomScrollbar from './implementations/CustomScrollbar';
import SimpleBarScrollbar from './implementations/SimpleBarScrollbar';
import OverlayScrollbar from './implementations/OverlayScrollbar';

// Scenarios
import LongText from './scenarios/LongText';
import DataTable from './scenarios/DataTable';
import NestedScroll from './scenarios/NestedScroll';
import DynamicContent from './scenarios/DynamicContent';
import HorizontalOnly from './scenarios/HorizontalOnly';
import HorizontalCards from './scenarios/HorizontalCards';
import LargeCanvas from './scenarios/LargeCanvas';

// Components
import EvaluationMatrix from './components/EvaluationMatrix';

const implementations = {
  native: { name: 'Native CSS', component: NativeScrollbar },
  custom: { name: 'Custom (React)', component: CustomScrollbar },
  simplebar: { name: 'SimpleBar', component: SimpleBarScrollbar },
  overlay: { name: 'OverlayScrollbars', component: OverlayScrollbar }
};

const scenarios = {
  longText: { name: 'Long Text', component: LongText },
  dataTable: { name: 'Data Table', component: DataTable },
  horizontalOnly: { name: 'Horizontal Only', component: HorizontalOnly },
  horizontalCards: { name: 'Horizontal Cards', component: HorizontalCards },
  largeCanvas: { name: 'Large Canvas (2D)', component: LargeCanvas },
  nestedScroll: { name: 'Nested Scroll', component: NestedScroll },
  dynamic: { name: 'Dynamic Content', component: DynamicContent }
};

function App() {
  const [activeTab, setActiveTab] = useState('scenarios');
  const [activeScenario, setActiveScenario] = useState('longText');
  const [activeImpl, setActiveImpl] = useState('native');
  const [isGridMode, setIsGridMode] = useState(false);
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const renderScenario = () => {
    const ScenarioComponent = scenarios[activeScenario].component;
    
    if (isGridMode) {
      return (
        <div className="grid-mode-container">
          {Object.entries(implementations).map(([key, impl]) => (
            <div key={key} className="grid-cell">
              <div className="grid-cell-header">{impl.name}</div>
              <div className="grid-cell-content">
                <ScenarioComponent Wrapper={impl.component} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    const ImplComponent = implementations[activeImpl].component;
    return <ScenarioComponent Wrapper={ImplComponent} />;
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Scrollbar POC</h2>
          <button className="icon-btn" onClick={() => setSidebarOpen(false)}>
            <SidebarIcon size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-btn ${activeTab === 'scenarios' ? 'active' : ''}`}
            onClick={() => setActiveTab('scenarios')}
          >
            <FileText size={18} /> Test Scenarios
          </button>
          <button 
            className={`nav-btn ${activeTab === 'matrix' ? 'active' : ''}`}
            onClick={() => setActiveTab('matrix')}
          >
            <CheckSquare size={18} /> Evaluation Matrix
          </button>
        </nav>

        {activeTab === 'scenarios' && (
          <div className="sidebar-section">
            <h3>Scenarios</h3>
            <ul className="scenario-list">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <li key={key}>
                  <button 
                    className={`scenario-btn ${activeScenario === key ? 'active' : ''}`}
                    onClick={() => setActiveScenario(key)}
                  >
                    {scenario.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="sidebar-footer">
          <button className="theme-toggle" onClick={toggleTheme}>
             {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Header toolbar for scenarios */}
        <header className="main-header">
          {!sidebarOpen && (
            <button className="icon-btn" onClick={() => setSidebarOpen(true)}>
              <SidebarIcon size={20} />
            </button>
          )}
          
          {activeTab === 'scenarios' ? (
            <div className="toolbar">
              <div className="impl-selector">
                <label>Implementation:</label>
                <select 
                  value={activeImpl} 
                  onChange={(e) => setActiveImpl(e.target.value)}
                  disabled={isGridMode}
                >
                  {Object.entries(implementations).map(([key, impl]) => (
                    <option key={key} value={key}>{impl.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="view-toggle">
                <button 
                  className={`toggle-btn ${!isGridMode ? 'active' : ''}`}
                  onClick={() => setIsGridMode(false)}
                >
                  Single View
                </button>
                <button 
                  className={`toggle-btn ${isGridMode ? 'active' : ''}`}
                  onClick={() => setIsGridMode(true)}
                  title="View all 4 side-by-side"
                >
                  <LayoutGrid size={16} /> Grid View
                </button>
              </div>
            </div>
          ) : (
             <div className="toolbar-title">Evaluation Matrix</div>
          )}
        </header>

        {/* Content View */}
        <div className="content-area">
          {activeTab === 'scenarios' ? renderScenario() : <EvaluationMatrix />}
        </div>
      </main>

    </div>
  );
}

export default App;

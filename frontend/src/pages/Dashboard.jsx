import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';
import SessionForm from '../components/SessionForm';
import SessionList from '../components/SessionList';
import { getAllSessions, startSession, pauseSession, resumeSession, stopSession } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all sessions on component mount
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await getAllSessions();
      setSessions(response.data);
      
      // Check if any session is active (in_progress or paused)
      const active = response.data.find(
        s => s.status === 'in_progress' || s.status === 'paused'
      );
      setActiveSession(active || null);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching sessions:', err);
      setError('Failed to load sessions. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Handle new session creation
  const handleStartSession = async (formData) => {
    try {
      const response = await startSession(formData);
      
      // Update sessions list
      setSessions([response.data, ...sessions]);
      setActiveSession(response.data);
      
      // Show success message
      alert('✅ Session started successfully!');
      
      // Scroll to timer
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error starting session:', err);
      alert('❌ Failed to start session. Please try again.');
    }
  };

  // Handle timer actions (pause, resume, stop)
  const handleTimerAction = async (action) => {
    if (!activeSession) return;

    try {
      let response;
      
      switch (action) {
        case 'pause':
          response = await pauseSession(activeSession._id);
          alert('⏸️ Session paused!');
          break;
          
        case 'resume':
          response = await resumeSession(activeSession._id);
          alert('▶️ Session resumed!');
          break;
          
        case 'stop':
          response = await stopSession(activeSession._id);
          alert(`✅ Session completed! Total study time: ${response.data.totalDuration} minutes`);
          break;
          
        default:
          return;
      }
      
      // Refresh sessions list
      await fetchSessions();
      
    } catch (err) {
      console.error(`Error ${action}ing session:`, err);
      alert(`❌ Failed to ${action} session. Please try again.`);
    }
  };

  // Handle session card click - navigate to detail page
  const handleSessionClick = (sessionId) => {
    navigate(`/session/${sessionId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Loading sessions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchSessions}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Total Sessions */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Sessions</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {sessions.filter(s => s.status === 'completed').length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-3xl">📚</span>
              </div>
            </div>
          </div>

          {/* Total Study Time */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Study Time</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {sessions
                    .filter(s => s.status === 'completed')
                    .reduce((sum, s) => sum + s.totalDuration, 0)} mins
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <span className="text-3xl">⏱️</span>
              </div>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Now</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {activeSession ? '1' : '0'}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-3xl">
                  {activeSession ? '▶️' : '⏸️'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Active Timer Section */}
        {activeSession && (
          <div className="mb-8" id="active-timer">
            <Timer 
              session={activeSession} 
              onTimerAction={handleTimerAction}
            />
          </div>
        )}

        {/* New Session Form */}
        {!activeSession && (
          <div className="mb-8" id="session-form">
            <SessionForm onSubmit={handleStartSession} />
          </div>
        )}

        {/* All Sessions List */}
        <div id="all-sessions">
          <SessionList 
            sessions={sessions}
            onSessionClick={handleSessionClick}
          />
        </div>

        {/* Empty State */}
        {sessions.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Sessions Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start your first study session to track your progress!
            </p>
            <button
              onClick={() => {
                const form = document.getElementById('session-form');
                if (form) form.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all inline-flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Create First Session</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;



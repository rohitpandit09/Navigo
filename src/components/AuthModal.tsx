import React, { useState } from 'react';
import { useAuth, UserRole } from '../context/AuthContext';




interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (mode === "login") {
      await login(email, password);
    } else {
      await signup(selectedRole, name, email, password);
    }

    alert(mode === "login" ? "Login Successful!" : "Signup Successful!");
    onClose();
  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};



  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setSelectedRole('user');
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'modal-overlay--open' : ''}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h3>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>

        <div className="modal__body">
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <>
                <div className="role-selector">
                  <div
                    className={`role-option ${selectedRole === 'user' ? 'role-option--selected' : ''}`}
                    onClick={() => setSelectedRole('user')}
                  >
                    <div className="role-option__icon">🧳</div>
                    <div className="role-option__title">Traveler</div>
                    <div className="role-option__description">Explore monuments & book guides</div>
                  </div>
                  <div
                    className={`role-option ${selectedRole === 'expert' ? 'role-option--selected' : ''}`}
                    onClick={() => setSelectedRole('expert')}
                  >
                    <div className="role-option__icon">🎓</div>
                    <div className="role-option__title">Expert Guide</div>
                    <div className="role-option__description">Share your expertise & earn</div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {mode === 'login' && (
              <div className="form-group">
                <label className="form-label">Login as</label>
                <div className="role-selector">
                  <div
                    className={`role-option ${selectedRole === 'user' ? 'role-option--selected' : ''}`}
                    onClick={() => setSelectedRole('user')}
                  >
                    <div className="role-option__icon">🧳</div>
                    <div className="role-option__title">Traveler</div>
                  </div>
                  <div
                    className={`role-option ${selectedRole === 'expert' ? 'role-option--selected' : ''}`}
                    onClick={() => setSelectedRole('expert')}
                  >
                    <div className="role-option__icon">🎓</div>
                    <div className="role-option__title">Expert</div>
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn--primary" style={{ width: "100%" }} disabled={loading}>
               {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>

          </form>

          <div style={{ 
            textAlign: 'center', 
            marginTop: 'var(--spacing-lg)',
            color: 'var(--color-gray)'
          }}>
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => switchMode('signup')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => switchMode('login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

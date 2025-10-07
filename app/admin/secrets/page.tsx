'use client';

import { useState } from 'react';

interface SecretItem {
  key: string;
  updated_at?: string;
}

export default function SecretsManagementPage() {
  const [token, setToken] = useState('');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [secrets, setSecrets] = useState<SecretItem[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    setMessage('');
    setError('');

    if (!token.trim()) {
      setError('Token is required');
      return;
    }

    if (!key.trim() || !value.trim()) {
      setError('Key and value are required');
      return;
    }

    try {
      const response = await fetch('/api/secrets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to save secret');
        return;
      }

      setMessage('Secret saved successfully');
      setKey('');
      setValue('');
    } catch (err) {
      setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleReload = async () => {
    setMessage('');
    setError('');

    if (!token.trim()) {
      setError('Token is required');
      return;
    }

    try {
      const response = await fetch('/api/secrets', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to load secrets');
        return;
      }

      setSecrets(result.items || []);
      setMessage('Secrets loaded successfully');
    } catch (err) {
      setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Secrets Management</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Manage application secrets. Token is not stored (session-only).
      </p>

      {message && (
        <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px', color: '#155724' }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px', color: '#721c24' }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Admin Token:
        </label>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter admin token"
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Key:
        </label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="e.g., N8N_WEBHOOK_URL"
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Value:
        </label>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter secret value"
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <button
          onClick={handleSave}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Save
        </button>
        <button
          onClick={handleReload}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Reload
        </button>
      </div>

      <div>
        <h2>Stored Secrets</h2>
        {secrets.length === 0 ? (
          <p style={{ color: '#666' }}>No secrets loaded. Click "Reload" to fetch.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #dee2e6' }}>Key</th>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #dee2e6' }}>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {secrets.map((secret) => (
                <tr key={secret.key}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #dee2e6' }}>{secret.key}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid #dee2e6' }}>
                    {secret.updated_at ? new Date(secret.updated_at).toLocaleString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e7f3ff', border: '1px solid #b3d9ff', borderRadius: '4px' }}>
        <h3 style={{ marginTop: 0 }}>Usage Notes:</h3>
        <ul style={{ marginBottom: 0 }}>
          <li>Set <code>N8N_WEBHOOK_URL</code> here to enable webhook forwarding</li>
          <li>Expected <code>/api/lead</code> response: <code>{`{ ok: true, forwarded: true }`}</code></li>
          <li>All keys are normalized to UPPERCASE</li>
        </ul>
      </div>
    </div>
  );
}

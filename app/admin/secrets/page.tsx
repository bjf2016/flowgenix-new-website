'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Eye, EyeOff, Plus, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Secret {
  id: string;
  key: string;
  value?: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export default function SecretsManagementPage() {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [visibleValues, setVisibleValues] = useState<Set<string>>(new Set());

  const [newSecret, setNewSecret] = useState({
    key: '',
    value: '',
    description: '',
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const fetchSecrets = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${supabaseUrl}/functions/v1/secrets`, {
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch secrets');
      }

      const result = await response.json();
      setSecrets(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load secrets');
    } finally {
      setLoading(false);
    }
  };

  const fetchSecretValue = async (key: string) => {
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/secrets?key=${key}`, {
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch secret value');
      }

      const result = await response.json();
      return result.data?.value;
    } catch (err) {
      console.error('Error fetching secret value:', err);
      return null;
    }
  };

  const toggleValueVisibility = async (key: string) => {
    if (visibleValues.has(key)) {
      setVisibleValues(prev => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });

      setSecrets(prev => prev.map(s =>
        s.key === key ? { ...s, value: undefined } : s
      ));
    } else {
      const value = await fetchSecretValue(key);
      if (value) {
        setSecrets(prev => prev.map(s =>
          s.key === key ? { ...s, value } : s
        ));
        setVisibleValues(prev => new Set(prev).add(key));
      }
    }
  };

  const createSecret = async () => {
    try {
      setError('');
      setSuccess('');

      if (!newSecret.key || !newSecret.value) {
        setError('Key and value are required');
        return;
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/secrets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSecret),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to create secret');
      }

      setSuccess('Secret created successfully');
      setNewSecret({ key: '', value: '', description: '' });
      await fetchSecrets();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create secret');
    }
  };

  const deleteSecret = async (key: string) => {
    if (!confirm(`Are you sure you want to delete the secret "${key}"?`)) {
      return;
    }

    try {
      setError('');
      setSuccess('');

      const response = await fetch(`${supabaseUrl}/functions/v1/secrets?key=${key}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete secret');
      }

      setSuccess('Secret deleted successfully');
      await fetchSecrets();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete secret');
    }
  };

  useEffect(() => {
    fetchSecrets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Secrets Management</h1>
          <p className="text-gray-600">Manage your application secrets securely</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-500 bg-green-50 text-green-900">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Secret</CardTitle>
            <CardDescription>Create a new secret key-value pair</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="key">Key</Label>
                  <Input
                    id="key"
                    placeholder="SECRET_KEY"
                    value={newSecret.key}
                    onChange={(e) => setNewSecret({ ...newSecret, key: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    type="password"
                    placeholder="secret-value"
                    value={newSecret.value}
                    onChange={(e) => setNewSecret({ ...newSecret, value: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  placeholder="Description of what this secret is used for"
                  value={newSecret.description}
                  onChange={(e) => setNewSecret({ ...newSecret, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={createSecret}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Secret
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Existing Secrets</CardTitle>
                <CardDescription>View and manage your secrets</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={fetchSecrets}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading secrets...</div>
            ) : secrets.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No secrets found</div>
            ) : (
              <div className="space-y-4">
                {secrets.map((secret) => (
                  <div
                    key={secret.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-mono font-semibold text-sm">{secret.key}</h3>
                      </div>
                      {secret.description && (
                        <p className="text-sm text-gray-600 mb-2">{secret.description}</p>
                      )}
                      {visibleValues.has(secret.key) && secret.value && (
                        <div className="mt-2 p-2 bg-gray-100 rounded font-mono text-sm break-all">
                          {secret.value}
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Updated: {new Date(secret.updated_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleValueVisibility(secret.key)}
                      >
                        {visibleValues.has(secret.key) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteSecret(secret.key)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

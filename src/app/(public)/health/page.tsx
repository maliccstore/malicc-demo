'use client';

import { useHealth } from '@/features/health/hooks/useHealth';
import { Button } from '@/components/ui/Button';

export default function HealthPage() {
  const {
    status,
    loading,
    error,
    lastChecked,
    checkServerHealth,
    ping,
    clearError,
  } = useHealth();

  const handleRefresh = () => {
    clearError();
    checkServerHealth();
  };

  const handlePing = () => {
    ping();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Server Health Status
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Health Check</h2>
            <div className="flex space-x-3">
              <Button onClick={handleRefresh} disabled={loading}>
                {loading ? 'Checking...' : 'Refresh'}
              </Button>
              <Button onClick={handlePing}>Ping</Button>
            </div>
          </div>

          {lastChecked && (
            <p className="text-sm text-gray-600 mb-4">
              Last checked: {new Date(lastChecked).toLocaleString()}
            </p>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-400">⚠️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {status && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <h4 className="text-sm font-medium text-green-800">Status</h4>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {status.status}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="text-sm font-medium text-blue-800">Uptime</h4>
                <p className="text-lg text-blue-900 mt-1">
                  {Math.floor(status.uptime)} seconds
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 md:col-span-2">
                <h4 className="text-sm font-medium text-gray-800">Message</h4>
                <p className="text-gray-900 mt-1">{status.message}</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <h4 className="text-sm font-medium text-yellow-800">
                  Timestamp
                </h4>
                <p className="text-sm text-yellow-900 mt-1">
                  {new Date(status.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <h4 className="text-sm font-medium text-yellow-800">Ping</h4>
                <p className="text-sm text-yellow-900 mt-1">
                  {lastChecked || 'No ping response'}
                </p>
              </div>
            </div>
          )}

          {!status && !error && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No health data available. Click refresh to check.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">API Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Endpoint:</span>
              <p className="text-gray-600">/graphql</p>
            </div>
            <div>
              <span className="font-medium">Query:</span>
              <code className="bg-gray-100 p-1 rounded text-xs block mt-1">
                query HealthCheck &#123; healthCheck &#123; status timestamp
                uptime message database &#125; &#125;
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

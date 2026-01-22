import { useState, useEffect } from 'react';

interface Source {
  type: 'documentation' | 'github' | 'pdf';
  base_url?: string;
  repo?: string;
  pdf_path?: string;
  selectors?: {
    main_content: string;
    title: string;
    code_blocks: string;
  };
  [key: string]: any;
}

interface Config {
  name: string;
  description: string;
  // Unified format (v2.6.0)
  sources?: Source[];
  merge_mode?: string;
  metadata?: any;
  // Legacy format (backward compatibility)
  base_url?: string;
  selectors?: {
    main_content: string;
    title: string;
    code_blocks: string;
  };
  [key: string]: any;
}

// Helper to get base URL from config (supports both formats)
const getConfigBaseUrl = (config: Config): string => {
  if (config.sources && config.sources.length > 0) {
    const source = config.sources[0];
    return source.base_url || source.repo || source.pdf_path || 'N/A';
  }
  return config.base_url || 'N/A';
};

// Helper to get source type from config
const getSourceType = (config: Config): string => {
  if (config.sources && config.sources.length > 0) {
    return config.sources[0].type || 'documentation';
  }
  return 'documentation';
};

interface Submission {
  issueNumber: number;
  title: string;
  author: string;
  createdAt: string;
  url: string;
  config: Config | null;
  parseError: string | null;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Fetch submissions on mount
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/submissions');

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/admin';
          return;
        }
        throw new Error('Failed to fetch submissions');
      }

      const data = await response.json();
      setSubmissions(data.submissions);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submission: Submission) => {
    if (!submission.config) {
      alert('Cannot approve: Config is invalid');
      return;
    }

    if (!confirm(`Are you sure you want to approve "${submission.config.name}"?\n\nThis will commit the config to the repository and close the issue.`)) {
      return;
    }

    try {
      setProcessingId(submission.issueNumber);

      const response = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issueNumber: submission.issueNumber,
          config: submission.config,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to approve config');
      }

      const result = await response.json();
      alert(`✅ Config approved successfully!\n\nCommit: ${result.commitUrl}`);

      // Refresh submissions
      await fetchSubmissions();
    } catch (err) {
      alert(`❌ Error: ${(err as Error).message}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setRejectReason('');
    setRejectModalOpen(true);
  };

  const handleRejectConfirm = async () => {
    if (!selectedSubmission) return;

    try {
      setProcessingId(selectedSubmission.issueNumber);
      setRejectModalOpen(false);

      const response = await fetch('/api/admin/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issueNumber: selectedSubmission.issueNumber,
          reason: rejectReason || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reject config');
      }

      alert('✅ Config rejected and issue closed');

      // Refresh submissions
      await fetchSubmissions();
    } catch (err) {
      alert(`❌ Error: ${(err as Error).message}`);
    } finally {
      setProcessingId(null);
      setSelectedSubmission(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isNewSubmission = (dateString: string) => {
    const submissionDate = new Date(dateString);
    const now = new Date();
    const hoursDiff = (now.getTime() - submissionDate.getTime()) / (1000 * 60 * 60);
    return hoursDiff < 24; // New if created within last 24 hours
  };

  const getTimeAgo = (dateString: string) => {
    const submissionDate = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - submissionDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-brand-primary border-r-transparent mb-4"></div>
          <p className="text-dark-text-secondary">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
        <p className="text-red-400 font-semibold mb-2">Error loading submissions</p>
        <p className="text-sm text-dark-text-secondary mb-4">{error}</p>
        <button
          onClick={fetchSubmissions}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="bg-dark-surface border border-dark-border rounded-xl p-12 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">All caught up!</h2>
        <p className="text-dark-text-secondary mb-6">No pending config submissions to review</p>
        <button
          onClick={fetchSubmissions}
          className="px-6 py-2 bg-dark-bg hover:bg-dark-border text-dark-text-secondary hover:text-white rounded-lg transition-colors"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Pending Submissions Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 border border-brand-primary/50 rounded-lg">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping opacity-75 rounded-full bg-brand-primary"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-primary"></span>
            </div>
            <span className="text-lg font-bold text-brand-primary">
              {submissions.length}
            </span>
            <span className="text-sm text-dark-text-secondary">
              pending submission{submissions.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* New Submissions Indicator */}
          {submissions.filter(s => isNewSubmission(s.createdAt)).length > 0 && (
            <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm font-medium">
              ⚡ {submissions.filter(s => isNewSubmission(s.createdAt)).length} new (24h)
            </div>
          )}
        </div>
        <button
          onClick={fetchSubmissions}
          className="px-4 py-2 text-sm bg-dark-surface border border-dark-border hover:border-brand-primary text-dark-text-secondary hover:text-brand-primary rounded-lg transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Submissions Grid */}
      <div className="space-y-4">
        {submissions.map((submission) => {
          const isNew = isNewSubmission(submission.createdAt);
          return (
            <div
              key={submission.issueNumber}
              className={`bg-dark-surface border rounded-xl p-6 hover:border-brand-primary/50 transition-all ${
                isNew
                  ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/10'
                  : 'border-dark-border'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold">
                      {submission.config?.name || 'Unknown Config'}
                    </h3>
                    <span className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded">
                      #{submission.issueNumber}
                    </span>
                    {isNew && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded animate-pulse">
                        ⚡ NEW
                      </span>
                    )}
                  </div>
                <p className="text-dark-text-secondary text-sm mb-2">
                  {submission.config?.description || 'No description'}
                </p>
                <div className="flex items-center space-x-4 text-xs text-dark-text-secondary">
                  <span>👤 {submission.author}</span>
                  <span>📅 {formatDate(submission.createdAt)}</span>
                  <span className={`font-medium ${isNew ? 'text-yellow-400' : ''}`}>
                    ⏱️ {getTimeAgo(submission.createdAt)}
                  </span>
                  <a
                    href={submission.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                  >
                    View Issue →
                  </a>
                </div>
              </div>

              {/* Status Badge */}
              {submission.parseError ? (
                <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-medium rounded-full">
                  ❌ Invalid JSON
                </span>
              ) : (
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full">
                  ✅ Valid
                </span>
              )}
            </div>

            {/* Config Details */}
            {submission.config && (
              <div className="mb-4 p-4 bg-dark-bg rounded-lg border border-dark-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-dark-text-secondary">Source URL:</span>
                    <p className="font-mono text-xs text-brand-primary break-all">
                      {getConfigBaseUrl(submission.config)}
                    </p>
                  </div>
                  <div>
                    <span className="text-dark-text-secondary">Type:</span>
                    <p className="font-mono text-xs">
                      {getSourceType(submission.config)}
                      {submission.config.sources && submission.config.sources.length > 1 &&
                        ` (+${submission.config.sources.length - 1} more)`
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submission.parseError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400 font-medium mb-1">Parse Error:</p>
                <p className="text-xs text-red-300 font-mono">{submission.parseError}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleApprove(submission)}
                disabled={!submission.config || processingId === submission.issueNumber}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                {processingId === submission.issueNumber ? (
                  <span className="flex items-center justify-center">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2"></span>
                    Processing...
                  </span>
                ) : (
                  '✓ Approve & Commit'
                )}
              </button>

              <button
                onClick={() => handleRejectClick(submission)}
                disabled={processingId === submission.issueNumber}
                className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 disabled:bg-gray-600/20 disabled:cursor-not-allowed text-red-400 disabled:text-gray-500 font-medium rounded-lg transition-all"
              >
                ✗ Reject
              </button>
            </div>
          </div>
        );
        })}
      </div>

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Reject Submission</h3>

            <p className="text-dark-text-secondary text-sm mb-4">
              Provide a reason for rejecting this config (optional):
            </p>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g., Invalid selectors, duplicate config, security concerns..."
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent mb-4 resize-none"
              rows={4}
            />

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="flex-1 px-4 py-2 bg-dark-bg hover:bg-dark-border text-dark-text-secondary hover:text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
              >
                Reject & Close Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

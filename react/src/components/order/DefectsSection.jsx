import React from 'react';
import t from '../../setup/i18n.js';

export default function DefectsSection({
  productId,
  issues = [],
  selected = {},
  onToggle,
  error = null,
}) {
  const handleToggle = (issueId) => {
    onToggle && onToggle(productId, issueId);
  };

  return (
    <div>
      <div className="defects-header">
        <h4 className="defects-title">{t('secondStep.otherErrorsAndDefects')}</h4>
      </div>
      <div className={error ? 'defects-wrapper error' : 'defects-wrapper'}>
        <div className="defects-list">
          {issues.map((issue) => (
            <div key={issue.id} className="defect-item">
              <input
                id={`issue-${productId}-${issue.id}`}
                type="checkbox"
                checked={!!selected[issue.id]}
                onChange={() => handleToggle(issue.id)}
              />
              <label htmlFor={`issue-${productId}-${issue.id}`} className="defect-label">
                {issue.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      {error && <p className="defect-error">{error}</p>}
    </div>
  );
}

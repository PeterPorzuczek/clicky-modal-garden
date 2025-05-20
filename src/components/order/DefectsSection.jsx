import React from 'react';

export default function DefectsSection({
  productId,
  issues = [],
  selected = {},
  onToggle,
  error = null,
}) {
  return (
    <div>
      <div className="flex items-center mb-2">
        <h4 className="font-medium">Andra fel och defekter</h4>
      </div>
      <div className={error ? 'border border-red-500 rounded-md p-2' : ''}>
        <div className="flex flex-col space-y-2">
          {issues.map((issue) => (
            <div key={issue.id} className="flex items-center space-x-2 py-1 pl-2 pr-3">
              <input
                id={`issue-${productId}-${issue.id}`}
                type="checkbox"
                checked={!!selected[issue.id]}
                onChange={() => onToggle && onToggle(productId, issue.id)}
              />
              <label htmlFor={`issue-${productId}-${issue.id}`} className="flex-1">
                {issue.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

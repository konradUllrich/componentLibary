import React from 'react';
import { EmptyState, Button } from '@mp-ku/mp-components';

const paths: Record<string, React.ReactNode> = {
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  chart: <><path d="M4 20V4" /><path d="M4 20h16" /><path d="M8 16v-4M12 16V8M16 16v-6" /></>,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 16.5v.5" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  comment: <path d="M4 5h16v11H9l-5 4z" />,
};

const Icon = ({ name, size = 48 }: { name: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths[name]}
  </svg>
);

export const Default = () => (
  <div style={{ width: 420 }}>
    <EmptyState
      title="No projects yet"
      description="Create your first project to start organizing tasks with your team."
      icon={<Icon name="folder" />}
      action={<Button>New project</Button>}
    />
  </div>
);

export const Variants = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 260px)', gap: 12 }}>
    <EmptyState size="sm" variant="search" icon={<Icon name="search" size={32} />} title="No results found" description="Try a different search term." />
    <EmptyState size="sm" variant="no-data" icon={<Icon name="chart" size={32} />} title="No data available" description="Reports appear once data is collected." />
    <EmptyState size="sm" variant="error" icon={<Icon name="alert" size={32} />} title="Something went wrong" description="We could not load your invoices." />
    <EmptyState size="sm" variant="no-access" icon={<Icon name="lock" size={32} />} title="Access restricted" description="Ask an admin for permission." />
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 220px)', gap: 12, alignItems: 'start' }}>
    <EmptyState size="sm" icon={<Icon name="comment" size={32} />} title="No comments" description="Be the first to comment." />
    <EmptyState size="md" icon={<Icon name="comment" size={48} />} title="No comments" description="Be the first to comment." />
    <EmptyState size="lg" icon={<Icon name="comment" size={64} />} title="No comments" description="Be the first to comment." />
  </div>
);

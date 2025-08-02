import React from 'react';

interface PageContentProps {
  title: string;
}

export function PageContent({ title }: PageContentProps) {
  return (
    <div style={{ marginTop: '16px', color: '#374151' }}>
      Content for {title}
    </div>
  );
} 
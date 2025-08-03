import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  hasNext, 
  hasPrev, 
  onPageChange 
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '24px',
    }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        style={{
          padding: '8px 12px',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          background: hasPrev ? 'var(--background)' : 'var(--muted)',
          color: hasPrev ? 'var(--foreground)' : 'var(--muted-foreground)',
          cursor: hasPrev ? 'pointer' : 'not-allowed',
          fontSize: '14px',
        }}
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span style={{
              padding: '8px 12px',
              color: 'var(--muted-foreground)',
            }}>
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              style={{
                padding: '8px 12px',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                background: currentPage === page ? 'var(--primary)' : 'var(--background)',
                color: currentPage === page ? 'var(--primary-foreground)' : 'var(--foreground)',
                cursor: 'pointer',
                fontSize: '14px',
                minWidth: '40px',
              }}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        style={{
          padding: '8px 12px',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          background: hasNext ? 'var(--background)' : 'var(--muted)',
          color: hasNext ? 'var(--foreground)' : 'var(--muted-foreground)',
          cursor: hasNext ? 'pointer' : 'not-allowed',
          fontSize: '14px',
        }}
      >
        Next
      </button>
    </div>
  );
} 
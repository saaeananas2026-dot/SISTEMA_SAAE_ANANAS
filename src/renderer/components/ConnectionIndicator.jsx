import React from 'react';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.8125rem',
    fontWeight: 500,
  },
  dot: (online) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: online ? '#2ECC71' : '#F39C12',
    boxShadow: online ? '0 0 8px rgba(46,204,113,0.5)' : '0 0 8px rgba(243,156,18,0.4)',
    animation: online ? 'pulse 2s ease-in-out infinite' : 'none',
    flexShrink: 0,
  }),
  label: (online) => ({
    color: online ? '#2ECC71' : '#F39C12',
    letterSpacing: '0.02em',
  }),
};

function ConnectionIndicator({ status }) {
  const isOnline = status?.online ?? false;
  const label = status?.label ?? (isOnline ? 'Online' : 'Offline');

  return (
    <div style={styles.container} title={isOnline ? 'Conectado à internet' : 'Sem conexão com a internet'}>
      <span style={styles.dot(isOnline)}></span>
      <span style={styles.label(isOnline)}>{label}</span>
    </div>
  );
}

export default ConnectionIndicator;

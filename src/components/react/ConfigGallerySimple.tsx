import type { Config } from '../../utils/types';

interface ConfigGallerySimpleProps {
  initialConfigs: Config[];
}

export default function ConfigGallerySimple({ initialConfigs }: ConfigGallerySimpleProps) {
  if (!initialConfigs || !Array.isArray(initialConfigs)) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: Invalid configs data</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', padding: '48px 0', color: '#e8e8ee' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px' }}>
          Simple Config Gallery ({initialConfigs.length} configs)
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {initialConfigs.map((config) => (
            <div
              key={config.config_file}
              style={{
                border: '1px solid #1f1f29',
                backgroundColor: '#13131a',
                padding: '24px',
                borderRadius: '8px'
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                {config.name}
              </h3>
              <p style={{ color: '#a0a0b0', fontSize: '14px', marginBottom: '16px' }}>
                {config.description}
              </p>
              <div style={{ fontSize: '12px', color: '#a0a0b0' }}>
                <div>Type: {config.type}</div>
                <div>Category: {config.category}</div>
                <div>Pages: {config.max_pages || 'N/A'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

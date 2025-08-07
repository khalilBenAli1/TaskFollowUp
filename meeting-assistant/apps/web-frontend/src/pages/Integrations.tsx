import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Item {
  code: string;
  name: string;
  icon: string;
}

const sources: Item[] = [
  { code: 'google_meet', name: 'Google Meet', icon: '/icons/google_meet.png' },
  { code: 'microsoft_teams', name: 'Microsoft Teams', icon: '/icons/microsoft_teams.png' },
  { code: 'ringcentral', name: 'RingCentral', icon: '/icons/ringcentral.png' },
];

const destinations: Item[] = [
  { code: 'jira', name: 'Jira Cloud', icon: '/icons/jira.png' },
  { code: 'planner', name: 'Microsoft Planner', icon: '/icons/planner.png' },
  { code: 'trello', name: 'Trello', icon: '/icons/trello.png' },
];

export default function Integrations() {
  const [active, setActive] = useState<Item | null>(null);
  const [schema, setSchema] = useState<any>(null);
  const [displayName, setDisplayName] = useState('');
  const [config, setConfig] = useState('');
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  const openConfig = async (item: Item) => {
    try {
      const res = await fetch(`/integrations/${item.code}/schema`);
      const data = await res.json();
      setSchema(data);
      setActive(item);
    } catch (err) {
      console.error(err);
    }
  };

  const save = async () => {
    if (!active) return;
    try {
      await fetch('/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          integrationCode: active.code,
          displayName,
          config: JSON.parse(config || '{}'),
        }),
      });
      setConnected((c) => ({ ...c, [active.code]: true }));
      setActive(null);
      setDisplayName('');
      setConfig('');
    } catch (err) {
      console.error(err);
    }
  };

  const renderGrid = (items: Item[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.code} className="text-center p-4">
          <CardContent>
            <img src={item.icon} alt={item.name} className="h-12 mx-auto mb-2" />
            <div className="font-semibold mb-2">{item.name}</div>
            {connected[item.code] && <span className="text-green-600">Connected</span>}
            <button
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
              onClick={() => openConfig(item)}
            >
              Configure
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl mb-4">Sources</h2>
        {renderGrid(sources)}
      </div>
      <div>
        <h2 className="text-xl mb-4">Destinations</h2>
        {renderGrid(destinations)}
      </div>

      {active && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-4 rounded w-80">
            <h3 className="font-bold mb-2">Configure {active.name}</h3>
            <p className="text-sm text-gray-600 mb-2">Schema: {JSON.stringify(schema)}</p>
            <input
              className="border p-1 w-full mb-2"
              placeholder="Display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <textarea
              className="border p-1 w-full mb-2"
              placeholder="Config JSON"
              value={config}
              onChange={(e) => setConfig(e.target.value)}
            />
            <div className="text-right space-x-2">
              <button onClick={() => setActive(null)}>Cancel</button>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={save}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Settings, Zap, Layout, Wand2, Droplet, ChevronDown, ChevronUp } from 'lucide-react';

const TABS = [
  { id: 'screen', name: 'Screen', icon: Settings },
  { id: 'actions', name: 'Actions', icon: Zap },
  { id: 'layout', name: 'Layout', icon: Layout },
  { id: 'effects', name: 'Effects', icon: Wand2 },
];

const Toggle = ({ label, enabled, setEnabled }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-700">{label}</span>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-primary-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

const ColorInput = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-700">{label}</span>
    <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-1">
      <div className="w-5 h-5 rounded" style={{ backgroundColor: value }}></div>
      <span className="text-sm text-gray-600">{value}</span>
    </div>
  </div>
);

const SliderInput = ({ label, value, onChange }) => (
  <div>
    <div className="flex items-center justify-between mb-1">
      <span className="text-sm text-gray-700">{label}</span>
      <span className="text-sm text-gray-600">{value}%</span>
    </div>
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={e => onChange(parseInt(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
  </div>
);

const BuilderInspector = () => {
  const [activeTab, setActiveTab] = useState('screen');
  const [overlay, setOverlay] = useState(false);
  const [opacity, setOpacity] = useState(50);
  const [screenCaption, setScreenCaption] = useState(false);
  const [popup, setPopup] = useState(false);

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Properties</h3>
        <div className="flex items-center space-x-1">
          <button className="p-1.5 rounded-md hover:bg-gray-100"><ChevronUp className="h-4 w-4" /></button>
          <button className="p-1.5 rounded-md hover:bg-gray-100"><ChevronDown className="h-4 w-4" /></button>
        </div>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="flex p-1 space-x-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-100 text-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === 'screen' && (
          <>
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase">Overlay</h4>
              <Toggle label="Apply overlay" enabled={overlay} setEnabled={setOverlay} />
              <ColorInput label="Overlay color" value="rgb(16, 28, 30)" onChange={() => {}} />
              <SliderInput label="Opacity" value={opacity} onChange={setOpacity} />
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase">Screen Caption</h4>
              <Toggle label="Add screen caption" enabled={screenCaption} setEnabled={setScreenCaption} />
              <ColorInput label="Background color" value="rgba(40, 49, 58, 0.5)" onChange={() => {}} />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Position</span>
                <button className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm">
                  <span>Bottom</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase">Popup</h4>
              <Toggle label="Open in pop-up window" enabled={popup} setEnabled={setPopup} />
            </div>
          </>
        )}
        {activeTab !== 'screen' && (
          <div className="text-center py-16 text-gray-500">
            <p>Properties for {activeTab} will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderInspector;

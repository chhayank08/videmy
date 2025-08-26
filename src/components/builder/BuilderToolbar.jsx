import React from 'react';
import { 
  ArrowLeft, 
  Eye, 
  Save, 
  Sparkles, 
  ChevronDown, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Undo, 
  Redo 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BuilderToolbar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between text-sm z-10">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <Link 
          to="/dashboard/websites" 
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          title="Back to Dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <nav className="hidden md:flex items-center space-x-1">
          {['Page', 'Edit', 'Design', 'Site', 'Add', 'Help'].map(item => (
            <button key={item} className="px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100">{item}</button>
          ))}
        </nav>
        <button className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200">
          <Sparkles className="h-4 w-4" />
          <span>AI Assistant</span>
          <span className="text-xs bg-purple-600 text-white px-1.5 py-0.5 rounded-full">Upgrade</span>
        </button>
      </div>

      {/* Middle section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 p-1 bg-gray-100 rounded-md">
            <button className="p-1.5 rounded-md hover:bg-gray-200"><Undo className="h-4 w-4" /></button>
            <button className="p-1.5 rounded-md hover:bg-gray-200"><Redo className="h-4 w-4" /></button>
        </div>
        <button className="hidden md:flex items-center space-x-1 px-2 py-1.5 rounded-md hover:bg-gray-100">
          <span>edu / Home</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        <div className="flex items-center space-x-1 p-1 bg-gray-100 rounded-md">
          <button className="p-1.5 rounded bg-white shadow-sm text-primary-600"><Monitor className="h-4 w-4" /></button>
          <button className="p-1.5 rounded text-gray-500 hover:bg-white"><Tablet className="h-4 w-4" /></button>
          <button className="p-1.5 rounded text-gray-500 hover:bg-white"><Smartphone className="h-4 w-4" /></button>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Eye className="h-4 w-4" />
          <span className="hidden md:inline">Preview</span>
        </button>
        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
          Save
        </button>
      </div>
    </div>
  );
};

export default BuilderToolbar;

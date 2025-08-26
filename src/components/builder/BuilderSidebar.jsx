import React, { useState } from 'react';
import { FileText, Filter, MessageCircle, BookOpen, Plus, Search, ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilder } from '../../contexts/BuilderContext';

const TABS = [
  { id: 'pages', name: 'Pages', icon: FileText },
  { id: 'funnels', name: 'Funnels', icon: Filter },
  { id: 'popups', name: 'Popups', icon: MessageCircle },
  { id: 'blog', name: 'Blog', icon: BookOpen },
];

const pageGroups = [
  { name: 'All', count: 16, pages: [] },
  { name: 'Affiliates', count: 2, pages: ['Affiliate Login', 'Affiliate Signup'] },
  { name: 'Course', count: 1, pages: ['Course Player'] },
  { name: 'External pages', count: 2, pages: ['Home', 'About Us'] },
  { name: 'Policies', count: 3, pages: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
  { name: 'System pages', count: 8, pages: ['404 Not Found', 'Login', 'Signup'] },
];

const AccordionItem = ({ name, count, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between text-left p-2 rounded-md hover:bg-gray-100">
        <span className="text-sm font-medium text-gray-800">{name}</span>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">{count}</span>
          {isOpen ? <ChevronDown className="h-4 w-4 text-gray-500" /> : <ChevronRight className="h-4 w-4 text-gray-500" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 mt-1"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BuilderSidebar = () => {
  const [activeTab, setActiveTab] = useState('pages');
  const { isSidebarCollapsed, toggleSidebar } = useBuilder();

  return (
    <motion.div
      animate={{ width: isSidebarCollapsed ? '80px' : '320px' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="bg-white border-r border-gray-200 flex flex-col shrink-0"
    >
      <div className="border-b border-gray-200">
        <nav className={`flex p-1 space-x-1 ${isSidebarCollapsed ? 'flex-col space-y-1 space-x-0' : ''}`}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              title={isSidebarCollapsed ? tab.name : ''}
              className={`flex-1 flex items-center justify-center space-x-2 px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-100 text-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              } ${isSidebarCollapsed ? 'h-16' : ''}`}
            >
              <tab.icon className="h-5 w-5" />
              {!isSidebarCollapsed && <span>{tab.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {!isSidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Pages</h3>
              <button className="p-1.5 rounded-md hover:bg-gray-100">
                <Plus className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a page"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            
            <div>
              {pageGroups.map(group => (
                <AccordionItem key={group.name} name={group.name} count={group.count}>
                  <div className="py-2 space-y-1">
                    {group.pages.length > 0 ? group.pages.map(page => (
                      <a href="#" key={page} className="block p-2 text-sm text-gray-600 rounded-md hover:bg-primary-50 hover:text-primary-700">
                        {page}
                      </a>
                    )) : (
                      <p className="p-2 text-sm text-gray-400">No pages in this group.</p>
                    )}
                  </div>
                </AccordionItem>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-2 border-t border-gray-200 flex items-center justify-center mt-auto">
        <button 
          onClick={toggleSidebar} 
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          className="w-full flex items-center justify-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          {isSidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </button>
      </div>
    </motion.div>
  );
};

export default BuilderSidebar;

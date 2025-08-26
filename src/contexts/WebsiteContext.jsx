import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const WebsiteContext = createContext();

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
};

const initialSites = [
    {
      id: '1',
      name: 'My Course Site',
      url: 'mycourse.example.com',
      status: 'published',
      lastEdited: '2025-01-15',
      template: 'Modern Course'
    },
    {
      id: '2',
      name: 'Creative Workshop',
      url: 'workshop.example.com',
      status: 'draft',
      lastEdited: '2025-01-14',
      template: 'Creative Studio'
    }
];

export const WebsiteProvider = ({ children }) => {
  const [sites, setSites] = useState(() => {
    try {
      const savedSites = localStorage.getItem('courseBuilderSites');
      if (savedSites) {
        return JSON.parse(savedSites);
      }
    } catch (error) {
      console.error('Error reading sites from localStorage:', error);
    }
    return initialSites;
  });

  useEffect(() => {
    try {
      localStorage.setItem('courseBuilderSites', JSON.stringify(sites));
    } catch (error) {
      console.error('Error saving sites to localStorage:', error);
    }
  }, [sites]);

  const addSite = (siteName, template) => {
    const newSite = {
      id: uuidv4(),
      name: siteName,
      url: `${siteName.toLowerCase().replace(/\s+/g, '-')}.example.com`,
      status: 'draft',
      lastEdited: new Date().toISOString().split('T')[0],
      template: template.name,
      templatePath: template.path,
      templateId: template.id,
    };
    setSites(prevSites => [newSite, ...prevSites]);
    return newSite;
  };

  const deleteSite = (id) => {
    setSites(prevSites => prevSites.filter(site => site.id !== id));
  };

  const value = {
    sites,
    addSite,
    deleteSite,
  };

  return (
    <WebsiteContext.Provider value={value}>
      {children}
    </WebsiteContext.Provider>
  );
};

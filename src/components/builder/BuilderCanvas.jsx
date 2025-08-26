import React, { useState, useEffect, useRef } from 'react';
import { useBuilder } from '../../contexts/BuilderContext';
import { useWebsite } from '../../contexts/WebsiteContext';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

const BuilderCanvas = () => {
  const { pageData, setSelectedElement, selectedElement, siteId } = useBuilder();
  const { sites } = useWebsite();
  const [loading, setLoading] = useState(true);
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!siteId || editor) return;

    const initEditor = async () => {
      const site = sites.find(s => s.id === siteId);
      if (site && site.templatePath && editorRef.current) {
        try {
          const response = await fetch(`${site.templatePath}index.html`);
          if (response.ok) {
            const content = await response.text();
            
            const grapesEditor = grapesjs.init({
              container: editorRef.current,
              height: '100vh',
              width: 'auto',
              storageManager: false,
              canvas: {
                styles: [
                  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css',
                  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css',
                  `${site.templatePath}css/bootstrap.min.css`,
                  `${site.templatePath}css/style.css`
                ],
                scripts: [
                  'https://code.jquery.com/jquery-3.4.1.min.js',
                  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js',
                  `${site.templatePath}js/main.js`
                ]
              }
            });
            
            const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
            const bodyContent = bodyMatch ? bodyMatch[1] : content;
            
            const processedContent = bodyContent
              .replace(/src="(?!https?:\/\/)/g, `src="${site.templatePath}`)
              .replace(/href="(?!https?:\/\/)/g, `href="${site.templatePath}`)
              .replace(/url\("(?!https?:\/\/)/g, `url("${site.templatePath}`)
              .replace(/url\('(?!https?:\/\/)/g, `url('${site.templatePath}`);
            
            grapesEditor.setComponents(processedContent);
            setEditor(grapesEditor);
          }
        } catch (error) {
          console.error('Error loading template:', error);
        }
      }
      setLoading(false);
    };

    initEditor();
  }, [siteId, sites, editor]);

  const handleSelectElement = (e) => {
    e.stopPropagation(); // Prevent background click from firing
    setSelectedElement({
      id: 'hero-section-1',
      type: 'Hero Section',
      settings: {
        overlay: true,
        opacity: 50,
        caption: false,
        popup: false,
      }
    });
  };

  const handleDeselect = () => {
    setSelectedElement(null);
  };

  return (
    <div className="flex-1 bg-secondary-100 overflow-auto p-8" onClick={handleDeselect}>
      <div 
        className={`max-w-full mx-auto bg-white shadow-lg transition-all duration-300 ${selectedElement ? 'ring-2 ring-primary-500 ring-offset-4 ring-offset-secondary-100' : ''}`} 
        style={{ aspectRatio: '16 / 9' }}
      >
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div ref={editorRef} className="w-full h-full" />
        )}
          <div 
            className="h-full w-full flex relative bg-gray-800 text-white overflow-hidden cursor-pointer"
            onClick={handleSelectElement}
          >
            <img 
              src="https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=1920&h=1080&fit=crop" 
              alt="Creative Studio Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 w-full flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">creative studio</h1>
                <p className="mt-4 text-lg text-gray-300">Click to select this section and edit its properties.</p>
                <button className="mt-8 px-8 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors">
                  Get started
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {pageData.elements.map((element) => (
              <div key={element.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-600">
                  {element.type} Block - {element.id}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderCanvas;

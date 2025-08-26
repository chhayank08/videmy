// Template service to load and manage templates from the templates folder
export const templateService = {
  // Get all available templates
  getTemplates: () => {
    return [
      {
        id: 'elearning-1',
        name: 'eLearning Pro',
        category: 'Education',
        thumbnail: '/templates/elearning-1.0.0/elearning-html-template.jpg',
        path: '/templates/elearning-1.0.0/',
        indexFile: 'index.html',
        description: 'Professional eLearning template with modern design'
      },
      {
        id: 'elearning-2',
        name: 'eLearning Classic',
        category: 'Education',
        thumbnail: '/templates/elearning-html-template/elearning-html-template.jpg',
        path: '/templates/elearning-html-template/',
        indexFile: 'index.html',
        description: 'Classic eLearning template with clean layout'
      },
      {
        id: 'creative-studio',
        name: 'Creative Studio',
        category: 'Creative',
        thumbnail: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=300&h=200&fit=crop',
        path: '/templates/new design 2/',
        indexFile: 'index.html',
        description: 'Modern creative studio template'
      }
    ];
  },

  // Load template content
  loadTemplate: async (templateId) => {
    const templates = templateService.getTemplates();
    const template = templates.find(t => t.id === templateId);
    
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    try {
      const response = await fetch(`${template.path}${template.indexFile}`);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${response.statusText}`);
      }
      const content = await response.text();
      return { template, content };
    } catch (error) {
      console.error('Error loading template:', error);
      throw error;
    }
  }
};
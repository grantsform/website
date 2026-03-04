import Sigma from "https://esm.sh/sigma@3";
import Graph from "https://esm.sh/graphology";
import { bindWebGLLayer, createContoursProgram } from "https://esm.sh/@sigma/layer-webgl";

const data = {
  nodes: [
    { key: 'center', attributes: { label: 'What Inspires Me', x: 0, y: 0, size: 20, color: '#2196f3', description: 'Core interests and passions that drive my work and exploration.', links: [] } },
    { key: 'lisp-machines', attributes: { label: 'Lisp-Machines', x: 1, y: 0, size: 15, color: '#ff9800', description: 'Historical computing systems based on Lisp, emphasizing symbolic computation.', links: [{text: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Lisp_machine'}] } },
    { key: 'spatial-computing', attributes: { label: 'Spatial Computing', x: 0, y: 1, size: 15, color: '#ff9800', description: 'Programming paradigms that leverage spatial relationships and visual metaphors.', links: [{text: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Spatial_computing'}] } },
    { key: 'distributed-computing', attributes: { label: 'Distributed Computing', x: -1, y: 0, size: 15, color: '#ff9800', description: 'Systems and algorithms for distributed processing and computation.', links: [{text: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Distributed_computing'}] } },
    { key: 'agentic-ai', attributes: { label: 'Agentic / AI', x: -1, y: -1, size: 15, color: '#ff9800', description: 'Autonomous agents and artificial intelligence systems.', links: [{text: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Intelligent_agent'}] } },
    { key: 'smalltalk', attributes: { label: 'Smalltalk', x: 0.5, y: -0.5, size: 15, color: '#ff9800', description: 'Pioneering object-oriented programming language and environment.', links: [{text: 'Official Site', url: 'https://www.smalltalk.org/'}] } },
    { key: 'the-cloud', attributes: { label: 'The Cloud', x: -0.5, y: 0.5, size: 15, color: '#ff9800', description: 'Cloud computing, web technologies, and distributed web applications.', links: [{text: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Cloud_computing'}] } },
    { key: 'boxer', attributes: { label: 'Boxer Sunrise', x: -0.5, y: 1.5, size: 12, color: '#4caf50', description: 'Modern revival of Boxer, a spatial programming system for education.', links: [{text: 'Project Site', url: 'https://boxer-project.github.io/'}] } },
    { key: 'mezzano', attributes: { label: 'Mezzano OS', x: 1.5, y: 0.5, size: 12, color: '#4caf50', description: 'Common Lisp operating system with advanced features like SMP support.', links: [{text: 'GitHub', url: 'https://github.com/froggey/Mezzano'}] } },
    { key: 'medley-os', attributes: { label: 'Medley OS', x: 1.5, y: -0.5, size: 12, color: '#4caf50', description: 'Xerox Medley, a Lisp-based operating system and development environment.', links: [{text: 'Interlisp.org', url: 'https://interlisp.org/'}] } },
    { key: 'pharo', attributes: { label: 'Pharo', x: 0.5, y: -1.5, size: 12, color: '#4caf50', description: 'Clean, innovative Smalltalk-inspired language and environment.', links: [{text: 'Pharo.org', url: 'https://pharo.org/'}] } },
    { key: 'opencobalt', attributes: { label: 'OpenCobalt', x: -0.5, y: -1.5, size: 12, color: '#4caf50', description: 'Open-source spatial programming environment for collaborative 3D worlds. <a href="https://en.wikipedia.org/wiki/Open_Cobalt" target="_blank" style="color: #64b5f6;">Wikipedia</a>', links: [{text: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Open_Cobalt'}] } },
    { key: 'netfarm', attributes: { label: 'Netfarm', x: -1.5, y: 0.5, size: 12, color: '#4caf50', description: 'Distributed computing framework for Common Lisp.', links: [{text: 'GitLab', url: 'https://gitlab.common-lisp.net/theemacsshibe/netfarm'}] } },
    { key: 'clog', attributes: { label: 'CLOG', x: -1.0, y: 1.0, size: 12, color: '#4caf50', description: 'Common Lisp Omnificent GUI - web-based GUI framework.', links: [{text: 'GitHub', url: 'https://github.com/rabbibotton/clog'}] } },
    { key: 'llama', attributes: { label: 'Llama', x: -1.5, y: -1.5, size: 12, color: '#4caf50', description: 'Large Language Model for natural language processing and generation.', links: [{text: 'Meta AI', url: 'https://ai.meta.com/llama/'}] } }
  ],
  edges: [
    { key: 'e0', source: 'center', target: 'lisp-machines' },
    { key: 'e1', source: 'center', target: 'spatial-computing' },
    { key: 'e2', source: 'center', target: 'distributed-computing' },
    { key: 'e3', source: 'center', target: 'agentic-ai' },
    { key: 'e4', source: 'center', target: 'smalltalk' },
    { key: 'e5', source: 'center', target: 'the-cloud' },
    { key: 'e6', source: 'spatial-computing', target: 'boxer' },
    { key: 'e7', source: 'lisp-machines', target: 'mezzano' },
    { key: 'e13', source: 'lisp-machines', target: 'medley-os' },
    { key: 'e8', source: 'smalltalk', target: 'pharo' },
    { key: 'e9', source: 'smalltalk', target: 'opencobalt' },
    { key: 'e10', source: 'distributed-computing', target: 'netfarm' },
    { key: 'e11', source: 'the-cloud', target: 'clog' },
    { key: 'e12', source: 'agentic-ai', target: 'llama' }
  ]
};

const graph = new Graph();
data.nodes.forEach(node => graph.addNode(node.key, node.attributes));
data.edges.forEach(edge => graph.addEdge(edge.source, edge.target));

// Determine colors based on categories instead of random communities
const categoryColors = {
  'center': '#2196f3',
  'lisp-machines': '#ff5722',  // Red-Orange
  'spatial-computing': '#4caf50',  // Green
  'distributed-computing': '#e91e63',  // Magenta
  'agentic-ai': '#9c27b0',  // Purple
  'smalltalk': '#ff9800',  // Orange
  'the-cloud': '#00bcd4',  // Cyan
  'boxer': '#4caf50',  // Same as spatial-computing
  'mezzano': '#ff5722',  // Same as lisp-machines
  'medley-os': '#ff5722',  // Same as lisp-machines
  'pharo': '#ff9800',  // Same as smalltalk
  'opencobalt': '#ff9800',  // Same as smalltalk
  'netfarm': '#e91e63',  // Same as distributed-computing (Magenta)
  'clog': '#00bcd4',  // Same as the-cloud
  'llama': '#9c27b0'  // Same as agentic-ai
};

graph.forEachNode((node, attr) => {
  const color = categoryColors[node] || '#ff9800';
  graph.setNodeAttribute(node, "color", color);
});

// Create category-based communities for contours (only subnodes, not parent)
const categoryGroups = {
  'Lisp-Machines': ['mezzano', 'medley-os'],
  'Spatial Computing': ['boxer'],
  'Smalltalk': ['pharo', 'opencobalt'],
  'Distributed Computing': ['netfarm'],
  'The Cloud': ['clog'],
  'Agentic / AI': ['llama']
};

// Map category display names to their parent node keys
const categoryToNodeKey = {
  'Lisp-Machines': 'lisp-machines',
  'Spatial Computing': 'spatial-computing',
  'Smalltalk': 'smalltalk',
  'Distributed Computing': 'distributed-computing',
  'The Cloud': 'the-cloud',
  'Agentic / AI': 'agentic-ai'
};

const contourColors = {
  'Lisp-Machines': '#ff5722',
  'Spatial Computing': '#4caf50',
  'Smalltalk': '#ff9800',
  'Distributed Computing': '#e91e63',  // Magenta
  'The Cloud': '#00bcd4',
  'Agentic / AI': '#9c27b0'
};

// Container
const container = document.getElementById("mindmap-graph");

// Move sidebar below graph on mobile
function handleMobileLayout() {
  const sidebar = document.getElementById('right-sidebar');
  const wrapper = document.getElementById('mindmap-wrapper');
  const graphContainer = document.getElementById('mindmap-container');
  
  if (window.innerWidth <= 768) {
    // Move sidebar after the graph container (as a sibling)
    if (sidebar.parentElement === graphContainer) {
      wrapper.appendChild(sidebar);
    }
  } else {
    // Move sidebar back inside the graph container
    if (sidebar.parentElement === wrapper) {
      graphContainer.appendChild(sidebar);
    }
  }
}

// Run on load and resize
handleMobileLayout();
window.addEventListener('resize', handleMobileLayout);

// Instantiate sigma
const renderer = new Sigma(graph, container, {
  labelColor: { color: '#ffffff' },
  edgeColor: { color: '#64b5f6' },
  labelRenderedSizeThreshold: 5, // Hide labels when too small
  labelGrid: { cellSize: 100 } // Prevent label overlap
});

// Shift default view 20% left on desktop
const camera = renderer.getCamera();
if (window.innerWidth >= 768) {
  camera.setState({ x: camera.x + 0.5, y: camera.y, ratio: camera.ratio });
}

const initialCameraState = renderer.getCamera().getState();

// Add bottom-left control buttons
const controlsContainer = document.createElement("div");
controlsContainer.style.position = "absolute";
controlsContainer.style.left = "10px";
controlsContainer.style.bottom = "10px";
controlsContainer.style.display = "flex";
controlsContainer.style.flexDirection = "row";
controlsContainer.style.gap = "5px";
controlsContainer.style.zIndex = "1000";
container.appendChild(controlsContainer);

// Zoom In
const zoomInBtn = document.createElement("button");
zoomInBtn.textContent = "+";
zoomInBtn.title = "Zoom In";
zoomInBtn.style.background = "rgba(10, 22, 40, 0.8)";
zoomInBtn.style.border = "1px solid #64b5f6";
zoomInBtn.style.color = "#64b5f6";
zoomInBtn.style.padding = "5px 10px";
zoomInBtn.style.cursor = "pointer";
zoomInBtn.style.fontSize = "1em";
controlsContainer.appendChild(zoomInBtn);
zoomInBtn.addEventListener("click", () => {
  const camera = renderer.getCamera();
  camera.animate({ ratio: camera.ratio * 0.8 }, { duration: 200 });
});

// Zoom Out
const zoomOutBtn = document.createElement("button");
zoomOutBtn.textContent = "−";
zoomOutBtn.title = "Zoom Out";
zoomOutBtn.style.background = "rgba(10, 22, 40, 0.8)";
zoomOutBtn.style.border = "1px solid #64b5f6";
zoomOutBtn.style.color = "#64b5f6";
zoomOutBtn.style.padding = "5px 10px";
zoomOutBtn.style.cursor = "pointer";
zoomOutBtn.style.fontSize = "1em";
controlsContainer.appendChild(zoomOutBtn);
zoomOutBtn.addEventListener("click", () => {
  const camera = renderer.getCamera();
  camera.animate({ ratio: camera.ratio * 1.2 }, { duration: 200 });
});

// Fit
const fitBtn = document.createElement("button");
fitBtn.textContent = "⌖";
fitBtn.title = "Fit to Screen";
fitBtn.style.background = "rgba(10, 22, 40, 0.8)";
fitBtn.style.border = "1px solid #64b5f6";
fitBtn.style.color = "#64b5f6";
fitBtn.style.padding = "5px 10px";
fitBtn.style.cursor = "pointer";
fitBtn.style.fontSize = "1em";
controlsContainer.appendChild(fitBtn);
fitBtn.addEventListener("click", () => {
  const camera = renderer.getCamera();
  camera.animate(initialCameraState, { duration: 300 });
});

// Fullscreen
const fullscreenBtn = document.createElement("button");
fullscreenBtn.textContent = "⛶";
fullscreenBtn.title = "Fullscreen";
fullscreenBtn.style.background = "rgba(10, 22, 40, 0.8)";
fullscreenBtn.style.border = "1px solid #64b5f6";
fullscreenBtn.style.color = "#64b5f6";
fullscreenBtn.style.padding = "5px 10px";
fullscreenBtn.style.cursor = "pointer";
fullscreenBtn.style.fontSize = "1em";
controlsContainer.appendChild(fullscreenBtn);
fullscreenBtn.addEventListener("click", () => {
  const fsElement = document.getElementById("mindmap-container");
  if (!document.fullscreenElement) {
    fsElement.requestFullscreen().catch(err => console.log(err));
  } else {
    document.exitFullscreen();
  }
});

// Helper function to update active node display
function updateActiveNode(nodeKey) {
  const attrs = graph.getNodeAttributes(nodeKey);
  document.getElementById('active-desc-text').innerHTML = attrs.description || 'No description.';
  const linksDiv = document.getElementById('active-node-links');
  linksDiv.innerHTML = '';
  if (attrs.links) {
    attrs.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.text;
      a.target = '_blank';
      a.style.color = '#64b5f6';
      a.style.display = 'block';
      a.style.marginBottom = '0.5rem';
      linksDiv.appendChild(a);
    });
  }
}

// Basic interactions
renderer.on('clickNode', (event) => {
  updateActiveNode(event.node);
});

renderer.on('clickStage', () => {
  document.getElementById('active-desc-text').innerHTML = 'Click a node to select it and see its description.';
  document.getElementById('active-node-links').innerHTML = '';
});

// Search functionality (simplified)
const searchInput = document.getElementById('search-input');
const originalColors = {};
graph.forEachNode((node, attr) => originalColors[node] = attr.color);

function getDescendants(node) {
  const descendants = new Set();
  const stack = [node];
  while (stack.length > 0) {
    const current = stack.pop();
    graph.outNeighbors(current).forEach(neighbor => {
      if (!descendants.has(neighbor)) {
        descendants.add(neighbor);
        stack.push(neighbor);
      }
    });
  }
  return descendants;
}

searchInput.addEventListener('input', function(e) {
  const query = e.target.value.toLowerCase();
  const visibleNodes = new Set();
  if (query) {
    graph.forEachNode((node, attr) => {
      if (attr.label.toLowerCase().indexOf(query) !== -1) {
        visibleNodes.add(node);
        getDescendants(node).forEach(desc => visibleNodes.add(desc));
      }
    });
  }
  graph.forEachNode((node) => {
    graph.setNodeAttribute(node, 'hidden', query && !visibleNodes.has(node));
  });
  renderer.refresh();
});

// Clear search
document.getElementById('clear-search').addEventListener('click', function() {
  searchInput.value = '';
  graph.forEachNode((node) => graph.setNodeAttribute(node, 'hidden', false));
  renderer.refresh();
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  const camera = renderer.getCamera();
  const step = 0.1 / camera.ratio;
  switch(e.key) {
    case 'ArrowUp': camera.animate({ y: camera.y - step }, { duration: 100 }); break;
    case 'ArrowDown': camera.animate({ y: camera.y + step }, { duration: 100 }); break;
    case 'ArrowLeft': camera.animate({ x: camera.x - step }, { duration: 100 }); break;
    case 'ArrowRight': camera.animate({ x: camera.x + step }, { duration: 100 }); break;
    case '+':
    case '=': camera.animate({ ratio: camera.ratio * 0.8 }, { duration: 100 }); break;
    case '-': camera.animate({ ratio: camera.ratio * 1.2 }, { duration: 100 }); break;
    case 'f':
    case 'F': camera.animate({ x: 0, y: 0, ratio: 1 }, { duration: 300 }); break;
    case 'Escape': 
      searchInput.value = '';
      graph.forEachNode((node) => graph.setNodeAttribute(node, 'hidden', false));
      renderer.refresh();
      break;
  }
});

// Populate sidebar
const clustersUl = document.getElementById('clusters-ul');

// Make sidebar visible by default
document.getElementById('sidebar-content').style.display = 'block';

// Lighter versions of category colors for subnodes (mixed with white)
const subnodeColors = {
  'Lisp-Machines': '#ffab91',      // lighter red-orange
  'Spatial Computing': '#a5d6a7',  // lighter green
  'Smalltalk': '#ffcc80',          // lighter orange
  'Distributed Computing': '#f48fb1', // lighter magenta
  'The Cloud': '#80deea',          // lighter cyan
  'Agentic / AI': '#ce93d8'        // lighter purple
};

// Clusters by category color (showing only subnodes) - all items are clickable
for (const category in categoryGroups) {
  const li = document.createElement('li');
  li.style.marginBottom = '0.5rem';
  li.style.color = '#e0e0e0';
  
  // Create clickable category name (parent node)
  const parentKey = categoryToNodeKey[category];
  const categoryLink = document.createElement('a');
  categoryLink.href = '#';
  categoryLink.style.color = contourColors[category];
  categoryLink.style.fontWeight = 'bold';
  categoryLink.style.textDecoration = 'none';
  categoryLink.style.cursor = 'pointer';
  categoryLink.textContent = category;
  categoryLink.addEventListener('click', (e) => {
    e.preventDefault();
    updateActiveNode(parentKey);
  });
  categoryLink.addEventListener('mouseenter', () => { categoryLink.style.textDecoration = 'underline'; });
  categoryLink.addEventListener('mouseleave', () => { categoryLink.style.textDecoration = 'none'; });
  
  li.appendChild(categoryLink);
  li.appendChild(document.createTextNode(': '));
  
  // Create clickable subnode links with lighter category color
  const subnodes = categoryGroups[category];
  const subnodeColor = subnodeColors[category] || '#e0e0e0';
  subnodes.forEach((key, index) => {
    const node = data.nodes.find(n => n.key === key);
    const label = node ? node.attributes.label : key;
    
    const subnodeLink = document.createElement('a');
    subnodeLink.href = '#';
    subnodeLink.style.color = subnodeColor;
    subnodeLink.style.textDecoration = 'none';
    subnodeLink.style.cursor = 'pointer';
    subnodeLink.textContent = label;
    subnodeLink.addEventListener('click', (e) => {
      e.preventDefault();
      updateActiveNode(key);
    });
    subnodeLink.addEventListener('mouseenter', () => { subnodeLink.style.color = '#ffd54f'; subnodeLink.style.textDecoration = 'underline'; });
    subnodeLink.addEventListener('mouseleave', () => { subnodeLink.style.color = subnodeColor; subnodeLink.style.textDecoration = 'none'; });
    
    li.appendChild(subnodeLink);
    if (index < subnodes.length - 1) {
      li.appendChild(document.createTextNode(', '));
    }
  });
  
  clustersUl.appendChild(li);
}

// Toggle sidebars
function toggleSidebar(contentId, buttonId) {
  const content = document.getElementById(contentId);
  const button = document.getElementById(buttonId);
  if (content.style.display === 'none') {
    content.style.display = 'block';
    button.textContent = '−';
    if (contentId === 'sidebar-content') {
      document.getElementById('right-sidebar').style.height = '680px';
    }
  } else {
    content.style.display = 'none';
    button.textContent = '+';
    if (contentId === 'sidebar-content') {
      document.getElementById('right-sidebar').style.height = '60px';
    }
  }
}

document.getElementById('toggle-sidebar').addEventListener('click', function() {
  toggleSidebar('sidebar-content', 'toggle-sidebar');
});

document.getElementById('toggle-active').addEventListener('click', function() {
  toggleSidebar('active-node-content', 'toggle-active');
});

document.getElementById('toggle-clusters').addEventListener('click', function() {
  toggleSidebar('clusters-content', 'toggle-clusters');
});
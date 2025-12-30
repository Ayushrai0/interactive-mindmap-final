Interactive Mindmap Visualization
Project Overview

This project is a data-driven interactive mindmap UI designed to visualize hierarchical information in a clear and intuitive way. Users can explore complex structures through expandable nodes, contextual tooltips, and a detailed documentation panel. The focus of the project is usability, clean interactions, and scalable frontend architecture.

Key Features

Interactive mindmap with parent–child relationships

Expand and collapse nodes dynamically

Hover tooltips with quick node summaries

Strong visual highlighting of related nodes and edges

Side panel displaying detailed node documentation

Full documentation view for in-depth exploration

Inline editing of node titles and summaries

Zoom, pan, and fit-to-view controls

Export mindmap data as JSON

Tech Stack

React – UI development

TypeScript – Type safety and maintainability

Vite – Fast development environment

React Flow (@xyflow/react) – Graph and node rendering

Tailwind CSS – Styling and layout

shadcn/ui – UI components

Data-Driven Architecture

The entire mindmap is generated from structured data (JSON).
Updating the data file—such as adding nodes, changing text, or modifying hierarchy—automatically updates the visualization without changing UI logic. This ensures a clean separation between data and presentation, making the system scalable and easy to maintain.

Running the Project Locally
Prerequisites

Node.js (v18 or later)

npm

Steps
# Clone the repository
git clone https://github.com/Ayushrai0/knowledge-tree-interactive.git

# Navigate to the project directory
cd knowledge-tree-interactive

# Install dependencies
npm install

# Start the development server
npm run dev

Usage

Click a node to view its details in the side panel

Hover over a node to see a quick summary tooltip

Use toolbar controls to expand, collapse, zoom, or fit the view

Edit node content directly from the UI

Open Full Documentation for a detailed view of the selected node

Export the current mindmap data as JSON

Future Improvements

Add search functionality for large mindmaps

Support exporting the visualization as an image (PNG/SVG)

Improve keyboard accessibility

Add undo/redo support for edits

Optimize layout for very large datasets

Submission Summary

This project demonstrates a practical approach to building a scalable, data-driven frontend application. Emphasis was placed on clean UI interactions, maintainable structure, and clarity of visualization rather than hardcoded content or pixel-perfect design.

Interactive Mindmap Visualizer
Overview

This project is a data-driven interactive Mindmap UI built to visualize hierarchical information in a clear, intuitive, and scalable manner.
The application focuses on rich user interactions, clean UX, and a maintainable frontend architecture with a strict separation between data and presentation logic.

The implementation closely follows the functional behavior and interaction patterns specified in the assignment.

Objectives

Visualize hierarchical data as an interactive mindmap

Enable intuitive exploration through hover, click, and edit interactions

Ensure the entire UI is generated dynamically from structured data

Maintain clean, scalable, and readable frontend code

Key Features

Hierarchical mindmap visualization (parent → child relationships)

Expand and collapse nodes dynamically

Hover tooltips with contextual summaries

Visual highlighting of related nodes and edges

Side panel displaying detailed node documentation

Full documentation view for in-depth exploration

Inline editing of node titles and summaries

Zoom, pan, and fit-to-view controls

Export current mindmap data as JSON (bonus feature)

Demo Video

A short demo video demonstrating all required interactions and features:

👉 Demo Video:
https://drive.google.com/file/d/1NMwxuLJBDDEEadh0Z7bJCGfQX7XUBHw4/view?usp=drive_link

The video demonstrates:

Full mindmap rendering from structured data

Hover and click interactions

Expand and collapse behavior

Side panel updates based on selection

Inline editing of nodes

Zoom, pan, and fit-to-view controls

Tech Stack

React – Component-based UI development

TypeScript – Type safety and maintainability

Vite – Fast development and build tooling

React Flow (@xyflow/react) – Graph rendering and interaction handling

Tailwind CSS – Utility-first styling

shadcn/ui – Reusable and accessible UI components

Data-Driven Architecture (Core Requirement)

The entire mindmap is generated from structured JSON data.

No nodes or relationships are hardcoded in the UI

Rendering is completely schema-driven

Updating only the data file automatically updates:

Node titles and descriptions

Hierarchy and structure

Metadata shown in tooltips and documentation panel

Examples:

Adding a node in JSON → new node appears in the UI

Updating text in JSON → UI reflects changes automatically

Modifying hierarchy → layout updates without UI code changes

This ensures a clean separation between data and UI logic, making the system scalable and easy to maintain.

Architecture & Data Flow

JSON data is loaded at application startup

Data is parsed into a hierarchical tree structure

Layout logic computes node positions

Nodes and edges are rendered dynamically

User interactions update application state

Tooltips and side panel react to selected node state

This architecture allows easy extension without modifying core visualization logic.

Running the Project Locally
Prerequisites

Node.js (v18 or later)

npm

Steps
# Clone the repository
git clone https://github.com/Ayushrai0/interactive-mindmap-final.git

# Navigate to the project directory
cd interactive-mindmap-final

# Install dependencies
npm install

# Start the development server
npm run dev

Usage

Click a node to view detailed information in the side panel

Hover over a node to see a quick summary tooltip

Expand or collapse branches interactively

Use toolbar controls to zoom, pan, or fit the view

Edit node titles and summaries directly from the UI

Open the full documentation view for in-depth exploration

Export the current mindmap structure as JSON

Repository

GitHub Repository (Complete source code and documentation):
👉 https://github.com/Ayushrai0/interactive-mindmap-final

Future Improvements

Search functionality for large mindmaps

Export visualization as PNG/SVG

Improved keyboard accessibility

Undo/redo support for edits

Performance optimization for very large datasets

Submission Summary

This project demonstrates a practical and thoughtful approach to building a scalable, data-driven frontend application.
The focus is on interaction quality, maintainable architecture, and clarity of visualization rather than hardcoded content or pixel-perfect styling.

The solution fulfills all mandatory requirements and includes additional enhancements to improve usability and extensibility.

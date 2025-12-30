import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { MindmapCanvas } from '@/components/mindmap/MindmapCanvas';
import { SidePanel } from '@/components/mindmap/SidePanel';
import { Toolbar } from '@/components/mindmap/Toolbar';
import { Brain } from 'lucide-react';

const Index = () => {
  return (
    <ReactFlowProvider>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Mindmap Visualizer</h1>
              <p className="text-xs text-muted-foreground">Interactive knowledge architecture</p>
            </div>
          </div>
          <Toolbar />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex gap-4 p-4 overflow-hidden">
          {/* Canvas Area */}
          <div className="flex-1 relative">
            <MindmapCanvas />
          </div>

          {/* Side Panel */}
          <SidePanel />
        </main>

        {/* Footer */}
        <footer className="px-6 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Pan: Click + Drag</span>
            <span>Zoom: Scroll</span>
            <span>Select: Click node</span>
            <span>Expand/Collapse: Click selected node</span>
          </div>
          <div className="font-mono">
            Data-driven visualization
          </div>
        </footer>
      </div>
    </ReactFlowProvider>
  );
};

export default Index;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Layers, ChevronRight, Info, Lightbulb, Hash, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MindmapNode } from '@/data/mindmapData';
import { cn } from '@/lib/utils';

interface FullDocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: MindmapNode | null;
  breadcrumb: string[];
}

export function FullDocumentationModal({ 
  isOpen, 
  onClose, 
  node, 
  breadcrumb 
}: FullDocumentationModalProps) {
  if (!node) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                       md:w-[600px] md:max-h-[80vh] z-50 glass-panel rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-panel-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      Full Documentation
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Complete node information
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="shrink-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Breadcrumb */}
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-4 flex-wrap">
                {breadcrumb.map((part, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <ChevronRight className="w-3 h-3 mx-1 shrink-0" />}
                    <span className={cn(
                      "transition-colors",
                      i === breadcrumb.length - 1 
                        ? 'text-primary font-medium' 
                        : 'hover:text-foreground'
                    )}>
                      {part}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  Title
                </label>
                <h3 className="text-2xl font-bold text-foreground">
                  {node.title}
                </h3>
              </div>

              {/* Full Summary */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  Summary
                </label>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {node.summary}
                </p>
              </div>

              {/* Description */}
              {node.description && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" />
                    Description
                  </label>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {node.description}
                  </p>
                </div>
              )}

              {/* Notes */}
              {node.notes && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Notes
                  </label>
                  <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
                    <p className="text-sm text-muted-foreground italic">
                      {node.notes}
                    </p>
                  </div>
                </div>
              )}

              {/* Metadata Section */}
              <div className="pt-4 border-t border-border/50 space-y-4">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Metadata
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/20 rounded-lg p-4 border border-border/30">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Hash className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider">Node ID</span>
                    </div>
                    <p className="font-mono text-sm text-foreground">{node.id}</p>
                  </div>
                  <div className="bg-secondary/20 rounded-lg p-4 border border-border/30">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Users className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider">Children</span>
                    </div>
                    <p className="font-mono text-sm text-foreground">
                      {node.children?.length || 0} {node.children?.length === 1 ? 'node' : 'nodes'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-panel-border flex justify-end">
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

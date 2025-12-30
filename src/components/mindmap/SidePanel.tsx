import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Save, X, FileText, Lightbulb, Info, Layers, BookOpen, Check } from 'lucide-react';
import { useMindmapStore } from '@/store/mindmapStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FullDocumentationModal } from './FullDocumentationModal';

export function SidePanel() {
  const { selectedNodeId, findNode, updateNode, getNodeBreadcrumb } = useMindmapStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editSummary, setEditSummary] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [showFullDocs, setShowFullDocs] = useState(false);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  const selectedNode = selectedNodeId ? findNode(selectedNodeId) : null;
  const breadcrumb = selectedNodeId ? getNodeBreadcrumb(selectedNodeId) : ['Root'];

  useEffect(() => {
    if (selectedNode) {
      setEditTitle(selectedNode.title);
      setEditSummary(selectedNode.summary);
      setEditDescription(selectedNode.description || '');
      setEditNotes(selectedNode.notes || '');
    }
    setIsEditing(false);
  }, [selectedNodeId]);

  const handleSave = () => {
    if (selectedNodeId) {
      updateNode(selectedNodeId, {
        title: editTitle,
        summary: editSummary,
        description: editDescription || undefined,
        notes: editNotes || undefined,
      });
      setIsEditing(false);
      
      // Show saved feedback
      setShowSavedFeedback(true);
      setTimeout(() => setShowSavedFeedback(false), 2000);
      
      toast.success('Changes saved', { duration: 1500 });
    }
  };

  const handleCancel = () => {
    if (selectedNode) {
      setEditTitle(selectedNode.title);
      setEditSummary(selectedNode.summary);
      setEditDescription(selectedNode.description || '');
      setEditNotes(selectedNode.notes || '');
    }
    setIsEditing(false);
  };

  return (
    <>
      <div className="w-80 lg:w-96 h-full glass-panel rounded-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-panel-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/20">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">
                Node Documentation
              </h2>
              <p className="text-xs text-muted-foreground">
                Interactive component visualization
              </p>
            </div>
            
            {/* Saved feedback */}
            <AnimatePresence>
              {showSavedFeedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-medium"
                >
                  <Check className="w-3 h-3" />
                  Saved
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-4 flex-wrap">
            {breadcrumb.map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="mx-1">/</span>}
                <span className={i === breadcrumb.length - 1 ? 'text-foreground font-medium' : ''}>
                  {part}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6 space-y-6"
              >
                {/* Title Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Title
                    </label>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-1.5 rounded-lg hover:bg-secondary transition-colors group"
                        title="Edit node (or double-click on canvas)"
                      >
                        <Edit3 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </button>
                    )}
                  </div>
                  {isEditing ? (
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="bg-secondary/50 border-border"
                    />
                  ) : (
                    <h3 className="text-xl font-bold text-foreground">
                      {selectedNode.title}
                    </h3>
                  )}
                </div>

                {/* Summary Section */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" />
                    Summary
                  </label>
                  {isEditing ? (
                    <Textarea
                      value={editSummary}
                      onChange={(e) => setEditSummary(e.target.value)}
                      className="bg-secondary/50 border-border min-h-[80px]"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedNode.summary}
                    </p>
                  )}
                </div>

                {/* Description Section */}
                {(selectedNode.description || isEditing) && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Info className="w-3.5 h-3.5" />
                      Description
                    </label>
                    {isEditing ? (
                      <Textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Add a detailed description..."
                        className="bg-secondary/50 border-border min-h-[100px]"
                      />
                    ) : (
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {selectedNode.description}
                      </p>
                    )}
                  </div>
                )}

                {/* Notes Section */}
                {(selectedNode.notes || isEditing) && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Lightbulb className="w-3.5 h-3.5" />
                      Notes
                    </label>
                    {isEditing ? (
                      <Textarea
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Add notes..."
                        className="bg-secondary/50 border-border min-h-[80px]"
                      />
                    ) : (
                      <div className="bg-secondary/30 rounded-lg p-3 border border-border/50">
                        <p className="text-sm text-muted-foreground italic">
                          {selectedNode.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Metadata */}
                <div className="pt-4 border-t border-border/50">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Node ID</span>
                      <p className="font-mono text-foreground/80 mt-1">{selectedNode.id}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Children</span>
                      <p className="font-mono text-foreground/80 mt-1">
                        {selectedNode.children?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edit Actions */}
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2 pt-4"
                  >
                    <Button onClick={handleSave} className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}

                {/* Full Documentation Button */}
                {!isEditing && (
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowFullDocs(true)}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Full Documentation
                    </Button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 h-full flex flex-col items-center justify-center text-center"
              >
                <div className="p-4 rounded-full bg-secondary/50 mb-4">
                  <Layers className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No Node Selected
                </h3>
                <p className="text-sm text-muted-foreground max-w-[200px]">
                  Click on any node in the mindmap to view its details and documentation.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-panel-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Interactive Mindmap</span>
            <span className="font-mono">v1.0</span>
          </div>
        </div>
      </div>

      {/* Full Documentation Modal */}
      <FullDocumentationModal
        isOpen={showFullDocs}
        onClose={() => setShowFullDocs(false)}
        node={selectedNode}
        breadcrumb={breadcrumb}
      />
    </>
  );
}

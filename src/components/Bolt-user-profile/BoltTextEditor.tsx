import React, { useState, useCallback, useRef, KeyboardEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Save, Settings, X, Bold, Italic, List, AlignLeft, AlignCenter, AlignRight, Link, Image, Quote } from 'lucide-react';
import { BACKEND_URL } from '../../config';

// Config
// const BACKEND_URL = 'http://localhost:3000';

export default function BoltTextEditor() {
  const navigate = useNavigate();
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Main editor state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  
  // Publishing state
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [activeStyles, setActiveStyles] = useState<Set<string>>(new Set());

  // Image handling
  const handleImageUpload = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        resolve(result);
      };
      reader.readAsDataURL(file);
    });
  };

  // Tag management
  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      if (tag && !tags.includes(tag) && tags.length < 5) {
        setTags([...tags, tag]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Editor commands
  const handleCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateActiveStyles();
  }, []);

  const updateActiveStyles = useCallback(() => {
    const styles = new Set<string>();
    if (document.queryCommandState('bold')) styles.add('bold');
    if (document.queryCommandState('italic')) styles.add('italic');
    if (document.queryCommandState('insertUnorderedList')) styles.add('insertUnorderedList');
    setActiveStyles(styles);
  }, []);

  // Editor keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          handleCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          handleCommand('italic');
          break;
      }
    }
    updateActiveStyles();
  }, [handleCommand, updateActiveStyles]);

  // Save and publish
  const saveDraft = () => {
    setIsDraft(true);
    toast.success('Draft saved successfully');
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error('Please add a title to your story');
      return;
    }

    if (!content.trim()) {
      toast.error('Your story seems to be empty');
      return;
    }

    try {
      const imgUrl = coverImage ? await handleImageUpload(coverImage) : '';
      await sendData(imgUrl);
      setIsPublishModalOpen(false);
      toast.success('Story published successfully');
    } catch (error) {
      console.error('Error in publish:', error);
      toast.error('Failed to publish. Please try again.');
    }
  };

  const sendData = async (imgUrl: string) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
          url: imgUrl,
          tags
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      navigate(`/blog/${response.data.id}`);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 500:
            toast.error('Please try again / Internal Server Error');
            break;
          case 411:
            toast.error('Input Not Correct');
            break;
          default:
            toast.error('An unexpected error occurred');
        }
      }
    }
  };

  // Toolbar items configuration
  const tools = [
    { icon: Bold, command: 'bold', tooltip: 'Bold (Ctrl+B)' },
    { icon: Italic, command: 'italic', tooltip: 'Italic (Ctrl+I)' },
    { icon: List, command: 'insertUnorderedList', tooltip: 'Bullet List' },
    { icon: AlignLeft, command: 'justifyLeft', tooltip: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', tooltip: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', tooltip: 'Align Right' },
    { icon: Link, command: 'createLink', tooltip: 'Insert Link' },
    { icon: Image, command: 'insertImage', tooltip: 'Insert Image' },
    { icon: Quote, command: 'formatBlock', value: 'blockquote', tooltip: 'Quote' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                DevBlog
              </span>
              {isDraft && <span className="text-gray-400 text-sm">• Draft</span>}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={saveDraft}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                <Save size={18} />
                <span>Save Draft</span>
              </button>
              
              <button
                onClick={() => setIsPublishModalOpen(true)}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Publish
              </button>
              
              <button className="p-2 text-gray-300 hover:text-cyan-400 transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Editor */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Cover Image Upload */}
          <div className="relative group">
            <div className={`aspect-[21/9] rounded-2xl overflow-hidden ${!imagePreview ? 'bg-gray-800/40 backdrop-blur-lg border-2 border-dashed border-gray-700/50' : ''}`}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-medium text-gray-300 mb-2">Add a cover image</p>
                    <p className="text-sm text-gray-500">Recommended: 1920×1080px</p>
                  </div>
                </div>
              )}
            </div>
            <label className="absolute inset-0 cursor-pointer opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white">
                {imagePreview ? 'Change Cover' : 'Add Cover'}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setCoverImage(file);
                    handleImageUpload(file);
                  }
                }}
                accept="image/*"
              />
            </label>
          </div>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-4xl font-bold text-gray-100 placeholder-gray-500 border-none focus:outline-none focus:ring-0"
          />

          {/* Editor Toolbar */}
          <div className="flex items-center gap-1 p-2 bg-gray-800/40 backdrop-blur-lg rounded-t-xl border-b border-gray-700/50">
            {tools.map(({ icon: Icon, command, value, tooltip }) => (
              <button
                key={command}
                onClick={() => handleCommand(command, value)}
                className={`p-2 rounded hover:bg-gray-700/50 transition-colors ${
                  activeStyles.has(command) ? 'text-cyan-400 bg-gray-700/30' : 'text-gray-300'
                }`}
                title={tooltip}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>

          {/* Content Editor */}
          <div
            ref={editorRef}
            contentEditable
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            onKeyDown={handleKeyDown}
            className="min-h-[300px] p-6 bg-gray-800/40 backdrop-blur-lg rounded-b-xl outline-none prose prose-invert max-w-none prose-p:my-3 prose-headings:my-4"
            data-placeholder="Start writing your story..."
          />
        </div>
      </div>

      {/* Publish Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800/90 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-xl border border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-100">Ready to publish?</h2>
              <button onClick={() => setIsPublishModalOpen(false)} className="text-gray-400 hover:text-gray-200">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Tags Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Add tags to help readers find your story
                </label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 min-h-[2rem]">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-400 gap-1"
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-cyan-200 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Add up to 5 tags... (press Enter or comma to add)"
                    className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-xl px-4 py-2 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Comment Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Choose who can comment
                </label>
                <select className="w-full bg-gray-900/50 border border-gray-700 text-gray-100 rounded-xl px-4 py-2 focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent">
                  <option>Everyone</option>
                  <option>Only followers</option>
                  <option>No one</option>
                </select>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setIsPublishModalOpen(false)}
                  className="px-6 py-2 text-gray-300 hover:text-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublish}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Publish Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
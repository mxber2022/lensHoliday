import React, { useState, useRef } from 'react';
import { X, Upload, FileImage, FileVideo, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { Contest } from '../types';
import { supabase } from '../lib/supabase';
import { useAccount } from 'wagmi';

interface ProofSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  contest: Contest;
}

export function ProofSubmissionModal({ isOpen, onClose, contest }: ProofSubmissionModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { address } = useAccount();

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      const isValid = file.size <= 10 * 1024 * 1024; // 10MB limit
      if (!isValid) {
        setError('Files must be under 10MB');
      }
      return isValid;
    });
    setFiles(prev => [...prev, ...validFiles]);
    setError('');
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="w-5 h-5" />;
    if (type.startsWith('video/')) return <FileVideo className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      setError('Please connect your wallet first');
      return;
    }

    if (files.length === 0) {
      setError('Please upload at least one file');
      return;
    }

    try {
      setIsUploading(true);
      setError('');

      // Upload files to Supabase Storage
      const fileUrls = await Promise.all(
        files.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
          const filePath = `${contest.id}/${fileName}`;

          const { error: uploadError, data } = await supabase.storage
            .from('proofs')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) throw uploadError;
          
          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('proofs')
            .getPublicUrl(filePath);

          return publicUrl;
        })
      );

      // Create proof record in database
      const { error: dbError } = await supabase
        .from('proofs')
        .insert({
          contest_id: contest.id,
          user_id: address,
          description,
          file_urls: fileUrls
        });

      if (dbError) throw dbError;

      setFiles([]);
      setDescription('');
      onClose();
    } catch (err: any) {
      console.error('Error submitting proof:', err);
      setError(err.message || 'Failed to submit proof. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Submit Challenge Proof</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isUploading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Describe your achievement..."
              rows={3}
              required
              disabled={isUploading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Proof
            </label>
            <div 
              className={`border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer 
                         hover:border-primary-500 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isUploading && fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx"
                disabled={isUploading}
              />
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Images, videos, or documents up to 10MB
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Selected Files</h4>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getFileIcon(file.type)}
                    <span className="text-sm text-gray-600">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                    className="text-gray-400 hover:text-red-500"
                    disabled={isUploading}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || files.length === 0}
              className="btn-primary flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Submit Proof'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
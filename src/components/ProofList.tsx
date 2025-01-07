import React from 'react';
import { FileText, User, Calendar } from 'lucide-react';

interface Proof {
  contestId: string;
  userId: string;
  description: string;
  files: string[];
  timestamp: string;
}

interface ProofListProps {
  contestId: string;
}

export function ProofList({ contestId }: ProofListProps) {
  // Get proofs from localStorage
  const proofs: Proof[] = JSON.parse(localStorage.getItem('proofs') || '[]')
    .filter((proof: Proof) => proof.contestId === contestId)
    .sort((a: Proof, b: Proof) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  if (proofs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No proofs submitted yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {proofs.map((proof, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600 font-mono">
                {proof.userId.slice(0, 6)}...{proof.userId.slice(-4)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {new Date(proof.timestamp).toLocaleDateString()}
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{proof.description}</p>
          
          {proof.files.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Attached Files:</h4>
              {proof.files.map((file, fileIndex) => (
                <div key={fileIndex} className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4 text-gray-400" />
                  {file}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
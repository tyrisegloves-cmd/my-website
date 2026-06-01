import { useState } from 'react';
import { Send, Star } from 'lucide-react';
import { useStore } from '../store';
import { PageHeader } from './PageHeader';

interface ReviewSubmissionPageProps {
  onBack?: () => void;
}

export function ReviewSubmissionPage({ onBack }: ReviewSubmissionPageProps) {
  const { currentUser, addUserReview } = useStore();
  const showToast = useStore((s) => s.showToast);

  const [rating, setRating] = useState(5);
  const [productName, setProductName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || !comment.trim()) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (!currentUser) return;

    const initials = currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    addUserReview({
      id: String(Date.now()),
      name: currentUser.name,
      initials,
      stars: rating,
      quote: comment,
      purchased: productName,
      date: 'Just now'
    });

    showToast('Your review has been published!', 'success');
    onBack?.();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] text-white">
      <PageHeader 
        title="Share Your Experience" 
        subtitle="Your feedback helps the Igris community choose the best tech."
        onBack={onBack}
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-blue-100 dark:border-[#2F2F2F] p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-500 dark:text-white/60 mb-4 uppercase tracking-widest">Overall Rating</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star 
                      size={42} 
                      fill={star <= rating ? '#FFBB00' : 'none'} 
                      className={star <= rating ? 'text-[#FFBB00]' : 'text-gray-300 dark:text-[#2F2F2F]'} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white/70 mb-2 uppercase tracking-widest">
                Product or Service Name
              </label>
              <input
                type="text"
                placeholder="e.g. AuraBuds Pro Max"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2F2F2F] rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00FF85] transition-all"
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white/70 mb-2 uppercase tracking-widest">
                Your Review
              </label>
              <textarea
                placeholder="What did you like about it? Any tips for other users?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2F2F2F] rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00FF85] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] rounded-2xl font-bold text-lg shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-[#00FF85]/30 transition-all flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Publish Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

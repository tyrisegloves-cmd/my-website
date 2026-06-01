import { useMemo, useState } from 'react';
import { ArrowLeft, HelpCircle, MessageCircle, Search, Send, ThumbsUp } from 'lucide-react';
import { useStore } from '../store';

interface HelpPageProps {
  onBack?: () => void;
}

interface ForumItem {
  id: string;
  question: string;
  answer: string;
  topic: string;
  helpful: number;
}

const WHATSAPP_URL = 'https://wa.me/233201843064?text=Hello%20Alpha%20Support%2C%20I%20need%20help%20with%20Igris.';

export function HelpPage({ onBack }: HelpPageProps) {
  const showToast = useStore((s) => s.showToast);
  const [query, setQuery] = useState('');
  const [question, setQuestion] = useState('');
  const [forum, setForum] = useState<ForumItem[]>([
    {
      id: 'qa-1',
      topic: 'Orders',
      question: 'How do I track my gadget order?',
      answer: 'Open Orders, choose Track Live, then enter your order ID or product name to view the shipment timeline.',
      helpful: 21,
    },
    {
      id: 'qa-2',
      topic: 'Services',
      question: 'Can I reschedule a service appointment?',
      answer: 'Yes. Go to Profile, open Appointments, and use the Reschedule button beside the service booking.',
      helpful: 16,
    },
    {
      id: 'qa-3',
      topic: 'Payments',
      question: 'Is checkout secure?',
      answer: 'Yes. Igris uses secure form handling in the checkout flow and is built for encrypted payment integrations.',
      helpful: 29,
    },
    {
      id: 'qa-4',
      topic: 'Admin',
      question: 'How do I access the admin portal?',
      answer: 'Admin access is granted automatically to approved admin emails. Once logged in, the Admin shortcut appears.',
      helpful: 12,
    },
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return forum;
    return forum.filter((item) =>
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.topic.toLowerCase().includes(q)
    );
  }, [forum, query]);

  const askQuestion = () => {
    if (!question.trim()) {
      showToast('Please enter a question first', 'error');
      return;
    }
    const item: ForumItem = {
      id: `qa-${Date.now()}`,
      topic: 'Community',
      question: question.trim(),
      answer: 'Thanks for asking. Our community team will respond soon. For urgent issues, contact Alpha Support on WhatsApp.',
      helpful: 0,
    };
    setForum([item, ...forum]);
    setQuestion('');
    showToast('Question posted to the help forum', 'success');
  };

  const markHelpful = (id: string) => {
    setForum((items) => items.map((item) => item.id === id ? { ...item, helpful: item.helpful + 1 } : item));
    showToast('Marked as helpful', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212]">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-[#121212] dark:via-[#1E1E1E] dark:to-[#121212] border-b border-blue-200 dark:border-[#2F2F2F] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="mt-1 h-10 w-10 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center transition-all"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
                <HelpCircle size={14} />
                <span className="text-xs font-mono tracking-widest uppercase">Igris Help Center</span>
              </div>
              <h1 className="text-4xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>Q&A Forum</h1>
              <p className="text-white/75 mt-2 max-w-2xl">
                Search common answers, ask the community, or report an urgent incident to Alpha Support.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00FF85] text-[#0b1e17] font-bold hover:bg-[#22ff97] transition-all shadow-lg shadow-[#00FF85]/30"
            >
              <MessageCircle size={18} /> Contact Alpha Support
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white dark:bg-[#1E1E1E] border border-blue-100 dark:border-[#2F2F2F] rounded-2xl p-5">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions, topics, or answers..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2F2F2F] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00FF85]/40"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a new question..."
              className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2F2F2F] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00FF85]/40"
            />
            <button
              onClick={askQuestion}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] font-bold hover:bg-blue-700 dark:hover:bg-[#22ff97] transition-all"
            >
              <Send size={18} /> Ask Question
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#1E1E1E] border border-blue-100 dark:border-[#2F2F2F] rounded-2xl p-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-[#00FF85]/10 text-blue-700 dark:text-[#00FF85] text-xs font-bold">
                  {item.topic}
                </span>
                <button onClick={() => markHelpful(item.id)} className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-white/60 hover:text-blue-600 dark:hover:text-[#00FF85]">
                  <ThumbsUp size={14} /> {item.helpful}
                </button>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.question}</h2>
              <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="sm:hidden">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-[#00FF85] text-[#0b1e17] font-bold hover:bg-[#22ff97] transition-all shadow-lg shadow-[#00FF85]/30"
          >
            <MessageCircle size={18} /> Contact Alpha Support
          </a>
        </div>
      </div>
    </div>
  );
}
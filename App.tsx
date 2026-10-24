import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Volume2,
  Bookmark,
  BookmarkCheck,
  Search,
  Zap,
  BookOpen,
  MessageSquare,
  Trophy,
  RotateCcw,
  Check,
  X,
  Play,
  Pause,
  Eye,
  EyeOff,
  Flame,
  Shield,
  Layers,
  Shuffle
} from 'lucide-react';
import {
  QA_ITEMS,
  QUICK_REACTIONS,
  PITCH_SHOUTS,
  DIALOGUES,
  QAItem,
  QuickReaction,
  PitchShout
} from './footballData.ts';
import { sounds, speakSpanish, stopSpeaking } from './audioUtils.ts';

type TabType = 'browse' | 'reactions' | 'shouts' | 'dialogues' | 'flashcards' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('futbol_favs');
      return saved ? JSON.parse(saved) : [1, 11, 31, 39, 57];
    } catch {
      return [1, 11, 31, 39, 57];
    }
  });
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Hidden/revealed Armenian translations state
  // Default: Translations are hidden until clicking on the Spanish text!
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});
  const [revealAllTranslations, setRevealAllTranslations] = useState<boolean>(false);

  // Flashcards state
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardSource, setCardSource] = useState<'all' | 'favorites' | 'coach' | 'pitch'>('all');

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotalAnswered, setQuizTotalAnswered] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizIsCorrect, setQuizIsCorrect] = useState<boolean | null>(null);
  const [quizStreak, setQuizStreak] = useState(0);

  // Dialogue player state
  const [activeDialogueId, setActiveDialogueId] = useState<number>(1);
  const [dialogueLineIdx, setDialogueLineIdx] = useState<number>(-1);
  const [isAutoPlayingDialogue, setIsAutoPlayingDialogue] = useState<boolean>(false);
  const dialogueTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Quick reaction drill state
  const [reactionDrillIdx, setReactionDrillIdx] = useState(0);
  const [reactionRevealed, setReactionRevealed] = useState(false);

  // Save favorites
  useEffect(() => {
    try {
      localStorage.setItem('futbol_favs', JSON.stringify(favorites));
    } catch {
      // storage quota or disabled
    }
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSpeak = (text: string, idTag: string) => {
    setPlayingId(idTag);
    speakSpanish(text, speechRate, () => {
      setPlayingId(null);
    });
  };

  // Helper to check if a specific Armenian translation is currently visible
  const isArmenianVisible = (key: string): boolean => {
    if (revealAllTranslations) return true;
    return !!revealedTranslations[key];
  };

  // Helper to toggle a specific Armenian translation
  const toggleArmenian = (key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRevealedTranslations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Click on Spanish text: ONLY toggles Armenian translation (audio is only played via the audio icon button)
  const handleSentenceClick = (transKey: string) => {
    setRevealedTranslations(prev => ({ ...prev, [transKey]: !prev[transKey] }));
  };

  // Categories list for filtering
  const categories = useMemo(() => {
    const set = new Set<string>();
    QA_ITEMS.forEach(item => set.add(item.categoryArm));
    return ['all', ...Array.from(set)];
  }, []);

  // Filtered QA Items
  const filteredQAItems = useMemo(() => {
    return QA_ITEMS.filter(item => {
      if (showOnlyFavs && !favorites.includes(item.id)) return false;
      if (selectedCategory !== 'all' && item.categoryArm !== selectedCategory) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          item.esQ.toLowerCase().includes(q) ||
          item.esA.toLowerCase().includes(q) ||
          item.armQ.toLowerCase().includes(q) ||
          item.armA.toLowerCase().includes(q) ||
          item.categoryArm.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery, showOnlyFavs, favorites]);

  // Flashcards items
  const flashcardPool = useMemo(() => {
    if (cardSource === 'favorites') {
      const favItems = QA_ITEMS.filter(i => favorites.includes(i.id));
      return favItems.length > 0 ? favItems : QA_ITEMS;
    }
    if (cardSource === 'coach') {
      return QA_ITEMS.filter(i => i.part === 1 || i.part === 4 || i.part === 8);
    }
    if (cardSource === 'pitch') {
      return QA_ITEMS.filter(i => i.part === 2 || i.part === 5);
    }
    return QA_ITEMS;
  }, [cardSource, favorites]);

  const currentFlashcard = flashcardPool[flashcardIdx % flashcardPool.length];

  // Quiz question generation
  const currentQuizItem = QA_ITEMS[quizIdx % QA_ITEMS.length];
  const quizOptions = useMemo(() => {
    if (!currentQuizItem) return [];
    const correct = currentQuizItem.esA;
    const others = QA_ITEMS.filter(i => i.id !== currentQuizItem.id)
      .map(i => i.esA)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const combined = [correct, ...others];
    return combined.sort(() => 0.5 - Math.random());
  }, [currentQuizItem]);

  const handleQuizAnswer = (option: string) => {
    if (quizSelectedOption !== null) return;
    setQuizSelectedOption(option);
    const isRight = option === currentQuizItem.esA;
    setQuizIsCorrect(isRight);
    setQuizTotalAnswered(prev => prev + 1);

    if (isRight) {
      sounds.playKick();
      sounds.playGoalCheer();
      setQuizScore(prev => prev + 1);
      setQuizStreak(prev => prev + 1);
    } else {
      sounds.playMiss();
      setQuizStreak(0);
    }

    handleSpeak(option, 'quiz-option');
  };

  const nextQuizQuestion = () => {
    setQuizSelectedOption(null);
    setQuizIsCorrect(null);
    setQuizIdx(prev => (prev + 1) % QA_ITEMS.length);
  };

  // Dialogue auto-play logic
  useEffect(() => {
    if (!isAutoPlayingDialogue) {
      if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
      return;
    }

    const currentDiag = DIALOGUES.find(d => d.id === activeDialogueId);
    if (!currentDiag) return;

    if (dialogueLineIdx >= currentDiag.lines.length) {
      setIsAutoPlayingDialogue(false);
      setDialogueLineIdx(-1);
      return;
    }

    if (dialogueLineIdx === -1) {
      setDialogueLineIdx(0);
      return;
    }

    const line = currentDiag.lines[dialogueLineIdx];
    if (line) {
      handleSpeak(line.es, `dialogue-${activeDialogueId}-${dialogueLineIdx}`);
      const readingTime = Math.max(2200, line.es.length * 90);
      dialogueTimerRef.current = setTimeout(() => {
        setDialogueLineIdx(prev => prev + 1);
      }, readingTime);
    }

    return () => {
      if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
    };
  }, [isAutoPlayingDialogue, dialogueLineIdx, activeDialogueId]);

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Stadium Pitch Top Header */}
      <header className="sticky top-0 z-40 bg-[#0d3815]/95 backdrop-blur-md border-b border-orange-500/30 shadow-2xl">
        {/* Top announcement bar */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-600 py-1 px-4 text-xs font-bold text-black uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="animate-pulse">⚽</span> Իսպաներեն ֆուտբոլիստների համար · Español para futbolistas
          </span>
          <span className="hidden md:inline bg-black/20 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-900">
            Կտտացրո՛ւ իսպաներենին՝ հայերեն թարգմանությունը տեսնելու և լսելու համար
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-500/30 text-2xl border-2 border-yellow-200">
              ⚽
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>Español</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400">
                  para Futbolistas
                </span>
              </h1>
              <p className="text-xs text-emerald-300 font-medium">
                Սեղմի՛ր իսպաներեն արտահայտությանը՝ հայերեն թարգմանությունը բացելու համար
              </p>
            </div>
          </div>

          {/* Quick controls: Whistle, audio speed, sound effects */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => sounds.playDoubleWhistle()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-yellow-300 border border-yellow-400/40 text-xs font-bold shadow transition cursor-pointer active:scale-95"
              title="Սուլիչի ազդանշան"
            >
              <span>📢</span>
              <span>Սուլիչ</span>
            </button>

            <button
              onClick={() => sounds.playKick()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-orange-300 border border-orange-400/40 text-xs font-bold shadow transition cursor-pointer active:scale-95"
              title="Հարված գնդակին"
            >
              <span>👟</span>
              <span>Հարված</span>
            </button>

            {/* Speech rate controller */}
            <div className="flex items-center bg-black/40 border border-emerald-500/40 rounded-lg px-2.5 py-1 text-xs text-emerald-200">
              <span className="mr-1.5 text-yellow-400">⚡</span>
              <span className="mr-2 font-medium hidden sm:inline">Արագություն:</span>
              <button
                onClick={() => setSpeechRate(0.75)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold mr-1 ${
                  speechRate === 0.75 ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                0.75x
              </button>
              <button
                onClick={() => setSpeechRate(0.9)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold mr-1 ${
                  speechRate === 0.9 ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                0.9x
              </button>
              <button
                onClick={() => setSpeechRate(1.05)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                  speechRate === 1.05 ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                1.0x
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none border-t border-emerald-800/50">
            <button
              onClick={() => setActiveTab('browse')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'browse'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/20'
                  : 'text-emerald-200 hover:bg-emerald-800/50 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>📚 Բոլոր արտահայտությունները ({QA_ITEMS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reactions')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'reactions'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/20'
                  : 'text-emerald-200 hover:bg-emerald-800/50 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>⚡ Արագ արձագանք ({QUICK_REACTIONS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('shouts')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'shouts'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/20'
                  : 'text-emerald-200 hover:bg-emerald-800/50 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>📢 Դաշտի բղավոցներ ({PITCH_SHOUTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('dialogues')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'dialogues'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/20'
                  : 'text-emerald-200 hover:bg-emerald-800/50 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>🗣️ Երկխոսություններ ({DIALOGUES.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'flashcards'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/20'
                  : 'text-emerald-200 hover:bg-emerald-800/50 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>🃏 Ֆլեշ-քարտեր</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/20'
                  : 'text-emerald-200 hover:bg-emerald-800/50 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span>⚽ Խփիր գոլ (Վիկտորինա)</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Pitch Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* ================= TAB 1: BROWSE ALL PHRASES ================= */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Pitch banner card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#14532d] via-[#166534] to-[#0f3d1f] p-5 sm:p-6 border-2 border-orange-500/40 shadow-xl">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-6 w-48 h-48 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-400/30 mb-2">
                    <Shield className="w-3.5 h-3.5" /> 85 Իրական ֆուտբոլային իրավիճակներ
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Հարցեր և արագ պատասխաններ իսպաներենով
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
                    💡 <span className="text-yellow-300 font-semibold">Սեղմի՛ր ցանկացած իսպաներեն տողի վրա</span>՝ հայերեն թարգմանությունը բացելու և բնական արտասանությունը լսելու համար։
                  </p>
                </div>

                {/* Master Translation toggle & Favorites Filter */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setRevealAllTranslations(!revealAllTranslations)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                      revealAllTranslations
                        ? 'bg-orange-500 text-black border-orange-400 shadow-lg shadow-orange-500/30'
                        : 'bg-emerald-950/80 text-emerald-200 border-emerald-600/50 hover:bg-emerald-900'
                    }`}
                    title={revealAllTranslations ? "Ծածկել հայերեն թարգմանությունները" : "Բացել բոլոր թարգմանությունները"}
                  >
                    {revealAllTranslations ? <Eye className="w-4 h-4 text-black" /> : <EyeOff className="w-4 h-4 text-yellow-300" />}
                    <span>{revealAllTranslations ? 'Բոլոր թարգմանությունները բաց են' : 'Թարգմանությունները ծածկված են (կտտացրո՛ւ)'}</span>
                  </button>

                  <button
                    onClick={() => setShowOnlyFavs(!showOnlyFavs)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                      showOnlyFavs
                        ? 'bg-yellow-400 text-black border-yellow-300 shadow-lg shadow-yellow-400/30'
                        : 'bg-emerald-950/70 text-yellow-300 border-yellow-400/40 hover:bg-emerald-900'
                    }`}
                  >
                    {showOnlyFavs ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    <span>Ընտրվածներ ({favorites.length})</span>
                  </button>
                </div>
              </div>

              {/* Search input & category filter pills */}
              <div className="mt-5 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Որոնել հայերեն կամ իսպաներեն (օր.՝ 'պաշտպան', 'delantero', 'pase', 'մարզիչ')..."
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/40 border border-emerald-500/50 focus:border-yellow-400 focus:outline-none text-sm text-white placeholder-emerald-400/60 shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-orange-500 text-black font-bold shadow'
                          : 'bg-emerald-950/70 text-emerald-200 border border-emerald-700/50 hover:bg-emerald-800'
                      }`}
                    >
                      {cat === 'all' ? 'Բոլոր բաժինները' : cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* List of items */}
            {filteredQAItems.length === 0 ? (
              <div className="text-center py-12 bg-emerald-950/40 rounded-2xl border border-emerald-800">
                <p className="text-emerald-300 text-lg">Արտահայտություն չի գտնվել</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setShowOnlyFavs(false);
                  }}
                  className="mt-3 px-4 py-2 bg-orange-500 text-black font-bold text-xs rounded-xl"
                >
                  Մաքրել ֆիլտրերը
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredQAItems.map(item => {
                  const isFav = favorites.includes(item.id);
                  const qKey = `q-${item.id}`;
                  const aKey = `a-${item.id}`;
                  const isQArmRevealed = isArmenianVisible(qKey);
                  const isAArmRevealed = isArmenianVisible(aKey);

                  return (
                    <div
                      key={item.id}
                      className="relative rounded-2xl bg-gradient-to-b from-[#124b1f]/90 to-[#0e3a18]/90 border border-emerald-600/40 hover:border-yellow-400/60 transition-all p-4 sm:p-5 shadow-lg flex flex-col justify-between"
                    >
                      {/* Item header */}
                      <div className="flex items-center justify-between mb-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-black flex items-center justify-center text-[11px] shadow">
                            {item.id}
                          </span>
                          <span className="text-yellow-300 font-bold bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                            {item.categoryArm}
                          </span>
                          {item.contextTag && (
                            <span className="text-[11px] text-emerald-300 font-medium hidden sm:inline">
                              {item.contextTag}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Bookmark */}
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className={`p-1.5 rounded-lg transition cursor-pointer ${
                              isFav
                                ? 'text-yellow-400 bg-yellow-400/20'
                                : 'text-slate-400 hover:text-yellow-300 hover:bg-emerald-800/60'
                            }`}
                            title={isFav ? "Հեռացնել ընտրվածներից" : "Ավելացնել ընտրվածներում"}
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Question Block (Spanish clickable to reveal Armenian translation) */}
                      <div
                        onClick={() => handleSentenceClick(qKey)}
                        className={`mb-3.5 p-3.5 rounded-xl border transition-all cursor-pointer select-none group/q ${
                          isQArmRevealed
                            ? 'bg-black/45 border-orange-500/60 shadow-md shadow-orange-500/10'
                            : 'bg-black/30 border-emerald-600/40 hover:border-yellow-400/80 hover:bg-black/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                                Հարց / Հրահանգ (Pregunta)
                              </span>
                              <span className="text-[10px] text-yellow-300/80 font-medium flex items-center gap-1">
                                {isQArmRevealed ? '👁️ Բացված է' : '👆 Կտտացրո՛ւ թարգմանության համար'}
                              </span>
                            </div>

                            <div className="text-sm sm:text-base font-extrabold text-white leading-snug group-hover/q:text-yellow-300 transition-colors">
                              {item.esQ}
                            </div>

                            {/* Armenian Translation */}
                            {isQArmRevealed ? (
                              <div className="mt-2 pt-2 border-t border-emerald-700/50 text-xs sm:text-sm text-emerald-200 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                                <span className="text-yellow-400 font-bold mr-1.5">Հայերեն՝</span>
                                {item.armQ}
                              </div>
                            ) : (
                              <div className="mt-1.5 text-[11px] text-emerald-400/70 italic flex items-center gap-1">
                                <span>🔒</span>
                                <span>Թարգմանությունը ծածկված է։ Սեղմի՛ր իսպաներենին</span>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleSpeak(item.esQ, `speak-q-${item.id}`);
                            }}
                            className={`p-2 rounded-xl border transition cursor-pointer shrink-0 mt-0.5 ${
                              playingId === `speak-q-${item.id}`
                                ? 'bg-orange-500 text-black border-orange-400 scale-105'
                                : 'bg-emerald-900/60 text-yellow-300 border-emerald-600/60 hover:bg-emerald-800'
                            }`}
                            title="Լսել իսպաներեն արտասանությունը"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Answer Block (Spanish clickable to reveal Armenian translation) */}
                      <div
                        onClick={() => handleSentenceClick(aKey)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none group/a ${
                          isAArmRevealed
                            ? 'bg-emerald-950/80 border-amber-400/70 shadow-md shadow-amber-500/10'
                            : 'bg-emerald-950/50 border-emerald-600/40 hover:border-yellow-400/80 hover:bg-emerald-950/70'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-400">
                                Քո պատասխանը (Respuesta)
                              </span>
                              <span className="text-[10px] text-amber-300/80 font-medium flex items-center gap-1">
                                {isAArmRevealed ? '👁️ Բացված է' : '👆 Կտտացրո՛ւ թարգմանության համար'}
                              </span>
                            </div>

                            <div className="text-sm sm:text-base font-extrabold text-amber-200 leading-snug group-hover/a:text-yellow-300 transition-colors">
                              {item.esA}
                            </div>

                            {/* Armenian Translation */}
                            {isAArmRevealed ? (
                              <div className="mt-2 pt-2 border-t border-emerald-700/50 text-xs sm:text-sm text-emerald-100 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                                <span className="text-orange-400 font-bold mr-1.5">Հայերեն՝</span>
                                {item.armA}
                              </div>
                            ) : (
                              <div className="mt-1.5 text-[11px] text-amber-400/70 italic flex items-center gap-1">
                                <span>🔒</span>
                                <span>Թարգմանությունը ծածկված է։ Սեղմի՛ր իսպաներենին</span>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleSpeak(item.esA, `speak-a-${item.id}`);
                            }}
                            className={`p-2 rounded-xl border transition cursor-pointer shrink-0 mt-0.5 ${
                              playingId === `speak-a-${item.id}`
                                ? 'bg-orange-500 text-black border-orange-400 scale-105'
                                : 'bg-emerald-900/60 text-yellow-300 border-emerald-600/60 hover:bg-emerald-800'
                            }`}
                            title="Լսել իսպաներեն արտասանությունը"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: QUICK REACTIONS ================= */}
        {activeTab === 'reactions' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-600/90 via-amber-600/90 to-emerald-800/90 rounded-2xl p-5 sm:p-6 border-2 border-yellow-400 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-black/40 text-yellow-300 mb-2">
                    ⚡ PARTE 3 — Շատ կարճ պատասխաններ
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Անմիջապես արձագանքիր 1 վայրկյանում!
                  </h2>
                  <p className="text-xs sm:text-sm text-yellow-100 mt-1">
                    Սեղմի՛ր իսպաներեն հարցին կամ պատասխանին՝ հայերեն թարգմանությունը բացելու համար։
                  </p>
                </div>

                <button
                  onClick={() => {
                    sounds.playWhistle();
                    setReactionDrillIdx(Math.floor(Math.random() * QUICK_REACTIONS.length));
                    setReactionRevealed(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm rounded-xl shadow-lg transition cursor-pointer active:scale-95"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Պատահական հարց</span>
                </button>
              </div>
            </div>

            {/* Interactive drill card */}
            <div className="max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-[#134f21] to-[#0c3514] border-2 border-orange-500 p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
              <div className="text-xs uppercase font-bold text-yellow-400 tracking-wider mb-2">
                Մարզում {reactionDrillIdx + 1} / {QUICK_REACTIONS.length}
              </div>

              {/* Prompt box */}
              <div
                onClick={() => {
                  const key = `drill-prompt-${reactionDrillIdx}`;
                  toggleArmenian(key);
                }}
                className="bg-black/40 rounded-2xl p-6 border border-emerald-500/40 mb-6 cursor-pointer hover:border-yellow-400 transition"
              >
                <div className="text-xs text-orange-400 font-bold mb-1">
                  Թիմակիցը կամ մարզիչը հարցնում է (սեղմի՛ր թարգմանության համար)՝
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {QUICK_REACTIONS[reactionDrillIdx].prompt}
                </div>

                {isArmenianVisible(`drill-prompt-${reactionDrillIdx}`) ? (
                  <div className="text-sm sm:text-base text-emerald-200 mt-2 font-medium bg-emerald-950/60 p-2 rounded-xl">
                    Հայերեն՝ {QUICK_REACTIONS[reactionDrillIdx].armPrompt}
                  </div>
                ) : (
                  <div className="text-xs text-emerald-400/70 italic mt-2">
                    👆 Կտտացրո՛ւ հայերեն թարգմանության համար
                  </div>
                )}
              </div>

              {/* Response box */}
              {reactionRevealed ? (
                <div
                  onClick={() => {
                    const key = `drill-resp-${reactionDrillIdx}`;
                    toggleArmenian(key);
                  }}
                  className="bg-emerald-950/90 border-2 border-yellow-400 rounded-2xl p-6 mb-6 animate-in fade-in zoom-in duration-200 cursor-pointer"
                >
                  <div className="text-xs text-yellow-400 font-bold mb-1">
                    Արագ պատասխանը (սեղմի՛ր թարգմանության համար)՝
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-yellow-300 mb-2">
                    {QUICK_REACTIONS[reactionDrillIdx].response}
                  </div>

                  {isArmenianVisible(`drill-resp-${reactionDrillIdx}`) ? (
                    <div className="text-base text-emerald-100 font-medium bg-black/40 p-2 rounded-xl">
                      Հայերեն՝ {QUICK_REACTIONS[reactionDrillIdx].armResponse}
                    </div>
                  ) : (
                    <div className="text-xs text-yellow-300/70 italic">
                      👆 Կտտացրո՛ւ հայերեն թարգմանության համար
                    </div>
                  )}

                  <div
                    onClick={e => {
                      e.stopPropagation();
                      handleSpeak(QUICK_REACTIONS[reactionDrillIdx].response, 'drill-resp');
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-black font-extrabold rounded-xl text-xs transition cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Լսել պատասխանը</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    sounds.playKick();
                    setReactionRevealed(true);
                  }}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-black text-lg shadow-xl transition transform active:scale-95 cursor-pointer mb-6"
                >
                  ⚡ Պատասխանել / Ցույց տալ իսպաներենը
                </button>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setReactionDrillIdx(prev => (prev > 0 ? prev - 1 : QUICK_REACTIONS.length - 1));
                    setReactionRevealed(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-600/40 cursor-pointer"
                >
                  ← Նախորդը
                </button>

                <button
                  onClick={() => {
                    sounds.playKick();
                    setReactionDrillIdx(prev => (prev + 1) % QUICK_REACTIONS.length);
                    setReactionRevealed(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black text-xs font-black shadow-md cursor-pointer"
                >
                  Հաջորդ հարցը →
                </button>
              </div>
            </div>

            {/* Complete quick table with click to reveal Armenian */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span>📋</span>
                  <span>Բոլոր 16 կարճ պատասխանների ցանկը (կտտացրո՛ւ թարգմանության համար)</span>
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {QUICK_REACTIONS.map(item => {
                  const cardKey = `qr-card-${item.id}`;
                  const isRevealed = isArmenianVisible(cardKey);

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleArmenian(cardKey)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isRevealed
                          ? 'bg-emerald-950/90 border-yellow-400 shadow-lg'
                          : 'bg-emerald-950/60 border-emerald-700/40 hover:border-orange-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold text-orange-400 mb-1">
                          <span className="text-sm font-extrabold text-white">{item.prompt}</span>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleSpeak(`${item.prompt}. ${item.response}`, `qr-${item.id}`);
                            }}
                            className="p-1 rounded-lg text-yellow-400 hover:text-white hover:bg-black/40 transition cursor-pointer"
                            title="Լսել արտասանությունը"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        {isRevealed ? (
                          <div className="text-xs text-emerald-300 mb-2 font-medium animate-in fade-in duration-200">
                            Հայ՝ {item.armPrompt}
                          </div>
                        ) : (
                          <div className="text-[10px] text-emerald-400/60 mb-2 italic">
                            👆 Սեղմի՛ր թարգմանության համար
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-emerald-800/60">
                        <div className="text-base font-black text-yellow-300">
                          {item.response}
                        </div>
                        {isRevealed && (
                          <div className="text-xs text-emerald-100 font-medium animate-in fade-in duration-200">
                            {item.armResponse}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PITCH SHOUTS ================= */}
        {activeTab === 'shouts' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-900 via-[#134d1f] to-emerald-900 rounded-2xl p-5 sm:p-6 border-2 border-orange-500 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-400/30 mb-2">
                    🎙️ PARTE 7 — 30 Արտահայտություն
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Իսպանական խաղադաշտի բնական բղավոցներ
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
                    Այս բառերը դու ամեն վայրկյան կլսես խաղադաշտում։ <span className="text-yellow-300 font-bold">Սեղմի՛ր իսպաներեն բղավոցին</span>՝ հայերեն թարգմանությունը տեսնելու և լսելու համար։
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const randomShout = PITCH_SHOUTS[Math.floor(Math.random() * PITCH_SHOUTS.length)];
                      const key = `shout-${randomShout.id}`;
                      setRevealedTranslations(prev => ({ ...prev, [key]: true }));
                      handleSpeak(randomShout.es, `shout-${randomShout.id}`);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-extrabold text-xs rounded-xl shadow cursor-pointer active:scale-95"
                  >
                    <span>🎲</span>
                    <span>Լսել պատահական բղավոց</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Shouts Grid - Click to reveal translation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {PITCH_SHOUTS.map(shout => {
                const shoutKey = `shout-${shout.id}`;
                const isRevealed = isArmenianVisible(shoutKey);

                return (
                  <div
                    key={shout.id}
                    onClick={() => toggleArmenian(shoutKey)}
                    className={`group relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left active:scale-95 select-none ${
                      isRevealed
                        ? 'bg-gradient-to-b from-[#186033] to-[#0d3b17] border-yellow-400 shadow-lg shadow-orange-500/20'
                        : 'bg-gradient-to-b from-[#14532d] to-[#0c3514] border-emerald-600/50 hover:border-yellow-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-orange-400">
                        #{shout.id}
                      </span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleSpeak(shout.es, `shout-${shout.id}`);
                        }}
                        className={`p-1.5 rounded-lg border transition cursor-pointer ${
                          playingId === `shout-${shout.id}`
                            ? 'bg-orange-500 text-black border-orange-400'
                            : 'text-yellow-300 hover:text-white hover:bg-black/40 border-transparent hover:border-yellow-400/40'
                        }`}
                        title="Լսել իսպաներեն արտասանությունը"
                      >
                        <Volume2 className="w-4 h-4 group-hover:scale-110 transition" />
                      </button>
                    </div>

                    <div className="text-base sm:text-lg font-black text-white group-hover:text-yellow-300 transition leading-snug mb-2">
                      {shout.es}
                    </div>

                    {isRevealed ? (
                      <div className="text-xs text-yellow-200 font-bold border-t border-emerald-600/60 pt-2 leading-tight animate-in fade-in duration-150">
                        {shout.arm}
                      </div>
                    ) : (
                      <div className="text-[10px] text-emerald-400/70 border-t border-emerald-800/40 pt-2 leading-tight italic">
                        👆 Սեղմի՛ր թարգմանության համար
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 4: DIALOGUES ================= */}
        {activeTab === 'dialogues' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-950 via-[#14532d] to-emerald-950 rounded-2xl p-5 sm:p-6 border-2 border-amber-500 shadow-xl">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-yellow-300 border border-yellow-400/30 mb-2">
                🏆 PARTE 9 — Խաղային իրական երկխոսություններ
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Ամբողջական երկխոսություններ իրական իրավիճակներում
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                Կարդա՛ և լսի՛ր դերերով։ <span className="text-yellow-300 font-bold">Սեղմի՛ր ցանկացած տողի վրա</span>՝ հայերեն թարգմանությունը բացելու համար։
              </p>

              {/* Dialogue selector tabs */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
                {DIALOGUES.map(diag => (
                  <button
                    key={diag.id}
                    onClick={() => {
                      setActiveDialogueId(diag.id);
                      setIsAutoPlayingDialogue(false);
                      setDialogueLineIdx(-1);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      activeDialogueId === diag.id
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg'
                        : 'bg-black/40 text-emerald-200 border border-emerald-700/60 hover:bg-emerald-800'
                    }`}
                  >
                    <span>{diag.id}. {diag.titleArm.split('—')[1] || diag.titleArm}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Dialogue Container */}
            {(() => {
              const diag = DIALOGUES.find(d => d.id === activeDialogueId) || DIALOGUES[0];

              return (
                <div className="rounded-3xl bg-gradient-to-b from-[#134d1f] to-[#0b2f12] border-2 border-emerald-500/60 p-5 sm:p-8 shadow-2xl space-y-6">
                  {/* Dialogue Title & Audio Auto-player Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-emerald-700/60 gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-yellow-300">
                        {diag.titleEs}
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-200 mt-0.5">
                        {diag.titleArm}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (isAutoPlayingDialogue) {
                            setIsAutoPlayingDialogue(false);
                            stopSpeaking();
                          } else {
                            setDialogueLineIdx(0);
                            setIsAutoPlayingDialogue(true);
                          }
                        }}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold shadow transition cursor-pointer ${
                          isAutoPlayingDialogue
                            ? 'bg-red-600 text-white'
                            : 'bg-orange-500 hover:bg-orange-400 text-black'
                        }`}
                      >
                        {isAutoPlayingDialogue ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{isAutoPlayingDialogue ? 'Դադարեցնել' : 'Լսել ամբողջը'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsAutoPlayingDialogue(false);
                          setDialogueLineIdx(-1);
                          stopSpeaking();
                        }}
                        className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-700 text-xs cursor-pointer"
                        title="Սկզբից"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Lines list */}
                  <div className="space-y-3.5">
                    {diag.lines.map((line, idx) => {
                      const isActive = dialogueLineIdx === idx;
                      const isLeft = idx % 2 === 0;
                      const lineKey = `diag-line-${diag.id}-${idx}`;
                      const isRevealed = isArmenianVisible(lineKey);

                      return (
                        <div
                          key={idx}
                          className={`flex gap-3 items-start ${
                            isLeft ? 'justify-start' : 'justify-end'
                          }`}
                        >
                          <div
                            onClick={() => {
                              setDialogueLineIdx(idx);
                              toggleArmenian(lineKey);
                            }}
                            className={`max-w-xl p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                              isActive
                                ? 'bg-amber-500/20 border-yellow-400 scale-[1.02] shadow-lg shadow-yellow-500/20'
                                : isLeft
                                ? 'bg-black/40 border-emerald-600/50 hover:border-yellow-400/60'
                                : 'bg-[#185e26]/80 border-orange-500/50 hover:border-yellow-400/60'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-4 mb-1.5">
                              <span className="text-xs font-extrabold text-orange-400 flex items-center gap-1.5">
                                <span>⚽</span>
                                <span>{line.speaker}</span>
                                {line.speakerRole && (
                                  <span className="text-[11px] font-normal text-emerald-300">
                                    ({line.speakerRole})
                                  </span>
                                )}
                              </span>

                              <div className="flex items-center gap-1 text-[11px] text-yellow-300">
                                <span className="hidden sm:inline text-[10px] text-emerald-300">
                                  {isRevealed ? '👁️' : '👆 Թարգմանություն'}
                                </span>
                                <button
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleSpeak(line.es, `line-${diag.id}-${idx}`);
                                  }}
                                  className="p-1 hover:text-white"
                                  title="Լսել"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="text-sm sm:text-base font-bold text-white mb-1 leading-snug">
                              {line.es}
                            </div>

                            {isRevealed ? (
                              <div className="text-xs sm:text-sm text-yellow-200 mt-2 pt-1.5 border-t border-emerald-700/60 font-medium animate-in fade-in duration-200">
                                <span className="text-orange-400 font-bold mr-1">Հայ՝</span>
                                {line.arm}
                              </div>
                            ) : (
                              <div className="text-[10px] text-emerald-400/60 italic pt-1">
                                👆 Կտտացրո՛ւ հայերեն թարգմանության համար
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================= TAB 5: FLASHCARDS ================= */}
        {activeTab === 'flashcards' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 rounded-2xl p-5 sm:p-6 border-2 border-orange-500 shadow-xl text-center">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-400/30 mb-2">
                🃏 Ինտերակտիվ ֆլեշ-քարտեր
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Ստուգի՛ր իսպաներենի հիշողությունդ
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                Տես իսպաներեն արտահայտությունը, ստուգիր գիտելիքդ, ապա սեղմի՛ր քարտին՝ հայերեն թարգմանությունը բացելու համար։
              </p>

              {/* Pool filter */}
              <div className="flex justify-center gap-2 mt-4 flex-wrap text-xs">
                <button
                  onClick={() => { setCardSource('all'); setFlashcardIdx(0); setIsFlipped(false); }}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${
                    cardSource === 'all' ? 'bg-orange-500 text-black' : 'bg-black/40 text-emerald-200'
                  }`}
                >
                  Բոլորը ({QA_ITEMS.length})
                </button>
                <button
                  onClick={() => { setCardSource('coach'); setFlashcardIdx(0); setIsFlipped(false); }}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${
                    cardSource === 'coach' ? 'bg-orange-500 text-black' : 'bg-black/40 text-emerald-200'
                  }`}
                >
                  Մարզչի հարցեր
                </button>
                <button
                  onClick={() => { setCardSource('pitch'); setFlashcardIdx(0); setIsFlipped(false); }}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${
                    cardSource === 'pitch' ? 'bg-orange-500 text-black' : 'bg-black/40 text-emerald-200'
                  }`}
                >
                  Խաղային իրավիճակներ
                </button>
                <button
                  onClick={() => { setCardSource('favorites'); setFlashcardIdx(0); setIsFlipped(false); }}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${
                    cardSource === 'favorites' ? 'bg-yellow-400 text-black' : 'bg-black/40 text-yellow-300'
                  }`}
                >
                  Ընտրվածներ ({favorites.length})
                </button>
              </div>
            </div>

            {/* Flashcard presentation */}
            {currentFlashcard && (
              <div className="space-y-4">
                <div
                  onClick={() => {
                    setIsFlipped(!isFlipped);
                  }}
                  className="w-full min-h-[300px] sm:min-h-[340px] rounded-3xl bg-gradient-to-b from-[#14532d] via-[#104323] to-[#092a11] border-3 border-yellow-400 p-6 sm:p-8 flex flex-col justify-between text-center shadow-2xl cursor-pointer hover:border-orange-400 transition-all active:scale-[0.99] relative select-none"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-orange-400 bg-black/40 px-3 py-1 rounded-full border border-orange-500/30">
                      Քարտ {(flashcardIdx % flashcardPool.length) + 1} / {flashcardPool.length}
                    </span>
                    <span className="text-yellow-300 font-bold">
                      {currentFlashcard.categoryArm}
                    </span>
                  </div>

                  {/* Card Content: Front (Spanish) -> Click reveals Armenian translation */}
                  <div className="py-6">
                    {!isFlipped ? (
                      <div className="space-y-4">
                        <div className="text-xs uppercase font-bold tracking-wider text-orange-400">
                          Իսպաներեն (Español)
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-white leading-relaxed">
                          «{currentFlashcard.esQ}»
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-yellow-300 bg-black/40 p-3 rounded-2xl border border-yellow-400/40">
                          {currentFlashcard.esA}
                        </div>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleSpeak(`${currentFlashcard.esQ}. ${currentFlashcard.esA}`, 'card-audio');
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 text-yellow-300 rounded-lg text-xs font-bold"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Լսել իսպաներեն</span>
                        </button>
                        <p className="text-xs text-emerald-300 animate-pulse mt-3">
                          👉 Սեղմի՛ր քարտի վրա՝ հայերեն թարգմանությունը բացելու համար
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-in fade-in zoom-in duration-200">
                        <div className="text-xs uppercase font-bold tracking-wider text-yellow-400">
                          Հայերեն թարգմանություն
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-emerald-200">
                          Հարց՝ «{currentFlashcard.armQ}»
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-yellow-300 bg-black/50 p-4 rounded-2xl border-2 border-orange-500 shadow-inner">
                          Պատասխան՝ «{currentFlashcard.armA}»
                        </div>
                        <p className="text-xs text-emerald-300 mt-2">
                          Կրկին սեղմի՛ր իսպաներենին վերադառնալու համար
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-emerald-400">
                    {isFlipped ? 'Սեղմի՛ր կրկին շրջելու համար' : 'Շրջել քարտը (Flip)'}
                  </div>
                </div>

                {/* Card controls */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      setFlashcardIdx(prev => (prev > 0 ? prev - 1 : flashcardPool.length - 1));
                      setIsFlipped(false);
                    }}
                    className="flex-1 py-3 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-700 font-bold text-xs text-emerald-200 cursor-pointer"
                  >
                    ← Նախորդը
                  </button>

                  <button
                    onClick={() => {
                      sounds.playWhistle();
                      setFlashcardIdx(Math.floor(Math.random() * flashcardPool.length));
                      setIsFlipped(false);
                    }}
                    className="px-4 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs cursor-pointer shadow"
                    title="Խառնել քարտերը"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      sounds.playKick();
                      setFlashcardIdx(prev => (prev + 1) % flashcardPool.length);
                      setIsFlipped(false);
                    }}
                    className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 font-black text-xs text-black cursor-pointer shadow-lg"
                  >
                    Հաջորդ քարտը →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 6: SOCCER MATCH QUIZ ================= */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Scoreboard */}
            <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0d3b17] to-emerald-950 border-3 border-orange-500 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-700/60 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 text-black font-black flex items-center justify-center text-lg">
                    ⚽
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      Ֆուտբոլային Վիկտորինա — Խփի՛ր Գոլ
                    </h3>
                    <p className="text-[11px] text-emerald-300">
                      Ընտրի՛ր ճիշտ իսպաներեն պատասխանը և գոլ խփիր!
                    </p>
                  </div>
                </div>

                {/* Match stats */}
                <div className="flex items-center gap-4 text-center">
                  <div className="bg-black/50 px-3 py-1.5 rounded-xl border border-yellow-400/40">
                    <div className="text-[10px] text-emerald-300 font-bold uppercase">Գոլեր</div>
                    <div className="text-xl font-black text-yellow-300">{quizScore}</div>
                  </div>
                  <div className="bg-black/50 px-3 py-1.5 rounded-xl border border-orange-500/40">
                    <div className="text-[10px] text-orange-400 font-bold uppercase">Սերիա</div>
                    <div className="text-xl font-black text-orange-400">🔥 {quizStreak}</div>
                  </div>
                </div>
              </div>

              {/* Quiz question card */}
              <div className="bg-black/40 rounded-2xl p-5 border border-emerald-600/40 mb-5">
                <div className="flex items-center justify-between text-xs text-orange-400 font-bold mb-2">
                  <span>Հարց #{currentQuizItem.id} ({currentQuizItem.categoryArm})</span>
                  <button
                    onClick={() => handleSpeak(currentQuizItem.esQ, 'quiz-q')}
                    className="text-yellow-300 hover:text-white flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Լսել</span>
                  </button>
                </div>

                <div className="text-lg sm:text-xl font-black text-white mb-1">
                  {currentQuizItem.esQ}
                </div>
                <div className="text-xs text-yellow-300/80 mt-2 font-medium">
                  Ինչպե՞ս կպատասխանես. «{currentQuizItem.armA}»
                </div>
              </div>

              {/* 4 Choices */}
              <div className="space-y-2.5">
                {quizOptions.map((option, idx) => {
                  const isChosen = quizSelectedOption === option;
                  const isCorrectAnswer = option === currentQuizItem.esA;

                  let btnStyle = 'bg-emerald-950/80 border-emerald-600/50 hover:border-yellow-400 text-white';
                  if (quizSelectedOption !== null) {
                    if (isCorrectAnswer) {
                      btnStyle = 'bg-emerald-600 border-yellow-300 text-white font-black shadow-lg shadow-emerald-500/30';
                    } else if (isChosen && !isCorrectAnswer) {
                      btnStyle = 'bg-red-800/90 border-red-500 text-white line-through';
                    } else {
                      btnStyle = 'opacity-40 bg-emerald-950 border-emerald-800 text-slate-300';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={quizSelectedOption !== null}
                      onClick={() => handleQuizAnswer(option)}
                      className={`w-full p-4 rounded-xl border-2 text-left text-sm sm:text-base font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-black/40 text-yellow-300 text-xs font-black flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {quizSelectedOption !== null && isCorrectAnswer && (
                        <span className="flex items-center gap-1 text-xs font-black text-yellow-300 bg-black/40 px-2 py-1 rounded">
                          <Check className="w-4 h-4 text-emerald-300" /> ԳՈԼ!
                        </span>
                      )}

                      {quizSelectedOption !== null && isChosen && !isCorrectAnswer && (
                        <span className="flex items-center gap-1 text-xs font-black text-red-200 bg-black/40 px-2 py-1 rounded">
                          <X className="w-4 h-4 text-red-400" /> Վրիպում
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next Button */}
              {quizSelectedOption !== null && (
                <div className="mt-5 p-4 rounded-2xl bg-black/60 border border-yellow-400/50 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200">
                  <div className="text-center sm:text-left">
                    <div className="text-base font-black flex items-center gap-2 justify-center sm:justify-start">
                      {quizIsCorrect ? (
                        <span className="text-yellow-300 flex items-center gap-1">
                          🎉 ԳՈ՜Լ! Ճիշտ փոխանցում և գրագետ պատասխան!
                        </span>
                      ) : (
                        <span className="text-orange-400 flex items-center gap-1">
                          ⚠️ Դարպասաձող! Ճիշտ տարբերակը նշված է կանաչով։
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-emerald-200 mt-0.5">
                      Հայերեն իմաստը՝ {currentQuizItem.armA}
                    </div>
                  </div>

                  <button
                    onClick={nextQuizQuestion}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-black text-sm shadow-lg transition cursor-pointer active:scale-95 shrink-0"
                  >
                    Հաջորդ հարվածը ⚽ →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer with football stadium details */}
      <footer className="mt-auto border-t border-emerald-800/80 bg-[#08220c] py-6 text-xs text-emerald-400 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-white">
            <span>⚽</span>
            <span>Español para futbolistas</span>
            <span className="text-orange-400">·</span>
            <span>Իսպաներեն ֆուտբոլիստների համար</span>
          </div>

          <div className="text-emerald-300">
            Արագ ռեակցիա · Դաշտային խոսակցական · Մարզչի հրահանգներ (A2–B1)
          </div>

          <div className="text-yellow-400 font-semibold">
            ¡Vamos, equipo! Hasta el final!
          </div>
        </div>
      </footer>
    </div>
  );
}

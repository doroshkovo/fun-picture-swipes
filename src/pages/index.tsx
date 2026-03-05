import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Sparkles,
  Zap,
  RotateCcw,
  Layers,
  Star,
  Sun,
  ArrowUp,
  ArrowDown,
  Circle,
  Move,
  RefreshCw,
  Eye,
  Waves,
  Orbit,
  Shrink,
  Film,
  Clapperboard,
  Video,
  Volume2,
  VolumeX,
  Aperture,
  CircleDot,
  Columns,
  Box,
  Disc,
  FlipVertical,
  StretchHorizontal,
  HelpCircle,
  Lock,
  Trophy,
  Check,
  X,
  Settings,
  RotateCcw as ResetIcon,
  WifiOff,
} from 'lucide-react';

// Kid-friendly placeholder images - expanded collection
const PLACEHOLDER_IMAGES = [
  { title: 'Happy Puppy', url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop', color: 'from-amber-200 to-orange-300' },
  { title: 'Rainbow Balloons', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop', color: 'from-sky-200 to-blue-300' },
  { title: 'Cute Kitten', url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop', color: 'from-gray-200 to-slate-300' },
  { title: 'Sunny Beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop', color: 'from-blue-200 to-cyan-300' },
  { title: 'Beautiful Butterfly', url: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&h=600&fit=crop', color: 'from-violet-200 to-indigo-300' },
  { title: 'Colorful Flowers', url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop', color: 'from-green-200 to-emerald-300' },
  { title: 'Fluffy Bunny', url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&h=600&fit=crop', color: 'from-amber-100 to-yellow-200' },
  { title: 'Playful Dolphin', url: 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=800&h=600&fit=crop', color: 'from-blue-300 to-indigo-400' },
  { title: 'Colorful Parrot', url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&h=600&fit=crop', color: 'from-green-200 to-emerald-300' },
  { title: 'Happy Sunflowers', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&h=600&fit=crop', color: 'from-yellow-200 to-amber-300' },
  { title: 'Sweet Ice Cream', url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&h=600&fit=crop', color: 'from-cyan-100 to-sky-200' },
  { title: 'Cool Rainbow', url: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=800&h=600&fit=crop', color: 'from-orange-200 via-yellow-200 to-blue-200' },
];

// Default effects - expanded with more options
const DEFAULT_EFFECTS = [
  { ID: 1, name: 'Fade', description: 'Gently fade between pictures', soundType: 'chime' },
  { ID: 2, name: 'Slide', description: 'Slide to the next picture', soundType: 'whoosh' },
  { ID: 3, name: 'Zoom', description: 'Zoom in and out', soundType: 'whoosh' },
  { ID: 4, name: 'Flip', description: 'Flip like a card', soundType: 'whoosh' },
  { ID: 5, name: 'Bounce', description: 'Bouncy fun!', soundType: 'boing' },
  { ID: 6, name: 'Spin', description: 'Spin around!', soundType: 'spin' },
  { ID: 7, name: 'Wipe', description: 'Wipe across the screen', soundType: 'whoosh' },
  { ID: 8, name: 'Pop', description: 'Pop into view!', soundType: 'pop' },
  { ID: 9, name: 'Slide Up', description: 'Slide up from below', soundType: 'whoosh' },
  { ID: 10, name: 'Drop', description: 'Drop from above', soundType: 'boing' },
  { ID: 11, name: 'Grow', description: 'Grow from tiny to big', soundType: 'whoosh' },
  { ID: 12, name: 'Swing', description: 'Swing into place', soundType: 'whoosh' },
  { ID: 13, name: 'Twist', description: 'Twist and appear', soundType: 'spin' },
  { ID: 14, name: 'Blur', description: 'Blur in and out', soundType: 'chime' },
  { ID: 15, name: 'Roll', description: 'Roll in from the side', soundType: 'spin' },
  { ID: 16, name: 'Shrink', description: 'Shrink away and appear', soundType: 'pop' },
  { ID: 17, name: 'Wave', description: 'Wavy entrance', soundType: 'whoosh' },
  { ID: 18, name: 'Iris', description: 'Circle reveal like old movies', soundType: 'chime' },
  { ID: 19, name: 'Shutter', description: 'Blinds opening effect', soundType: 'whoosh' },
  { ID: 20, name: 'Cube', description: '3D cube rotation', soundType: 'spin' },
  { ID: 21, name: 'Elastic', description: 'Stretchy bounce entrance', soundType: 'boing' },
  { ID: 22, name: 'Jello', description: 'Wobbly jello shake', soundType: 'boing' },
  { ID: 23, name: 'Flash', description: 'Quick flash transition', soundType: 'pop' },
  { ID: 24, name: 'Curtain', description: 'Split screen reveal', soundType: 'whoosh' },
];

// Transition effect configurations
const EFFECT_ICONS: Record<string, React.ReactNode> = {
  'Fade': <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Slide': <Layers className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Zoom': <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Flip': <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Bounce': <Star className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Spin': <Sun className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Wipe': <Move className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Pop': <Circle className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Slide Up': <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Drop': <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Grow': <Circle className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Swing': <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Twist': <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Blur': <Eye className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Roll': <Orbit className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Shrink': <Shrink className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Wave': <Waves className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Iris': <Aperture className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Shutter': <Columns className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Cube': <Box className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Elastic': <StretchHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Jello': <Disc className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Flash': <CircleDot className="w-5 h-5 sm:w-6 sm:h-6" />,
  'Curtain': <FlipVertical className="w-5 h-5 sm:w-6 sm:h-6" />,
};

// Updated effect colors - more boyish: blues, teals, greens, oranges, purples (no pinks/roses)
const EFFECT_COLORS: Record<string, string> = {
  'Fade': 'from-sky-400 to-blue-500',
  'Slide': 'from-green-400 to-emerald-500',
  'Zoom': 'from-yellow-400 to-amber-500',
  'Flip': 'from-indigo-400 to-violet-500',
  'Bounce': 'from-violet-400 to-purple-500',
  'Spin': 'from-orange-400 to-amber-500',
  'Wipe': 'from-teal-400 to-cyan-500',
  'Pop': 'from-red-400 to-orange-500',
  'Slide Up': 'from-indigo-400 to-blue-500',
  'Drop': 'from-amber-400 to-yellow-500',
  'Grow': 'from-lime-400 to-green-500',
  'Swing': 'from-purple-400 to-violet-500',
  'Twist': 'from-cyan-400 to-teal-500',
  'Blur': 'from-slate-400 to-gray-500',
  'Roll': 'from-purple-400 to-indigo-500',
  'Shrink': 'from-emerald-400 to-teal-500',
  'Wave': 'from-blue-400 to-indigo-500',
  'Iris': 'from-amber-400 to-orange-500',
  'Shutter': 'from-sky-400 to-cyan-500',
  'Cube': 'from-violet-400 to-indigo-500',
  'Elastic': 'from-green-400 to-lime-500',
  'Jello': 'from-orange-400 to-red-500',
  'Flash': 'from-yellow-400 to-orange-500',
  'Curtain': 'from-blue-400 to-violet-500',
};

// More distinguishable speed values for a child to notice the difference
const SPEED_VALUES = {
  'Slow': 2000,
  'Medium': 1000,
  'Fast': 400,
};

// Width of each effect card plus gap - responsive
const EFFECT_CARD_WIDTH_MOBILE = 90 + 8; // 90px width + 8px gap
const EFFECT_CARD_WIDTH_DESKTOP = 120 + 12; // 120px width + 12px gap

// Progression constants
const EFFECTS_PER_SET = 4;
const MAX_DAILY_ATTEMPTS = 3;
const STORAGE_KEY = 'funPictureSwipes_progress';

// Helper to get today's date string
const getTodayString = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// Progress persistence interface
interface ProgressData {
  unlockedCount: number;
  attemptsToday: number;
  lastAttemptDate: string;
}

// Load progress from localStorage
const loadProgress = (): ProgressData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved) as ProgressData;
      // Reset daily attempts if it's a new day
      if (data.lastAttemptDate !== getTodayString()) {
        return {
          ...data,
          attemptsToday: 0,
          lastAttemptDate: getTodayString(),
        };
      }
      return data;
    }
  } catch (e) {
    console.error('Failed to load progress', e);
  }
  // Default: start with 4 effects unlocked
  return {
    unlockedCount: EFFECTS_PER_SET,
    attemptsToday: 0,
    lastAttemptDate: getTodayString(),
  };
};

// Save progress to localStorage
const saveProgress = (data: ProgressData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
};

// Sound generator using Web Audio API
const createSoundPlayer = () => {
  let audioContext: AudioContext | null = null;

  const getContext = () => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
  };

  const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) => {
    try {
      const ctx = getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  return {
    whoosh: () => {
      const ctx = getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    },
    pop: () => {
      playTone(600, 0.1, 'sine', 0.2);
      setTimeout(() => playTone(900, 0.08, 'sine', 0.15), 50);
    },
    boing: () => {
      const ctx = getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(150, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.25);
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    },
    spin: () => {
      const ctx = getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(300, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
      oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.4);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.4);
    },
    chime: () => {
      playTone(523, 0.3, 'sine', 0.12);
      setTimeout(() => playTone(659, 0.25, 'sine', 0.1), 100);
      setTimeout(() => playTone(784, 0.2, 'sine', 0.08), 200);
    },
    success: () => {
      playTone(523, 0.15, 'sine', 0.15);
      setTimeout(() => playTone(659, 0.15, 'sine', 0.15), 100);
      setTimeout(() => playTone(784, 0.15, 'sine', 0.15), 200);
      setTimeout(() => playTone(1047, 0.3, 'sine', 0.2), 300);
    },
    wrong: () => {
      playTone(200, 0.2, 'sine', 0.1);
    },
  };
};

// Shuffle array helper
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Quiz question interface
interface QuizQuestion {
  shownEffectIndex: number; // The effect that will be animated AND is the correct answer
  choices: number[]; // Array of effect indices to show as options
}

export default function HomePage() {
  // State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeEffectIndex, setActiveEffectIndex] = useState(0);
  const [speed, setSpeed] = useState<'Slow' | 'Medium' | 'Fast'>('Medium');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionClass, setTransitionClass] = useState('');
  const [imageKey, setImageKey] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Progression state
  const [progress, setProgress] = useState<ProgressData>(loadProgress);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizPhase, setQuizPhase] = useState<'playing' | 'answering' | 'result'>('playing');
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizImageKey, setQuizImageKey] = useState(0);
  const [quizTransitionClass, setQuizTransitionClass] = useState('');

  // Settings state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const effectsCarouselRef = useRef<HTMLDivElement>(null);
  const soundPlayerRef = useRef<ReturnType<typeof createSoundPlayer> | null>(null);

  // Initialize sound player
  useEffect(() => {
    soundPlayerRef.current = createSoundPlayer();
  }, []);

  // Save progress when it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Always use our full placeholder images array
  const displayImages = PLACEHOLDER_IMAGES;

  // Always use our full effects array to ensure all effects are available
  const displayEffects = DEFAULT_EFFECTS;

  // Calculate unlocked sets info
  const totalSets = Math.ceil(displayEffects.length / EFFECTS_PER_SET);
  const currentUnlockedSets = Math.ceil(progress.unlockedCount / EFFECTS_PER_SET);
  const allEffectsUnlocked = progress.unlockedCount >= displayEffects.length;
  const attemptsRemaining = MAX_DAILY_ATTEMPTS - progress.attemptsToday;
  const canAttemptQuiz = attemptsRemaining > 0 && !allEffectsUnlocked;

  // Get active effect from index
  const activeEffect = displayEffects[activeEffectIndex] || displayEffects[0];

  // Check if an effect is unlocked
  const isEffectUnlocked = (index: number) => index < progress.unlockedCount;

  // Play sound based on effect type
  const playSound = useCallback((soundType: string) => {
    if (!soundEnabled || !soundPlayerRef.current) return;
    
    const sounds = soundPlayerRef.current;
    switch (soundType) {
      case 'whoosh':
        sounds.whoosh();
        break;
      case 'pop':
        sounds.pop();
        break;
      case 'boing':
        sounds.boing();
        break;
      case 'spin':
        sounds.spin();
        break;
      case 'chime':
        sounds.chime();
        break;
      case 'success':
        sounds.success();
        break;
      case 'wrong':
        sounds.wrong();
        break;
      default:
        sounds.whoosh();
    }
  }, [soundEnabled]);

  // Get animation class based on effect and direction
  const getTransitionClass = useCallback((effectName: string, direction: 'next' | 'prev') => {
    const effectMap: Record<string, string> = {
      'Fade': 'animate-fade',
      'Slide': direction === 'next' ? 'animate-slide-left' : 'animate-slide-right',
      'Zoom': 'animate-zoom',
      'Flip': 'animate-flip',
      'Bounce': 'animate-bounce-in',
      'Spin': 'animate-spin-in',
      'Wipe': 'animate-wipe',
      'Pop': 'animate-pop',
      'Slide Up': direction === 'next' ? 'animate-slide-up' : 'animate-slide-down',
      'Drop': 'animate-drop',
      'Grow': 'animate-grow',
      'Swing': 'animate-swing',
      'Twist': 'animate-twist',
      'Blur': 'animate-blur',
      'Roll': 'animate-roll',
      'Shrink': 'animate-shrink',
      'Wave': 'animate-wave',
      'Iris': 'animate-iris',
      'Shutter': 'animate-shutter',
      'Cube': 'animate-cube',
      'Elastic': 'animate-elastic',
      'Jello': 'animate-jello',
      'Flash': 'animate-flash',
      'Curtain': 'animate-curtain',
    };
    return effectMap[effectName] || 'animate-fade';
  }, []);

  // Navigate images
  const handleNextImage = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setImageError(false);
    
    const transitionDuration = SPEED_VALUES[speed];
    setTransitionClass(getTransitionClass(activeEffect.name, 'next'));
    setImageKey(prev => prev + 1);
    
    // Play sound for the effect
    playSound(activeEffect.soundType);
    
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionClass('');
    }, transitionDuration);
  }, [isTransitioning, speed, displayImages.length, getTransitionClass, playSound, activeEffect.soundType, activeEffect.name]);

  const handlePrevImage = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setImageError(false);
    
    const transitionDuration = SPEED_VALUES[speed];
    setTransitionClass(getTransitionClass(activeEffect.name, 'prev'));
    setImageKey(prev => prev + 1);
    
    // Play sound for the effect
    playSound(activeEffect.soundType);
    
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionClass('');
    }, transitionDuration);
  }, [isTransitioning, speed, displayImages.length, getTransitionClass, playSound, activeEffect.soundType, activeEffect.name]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
  };

  // Speed control
  const handleSpeedChange = (newSpeed: 'Slow' | 'Medium' | 'Fast') => {
    setSpeed(newSpeed);
  };

  // Fullscreen
  const enterFullscreen = async () => {
    try {
      if (containerRef.current?.requestFullscreen) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (e) {
      console.error('Fullscreen not supported');
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) {
      console.error('Exit fullscreen failed');
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Scroll carousel to show the active effect - responsive
  const scrollToEffect = useCallback((index: number) => {
    if (effectsCarouselRef.current) {
      const isMobile = window.innerWidth < 640;
      const cardWidth = isMobile ? EFFECT_CARD_WIDTH_MOBILE : EFFECT_CARD_WIDTH_DESKTOP;
      const scrollPosition = index * cardWidth;
      effectsCarouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, []);

  // Effects carousel navigation with endless looping
  const navigateEffectLeft = useCallback(() => {
    setActiveEffectIndex((prevIndex) => {
      // Only navigate to unlocked effects
      let newIndex = prevIndex === 0 ? progress.unlockedCount - 1 : prevIndex - 1;
      if (newIndex >= progress.unlockedCount) newIndex = progress.unlockedCount - 1;
      setTimeout(() => scrollToEffect(newIndex), 0);
      return newIndex;
    });
  }, [progress.unlockedCount, scrollToEffect]);

  const navigateEffectRight = useCallback(() => {
    setActiveEffectIndex((prevIndex) => {
      // Only navigate to unlocked effects
      const newIndex = prevIndex >= progress.unlockedCount - 1 ? 0 : prevIndex + 1;
      setTimeout(() => scrollToEffect(newIndex), 0);
      return newIndex;
    });
  }, [progress.unlockedCount, scrollToEffect]);

  // Transition effect selection by clicking on effect card
  const setActiveTransition = (index: number) => {
    if (!isEffectUnlocked(index)) return; // Can't select locked effects
    setActiveEffectIndex(index);
    scrollToEffect(index);
  };

  // Quiz functions
  const generateQuizQuestions = useCallback((): QuizQuestion[] => {
    // Only use LEARNED effects (already unlocked) for both questions and choices
    const learnedEffectIndices: number[] = [];
    for (let i = 0; i < progress.unlockedCount; i++) {
      learnedEffectIndices.push(i);
    }

    // Select 4 random effects from the learned pool to quiz on
    const questionsToAsk = shuffleArray(learnedEffectIndices).slice(0, EFFECTS_PER_SET);

    // Generate questions - each question shows one effect and has 4 choices from learned effects
    const questions: QuizQuestion[] = questionsToAsk.map(shownEffectIndex => {
      // Generate 4 choices including the correct answer, all from learned effects only
      const wrongChoices = shuffleArray(
        learnedEffectIndices.filter(i => i !== shownEffectIndex)
      ).slice(0, 3);
      const allChoices = shuffleArray([shownEffectIndex, ...wrongChoices]);
      
      return {
        shownEffectIndex,
        choices: allChoices,
      };
    });

    return questions;
  }, [progress.unlockedCount]);

  const startQuiz = () => {
    const questions = generateQuizQuestions();
    setQuizQuestions(questions);
    setCurrentQuestionIndex(0);
    setQuizAnswers(new Array(questions.length).fill(null));
    setQuizPhase('playing');
    setQuizOpen(true);
    // Play the first effect after a short delay
    setTimeout(() => playQuizEffect(questions[0].shownEffectIndex), 500);
  };

  const playQuizEffect = (effectIndex: number) => {
    setQuizPhase('playing');
    const effect = displayEffects[effectIndex];
    setQuizTransitionClass(getTransitionClass(effect.name, 'next'));
    setQuizImageKey(prev => prev + 1);
    playSound(effect.soundType);
    
    // After animation completes, switch to answering phase
    setTimeout(() => {
      setQuizPhase('answering');
      setQuizTransitionClass('');
    }, SPEED_VALUES['Medium']);
  };

  const handleQuizAnswer = (choiceIndex: number) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = choiceIndex === currentQuestion.shownEffectIndex;
    
    // Update answers
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuestionIndex] = choiceIndex;
    setQuizAnswers(newAnswers);

    if (isCorrect) {
      playSound('chime');
    } else {
      playSound('wrong');
    }

    // Move to next question or show results
    if (currentQuestionIndex < quizQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setQuizPhase('playing');
      setTimeout(() => playQuizEffect(quizQuestions[nextIndex].shownEffectIndex), 500);
    } else {
      // Show results
      setQuizPhase('result');
      
      // Check if all answers are correct
      const allCorrect = newAnswers.every((answer, i) => answer === quizQuestions[i].shownEffectIndex);
      
      if (allCorrect) {
        // Unlock next set!
        playSound('success');
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
        setProgress(prev => ({
          ...prev,
          unlockedCount: Math.min(prev.unlockedCount + EFFECTS_PER_SET, displayEffects.length),
        }));
      } else {
        // Increment attempts
        setProgress(prev => ({
          ...prev,
          attemptsToday: prev.attemptsToday + 1,
          lastAttemptDate: getTodayString(),
        }));
      }
    }
  };

  const closeQuiz = () => {
    setQuizOpen(false);
    setQuizQuestions([]);
    setCurrentQuestionIndex(0);
    setQuizAnswers([]);
    setQuizPhase('playing');
  };

  // Settings/Reset functions
  const handleResetProgress = () => {
    if (confirmReset) {
      // Actually reset
      setProgress({
        unlockedCount: EFFECTS_PER_SET,
        attemptsToday: 0,
        lastAttemptDate: getTodayString(),
      });
      setActiveEffectIndex(0);
      setConfirmReset(false);
      setSettingsOpen(false);
      playSound('chime');
    } else {
      // Show confirmation
      setConfirmReset(true);
    }
  };

  const closeSettings = () => {
    setSettingsOpen(false);
    setConfirmReset(false);
  };

  const currentImage = displayImages[currentImageIndex];
  const transitionDuration = SPEED_VALUES[speed];

  // Calculate quiz results
  const quizResults = quizAnswers.map((answer, i) => answer === quizQuestions[i]?.shownEffectIndex);
  const correctCount = quizResults.filter(Boolean).length;
  const allCorrect = correctCount === quizQuestions.length && quizQuestions.length > 0;

  return (
    <div 
      ref={containerRef} 
      className={`space-y-4 sm:space-y-6 touch-manipulation ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4 sm:p-6 overflow-auto' : ''}`}
    >
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="animate-celebration text-center">
            <div className="text-5xl sm:text-6xl mb-4">🎉</div>
            <div className="text-2xl sm:text-3xl font-bold text-green-500 bg-white/90 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg">
              Great Job!
            </div>
            <div className="text-lg sm:text-xl text-green-600 mt-2 bg-white/90 px-4 sm:px-6 py-2 rounded-xl">
              New effects unlocked!
            </div>
          </div>
        </div>
      )}

      {/* Page Title with Settings */}
      <div className="text-center space-y-2 relative">
        {/* Settings Button */}
        <Button
          onClick={() => setSettingsOpen(true)}
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-gray-100 active:scale-95"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
        </Button>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-2 sm:gap-3 px-10">
          <Film className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" aria-hidden="true" />
          <span className="bg-gradient-to-r from-blue-500 via-teal-500 to-orange-400 bg-clip-text text-transparent">
            Fun Picture Swipes
          </span>
          <Clapperboard className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" aria-hidden="true" />
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">Swipe or tap arrows to see the fun happen!</p>
      </div>

      {/* Progress Bar - Only show if not all effects unlocked */}
      {!allEffectsUnlocked && (
        <div className="bg-card rounded-2xl p-3 sm:p-4 shadow-sm border space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
              <span className="font-medium text-sm sm:text-base">Effects Unlocked</span>
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {progress.unlockedCount} / {displayEffects.length}
            </span>
          </div>
          <Progress value={(progress.unlockedCount / displayEffects.length) * 100} className="h-2 sm:h-3" />
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
            <span>Set {currentUnlockedSets} of {totalSets}</span>
            <span>Attempts today: {progress.attemptsToday}/{MAX_DAILY_ATTEMPTS}</span>
          </div>
        </div>
      )}

      {/* Image Viewer */}
      <Card className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-blue-200">
        <CardContent className="p-0 relative">
          <div
            className="relative aspect-video w-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentImage.color} opacity-30`} />
            
            {/* Image */}
            {imageError ? (
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                <WifiOff className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-500 font-medium">Picture couldn't load</p>
                <p className="text-gray-400 text-sm">Check your internet connection</p>
              </div>
            ) : (
              <img
                key={`${currentImageIndex}-${imageKey}`}
                src={currentImage.url}
                alt={currentImage.title}
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                className={`relative z-10 max-h-full max-w-full object-contain rounded-xl shadow-md ${transitionClass}`}
                style={{ '--transition-duration': `${transitionDuration}ms` } as React.CSSProperties}
                onError={() => setImageError(true)}
              />
            )}

            {/* Image title overlay */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20">
              <span className="bg-white/90 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                {currentImage.title}
              </span>
            </div>

            {/* Navigation Arrows */}
            <Button
              onClick={handlePrevImage}
              variant="secondary"
              size="lg"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform bg-white/90 hover:bg-white touch-manipulation"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </Button>

            <Button
              onClick={handleNextImage}
              variant="secondary"
              size="lg"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform bg-white/90 hover:bg-white touch-manipulation"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </Button>

            {/* Image counter */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
              <span className="bg-white/90 backdrop-blur px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow">
                {currentImageIndex + 1} / {displayImages.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-2xl shadow-sm border">
        {/* Speed Control */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm font-medium text-muted-foreground">Speed:</span>
          <div className="flex gap-1.5 sm:gap-2">
            {(['Slow', 'Medium', 'Fast'] as const).map((s) => (
              <Button
                key={s}
                onClick={() => handleSpeedChange(s)}
                variant={speed === s ? 'default' : 'outline'}
                size="lg"
                className={`min-w-[60px] sm:min-w-[80px] h-10 sm:h-12 text-sm sm:text-base font-semibold rounded-xl transition-all touch-manipulation active:scale-95 ${
                  speed === s 
                    ? 'ring-2 ring-blue-400 ring-offset-2 scale-105' 
                    : 'hover:scale-105'
                }`}
              >
                {s === 'Slow' && '🐢'}
                {s === 'Medium' && '🐰'}
                {s === 'Fast' && '🚀'}
                <span className="ml-1 hidden sm:inline">{s}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-10 bg-border" />

        {/* Sound Toggle */}
        <Button
          onClick={() => setSoundEnabled(!soundEnabled)}
          variant="outline"
          size="lg"
          className={`h-10 sm:h-12 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold gap-2 touch-manipulation active:scale-95 ${
            soundEnabled ? 'bg-green-100 border-green-400 text-green-700' : 'bg-gray-100'
          }`}
          aria-label={soundEnabled ? 'Turn sound off' : 'Turn sound on'}
        >
          {soundEnabled ? (
            <><Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Sound On</span><span className="sm:hidden">On</span></>
          ) : (
            <><VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Sound Off</span><span className="sm:hidden">Off</span></>
          )}
        </Button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-10 bg-border" />

        {/* Fullscreen Toggle */}
        <Button
          onClick={isFullscreen ? exitFullscreen : enterFullscreen}
          variant="outline"
          size="lg"
          className="h-10 sm:h-12 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold gap-2 touch-manipulation active:scale-95"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <><Minimize className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Smaller</span></>
          ) : (
            <><Maximize className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Bigger</span></>
          )}
        </Button>
      </div>

      {/* Transition Effects Selector - Carousel */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <Video className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" aria-hidden="true" />
            Choose a Fun Effect
          </h2>
          {!allEffectsUnlocked && (
            <Button
              onClick={startQuiz}
              disabled={!canAttemptQuiz}
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-xl gap-1 sm:gap-2 hover:from-amber-500 hover:to-orange-600 text-xs sm:text-sm px-3 sm:px-4 h-9 sm:h-10 touch-manipulation active:scale-95"
            >
              <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Unlock More!</span>
              <span className="sm:hidden">Unlock!</span>
            </Button>
          )}
        </div>
        
        <div className="relative flex items-center gap-1 sm:gap-2">
          {/* Left Arrow - Endless loop */}
          <Button
            onClick={navigateEffectLeft}
            variant="secondary"
            size="lg"
            className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow-md hover:scale-110 active:scale-95 transition-transform bg-gradient-to-r from-blue-400 to-teal-400 text-white hover:from-blue-500 hover:to-teal-500 border-0 touch-manipulation"
            aria-label="Previous effect"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </Button>

          {/* Scrollable Effects Container */}
          <div 
            ref={effectsCarouselRef}
            className="flex gap-2 sm:gap-3 overflow-x-auto scroll-smooth py-2 px-1 flex-1 -webkit-overflow-scrolling-touch"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayEffects.map((effect, index) => {
              const isActive = activeEffectIndex === index;
              const isUnlocked = isEffectUnlocked(index);
              const colorClass = EFFECT_COLORS[effect.name] || 'from-gray-400 to-gray-500';
              
              return (
                <Button
                  key={effect.ID}
                  onClick={() => setActiveTransition(index)}
                  variant="outline"
                  disabled={!isUnlocked}
                  aria-disabled={!isUnlocked}
                  className={`shrink-0 h-auto min-h-[80px] sm:min-h-[100px] w-[90px] sm:w-[120px] flex flex-col items-center justify-center gap-1 sm:gap-2 p-2 sm:p-4 rounded-2xl transition-all touch-manipulation active:scale-95 ${
                    !isUnlocked
                      ? 'opacity-50 grayscale cursor-not-allowed bg-gray-100 border-gray-300'
                      : isActive
                      ? `ring-4 ring-blue-400 ring-offset-2 scale-105 bg-gradient-to-br ${colorClass} text-white border-transparent shadow-lg`
                      : 'hover:scale-105 hover:shadow-md bg-card'
                  }`}
                  aria-label={isUnlocked ? `Select ${effect.name} transition effect` : `${effect.name} - locked`}
                  aria-pressed={isActive}
                >
                  {isUnlocked ? (
                    <>
                      <div className={`p-1.5 sm:p-2 rounded-xl ${
                        isActive 
                          ? 'bg-white/20' 
                          : `bg-gradient-to-br ${colorClass} text-white`
                      }`}>
                        {EFFECT_ICONS[effect.name] || <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />}
                      </div>
                      <span className="font-bold text-xs sm:text-base">{effect.name}</span>
                      {isActive && (
                        <span className="text-[10px] sm:text-xs opacity-80">Selected!</span>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="p-1.5 sm:p-2 rounded-xl bg-gray-300 text-gray-500">
                        <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="font-bold text-xs sm:text-base text-gray-500">???</span>
                      <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    </>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Right Arrow - Endless loop */}
          <Button
            onClick={navigateEffectRight}
            variant="secondary"
            size="lg"
            className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow-md hover:scale-110 active:scale-95 transition-transform bg-gradient-to-r from-teal-400 to-blue-400 text-white hover:from-teal-500 hover:to-blue-500 border-0 touch-manipulation"
            aria-label="Next effect"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </Button>
        </div>

        {/* Locked effects hint - Only show if not all effects unlocked */}
        {!allEffectsUnlocked && (
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            🔒 {displayEffects.length - progress.unlockedCount} more effects to discover! Pass the quiz to unlock them.
          </p>
        )}
      </div>

      {/* Fun tip */}
      <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-sky-100 via-teal-100 to-orange-100 rounded-2xl">
        <p className="text-muted-foreground text-xs sm:text-base">
          💡 <span className="font-medium">Tip:</span> Try different effects and speeds to see what looks coolest!
        </p>
      </div>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={(open) => !open && closeSettings()}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl sm:text-2xl flex items-center justify-center gap-2">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              Settings
            </DialogTitle>
            <DialogDescription className="text-center">
              Manage your app settings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 py-4">
            {/* Reset Progress Option */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <ResetIcon className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm sm:text-base">Reset Progress</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Start over with only the first 4 effects unlocked.
                  </p>
                </div>
              </div>
              
              {/* Current Progress */}
              <div className="text-xs sm:text-sm text-muted-foreground bg-white rounded-lg p-2 text-center">
                {allEffectsUnlocked ? (
                  <span className="text-green-600 font-medium">🎉 Congratulations! You've unlocked all effects!</span>
                ) : (
                  <span>Current progress: {progress.unlockedCount}/{displayEffects.length} effects unlocked</span>
                )}
              </div>

              {/* Reset Button with Confirmation */}
              {confirmReset ? (
                <div className="flex gap-2">
                  <Button
                    onClick={() => setConfirmReset(false)}
                    variant="outline"
                    className="flex-1 rounded-xl text-sm h-10 touch-manipulation active:scale-95"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleResetProgress}
                    variant="destructive"
                    className="flex-1 rounded-xl text-sm h-10 touch-manipulation active:scale-95"
                  >
                    Yes, Reset
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleResetProgress}
                  variant="outline"
                  className="w-full rounded-xl text-sm h-10 border-amber-300 text-amber-700 hover:bg-amber-50 touch-manipulation active:scale-95"
                >
                  Reset Progress
                </Button>
              )}
            </div>

            {/* Close Button */}
            <Button
              onClick={closeSettings}
              className="w-full rounded-xl h-11 sm:h-12 text-sm sm:text-base touch-manipulation active:scale-95"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Dialog */}
      <Dialog open={quizOpen} onOpenChange={(open) => !open && closeQuiz()}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl" showCloseButton={quizPhase === 'result'}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl sm:text-2xl flex items-center justify-center gap-2">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
              Effect Quiz!
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
            </DialogTitle>
            <DialogDescription className="text-center">
              {quizPhase === 'result' 
                ? 'Here are your results!' 
                : `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}
            </DialogDescription>
          </DialogHeader>

          {quizPhase !== 'result' && quizQuestions[currentQuestionIndex] && (
            <div className="space-y-4 sm:space-y-6">
              {/* Quiz Animation Display */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-sky-200 to-blue-300">
                <img
                  key={quizImageKey}
                  src={PLACEHOLDER_IMAGES[0].url}
                  alt="Quiz image"
                  className={`w-full h-full object-cover ${quizTransitionClass}`}
                  style={{ '--transition-duration': `${SPEED_VALUES['Medium']}ms` } as React.CSSProperties}
                />
                {quizPhase === 'playing' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="bg-white/90 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-bold">
                      <span className="hidden sm:inline">Watch the effect! 👀</span>
                      <span className="sm:hidden">Watch! 👀</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Replay button */}
              {quizPhase === 'answering' && (
                <Button
                  onClick={() => playQuizEffect(quizQuestions[currentQuestionIndex].shownEffectIndex)}
                  variant="outline"
                  className="w-full rounded-xl h-10 sm:h-11 text-sm sm:text-base touch-manipulation active:scale-95"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Watch Again
                </Button>
              )}

              {/* Question */}
              <div className="text-center">
                <p className="text-base sm:text-lg font-bold">Which effect was that?</p>
              </div>

              {/* Answer choices */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {quizQuestions[currentQuestionIndex].choices.map((choiceIndex) => {
                  const effect = displayEffects[choiceIndex];
                  const colorClass = EFFECT_COLORS[effect.name] || 'from-gray-400 to-gray-500';
                  return (
                    <Button
                      key={choiceIndex}
                      onClick={() => handleQuizAnswer(choiceIndex)}
                      disabled={quizPhase !== 'answering'}
                      variant="outline"
                      className={`h-auto py-3 sm:py-4 flex flex-col items-center gap-1 sm:gap-2 rounded-xl transition-all touch-manipulation active:scale-95 ${
                        quizPhase === 'answering' ? 'hover:shadow-md hover:scale-105' : 'opacity-50'
                      }`}
                    >
                      <div className={`p-1.5 sm:p-2 rounded-xl bg-gradient-to-br ${colorClass} text-white`}>
                        {EFFECT_ICONS[effect.name] || <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </div>
                      <span className="font-bold text-xs sm:text-base">{effect.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Results */}
          {quizPhase === 'result' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Result summary */}
              <div className={`text-center p-4 sm:p-6 rounded-2xl ${
                allCorrect 
                  ? 'bg-gradient-to-br from-green-100 to-emerald-200' 
                  : 'bg-gradient-to-br from-amber-100 to-orange-200'
              }`}>
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">
                  {allCorrect ? '🎉' : '💪'}
                </div>
                <p className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                  {allCorrect ? 'Perfect!' : 'Good Try!'}
                </p>
                <p className="text-base sm:text-lg">
                  You got {correctCount} out of {quizQuestions.length} correct!
                </p>
                {allCorrect && (
                  <p className="text-green-600 font-bold mt-2 text-sm sm:text-base">
                    {EFFECTS_PER_SET} new effects unlocked! 🔓
                  </p>
                )}
              </div>

              {/* Answer breakdown */}
              <div className="space-y-2">
                {quizQuestions.map((q, i) => {
                  const correct = quizResults[i];
                  const effect = displayEffects[q.shownEffectIndex];
                  return (
                    <div 
                      key={i} 
                      className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl text-sm sm:text-base ${
                        correct ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      {correct ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0" />
                      )}
                      <span className="font-medium">{effect.name}</span>
                      {!correct && quizAnswers[i] !== null && (
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          (You picked: {displayEffects[quizAnswers[i]!].name})
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 sm:gap-3">
                <Button
                  onClick={closeQuiz}
                  variant="outline"
                  className="flex-1 rounded-xl h-10 sm:h-11 text-sm sm:text-base touch-manipulation active:scale-95"
                >
                  Close
                </Button>
                {!allCorrect && canAttemptQuiz && attemptsRemaining > 1 && (
                  <Button
                    onClick={() => {
                      closeQuiz();
                      setTimeout(startQuiz, 300);
                    }}
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white h-10 sm:h-11 text-sm sm:text-base touch-manipulation active:scale-95"
                  >
                    Try Again ({attemptsRemaining - 1} left)
                  </Button>
                )}
              </div>

              {/* Out of attempts message */}
              {!allCorrect && attemptsRemaining <= 1 && (
                <div className="text-center p-3 sm:p-4 bg-amber-50 rounded-xl">
                  <p className="text-amber-700 font-medium text-sm sm:text-base">
                    Great effort today! 🌟 Come back tomorrow for more tries!
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
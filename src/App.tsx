import { useCallback, useMemo, useState } from 'react';
import {
  addCustomTopic,
  findCustomTopic,
  getAllCustomTopics,
  getCustomTopics,
  pickRandomCustomTopic,
  removeCustomTopic,
  updateCustomTopic,
  type CustomTopicBank,
  type SavedTopic,
} from './lib/customTopics';
import {
  addPenalty,
  findPenalty,
  getAllPenalties,
  getPenalties,
  removePenalty,
  updatePenalty,
  type PenaltyBank,
  type SavedPenalty,
} from './lib/customPenalties';
import { createPlayers } from './lib/game';
import type { PenaltySide } from './data/penalties';
import type { Category, GameSettings, Player, Screen, TopicPair } from './types';
import { TopScreen } from './screens/TopScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { NamesScreen } from './screens/NamesScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { CustomTopicCategoryScreen } from './screens/CustomTopicCategoryScreen';
import { CustomTopicEditorScreen } from './screens/CustomTopicEditorScreen';
import { CustomTopicListScreen } from './screens/CustomTopicListScreen';
import { CustomTopicEditScreen } from './screens/CustomTopicEditScreen';
import { ConfirmScreen } from './screens/ConfirmScreen';
import { RevealScreen } from './screens/RevealScreen';
import { ReadyScreen } from './screens/ReadyScreen';
import { TalkScreen } from './screens/TalkScreen';
import { VoteScreen } from './screens/VoteScreen';
import { ResultScreen } from './screens/ResultScreen';
import { PenaltyScreen } from './screens/PenaltyScreen';
import { PenaltySideScreen } from './screens/PenaltySideScreen';
import { PenaltyCreateScreen } from './screens/PenaltyCreateScreen';
import { PenaltyListScreen } from './screens/PenaltyListScreen';
import { PenaltyEditScreen } from './screens/PenaltyEditScreen';
import { DataSyncScreen } from './screens/DataSyncScreen';
import { HowtoScreen } from './screens/HowtoScreen';

const INITIAL_SETTINGS: GameSettings = {
  playerCount: 3,
  wolfCount: 1,
  talkMinutes: 3,
};

function buildEmptyNames(count: number, prev: string[] = []): string[] {
  return Array.from({ length: count }, (_, i) => prev[i] ?? '');
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('top');
  const [returnTo, setReturnTo] = useState<Screen>('top');
  const [categoryBackTo, setCategoryBackTo] = useState<Screen>('names');
  const [settings, setSettings] = useState<GameSettings>(INITIAL_SETTINGS);
  const [names, setNames] = useState<string[]>(() => buildEmptyNames(3));
  const [category, setCategory] = useState<Category | null>(null);
  const [topic, setTopic] = useState<TopicPair | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editorCategory, setEditorCategory] = useState<Category | null>(null);
  const [editorTopics, setEditorTopics] = useState<SavedTopic[]>([]);
  const [listTopics, setListTopics] = useState<CustomTopicBank>(() => getAllCustomTopics());
  const [editingTopic, setEditingTopic] = useState<SavedTopic | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editBackTo, setEditBackTo] = useState<Screen>('customTopicList');
  const [penaltySide, setPenaltySide] = useState<PenaltySide | null>(null);
  const [penaltyItems, setPenaltyItems] = useState<SavedPenalty[]>([]);
  const [listPenalties, setListPenalties] = useState<PenaltyBank>(() => getAllPenalties());
  const [editingPenalty, setEditingPenalty] = useState<SavedPenalty | null>(null);
  const [editingPenaltySide, setEditingPenaltySide] = useState<PenaltySide | null>(null);
  const [penaltyEditBackTo, setPenaltyEditBackTo] = useState<Screen>('penaltyList');

  const currentPlayer = players[currentPlayerIndex];
  const namesReady = names.every((n) => n.trim().length > 0);

  const refreshEditorTopics = (cat: Category) => {
    setEditorTopics(getCustomTopics(cat));
  };

  const refreshListTopics = () => {
    setListTopics(getAllCustomTopics());
  };

  const refreshPenaltyItems = (side: PenaltySide) => {
    setPenaltyItems(getPenalties(side));
  };

  const refreshListPenalties = () => {
    setListPenalties(getAllPenalties());
  };

  const openTopicEdit = (cat: Category, id: string, backTo: Screen) => {
    const found = findCustomTopic(cat, id);
    if (!found) return;
    setEditingCategory(cat);
    setEditingTopic(found);
    setEditBackTo(backTo);
    setScreen('customTopicEdit');
  };

  const openPenaltyEdit = (side: PenaltySide, id: string, backTo: Screen) => {
    const found = findPenalty(side, id);
    if (!found) return;
    setEditingPenaltySide(side);
    setEditingPenalty(found);
    setPenaltyEditBackTo(backTo);
    setScreen('penaltyEdit');
  };

  const openHowto = (from: Screen) => {
    setReturnTo(from);
    setScreen('howto');
  };

  const openCategoryChange = (from: Screen) => {
    setCategoryBackTo(from);
    setError(null);
    setScreen('category');
  };

  const handleSettingsChange = (next: GameSettings) => {
    setSettings(next);
    setNames((prev) => buildEmptyNames(next.playerCount, prev));
  };

  const startWithTopic = useCallback(
    (pair: TopicPair, cat: Category) => {
      const nextPlayers = createPlayers(names, settings, pair);
      setTopic(pair);
      setPlayers(nextPlayers);
      setCurrentPlayerIndex(0);
      setRemainingSeconds(settings.talkMinutes * 60);
      setScreen('confirm');
      setCategory(cat);
    },
    [names, settings],
  );

  const handleCategoryNext = async () => {
    if (!category) {
      setError('カテゴリを選んでください');
      return;
    }
    setError(null);

    const pair = pickRandomCustomTopic(category);
    if (!pair) {
      setError('このカテゴリのオリジナルお題がありません。先に作成してください。');
      return;
    }

    setGenerating(true);
    await new Promise((r) => setTimeout(r, 300));
    startWithTopic(pair, category);
    setGenerating(false);
  };

  const handleGotIt = () => {
    if (currentPlayerIndex >= players.length - 1) {
      setScreen('ready');
      return;
    }
    setCurrentPlayerIndex((i) => i + 1);
    setScreen('confirm');
  };

  const handleNextTopic = async () => {
    if (!category) {
      setScreen('category');
      return;
    }

    setGenerating(true);
    try {
      const pair = pickRandomCustomTopic(category, topic ?? undefined);
      if (!pair) {
        setError('このカテゴリのオリジナルお題がありません。');
        setScreen('category');
        return;
      }
      startWithTopic(pair, category);
    } finally {
      setGenerating(false);
    }
  };

  const handleTick = useCallback(() => {
    setRemainingSeconds((s) => {
      if (s <= 1) {
        setScreen('vote');
        return 0;
      }
      return s - 1;
    });
  }, []);

  const resetToTop = () => {
    setScreen('top');
    setCategory(null);
    setTopic(null);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setError(null);
  };

  const view = useMemo(() => {
    switch (screen) {
      case 'top':
        return (
          <TopScreen
            onStart={() => setScreen('settings')}
            onCreateTopics={() => setScreen('customTopicCategory')}
            onViewTopics={() => {
              refreshListTopics();
              setScreen('customTopicList');
            }}
            onCreatePenalties={() => setScreen('penaltySide')}
            onViewPenalties={() => {
              refreshListPenalties();
              setScreen('penaltyList');
            }}
            onDataSync={() => setScreen('dataSync')}
            onHowto={() => openHowto('top')}
          />
        );
      case 'dataSync':
        return <DataSyncScreen onHome={resetToTop} />;
      case 'penaltySide':
        return (
          <PenaltySideScreen
            onSelect={(side) => {
              setPenaltySide(side);
              refreshPenaltyItems(side);
              setScreen('penaltyCreate');
            }}
            onHome={resetToTop}
          />
        );
      case 'penaltyCreate':
        return penaltySide ? (
          <PenaltyCreateScreen
            side={penaltySide}
            penalties={penaltyItems}
            onAdd={(text) => {
              addPenalty(penaltySide, text);
              refreshPenaltyItems(penaltySide);
            }}
            onEdit={(id) => openPenaltyEdit(penaltySide, id, 'penaltyCreate')}
            onRemove={(id) => {
              removePenalty(penaltySide, id);
              refreshPenaltyItems(penaltySide);
            }}
            onBack={() => setScreen('penaltySide')}
            onHome={resetToTop}
          />
        ) : null;
      case 'penaltyList':
        return (
          <PenaltyListScreen
            penaltiesBySide={listPenalties}
            onEdit={(side, id) => openPenaltyEdit(side, id, 'penaltyList')}
            onRemove={(side, id) => {
              removePenalty(side, id);
              refreshListPenalties();
            }}
            onCreate={() => setScreen('penaltySide')}
            onHome={resetToTop}
          />
        );
      case 'penaltyEdit':
        return editingPenaltySide && editingPenalty ? (
          <PenaltyEditScreen
            key={editingPenalty.id}
            side={editingPenaltySide}
            penalty={editingPenalty}
            onSave={(text) => {
              updatePenalty(editingPenaltySide, editingPenalty.id, text);
              refreshListPenalties();
              if (penaltySide) refreshPenaltyItems(penaltySide);
              setEditingPenalty(null);
              setEditingPenaltySide(null);
              setScreen(penaltyEditBackTo);
            }}
            onBack={() => {
              setEditingPenalty(null);
              setEditingPenaltySide(null);
              setScreen(penaltyEditBackTo);
            }}
          />
        ) : null;
      case 'customTopicCategory':
        return (
          <CustomTopicCategoryScreen
            onSelect={(cat) => {
              setEditorCategory(cat);
              refreshEditorTopics(cat);
              setScreen('customTopicEditor');
            }}
            onHome={resetToTop}
          />
        );
      case 'customTopicEditor':
        return editorCategory ? (
          <CustomTopicEditorScreen
            category={editorCategory}
            topics={editorTopics}
            onAdd={(topic) => {
              addCustomTopic(editorCategory, topic);
              refreshEditorTopics(editorCategory);
            }}
            onEdit={(id) => openTopicEdit(editorCategory, id, 'customTopicEditor')}
            onRemove={(id) => {
              removeCustomTopic(editorCategory, id);
              refreshEditorTopics(editorCategory);
            }}
            onBack={() => setScreen('customTopicCategory')}
            onHome={resetToTop}
          />
        ) : null;
      case 'customTopicList':
        return (
          <CustomTopicListScreen
            topicsByCategory={listTopics}
            onEdit={(cat, id) => openTopicEdit(cat, id, 'customTopicList')}
            onRemove={(cat, id) => {
              removeCustomTopic(cat, id);
              refreshListTopics();
            }}
            onCreate={() => setScreen('customTopicCategory')}
            onHome={resetToTop}
          />
        );
      case 'customTopicEdit':
        return editingCategory && editingTopic ? (
          <CustomTopicEditScreen
            key={editingTopic.id}
            category={editingCategory}
            topic={editingTopic}
            onSave={(topic) => {
              updateCustomTopic(editingCategory, editingTopic.id, topic);
              refreshListTopics();
              if (editorCategory) refreshEditorTopics(editorCategory);
              setEditingTopic(null);
              setEditingCategory(null);
              setScreen(editBackTo);
            }}
            onBack={() => {
              setEditingTopic(null);
              setEditingCategory(null);
              setScreen(editBackTo);
            }}
          />
        ) : null;
      case 'settings':
        return (
          <SettingsScreen
            settings={settings}
            onChange={handleSettingsChange}
            onNext={() => setScreen('names')}
            onHowto={() => openHowto('settings')}
            onHome={resetToTop}
          />
        );
      case 'names':
        return (
          <NamesScreen
            names={names}
            onChange={setNames}
            onNext={() => {
              if (!namesReady) return;
              setCategoryBackTo('names');
              setScreen('category');
            }}
            onBack={() => setScreen('settings')}
            canNext={namesReady}
          />
        );
      case 'category':
        return (
          <CategoryScreen
            category={category}
            generating={generating}
            error={error}
            onSelectCategory={(c) => {
              setCategory(c);
              setError(null);
            }}
            onNext={handleCategoryNext}
            onBack={() => setScreen(categoryBackTo)}
          />
        );
      case 'confirm':
        return currentPlayer ? (
          <ConfirmScreen player={currentPlayer} onYes={() => setScreen('reveal')} />
        ) : null;
      case 'reveal':
        return currentPlayer ? (
          <RevealScreen player={currentPlayer} onGotIt={handleGotIt} />
        ) : null;
      case 'ready':
        return category ? (
          <ReadyScreen
            category={category}
            onStart={() => {
              setRemainingSeconds(settings.talkMinutes * 60);
              setScreen('talk');
            }}
          />
        ) : null;
      case 'talk':
        return (
          <TalkScreen
            remainingSeconds={remainingSeconds}
            totalSeconds={settings.talkMinutes * 60}
            onTick={handleTick}
            onForceEnd={() => setScreen('vote')}
          />
        );
      case 'vote':
        return category ? (
          <VoteScreen category={category} onReveal={() => setScreen('result')} />
        ) : null;
      case 'result':
        return category ? (
          <ResultScreen
            category={category}
            players={players}
            onPenalty={() => setScreen('penalty')}
          />
        ) : null;
      case 'penalty':
        return (
          <PenaltyScreen
            players={players}
            onNextTopic={handleNextTopic}
            onChangeCategory={() => openCategoryChange('penalty')}
            onHome={resetToTop}
          />
        );
      case 'howto':
        return <HowtoScreen onBack={() => setScreen(returnTo)} />;
      default:
        return null;
    }
  }, [
    screen,
    settings,
    names,
    namesReady,
    category,
    categoryBackTo,
    generating,
    error,
    currentPlayer,
    currentPlayerIndex,
    remainingSeconds,
    players,
    returnTo,
    topic,
    editorCategory,
    editorTopics,
    listTopics,
    editingTopic,
    editingCategory,
    editBackTo,
    penaltySide,
    penaltyItems,
    listPenalties,
    editingPenalty,
    editingPenaltySide,
    penaltyEditBackTo,
    handleTick,
  ]);

  return <div className="app-root">{view}</div>;
}

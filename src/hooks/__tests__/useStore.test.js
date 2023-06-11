import { renderHook } from '@testing-library/react';
import { useStore } from '../useStore';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useStore', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  test('initial state', () => {
    const { result } = renderHook(() => useStore());
    const store = result.current;

    expect(store.summary).toBe('');
    expect(store.loading).toBe(false);
    expect(store.lastFechtTime).toBeNull();
  });

  test('set_summary', () => {
    const { result } = renderHook(() => useStore());
    const store = result.current;

    store.set_summary('Summary');

    setTimeout(() => {
        expect(store.summary).toBe('Summary');
    },300)
  });

  test('set_loading', () => {
    const { result } = renderHook(() => useStore());
    const store = result.current;

    store.set_loading(true);

    setTimeout(() => {
        expect(store.loading).toBe(true);
    },300)

  });

  test('addLastFechTime', () => {
    const { result } = renderHook(() => useStore());
    const store = result.current;

    const date = new Date();

    store.addLastFechTime(date,[]);

    setTimeout(() => {
        expect(store.lastFechtTime).toBe(date);
        expect(store.podcasts).toBe([]);
    },300)

  });

  test('addEpisode', () => {
    const { result } = renderHook(() => useStore());
    const store = result.current;

    store.addEpisode({
        song: "Song.mp3",
        description: "Description",
        detail: "Detail",
        title: "Title",
    });

    setTimeout(() => {
        expect(store.podcast_title).toBe("Title");
        expect(store.podcast_description).toBe("Description");
        expect(store.song).toBe("Song.mp3");
        expect(store.podcast_detail).toBe("Detail");
    },300)
  });

  test('clear', () => {
    const { result } = renderHook(() => useStore());
    const store = result.current;

    store.addEpisode({
        song: "Song.mp3",
        description: "Description",
        detail: "Detail",
        title: "Title",
    });

    store.clear();

    setTimeout(() => {
        expect(store.podcast_title).toBe("");
        expect(store.podcast_description).toBe("");
        expect(store.song).toBe("");
        expect(store.podcast_detail).toBe("");
    },300)

  });
});

/**
 * Firestore 서버사이드 데이터 조회 함수 (Admin SDK)
 * Server Component 전용 — 클라이언트에서 import 금지
 */

import { getAdminDb } from './firebase-admin';
import type {
  Algorithm,
  Theme,
  Problem,
  Concept,
  Solution,
  CSCategory,
  CSTopic,
  CSQuestion,
} from '@/types/firestore';
import type { Timestamp } from 'firebase-admin/firestore';

// Firestore Timestamp → ISO string 변환 헬퍼
function toPlain<T>(doc: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(doc)) {
    if (val && typeof val === 'object' && 'toDate' in val) {
      result[key] = (val as Timestamp).toDate().toISOString();
    } else {
      result[key] = val;
    }
  }
  return result as T;
}

// ── Algorithms ────────────────────────────────────────────────────

export async function getAlgorithms(): Promise<Algorithm[]> {
  const db = getAdminDb();
  const snap = await db.collection('algorithms').orderBy('order').get();
  return snap.docs.map((d) => toPlain<Algorithm>(d.data() as Record<string, unknown>));
}

export async function getAlgorithmBySlug(slug: string): Promise<Algorithm | null> {
  const db = getAdminDb();
  const snap = await db.collection('algorithms').doc(slug).get();
  if (!snap.exists) return null;
  return toPlain<Algorithm>(snap.data() as Record<string, unknown>);
}

// ── Themes ────────────────────────────────────────────────────────

export async function getThemesByAlgorithmSlug(algorithmSlug: string): Promise<Theme[]> {
  const db = getAdminDb();
  const snap = await db
    .collection('themes')
    .where('algorithmSlug', '==', algorithmSlug)
    .get();
  const themes = snap.docs.map((d) => toPlain<Theme>(d.data() as Record<string, unknown>));
  return themes.sort((a, b) => a.order - b.order);
}

export async function getThemeBySlug(slug: string): Promise<Theme | null> {
  const db = getAdminDb();
  const snap = await db.collection('themes').doc(slug).get();
  if (!snap.exists) return null;
  return toPlain<Theme>(snap.data() as Record<string, unknown>);
}

export async function getAllThemes(): Promise<Theme[]> {
  const db = getAdminDb();
  const snap = await db.collection('themes').get();
  const themes = snap.docs.map((d) => toPlain<Theme>(d.data() as Record<string, unknown>));
  return themes.sort((a, b) =>
    a.algorithmSlug !== b.algorithmSlug
      ? a.algorithmSlug.localeCompare(b.algorithmSlug)
      : a.order - b.order,
  );
}

// ── Problems ──────────────────────────────────────────────────────

export async function getProblemsByThemeSlug(themeSlug: string): Promise<Problem[]> {
  const db = getAdminDb();
  const snap = await db
    .collection('problems')
    .where('themeSlug', '==', themeSlug)
    .get();
  const problems = snap.docs.map((d) => toPlain<Problem>(d.data() as Record<string, unknown>));
  return problems.sort((a, b) => a.difficulty - b.difficulty);
}

export async function getProblemById(id: string): Promise<Problem | null> {
  const db = getAdminDb();
  const snap = await db.collection('problems').doc(id).get();
  if (!snap.exists) return null;
  return toPlain<Problem>(snap.data() as Record<string, unknown>);
}

export async function getAllProblems(): Promise<Problem[]> {
  const db = getAdminDb();
  const snap = await db.collection('problems').get();
  const problems = snap.docs.map((d) => toPlain<Problem>(d.data() as Record<string, unknown>));
  return problems.sort((a, b) =>
    a.algorithmSlug !== b.algorithmSlug
      ? a.algorithmSlug.localeCompare(b.algorithmSlug)
      : a.difficulty - b.difficulty,
  );
}

// ── Concepts ──────────────────────────────────────────────────────

export async function getConceptByThemeSlug(themeSlug: string): Promise<Concept | null> {
  const db = getAdminDb();
  const snap = await db.collection('concepts').doc(themeSlug).get();
  if (!snap.exists) return null;
  return toPlain<Concept>(snap.data() as Record<string, unknown>);
}

// ── Solutions ─────────────────────────────────────────────────────

export async function getSolutionsByProblemId(problemId: string): Promise<Solution[]> {
  const db = getAdminDb();
  const snap = await db.collection('solutions').where('problemId', '==', problemId).get();
  return snap.docs.map((d) => toPlain<Solution>(d.data() as Record<string, unknown>));
}

// ── CS Categories ─────────────────────────────────────────────────

export async function getCSCategories(): Promise<CSCategory[]> {
  const db = getAdminDb();
  const snap = await db.collection('cs-categories').orderBy('order').get();
  return snap.docs.map((d) => toPlain<CSCategory>(d.data() as Record<string, unknown>));
}

export async function getCSCategoryBySlug(slug: string): Promise<CSCategory | null> {
  const db = getAdminDb();
  const snap = await db.collection('cs-categories').doc(slug).get();
  if (!snap.exists) return null;
  return toPlain<CSCategory>(snap.data() as Record<string, unknown>);
}

// ── CS Topics ─────────────────────────────────────────────────────

export async function getCSTopicsByCategorySlug(categorySlug: string): Promise<CSTopic[]> {
  const db = getAdminDb();
  const snap = await db
    .collection('cs-topics')
    .where('categorySlug', '==', categorySlug)
    .get();
  const topics = snap.docs.map((d) => toPlain<CSTopic>(d.data() as Record<string, unknown>));
  return topics.sort((a, b) => a.order - b.order);
}

export async function getCSTopicById(id: string): Promise<CSTopic | null> {
  const db = getAdminDb();
  const snap = await db.collection('cs-topics').doc(id).get();
  if (!snap.exists) return null;
  return toPlain<CSTopic>(snap.data() as Record<string, unknown>);
}

export async function getAllCSTopics(): Promise<CSTopic[]> {
  const db = getAdminDb();
  const snap = await db.collection('cs-topics').get();
  const topics = snap.docs.map((d) => toPlain<CSTopic>(d.data() as Record<string, unknown>));
  return topics.sort((a, b) =>
    a.categorySlug !== b.categorySlug
      ? a.categorySlug.localeCompare(b.categorySlug)
      : a.order - b.order,
  );
}

// ── CS Questions ──────────────────────────────────────────────────

export async function getCSQuestionsByTopicId(topicId: string): Promise<CSQuestion[]> {
  const db = getAdminDb();
  const snap = await db
    .collection('cs-questions')
    .where('topicId', '==', topicId)
    .get();
  const questions = snap.docs.map((d) => toPlain<CSQuestion>(d.data() as Record<string, unknown>));
  return questions.sort((a, b) => a.order - b.order);
}

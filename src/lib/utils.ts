import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProblemUrl(platform: string, platformId: string): string {
  switch (platform) {
    case 'baekjoon':
      return `https://www.acmicpc.net/problem/${platformId}`;
    case 'programmers':
      return `https://school.programmers.co.kr/learn/courses/30/lessons/${platformId}`;
    case 'leetcode':
      return `https://leetcode.com/problems/${platformId}`;
    default:
      return '#';
  }
}

export function getPlatformColor(platform: string): string {
  switch (platform) {
    case '백준':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case '프로그래머스':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'LeetCode':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

export function getDifficultyColor(difficulty: string): string {
  if (
    difficulty.includes('브론즈') ||
    difficulty === 'Level 1' ||
    difficulty === 'Easy'
  ) {
    return 'bg-amber-100 text-amber-700 border-amber-200';
  }
  if (difficulty.includes('실버') || difficulty === 'Level 2') {
    return 'bg-gray-100 text-gray-700 border-gray-200';
  }
  if (
    difficulty.includes('골드') ||
    difficulty === 'Level 3' ||
    difficulty === 'Medium'
  ) {
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  }
  if (
    difficulty.includes('플래') ||
    difficulty === 'Level 4' ||
    difficulty === 'Hard'
  ) {
    return 'bg-red-100 text-red-700 border-red-200';
  }
  return 'bg-green-100 text-green-700 border-green-200';
}

export function getThemeDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case '입문':
    case '기초':
      return 'bg-green-100 text-green-700 border-green-200';
    case '중급':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case '고급':
    case '심화':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

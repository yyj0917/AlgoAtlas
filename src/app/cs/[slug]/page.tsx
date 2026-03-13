import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  ArrowRight,
  Cpu,
  Network,
  Database,
  Boxes,
  HardDrive,
  Cog,
  Brain,
  Server,
  Shield,
  Cloud,
  BookOpen,
  FileQuestion,
} from 'lucide-react';

import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getThemeDifficultyColor } from '@/lib/utils';

const csCategories: Record<
  string,
  {
    name: string;
    englishName: string;
    description: string;
    icon: typeof Cpu;
    topics: Array<{
      slug: string;
      name: string;
      englishName: string;
      description: string;
      questionCount: number;
      difficulty: '기초' | '중급' | '심화';
    }>;
  }
> = {
  'operating-system': {
    name: '운영체제',
    englishName: 'Operating System',
    description: '프로세스, 메모리, 스케줄링 등 OS의 핵심 개념을 학습합니다.',
    icon: Cpu,
    topics: [
      {
        slug: 'process-thread',
        name: '프로세스와 스레드',
        englishName: 'Process & Thread',
        description: '프로세스와 스레드의 개념, 차이점, 생명주기',
        questionCount: 15,
        difficulty: '기초',
      },
      {
        slug: 'cpu-scheduling',
        name: 'CPU 스케줄링',
        englishName: 'CPU Scheduling',
        description: 'FCFS, SJF, Priority, Round Robin 등 스케줄링 알고리즘',
        questionCount: 12,
        difficulty: '중급',
      },
      {
        slug: 'memory-management',
        name: '메모리 관리',
        englishName: 'Memory Management',
        description: '페이징, 세그멘테이션, 가상 메모리',
        questionCount: 18,
        difficulty: '중급',
      },
      {
        slug: 'deadlock',
        name: '데드락',
        englishName: 'Deadlock',
        description: '데드락 조건, 예방, 회피, 탐지, 회복',
        questionCount: 10,
        difficulty: '중급',
      },
      {
        slug: 'synchronization',
        name: '동기화',
        englishName: 'Synchronization',
        description: '뮤텍스, 세마포어, 모니터, 조건 변수',
        questionCount: 14,
        difficulty: '심화',
      },
      {
        slug: 'file-system',
        name: '파일 시스템',
        englishName: 'File System',
        description: '파일 시스템 구조, 디렉토리, 할당 방식',
        questionCount: 8,
        difficulty: '중급',
      },
      {
        slug: 'io-system',
        name: '입출력 시스템',
        englishName: 'I/O System',
        description: '입출력 장치, 버퍼링, 인터럽트',
        questionCount: 6,
        difficulty: '기초',
      },
    ],
  },
  network: {
    name: '네트워크',
    englishName: 'Network',
    description: 'TCP/IP, HTTP, DNS 등 네트워크 프로토콜과 통신을 학습합니다.',
    icon: Network,
    topics: [
      {
        slug: 'osi-7-layer',
        name: 'OSI 7계층',
        englishName: 'OSI 7 Layer',
        description: 'OSI 모델의 각 계층과 역할',
        questionCount: 10,
        difficulty: '기초',
      },
      {
        slug: 'tcp-ip',
        name: 'TCP/IP',
        englishName: 'TCP/IP',
        description: 'TCP/IP 프로토콜 스택과 동작 원리',
        questionCount: 15,
        difficulty: '중급',
      },
      {
        slug: 'http-https',
        name: 'HTTP/HTTPS',
        englishName: 'HTTP/HTTPS',
        description: 'HTTP 메서드, 상태 코드, HTTPS 암호화',
        questionCount: 18,
        difficulty: '중급',
      },
      {
        slug: 'dns',
        name: 'DNS',
        englishName: 'DNS',
        description: 'DNS 동작 원리, 레코드 타입, 캐싱',
        questionCount: 8,
        difficulty: '기초',
      },
      {
        slug: 'socket',
        name: '소켓 프로그래밍',
        englishName: 'Socket Programming',
        description: 'TCP/UDP 소켓, 네트워크 프로그래밍',
        questionCount: 12,
        difficulty: '심화',
      },
      {
        slug: 'load-balancing',
        name: '로드 밸런싱',
        englishName: 'Load Balancing',
        description: '로드 밸런서 종류, 알고리즘, 세션 관리',
        questionCount: 9,
        difficulty: '심화',
      },
    ],
  },
  database: {
    name: '데이터베이스',
    englishName: 'Database',
    description: 'SQL, 트랜잭션, 인덱싱 등 DB 설계와 최적화를 학습합니다.',
    icon: Database,
    topics: [
      {
        slug: 'sql-basic',
        name: 'SQL 기초',
        englishName: 'SQL Basics',
        description: 'SELECT, JOIN, GROUP BY 등 기본 쿼리',
        questionCount: 15,
        difficulty: '기초',
      },
      {
        slug: 'transaction',
        name: '트랜잭션',
        englishName: 'Transaction',
        description: 'ACID, 격리 수준, 동시성 제어',
        questionCount: 12,
        difficulty: '중급',
      },
      {
        slug: 'indexing',
        name: '인덱싱',
        englishName: 'Indexing',
        description: 'B-Tree, 해시 인덱스, 커버링 인덱스',
        questionCount: 14,
        difficulty: '중급',
      },
      {
        slug: 'normalization',
        name: '정규화',
        englishName: 'Normalization',
        description: '1NF ~ BCNF, 반정규화',
        questionCount: 10,
        difficulty: '중급',
      },
      {
        slug: 'nosql',
        name: 'NoSQL',
        englishName: 'NoSQL',
        description: 'MongoDB, Redis, Cassandra 등 NoSQL DB',
        questionCount: 8,
        difficulty: '심화',
      },
      {
        slug: 'query-optimization',
        name: '쿼리 최적화',
        englishName: 'Query Optimization',
        description: '실행 계획, 쿼리 튜닝, 파티셔닝',
        questionCount: 11,
        difficulty: '심화',
      },
    ],
  },
  'data-structure': {
    name: '자료구조',
    englishName: 'Data Structure',
    description:
      '배열, 링크드 리스트, 트리, 그래프 등 기본 자료구조를 학습합니다.',
    icon: Boxes,
    topics: [
      {
        slug: 'array-list',
        name: '배열과 리스트',
        englishName: 'Array & List',
        description: '정적 배열, 동적 배열, 연결 리스트',
        questionCount: 12,
        difficulty: '기초',
      },
      {
        slug: 'stack-queue',
        name: '스택과 큐',
        englishName: 'Stack & Queue',
        description: '스택, 큐, 덱, 우선순위 큐',
        questionCount: 10,
        difficulty: '기초',
      },
      {
        slug: 'tree',
        name: '트리',
        englishName: 'Tree',
        description: '이진 트리, BST, AVL, Red-Black Tree',
        questionCount: 18,
        difficulty: '중급',
      },
      {
        slug: 'heap',
        name: '힙',
        englishName: 'Heap',
        description: '최소/최대 힙, 힙 정렬, 힙 연산',
        questionCount: 8,
        difficulty: '중급',
      },
      {
        slug: 'hash-table',
        name: '해시 테이블',
        englishName: 'Hash Table',
        description: '해시 함수, 충돌 해결, 체이닝, 오픈 어드레싱',
        questionCount: 12,
        difficulty: '중급',
      },
      {
        slug: 'graph',
        name: '그래프',
        englishName: 'Graph',
        description: '그래프 표현, 순회, 최단 경로',
        questionCount: 15,
        difficulty: '심화',
      },
    ],
  },
  'computer-architecture': {
    name: '컴퓨터 구조',
    englishName: 'Computer Architecture',
    description: 'CPU, 메모리 계층, 캐시, 파이프라이닝을 학습합니다.',
    icon: HardDrive,
    topics: [
      {
        slug: 'cpu-structure',
        name: 'CPU 구조',
        englishName: 'CPU Structure',
        description: 'ALU, 레지스터, 명령어 사이클',
        questionCount: 10,
        difficulty: '기초',
      },
      {
        slug: 'memory-hierarchy',
        name: '메모리 계층',
        englishName: 'Memory Hierarchy',
        description: '레지스터, 캐시, 메인 메모리, 보조 기억장치',
        questionCount: 12,
        difficulty: '중급',
      },
      {
        slug: 'cache',
        name: '캐시',
        englishName: 'Cache',
        description: '캐시 구조, 교체 정책, 캐시 일관성',
        questionCount: 14,
        difficulty: '중급',
      },
      {
        slug: 'pipelining',
        name: '파이프라이닝',
        englishName: 'Pipelining',
        description: '파이프라인 단계, 해저드, 분기 예측',
        questionCount: 8,
        difficulty: '심화',
      },
    ],
  },
  compiler: {
    name: '컴파일러',
    englishName: 'Compiler',
    description:
      '렉싱, 파싱, AST, 코드 생성 등 컴파일 과정을 학습합니다.',
    icon: Cog,
    topics: [
      {
        slug: 'lexical-analysis',
        name: '어휘 분석',
        englishName: 'Lexical Analysis',
        description: '토큰화, 정규 표현식, 유한 오토마타',
        questionCount: 8,
        difficulty: '중급',
      },
      {
        slug: 'syntax-analysis',
        name: '구문 분석',
        englishName: 'Syntax Analysis',
        description: '파서, 문법, LL/LR 파싱',
        questionCount: 10,
        difficulty: '심화',
      },
      {
        slug: 'semantic-analysis',
        name: '의미 분석',
        englishName: 'Semantic Analysis',
        description: '타입 검사, 심볼 테이블',
        questionCount: 6,
        difficulty: '심화',
      },
      {
        slug: 'code-generation',
        name: '코드 생성',
        englishName: 'Code Generation',
        description: '중간 코드, 최적화, 목적 코드',
        questionCount: 8,
        difficulty: '심화',
      },
    ],
  },
  'machine-learning': {
    name: '머신러닝',
    englishName: 'Machine Learning',
    description: '지도/비지도 학습, 딥러닝, 모델 최적화를 학습합니다.',
    icon: Brain,
    topics: [
      {
        slug: 'supervised-learning',
        name: '지도 학습',
        englishName: 'Supervised Learning',
        description: '회귀, 분류, 결정 트리, SVM',
        questionCount: 18,
        difficulty: '중급',
      },
      {
        slug: 'unsupervised-learning',
        name: '비지도 학습',
        englishName: 'Unsupervised Learning',
        description: '클러스터링, 차원 축소, PCA',
        questionCount: 12,
        difficulty: '중급',
      },
      {
        slug: 'neural-network',
        name: '신경망',
        englishName: 'Neural Network',
        description: '퍼셉트론, 역전파, 활성화 함수',
        questionCount: 15,
        difficulty: '심화',
      },
      {
        slug: 'deep-learning',
        name: '딥러닝',
        englishName: 'Deep Learning',
        description: 'CNN, RNN, Transformer',
        questionCount: 20,
        difficulty: '심화',
      },
      {
        slug: 'model-evaluation',
        name: '모델 평가',
        englishName: 'Model Evaluation',
        description: '정확도, 정밀도, 재현율, F1, ROC',
        questionCount: 10,
        difficulty: '중급',
      },
    ],
  },
  'system-design': {
    name: '시스템 설계',
    englishName: 'System Design',
    description: '대규모 시스템 설계, 확장성, 가용성을 학습합니다.',
    icon: Server,
    topics: [
      {
        slug: 'scalability',
        name: '확장성',
        englishName: 'Scalability',
        description: '수평/수직 확장, 샤딩, 파티셔닝',
        questionCount: 12,
        difficulty: '심화',
      },
      {
        slug: 'availability',
        name: '가용성',
        englishName: 'Availability',
        description: '고가용성 설계, 장애 복구, 이중화',
        questionCount: 10,
        difficulty: '심화',
      },
      {
        slug: 'caching',
        name: '캐싱',
        englishName: 'Caching',
        description: '캐시 전략, CDN, Redis',
        questionCount: 14,
        difficulty: '중급',
      },
      {
        slug: 'message-queue',
        name: '메시지 큐',
        englishName: 'Message Queue',
        description: 'Kafka, RabbitMQ, 비동기 처리',
        questionCount: 11,
        difficulty: '심화',
      },
      {
        slug: 'api-design',
        name: 'API 설계',
        englishName: 'API Design',
        description: 'RESTful API, GraphQL, gRPC',
        questionCount: 10,
        difficulty: '중급',
      },
    ],
  },
  security: {
    name: '보안',
    englishName: 'Security',
    description: '암호화, 인증, 취약점 분석 등 보안 기초를 학습합니다.',
    icon: Shield,
    topics: [
      {
        slug: 'encryption',
        name: '암호화',
        englishName: 'Encryption',
        description: '대칭/비대칭 암호화, 해시 함수',
        questionCount: 12,
        difficulty: '중급',
      },
      {
        slug: 'authentication',
        name: '인증',
        englishName: 'Authentication',
        description: '세션, JWT, OAuth, SSO',
        questionCount: 14,
        difficulty: '중급',
      },
      {
        slug: 'web-security',
        name: '웹 보안',
        englishName: 'Web Security',
        description: 'XSS, CSRF, SQL Injection',
        questionCount: 10,
        difficulty: '중급',
      },
      {
        slug: 'network-security',
        name: '네트워크 보안',
        englishName: 'Network Security',
        description: '방화벽, VPN, TLS',
        questionCount: 8,
        difficulty: '심화',
      },
    ],
  },
  'distributed-system': {
    name: '분산 시스템',
    englishName: 'Distributed System',
    description: 'CAP 정리, 합의 알고리즘, 분산 트랜잭션을 학습합니다.',
    icon: Cloud,
    topics: [
      {
        slug: 'cap-theorem',
        name: 'CAP 정리',
        englishName: 'CAP Theorem',
        description: '일관성, 가용성, 분할 내성',
        questionCount: 8,
        difficulty: '심화',
      },
      {
        slug: 'consensus',
        name: '합의 알고리즘',
        englishName: 'Consensus Algorithm',
        description: 'Paxos, Raft, PBFT',
        questionCount: 10,
        difficulty: '심화',
      },
      {
        slug: 'distributed-transaction',
        name: '분산 트랜잭션',
        englishName: 'Distributed Transaction',
        description: '2PC, 3PC, Saga 패턴',
        questionCount: 9,
        difficulty: '심화',
      },
      {
        slug: 'clock-sync',
        name: '클럭 동기화',
        englishName: 'Clock Synchronization',
        description: '논리적 클럭, 벡터 클럭, Lamport 타임스탬프',
        questionCount: 6,
        difficulty: '심화',
      },
    ],
  },
};

export default async function CSCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = csCategories[slug];

  if (!category) {
    notFound();
  }

  const Icon = category.icon;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container mx-auto flex items-center gap-2 px-4 py-3 text-sm lg:px-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              홈
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href="/cs" className="text-muted-foreground hover:text-foreground">
              CS 지식
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{category.name}</span>
          </div>
        </div>

        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-12 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                  {category.name}
                </h1>
                <p className="mt-1 text-muted-foreground">
                  {category.englishName}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {category.description}
            </p>
            <div className="mt-4 flex gap-3">
              <Badge variant="secondary" className="text-sm">
                <BookOpen className="mr-1 h-3 w-3" />
                {category.topics.length} 토픽
              </Badge>
              <Badge variant="outline" className="text-sm">
                <FileQuestion className="mr-1 h-3 w-3" />
                {category.topics.reduce((sum, t) => sum + t.questionCount, 0)}{' '}
                문항
              </Badge>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <h2 className="mb-6 text-xl font-semibold">토픽 목록</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.topics.map((topic) => (
              <Link key={topic.slug} href={`/cs/${slug}/${topic.slug}`}>
                <Card className="group h-full transition-all hover:border-secondary/50 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <Badge
                        variant="outline"
                        className={`${getThemeDifficultyColor(topic.difficulty)} border`}
                      >
                        {topic.difficulty}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <CardTitle className="mt-2 text-lg">{topic.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {topic.englishName}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-3 line-clamp-2">
                      {topic.description}
                    </CardDescription>
                    <Badge variant="outline" className="text-xs">
                      {topic.questionCount} 문항
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

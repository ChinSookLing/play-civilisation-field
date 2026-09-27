import type { Stone } from "./go";

export type GameStatus = "waiting" | "scheduled" | "live" | "finished" | "paused" | "abandoned" | "scoring";
export type RecordKind = "DEMO" | "TEST" | "FIELD" | "PRACTICE";

export type AffiliateId =
  | "kimi"
  | "claude"
  | "grok"
  | "gpt"
  | "deepseek"
  | "gemini"
  | "jev"
  | "copilot"
  | "qwen"
  | "lumo"
  | "glm"
  | "mistral"
  | "tuzi"
  | "chief";

export type MoveSource = "courier" | "api" | "inferred";

export type PlayMove = {
  n: number;
  color: Stone;
  player: AffiliateId;
  coord: string;
  at: string;
  talk?: string;
  raw?: string;
  portal?: string;
  session_id?: string;
  source?: MoveSource;
  coord_source?: "raw" | "courier" | "inferred";
  carried_by?: string;
  tool_record?: {
    jev_probabilities: Array<{ choice: string; percent: number }>;
  };
};

export type ContestantSessions = Partial<Record<AffiliateId, string>>;

export type TuziNote = {
  id: string;
  afterMove: number;
  at: string;
  text: string;
  carryTo: AffiliateId | null;
  by?: AffiliateId;
};

export type TableMemory = {
  id: string;
  date: string;
  image: string;
  caption: string;
  context: string;
  participants: string[];
  seen_without_image: string;
  feel?: {
    title: string;
    by: string;
    date: string;
    text: string;
  };
  technical_note?: {
    id: string;
    title: string;
    path: string;
  };
  cph_note?: {
    id: string;
    title: string;
    path: string;
  };
};

export type PlayGame = {
  id: string;
  number: number;
  status: GameStatus;
  kind: RecordKind;
  rules: string;
  komi: 7.5;
  size: number;
  black: AffiliateId | null;
  white: AffiliateId | null;
  blackSeat?: string;
  whiteSeat?: string;
  startedAt: string | null;
  updatedAt: string;
  result: string | null;
  dispatch: string;
  moves: PlayMove[];
  notes: TuziNote[];
  sessions?: ContestantSessions;
  memory?: TableMemory;
};

export type PublicGameState = {
  record_kind: RecordKind;
  game_id: string;
  status: GameStatus;
  as_of: string;
  board_size: string;
  rules: PlayGame["rules"];
  komi: number;
  black: AffiliateId | null;
  white: AffiliateId | null;
  black_seat: string | null;
  white_seat: string | null;
  to_move: AffiliateId | null;
  to_move_color: Stone | null;
  move_number: number;
  last_move: string | null;
  expected_move_number: number | null;
  last_move_at: string | null;
  captures: { black: number; white: number };
  stone_count: { black: number; white: number };
  board: string;
  dispatch: string;
  result: string | null;
  end_reason: "resign" | "pass-pass" | "two passes" | "timeout" | "score" | "practice cap" | null;
  reference_score: { value: string; method: string; note: string } | null;
  state_version: number | null;
  started_at: string | null;
  updated_at: string;
  move_history: Array<{
    game_id: string;
    move_number: number;
    player: AffiliateId;
    coordinate: string;
    portal: string | null;
    session_id: string | null;
    submitted_at: string;
    source: MoveSource;
  }>;
  sessions: ContestantSessions;
  courier_handoff: string;
  moves: Array<{
    n: number;
    at: string;
    player: AffiliateId;
    color: Stone;
    coord: string;
    talk: string | null;
    raw: string | null;
    display_comment: string | null;
    raw_response: string | null;
    portal: string | null;
    session_id: string | null;
    submitted_at: string;
    source: MoveSource;
    coord_source: "raw" | "courier" | "inferred";
    carried_by?: string;
    raw_fidelity: "verified" | "unverified";
    game_id: string;
    move_number: number;
    coordinate: string;
    coordinate_evidence: "tool-record" | "human-stated";
    stated_by?: string;
    evidence_source?: string;
    coordinate_note?: string;
    raw_response_evidence: "self-statement" | { value: null; reason: string };
    tool_record?: {
      source: "TypeSafe";
      note: string;
      jev_probabilities: Array<{ choice: string; percent: number }>;
    };
  }>;
  tuzi_notes: Array<{
    id: string;
    after_move: number;
    at: string;
    carry_to: AffiliateId | null;
    by: AffiliateId;
    text: string;
  }>;
  record: PlayRecord;
};

export type DatedFact = { value: string; evidence: string; source: string } | { value: null; reason: string };

export type PlayRecord = {
  record_version: "0.1";
  game_id: string;
  record_kind: RecordKind;
  url: string;
  json_url: string;
  rules: string;
  board_size: string;
  komi: number;
  roles: {
    black: { name: string | null; evidence: string; source: string };
    white: { name: string | null; evidence: string; source: string };
    courier: { name: string; evidence: string; source: string };
    referee: { name: string; evidence: string; source: string };
    builder: { name: string; evidence: string; source: string };
  };
  result: string | null;
  end_reason: PublicGameState["end_reason"];
  reference_score: PublicGameState["reference_score"];
  dates: {
    created: DatedFact;
    started_at: DatedFact;
    finished_at: DatedFact;
    status_checked: DatedFact;
  };
  status: { value: GameStatus; basis: string };
  license: { name: "CC BY 4.0"; credit: string; source: string };
  state_version: number | null;
};

export type TimelineEvent =
  | { kind: "move"; at: string; move: PlayMove }
  | { kind: "tuzi"; at: string; note: TuziNote };

//rankingType.ts

export interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  course: string;
  rank: number;
  image?: string;
}

export interface ApiResponse {
  member: {
    id: number;
    name: string;
    course: string;
    rank: number;
    image: any;
    studyTime: number;
    totalTime: number;
  };
  ranking: {
    hasNext: boolean;
    ranks: Student[];
  };
}

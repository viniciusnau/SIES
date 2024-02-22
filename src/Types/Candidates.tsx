export interface Candidates {
  candidate: Candidate[];
}

export interface Candidate {
  name: string;
  social_security_number: string;
  public_defense: gradeByPublicDefense[];
  academic_index: number;
  birth_date: string;
  is_resident: boolean;
  is_pcd: boolean;
}

export interface gradeByPublicDefense {
  id: number;
  public_defense: string;
  category: string;
  test_index: number;
  interview_index: number;
  average: number;
  registration: string;
  hiring_status: string;
  updated_at: string;
}

export interface iGetCandidates {
  name: string;
}


export interface Actor {
  id: string;
  name: string;
  ageRange: string;
  skills: string[];
  credits: string[];
  imageUrl: string;
  videoUrl?: string;
  bio?: string;
  isAwardWinner?: boolean;
}

export interface FilmProject {
  id: string;
  title: string;
  genre: string;
  description: string;
  platform: string;
  posterUrl: string;
  stills: string[];
  videoUrl?: string;
}

export interface Opportunity {
  id: string;
  projectName: string;
  company: string;
  roleType: string;
  gender: 'Male' | 'Female' | 'Any';
  genre: string;
  ageRange: string;
  location: string;
  shootDates: string;
  requirements: string;
  status: 'Open' | 'Closed' | 'In Progress';
  unionStatus: 'Union' | 'Non-Union';
}

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  uploadDate: string;
}

export interface Application {
  id: string;
  englishName: string;
  chineseName: string;
  gender: string;
  dob: string;
  country?: string;
  height: string;
  weight: string;
  race: string;
  idNumber: string;
  address: string;
  guardianMobile: string;
  englishLevel: string;
  hobbies: string;
  resume: string;
  submittedAt: string;
  headshotUrl?: string;
  resumeFileUrl?: string; // New: Base64 string of PDF
  resumeFileName?: string; // New: Original filename
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantName: string;
  email: string;
  phone: string;
  headshotUrl: string;
  resumeUrl?: string;
  coverLetter: string;
  appliedAt: string;
}

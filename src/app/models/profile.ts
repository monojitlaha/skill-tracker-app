import { Skill } from "./skill";

export interface Profile {
    name: string; 
    associateId:string;
    email: string;
    mobile: string;
    technicalSkills: Skill[];
    communicationSkills: Skill[];
} 
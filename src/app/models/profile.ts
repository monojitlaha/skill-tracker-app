import { Skill } from "./skill";

export class Profile {
    id: string;
    name: string; 
    associateId:string;
    email: string;
    mobile: string;
    technicalSkills: Skill[];
    communicationSkills: Skill[];
} 
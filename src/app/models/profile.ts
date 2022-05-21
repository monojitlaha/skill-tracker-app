import { Skill } from "./skill";

export class Profile {
    id: string;
    userName: string; 
    name: string; 
    associateId:string;
    email: string;
    mobile: string;
    technicalSkills: Skill[];
    communicationSkills: Skill[];
} 
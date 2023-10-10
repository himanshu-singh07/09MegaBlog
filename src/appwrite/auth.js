/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import config from "../config/config";

import { Client, Account, ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;


    constructor(){
        this.client
               .setEndpoint(config.appwriteUrl) 
               .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    } 



    // Create ACCOUNT

    async createAccount({email,password,name}){
        try {
           const userAccount = await this.account.create(ID.unique(),email,password,name);
           if(userAccount){
            // CAlL ANOTHER METHOD
            return this.login({email,password});
           }else{
            return userAccount;
           }
        } catch (error) {
            throw error;
        }
    }

    // LOGIN 

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);            
        } catch (error) {
            throw error;
        }
    }


    // USER IS LOGIN THEN

    async getCurrentUser(){
        try {
            return await this.account.get();
        }catch(error){
            throw error;
        }

        return null;
    }

    // Delete Session

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
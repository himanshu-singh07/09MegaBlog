/* eslint-disable no-unreachable */
/* eslint-disable no-empty */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases= new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status, userId}){
        try {
           return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
           ); 
        } catch (error) {
            throw error;
        }
    }


    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionID,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw error;
        }
    }


    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionID,
                slug
            )
            return true;

        } catch (error) {
            console.log("aapwite Service:: deletePost:: error",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("GetPost Error::",error);
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionID,
                queries,
            )
        } catch (error) {
            console.log("Getposts ERROR::",error);
            return false;
        }
    }

    //  File upload methods

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Upload file error::", error);
            return false;
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileID,
            )
            return true;
        } catch (error) {
            console.log("deleteFile error::",error);
            return false;
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileID,
        )
    }
}

const service = new Service()
export default service;
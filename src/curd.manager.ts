import {MongoClient} from 'mongodb';
import {ObjectId} from 'mongodb';

export class CurdManager {
    public static async create(inputObj: any) {
        try {
            const url = 'mongodb://localhost:27017';
            const client = await MongoClient.connect(url);

            const db = client.db('cdac');
            await db.collection('task').insert(inputObj);

            client.close();

            return {opr : true};
        } catch(err) {
            return {opr : false}
        }
    }


    public static async read() {
        try {
            const url = 'mongodb://localhost:27017';
            const client = await MongoClient.connect(url);

            const db = client.db('cdac');
            const output = await db.collection('task').find().sort({_id:-1}).toArray();

            client.close();
            return output;
        } catch(err) {
            return {opr : false}
        }
    }


    public static async update(inputObj: any) {
        try {
            const url = 'mongodb://localhost:27017';
            const client = await MongoClient.connect(url);

            const db = client.db('cdac');
            
            const query = {_id : new ObjectId(inputObj._id)};
            const newData = {"$set" : {todo : inputObj.todo}}; 
            await db.collection('task').update(query, newData);

            client.close();
            return {opr : true};
        } catch(err) {
            return {opr : false}
        }
    }


    public static async delete(inputObj: any) {
        try {
            const url = 'mongodb://localhost:27017';
            const client = await MongoClient.connect(url);

            const db = client.db('cdac');
            
            const query = {_id : new ObjectId(inputObj._id)};
            await db.collection('task').deleteOne(query);

            client.close();
            return {opr : true};
        } catch(err) {
            return {opr : false}
        }
    }

}
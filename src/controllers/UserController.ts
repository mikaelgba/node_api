import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/Users';

class UserController {

    async create( request: Request, response: Response){

        const {name, email} = request.body;
        const usersRepor = getRepository(User);
        const userExist = usersRepor.findOne({email});

        if(userExist){
            return response.status(400).json({error: "User already exists in system."})
        }
        const user = usersRepor.create({name, email});
        
        await usersRepor.save(user);
        return response.json(user);
    }

}
export { UserController };
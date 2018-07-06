import Controller from './Controller';
import User from '../models/User';
import path from 'path';

export default class CrudController extends Controller {

    async read (req, res) {

        // await User.remove({}, function (err, a) {
        //     console.log(err, a)
        // });

        const user = await User.find();
        return res.json(user);
    }

    create = async (req, res) => {
        
        if(!this.emailValidation(req.body.email)) return res.json({status: 0, msg: 'Email is not valid'});

        const newUser = new User(req.body);
        
        try {
            await newUser.save();
        } catch (e) {
            throw e;
        }

        const user = await User.find();

        return res.json({status: 1, data: user});

    }

    update = async (req, res) => {

        if(!this.emailValidation(req.body.email)) return res.json({status: 0, msg: 'Email is not valid'});

        try {
            await User.findOneAndUpdate({_id: req.params.id}, {$set:req.body});
        } catch (e) {
            throw e;
        }

        const user = await User.find();

        return res.json({status: 1, data: user});

    }

    async delete (req, res) {
        
        try {
            await User.deleteOne({_id: req.params.id});
        } catch (e) {
            throw e;
        }

        const user = await User.find();

        return res.json({status: 1, data: user});

    }

}
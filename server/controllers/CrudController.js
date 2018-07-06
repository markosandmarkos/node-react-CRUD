import Controller from './Controller';
import User from '../models/User';
import Helpers from "./Helpers";

export default class CrudController extends Controller {

    async read(req, res) {
        const user = await User.find();
        return res.json(user);
    }

    create = async (req, res) => {

        if (!Helpers.emailValidation(req.body.email)) return res.json(Helpers.response(0));

        const newUser = new User(req.body);

        try {
            await newUser.save();
        } catch (e) {
            throw e;
        }

        const user = await User.find();

        return res.json(Helpers.response(1, user));

    };

    update = async (req, res) => {

        if (!Helpers.emailValidation(req.body.email)) return res.json(Helpers.response(0));

        try {
            await User.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: req.body
            });
        } catch (e) {
            throw e;
        }

        const user = await User.find();

        return res.json(Helpers.response(1, user));

    };

    delete = async (req, res) => {

        try {
            await User.deleteOne({_id: req.params.id});
        } catch (e) {
            throw e;
        }

        const user = await User.find();

        return res.json(Helpers.response(1, user));

    }

}
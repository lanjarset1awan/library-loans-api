import { LoanModel } from "../models/loanModel.js";

export const LoanController = {

    async getAll(req, res) {
        try {

            const filters = {
                status: req.query.status,
                member_id: req.query.member_id,
                book_id: req.query.book_id
            };

            const loans = await LoanModel.getAll(filters);

            res.json(loans);

        } catch (err) {

            res.status(500).json({
                error: err.message
            });

        }
    },

    async getById(req, res) {
        try {

            const loan = await LoanModel.getById(
                req.params.id
            );

            res.json(loan);

        } catch (err) {

            res.status(404).json({
                error: err.message
            });

        }
    },

    async create(req, res) {
        try {

            const loan = await LoanModel.create(
                req.body
            );

            res.status(201).json(loan);

        } catch (err) {

            res.status(400).json({
                error: err.message
            });

        }
    },

    async update(req, res) {
        try {

            const loan = await LoanModel.update(
                req.params.id,
                req.body
            );

            res.json(loan);

        } catch (err) {

            res.status(400).json({
                error: err.message
            });

        }
    },

    async remove(req, res) {
        try {

            const result = await LoanModel.remove(
                req.params.id
            );

            res.json(result);

        } catch (err) {

            res.status(400).json({
                error: err.message
            });

        }
    }
};
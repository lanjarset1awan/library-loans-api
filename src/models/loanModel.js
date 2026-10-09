import { supabase } from "../config/supabaseClient.js";

const loanSelect = `
    id,
    member_id,
    book_id,
    loan_date,
    due_date,
    return_date,
    status,
    created_at,
    members (
        id,
        name,
        email
    ),
    books (
        id,
        title,
        author,
        isbn
    )
`;

export const LoanModel = {

    async getAll(filters = {}) {

        let query = supabase
            .from("loans")
            .select(loanSelect)
            .order("created_at", { ascending: false });

        if (filters.status) {
            query = query.eq("status", filters.status);
        }

        if (filters.member_id) {
            query = query.eq("member_id", filters.member_id);
        }

        if (filters.book_id) {
            query = query.eq("book_id", filters.book_id);
        }

        const { data, error } = await query;

        if (error) throw error;

        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from("loans")
            .select(loanSelect)
            .eq("id", id)
            .single();

        if (error) throw error;

        return data;
    },

    async create(loan) {
        const { data, error } = await supabase
            .from("loans")
            .insert([loan])
            .select(loanSelect)
            .single();

        if (error) throw error;

        return data;
    },

    async update(id, loan) {
        const { data, error } = await supabase
            .from("loans")
            .update(loan)
            .eq("id", id)
            .select(loanSelect)
            .single();

        if (error) throw error;

        return data;
    },

    async remove(id) {
        const { error } = await supabase
            .from("loans")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return {
            message: "Loan deleted successfully"
        };
    }
};
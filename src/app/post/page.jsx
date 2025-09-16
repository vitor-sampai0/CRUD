"use client";
import { useState } from "react";
import axios from "axios";

export default function PostPage() {
    const [loading, setLoading] = useState(false);
    const [addedComment, setAddedComment] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        comment: "",
        body: "",
    });
    const [error, setError] = useState("");

    const criarNovoComment = async (e) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/comments",{
                    name: form.name.trim(),
                    email: form.email.trim(),
                    body: form.body.trim(),
                });
                setAddedComment([response.data, ...addedComment]);
                setForm({
                    name: "",
                    email: "",
                    body: "",
                });
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };
    const atualizarForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div>
            <h1>Criar Comentários</h1>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={form.name}
                    onChange={atualizarForm}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={atualizarForm}
                    />
                <textarea
                    name="body"
                    placeholder="Comentário"
                    value={form.body}
                    onChange={atualizarForm}
                    rows={4}
                    />
                <button onClick={criarNovoComment} disabled={form.name.trim() || loading}>
                    {loading ? "Carregando..." : "Enviar Comentário"}
                    </button>
            </div>

            {error && <p> Erro ao criar comentário. Tente novamente.</p>}

            <h2>Comentários Adicionados</h2>
            <ul>
                {addedComment.map((comment) => {
                    <li key={comment.id}>
                        <hr/>
                       <p>{comment.name} </p> 
                        <p>({comment.email})</p>
                        <p>{comment.body}</p>
                        </li>
                })}
            </ul>
        </div>
    );
}
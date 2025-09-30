"use client";
import { useState } from "react";
import axios from "axios";
import styles from './page.module.css';

export default function PostPage() {
    const [loading, setLoading] = useState(false);
    const [addedComment, setAddedComment] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        body: "",
    });
    const [error, setError] = useState("");

    const criarNovoComment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/comments", {
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
            setError("Erro ao criar comentário. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };
    
    const atualizarForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const isFormValid = form.name.trim() && form.email.trim() && form.body.trim();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Criar Comentários</h1>
            
            <div className={styles.formContainer}>
                <form onSubmit={criarNovoComment}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={form.name}
                            onChange={atualizarForm}
                            className={styles.input}
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={atualizarForm}
                            className={styles.input}
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <textarea
                            name="body"
                            placeholder="Comentário"
                            value={form.body}
                            onChange={atualizarForm}
                            rows={4}
                            className={styles.textarea}
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className={styles.submitButton}
                        disabled={!isFormValid || loading}
                    >
                        {loading ? "Enviando..." : "Enviar Comentário"}
                    </button>
                </form>

                {error && <div className={styles.error}>{error}</div>}
            </div>

            <div className={styles.commentsSection}>
                <h2 className={styles.commentsTitle}>Comentários Adicionados</h2>
                
                {addedComment.length === 0 ? (
                    <div className={styles.emptyState}>
                        Nenhum comentário adicionado ainda.
                    </div>
                ) : (
                    <ul className={styles.commentsList}>
                        {addedComment.map((comment) => (
                            <li key={comment.id} className={styles.commentItem}>
                                <div className={styles.commentHeader}>
                                    <span className={styles.commentName}>{comment.name}</span>
                                    <span className={styles.commentEmail}>({comment.email})</span>
                                </div>
                                <div className={styles.commentBody}>{comment.body}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
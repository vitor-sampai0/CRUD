"use client";
import { useState } from "react";
import axios from "axios";
import styles from './page.module.css';

export default function Edit() {
    const [commentId, setCommentId] = useState("");
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const buscarComentario = async () => {
        if (!commentId) return;

        setLoading(true);
        setError(false);

        try {
            const { data } = await axios.get(
                `https://jsonplaceholder.typicode.com/comments/${commentId}`
            );
            setForm({ name: data.name, email: data.email, body: data.body });
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const editarComentario = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            await axios.put(`https://jsonplaceholder.typicode.com/comments/${commentId}`, form);
            setSuccess(true);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Editar Comentário</h1>

            <div className={styles.searchSection}>
                <div className={styles.searchGroup}>
                    <input
                        type="number"
                        value={commentId}
                        onChange={(e) => setCommentId(e.target.value)}
                        placeholder="ID do comentário"
                        className={styles.searchInput}
                    />
                    <button 
                        onClick={buscarComentario} 
                        disabled={loading || !commentId}
                        className={styles.searchButton}
                    >
                        {loading ? (
                            <div className={styles.loading}>
                                <div className={styles.spinner}></div>
                                Buscando...
                            </div>
                        ) : "Buscar"}
                    </button>
                </div>
            </div>

            {form.name && (
                <div className={styles.editSection}>
                    <h2 className={styles.editTitle}>Editando Comentário #{commentId}</h2>
                    
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Nome"
                            className={styles.input}
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Email"
                            className={styles.input}
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <textarea
                            value={form.body}
                            onChange={(e) => setForm({ ...form, body: e.target.value })}
                            placeholder="Comentário"
                            rows="3"
                            className={styles.textarea}
                        />
                    </div>
                    
                    <button 
                        onClick={editarComentario} 
                        disabled={loading || !form.name?.trim()}
                        className={styles.saveButton}
                    >
                        {loading ? (
                            <div className={styles.loading}>
                                <div className={styles.spinner}></div>
                                Salvando...
                            </div>
                        ) : "Salvar Alterações"}
                    </button>
                </div>
            )}

            {error && (
                <div className={`${styles.message} ${styles.error}`}>
                    ❌ Erro na operação
                </div>
            )}
            {success && (
                <div className={`${styles.message} ${styles.success}`}>
                    ✅ Comentário editado com sucesso!
                </div>
            )}
        </div>
    );
}



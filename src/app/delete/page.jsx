"use client";
import { useState } from "react";
import axios from "axios";
import styles from './page.module.css';

export default function Delete() {
    const [commentId, setCommentId] = useState("");
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const buscarComentario = async () => {
        if (!commentId) return;
        
        setLoading(true);
        setError(false);

        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/comments/${commentId}`
            );
            setComment(response.data);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const deletarComentario = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            setSuccess(true);
            setComment(null);
            setCommentId("");
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Deletar Comentário</h1>

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
                        disabled={!commentId || loading}
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

            {comment && (
                <div className={styles.commentPreview}>
                    <h2 className={styles.previewTitle}>
                        Comentário #{comment.id}
                    </h2>
                    
                    <div className={`${styles.commentField} ${styles.nameField}`}>
                        <div className={styles.fieldLabel}>Nome</div>
                        <div className={styles.fieldValue}>{comment.name}</div>
                    </div>
                    
                    <div className={`${styles.commentField} ${styles.emailField}`}>
                        <div className={styles.fieldLabel}>Email</div>
                        <div className={styles.fieldValue}>{comment.email}</div>
                    </div>
                    
                    <div className={`${styles.commentField} ${styles.bodyField}`}>
                        <div className={styles.fieldLabel}>Comentário</div>
                        <div className={styles.fieldValue}>{comment.body}</div>
                    </div>
                    
                    <div className={styles.warningSection}>
                        <div className={styles.warningIcon}>⚠️</div>
                        <div className={styles.warningText}>ATENÇÃO!</div>
                        <div className={styles.warningSubtext}>
                            Esta ação não pode ser desfeita. O comentário será permanentemente removido.
                        </div>
                    </div>
                    
                    <button 
                        onClick={deletarComentario} 
                        disabled={loading}
                        className={styles.deleteButton}
                    >
                        {loading ? (
                            <div className={styles.loading}>
                                <div className={styles.spinner}></div>
                                Deletando...
                            </div>
                        ) : "🗑️ Deletar Comentário"}
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
                    ✅ Comentário deletado com sucesso!
                </div>
            )}
        </div>
    );
}

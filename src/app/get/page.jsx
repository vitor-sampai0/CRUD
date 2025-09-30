"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from './page.module.css';

// https://jsonplaceholder.typicode.com/
// https://jsonplaceholder.typicode.com/comments

export default function Get() {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(false);

    const router = useRouter();

    const buscarComments = async () => {
        setLoading(true);

        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
            setComments(response.data);
        } catch (error) {
            setError(true);
            console.error("❌ Erro ao buscar comentários:", error);
        } finally {
            setLoading(false);
        }
    };

    const navegarParaComentario = (commentId) => {
        router.push(`/get/${commentId}`);
    };

    useEffect(() => {
        buscarComments();
    }, []);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    Carregando comentários...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <div className={styles.errorIcon}>❌</div>
                    <div className={styles.errorMessage}>
                        Ocorreu um erro ao buscar os comentários.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Lista de Comentários</h1>
            <h2 className={styles.subtitle}>Comentários ({comments.length})</h2>
            
            {comments.length === 0 ? (
                <div className={styles.emptyState}>
                    Nenhum comentário encontrado.
                </div>
            ) : (
                <ul className={styles.commentsList}>
                    {comments.map((comment) => (
                        <li
                            key={comment.id}
                            onClick={() => navegarParaComentario(comment.id)}
                            className={styles.commentCard}
                        >
                            <div className={styles.commentHeader}>
                                <div className={styles.commentIds}>
                                    <span className={styles.commentId}>ID: {comment.id}</span>
                                    <span className={styles.postId}>Post: {comment.postId}</span>
                                </div>
                            </div>
                            
                            <div className={styles.commentName}>{comment.name}</div>
                            <div className={styles.commentEmail}>{comment.email}</div>
                            <div className={styles.commentBody}>{comment.body}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

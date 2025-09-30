"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import styles from './page.module.css';

export default function GetByIdPage() {
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState(null);
    const [error, setError] = useState(false);

    const params = useParams();
    const router = useRouter();
    const commentId = params.id;

    const buscarComentario = async () => {
        setLoading(true);
        setError(false);

        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            setComment(response.data);
        } catch (error) {
            setError(true);
            console.error("Erro ao buscar comentário:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (commentId) {
            buscarComentario();
        }
    }, [commentId]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    Carregando comentário...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <button 
                    className={styles.backButton}
                    onClick={() => router.back()}
                >
                    ← Voltar
                </button>
                <div className={styles.errorContainer}>
                    <div className={styles.errorIcon}>❌</div>
                    <div className={styles.errorMessage}>
                        Erro ao buscar comentário.
                    </div>
                </div>
            </div>
        );
    }

    if (!comment) {
        return (
            <div className={styles.container}>
                <button 
                    className={styles.backButton}
                    onClick={() => router.back()}
                >
                    ← Voltar
                </button>
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🔍</div>
                    <div className={styles.emptyMessage}>
                        Comentário não encontrado.
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className={styles.container}>
            <button 
                className={styles.backButton}
                onClick={() => router.back()}
            >
                ← Voltar
            </button>
            
            <div className={styles.commentCard}>
                <div className={styles.commentHeader}>
                    <h1 className={styles.commentTitle}>Comentário #{comment.id}</h1>
                    <p className={styles.commentSubtitle}>Post #{comment.postId}</p>
                </div>
                
                <div className={styles.commentContent}>
                    <div className={`${styles.fieldGroup} ${styles.nameField}`}>
                        <div className={styles.fieldLabel}>Nome</div>
                        <div className={styles.fieldValue}>{comment.name}</div>
                    </div>
                    
                    <div className={`${styles.fieldGroup} ${styles.emailField}`}>
                        <div className={styles.fieldLabel}>Email</div>
                        <div className={styles.fieldValue}>{comment.email}</div>
                    </div>
                    
                    <div className={`${styles.fieldGroup} ${styles.bodyField}`}>
                        <div className={styles.fieldLabel}>Comentário</div>
                        <div className={styles.fieldValue}>{comment.body}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
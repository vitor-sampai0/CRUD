import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CRUD Completo</h1>
      <nav className={styles.navigation}>
        <Link href="/get" className={`${styles.navCard} ${styles.getCard}`}>
          <div className={styles.cardTitle}>GET</div>
          <div className={styles.cardDescription}>Visualizar comentários</div>
        </Link>
        <Link href="/post" className={`${styles.navCard} ${styles.postCard}`}>
          <div className={styles.cardTitle}>POST</div>
          <div className={styles.cardDescription}>Criar novo comentário</div>
        </Link>
        <Link href="/put" className={`${styles.navCard} ${styles.putCard}`}>
          <div className={styles.cardTitle}>PUT</div>
          <div className={styles.cardDescription}>Editar comentário</div>
        </Link>
        <Link href="/delete" className={`${styles.navCard} ${styles.deleteCard}`}>
          <div className={styles.cardTitle}>DELETE</div>
          <div className={styles.cardDescription}>Excluir comentário</div>
        </Link>
      </nav>
    </div>
  )
}
import { Link } from 'react-router-dom';
import Container from './Container';
import styles from "./Navbar.module.css";
function Navbar() {
  return (
    <div className={styles.navbar}>
      <Container>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/empresa">Empresa</Link>
          </li>
          <li className={styles.item}>
            <Link to="/fornecedor">Fornecedor</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Navbar;

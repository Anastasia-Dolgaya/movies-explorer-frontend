import { Link } from 'react-router-dom';
function Account() {
  return (
    <Link className="link link_content_account" to="/profile">
      <div className="link__icon"></div>
      <span>Аккаунт</span>
    </Link>
  );
}
export default Account;

function Header() {
  return (
    <div className="flex items-center justify-between p-5">
      <div>LOGO</div>
      <div>
        <nav>
          <ul className="flex space-x-8">
            <li>Create</li>
            <li>Explore</li>
            <li>Premium</li>
          </ul>
        </nav>
      </div>
      <div>
        <p>USER AVATAR / Sign in</p>
      </div>
    </div>
  );
}
export default Header;

function Footer() {
  return (
    <div className="flex p-5 items-center">
      <div className="bg-red-500">
        <p>LOGO</p>
        <p>About</p>
      </div>
      <div className="bg-green-500 flex-1 flex justify-center space-x-8">
        <p>Copyright &copy; Recipe Generator 2024</p>
        <p>Terms</p>
        <p>Privacy</p>
        <p>Contact</p>
      </div>
    </div>
  );
}
export default Footer;

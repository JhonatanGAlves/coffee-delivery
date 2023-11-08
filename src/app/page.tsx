import Header from "../components/header/Header";
import Main from "../components/main/Main";

export default function Home() {
  return (
    <div className="bg-[var('--background')]">
      <Header />
      <Main />
    </div>
  );
}

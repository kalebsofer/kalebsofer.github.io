import React, { useEffect, useState } from "react";
import "./App.scss";
import Nav from "./components/Nav";
import HeroFlowField from "./components/HeroFlowField";
import Intro from "./components/Intro";
import Marquee from "./components/Marquee";
import SoftmaxNow from "./components/SoftmaxNow";
import Principles from "./components/Principles";
import Stack from "./components/Stack";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Footer from "./components/Footer";
import useGitHub from "./hooks/useGitHub";

function initialTheme() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("theme");
    if (fromUrl === "light" || fromUrl === "dark") return fromUrl;
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch (e) {}
  return "light";
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [lang, setLang] = useState("en");
  const [content, setContent] = useState(null);
  const [shared, setShared] = useState(null);
  const gh = useGitHub();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    const path = lang === "en" ? "res_primaryLanguage.json" : "res_secondaryLanguage.json";
    fetch(`${process.env.PUBLIC_URL}/${path}`)
      .then((r) => r.json())
      .then(setContent)
      .catch(() => {});
  }, [lang]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/portfolio_shared_data.json`)
      .then((r) => r.json())
      .then((data) => {
        setShared(data);
        if (data.basic_info && data.basic_info.name) document.title = data.basic_info.name;
      })
      .catch(() => {});
  }, []);

  if (!content) return null;

  const social = shared && shared.basic_info ? shared.basic_info.social : [];
  const icons = shared && shared.skills ? shared.skills.icons : [];

  return (
    <div className="site">
      <Nav
        nav={content.nav}
        lang={lang}
        onPickLang={setLang}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <HeroFlowField theme={theme} hero={content.hero} />
      <Intro intro={content.intro} softmaxUrl={content.softmax.url} />
      <Marquee text={content.marquee} />
      <SoftmaxNow softmax={content.softmax} now={content.now} />
      <Principles principles={content.principles} />
      <Stack stack={content.stack} icons={icons} />
      <Experience experience={content.experience} />
      {content.education && <Experience experience={content.education} />}
      <Work work={content.work} gh={gh} />
      <Footer writing={content.writing} footer={content.footer} social={social} />
    </div>
  );
}

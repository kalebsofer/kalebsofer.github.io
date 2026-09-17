import React, { useEffect, useState } from "react";
import "./App.scss";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import SoftmaxNow from "./components/SoftmaxNow";
import Principles from "./components/Principles";
import Stack from "./components/Stack";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Footer from "./components/Footer";
import useGitHub from "./hooks/useGitHub";

export default function App() {
  const [lang, setLang] = useState("en");
  const [content, setContent] = useState(null);
  const [shared, setShared] = useState(null);
  const gh = useGitHub();

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

  return (
    <div className="site">
      <Hero
        hero={content.hero}
        softmaxUrl={content.softmax.url}
        nav={
          <Nav
            nav={content.nav}
            lang={lang}
            onPickLang={setLang}
          />
        }
      />
      <Marquee rows={content.marquee} />
      <SoftmaxNow softmax={content.softmax} now={content.now} />
      <Principles principles={content.principles} />
      <Stack stack={content.stack} />
      <Experience experience={content.experience} />
      {content.education && <Experience experience={content.education} />}
      <Work work={content.work} gh={gh} />
      <Footer writing={content.writing} footer={content.footer} social={social} />
    </div>
  );
}
